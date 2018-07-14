http://deadhorse.me/nodejs/2013/04/13/exception_and_domain.html

异步异常处理
异步异常的特点
由于node的回调异步特性，无法通过try catch来捕捉所有的异常：

try {
  process.nextTick(function () {
    foo.bar();
  });
} catch (err) {
  //can not catch it
}
而对于web服务而言，其实是非常希望这样的：

//express风格的路由
app.get('/index', function (req, res) {
  try {
    //业务逻辑
  } catch (err) {
    logger.error(err);
    res.statusCode = 500;
    return res.json({success: false, message: '服务器异常'});
  }
});
如果try catch能够捕获所有的异常，这样我们可以在代码出现一些非预期的错误时，能够记录下错误的同时，友好的给调用者返回一个500错误。可惜，try catch无法捕获异步中的异常。所以我们能做的只能是：

app.get('/index', function (req, res) {
  // 业务逻辑  
});

process.on('uncaughtException', function (err) {
  logger.error(err);
});
这个时候，虽然我们可以记录下这个错误的日志，且进程也不会异常退出，但是我们是没有办法对发现错误的请求友好返回的，只能够让它超时返回。

domain
在node v0.8+版本的时候，发布了一个模块domain。这个模块做的就是try catch所无法做到的：捕捉异步回调中出现的异常。
于是乎，我们上面那个无奈的例子好像有了解决的方案：

var domain = require('domain');

//引入一个domain的中间件，将每一个请求都包裹在一个独立的domain中
//domain来处理异常
app.use(function (req,res, next) {
  var d = domain.create();
  //监听domain的错误事件
  d.on('error', function (err) {
    logger.error(err);
    res.statusCode = 500;
    res.json({sucess:false, messag: '服务器异常'});
    d.dispose();
  });

  d.add(req);
  d.add(res);
  d.run(next);
});

app.get('/index', function (req, res) {
  //处理业务
});
我们通过中间件的形式，引入domain来处理异步中的异常。当然，domain虽然捕捉到了异常，但是还是由于异常而导致的堆栈丢失会导致内存泄漏，所以出现这种情况的时候还是需要重启这个进程的，有兴趣的同学可以去看看domain-middleware这个domain中间件。

诡异的失效
我们的测试一切正常，当正式在生产环境中使用的时候，发现domain突然失效了！它竟然没有捕获到异步中的异常，最终导致进程异常退出。经过一番排查，最后发现是由于引入了redis来存放session导致的。

var http = require('http');
var connect = require('connect');
var RedisStore = require('connect-redis')(connect);
var domainMiddleware = require('domain-middleware');

var server = http.createServer();
var app = connect();
app.use(connect.session({
  key: 'key',
  secret: 'secret',
  store: new RedisStore(6379, 'localhost')
}));
//domainMiddleware的使用可以看前面的链接
app.use(domainMiddleware({
  server: server,
  killTimeout: 30000
}));
此时，当我们的业务逻辑代码中出现了异常，发现竟然没有被domain捕获！经过一番尝试，终于将问题定位到了：

var domain = require('domain');
var redis = require('redis');
var cache = redis.createClient(6379, 'localhost');

function error() {
  cache.get('a', function () {
    throw new Error('something wrong');
  });
}

function ok () {
  setTimeout(function () {
    throw new Error('something wrong');
  }, 100);
}
var d = domain.create();
d.on('error', function (err) {
  console.log(err);
});

d.run(ok);    //domain捕获到异常
d.run(error); //异常被抛出
奇怪了！都是异步调用，为什么前者被捕获，后者却没办法捕获到呢？

Domain剖析
回过头来，我们来看看domain做了些什么来让我们捕获异步的请求(代码来自node v0.10.4，此部分可能正在快速变更优化)。如果对domain还不甚了解的同学可以先简单过一下domain的文档。

node事件循环机制
在看Domain的原理之前，我们先要了解一下nextTick和_tickCallback的两个方法。

function laterCallback() {
  console.log('print me later');
}

process.nextTick(laterCallback);
console.log('print me first');
上面这段代码写过node的人都很熟悉，nextTick的作用就是把laterCallback放到下一个事件循环去执行。而_tickCallback方法则是一个非公开的方法，这个方法是在当前时间循环结束之后，调用之以继续进行下一个事件循环的入口函数。

换而言之，node为事件循环维持了一个队列，nextTick入队，_tickCallback出列。

domain的实现
在了解了node的事件循环机制之后，我们再来看看domain做了些什么。
domain自身其实是一个EventEmitter对象，它通过事件的方式来传递捕获的错误。这样我们在研究它的时候，就简化到两个点：

什么时候触发domain的error事件：

进程抛出了异常，没有被任何的try catch捕获到，这时候将会触发整个process的processFatal，此时如果在domain包裹之中，将会在domain上触发error事件，反之，将会在process上触发uncaughtException事件。
domain如何在多个不同的事件循环中传递：

当domain被实例化之后，我们通常会调用它的run方法（如之前在web服务中的使用），来将某个函数在这个domain示例的包裹中执行。被包裹的函数在执行的时候，process.domain这个全局变量将会被指向这个domain实例。当这个事件循环中，抛出异常调用processFatal的时候，发现process.domain存在，就会在domain上触发error事件。
在require引入domain模块之后，会重写全局的nextTick和_tickCallback,注入一些domain相关的代码：
//简化后的domain传递部分代码
function nextDomainTick(callback) {
  nextTickQueue.push({callback: callback, domain: process.domain});
}

function _tickDomainCallback() {
  var tock = nextTickQueue.pop();
  //设置process.domain = tock.domain
  tock.domain && tock.domain.enter();
  callback();
  //清除process.domain
  tock.domain && tock.domain.exit();        
  }
};
这个是其在多个事件循环中传递domain的关键：nextTick入队的时候，记录下当前的domain，当这个被加入队列中的事件循环被_tickCallback启动执行的时候，将新的事件循环的process.domain置为之前记录的domain。这样，在被domain所包裹的代码中，不管如何调用process.nextTick, domain将会一直被传递下去。
3. 当然，node的异步还有两种情况，一种是event形式。因此在EventEmitter的构造函数有如下代码：

    if (exports.usingDomains) {
      // if there is an active domain, then attach to it.
      domain = domain || require('domain');
      if (domain.active && !(this instanceof domain.Domain)) {
        this.domain = domain.active;
      }
    }
实例化EventEmitter的时候，将会把这个对象和当前的domain绑定，当通过emit触发这个对象上的事件时，像_tickCallback执行的时候一样，回调函数将会重新被当前的domain包裹住。
4. 而另一种情况，是setTimeout和setInterval，同样的，在timer的源码中，我们也可以发现这样的一句代码:

   if (process.domain) timer.domain = process.domain;
跟EventEmmiter一样，之后这些timer的回调函数也将被当前的domain包裹住了。

node通过在nextTick, timer, event三个关键的地方插入domain的代码，让它们得以在不同的事件循环中传递。

更复杂的domain
有些情况下，我们可能会遇到需要更加复杂的domain使用。

domain嵌套：我们可能会外层有domain的情况下，内层还有其他的domain，使用情景可以在文档中找到
// create a top-level domain for the server
var serverDomain = domain.create();

serverDomain.run(function() {
  // server is created in the scope of serverDomain
  http.createServer(function(req, res) {
    // req and res are also created in the scope of serverDomain
    // however, we'd prefer to have a separate domain for each request.
    // create it first thing, and add req and res to it.
    var reqd = domain.create();
    reqd.add(req);
    reqd.add(res);
    reqd.on('error', function(er) {
      console.error('Error', er, req.url);
      try {
        res.writeHead(500);
        res.end('Error occurred, sorry.');
      } catch (er) {
        console.error('Error sending 500', er, req.url);
      }
    });
  }).listen(1337);
});
为了实现这个功能，其实domain还会偷偷的自己维持一个domain的stack，有兴趣的童鞋可以在这里看到。

回头解决疑惑
回过头来，我们再来看刚才遇到的问题：为什么两个看上去都是同样的异步调用，却有一个domain无法捕获到异常？理解了原理之后不难想到，肯定是调用了redis的那个异步调用在抛出错误的这个事件循环内，是不在domain的范围之内的。我们通过一段更加简短的代码来看看，到底在哪里出的问题。

var domain = require('domain');
var EventEmitter = require('events').EventEmitter;

var e = new EventEmitter();

var timer = setTimeout(function () {
  e.emit('data');  
}, 10);

function next() {
  e.once('data', function () {
    throw new Error('something wrong here');
  });
}

var d = domain.create();
d.on('error', function () {
  console.log('cache by domain');
});

d.run(next);
此时我们同样发现，错误不会被domain捕捉到，原因很清晰了：timer和e两个关键的对象在初始化的时候都时没有在domain的范围之内，因此，当在next函数中监听的事件被触发，执行抛出异常的回调函数时，其实根本就没有处于domain的包裹中，当然就不会被domain捕获到异常了！

其实node针对这种情况，专门设计了一个API：domain.add。它可以将domain之外的timer和event对象，添加到当前domain中去。对于上面那个例子：

d.add(timer);
//or
d.add(e);
将timer或者e任意一个对象添加到domain上，就可以让错误被domain捕获了。

再来看最开始redis导致domain无法捕捉到异常的问题。我们是不是也有办法可以解决呢？
看@python发烧友 的这条微博我们就能理解，其实对于这种情况，还是没有办法实现最佳的解决方案的。现在对于非预期的异常产生的时候，我们只能够让当前请求超时，然后让这个进程停止服务，之后重新启动。graceful模块配合cluster就可以实现这个解决方案。

domain十分强大，但不是万能的。希望在看过这篇文章之后，大家能够正确的使用domian，避免踩坑。:)

题外推荐
在整个问题排查与代码研究过程中，有一个工具起了巨大的作用：node-inspector，它可以让node代码在chrome下进行单步调试，能够跟进到node源码之中，@goddyzhao的文章使用node-inspector来调试node详细介绍了如何使用node-inspector。