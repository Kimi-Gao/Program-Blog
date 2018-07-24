<!-- TOC -->

- [1. 纯函数基础概念](#1-纯函数基础概念)
  - [1.1. 纯函数 (Purity)](#11-纯函数-purity)
  - [1.2. 副作用 (Side effects)](#12-副作用-side-effects)
  - [1.3. 引用透明性 (Referential Transparency)](#13-引用透明性-referential-transparency)
  - [1.4. 幂等性 (Idempotent)](#14-幂等性-idempotent)
- [2. 追求“纯”的理由](#2-追求纯的理由)
  - [2.1. 可缓存性（Cacheable）](#21-可缓存性cacheable)
  - [2.2. 可移植性／自文档化（Portable / Self-Documenting）](#22-可移植性／自文档化portable--self-documenting)
  - [2.3. 可测试性（Testable）](#23-可测试性testable)
  - [2.4. 合理性（Reasonable）](#24-合理性reasonable)
  - [2.5. 并行代码](#25-并行代码)
- [3. 纯函数的应用](#3-纯函数的应用)
  - [3.1. Reducer](#31-reducer)
- [4. 参考资料](#4-参考资料)

<!-- /TOC -->

# 1. 纯函数基础概念

## 1.1. 纯函数 (Purity)

> 纯函数是这样一种函数，即输出仅由输入决定，且不产生副作用。

```js
const greet = name => `hello, ${name}`;

greet("world");
```

以下代码不是纯函数：

```js
window.name = "Brianne";

const greet = () => `Hi, ${window.name}`;

greet(); // "Hi, Brianne"
```

以上示例中，函数依赖外部状态。

```js
let greeting;

const greet = name => {
  greeting = `Hi, ${name}`;
};

greet("Brianne");
greeting; // "Hi, Brianne"
```

以上实例中，函数修改了外部状态。

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/purity.js)

## 1.2. 副作用 (Side effects)

如果函数与外部可变状态进行交互，则它是有副作用的。

```js
const differentEveryTime = new Date();
```

```js
console.log("IO is a side effect!");
```

让我们来仔细研究一下“副作用”以便加深理解。那么，我们在纯函数定义中提到的万分邪恶的副作用到底是什么？“作用”我们可以理解为一切除结果计算之外发生的事情。

“作用”本身并没什么坏处，而且在本书后面的章节你随处可见它的身影。“副作用”的关键部分在于“副”。就像一潭死水中的“水”本身并不是幼虫的培养器，“死”才是生成虫群的原因。同理，副作用中的“副”是滋生 bug 的温床。

> 副作用是在计算结果的过程中，系统状态的一种变化，或者与外部世界进行的可观察的交互。

副作用可能包含，但不限于：

- 更改文件系统
- 往数据库插入记录
- 发送一个 http 请求
- 可变数据
- 打印/log
- 获取用户输入
- DOM 查询
- 访问系统状态

这个列表还可以继续写下去。概括来讲，只要是跟函数外部环境发生的交互就都是副作用——这一点可能会让你怀疑无副作用编程的可行性。

> 函数式编程的哲学就是假定副作用是造成不正当行为的主要原因。

这并不是说，要禁止使用一切副作用，而是说，要让它们在 **可控的范围** 内发生。后面讲到 functor 和 monad 的时候我们会学习如何控制它们，目前还是尽量远离这些阴险的函数为好。

副作用让一个函数变得不纯是有道理的：从定义上来说，纯函数必须要能够根据相同的输入返回相同的输出；如果函数需要跟外部事物打交道，那么就无法保证这一点了。

我们来仔细了解下为何要坚持这种「相同输入得到相同输出」原则。注意，我们要复习一些八年级数学知识了。

## 1.3. 引用透明性 (Referential Transparency)

一个表达式能够被它的执行所得的结果替代而不改变程序的行为则称为引用透明。

```js
const greet = () => "hello, world.";
```

其实常量也是引用透明性的，下面将会讲到。

## 1.4. 幂等性 (Idempotent)

如果一个函数执行多次皆返回相同的结果，则它是幂等性的。

```js
f(f(x)) ≍ f(x)
```

```js
Math.abs(Math.abs(10));
```

```js
sort(sort(sort([2, 1])));
```

戏剧性的是：纯函数就是数学上的函数，而且是函数式编程的全部。使用这些纯函数编程能够带来大量的好处，让我们来看一下为何要不遗余力地保留函数的纯粹性的原因。

# 2. 追求“纯”的理由

## 2.1. 可缓存性（Cacheable）

首先，纯函数总能够根据输入来做缓存。实现缓存的一种典型方式是 memoize 技术：

```js
var squareNumber  = memoize(function(x){ return x*x; });

squareNumber(4);
//=> 16

squareNumber(4); // 从缓存中读取输入值为 4 的结果
//=> 16

squareNumber(5);
//=> 25

squareNumber(5); // 从缓存中读取输入值为 5 的结果
//=> 25
```

下面的代码是一个简单的实现，尽管它不太健壮。

```js
var memoize = function(f) {
  var cache = {};

  return function() {
    var arg_str = JSON.stringify(arguments);
    cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
    return cache[arg_str];
  };
};
```

值得注意的一点是，可以通过延迟执行的方式把不纯的函数转换为纯函数：

```js
var pureHttpCall = memoize(function(url, params){
  return function() { return $.getJSON(url, params); }
});
```

这里有趣的地方在于我们并没有真正发送 http 请求——只是返回了一个函数，当调用它的时候才会发请求。这个函数之所以有资格成为纯函数，是因为它总是会根据相同的输入返回相同的输出：给定了 `url` 和 `params` 之后，它就只会返回同一个发送 http 请求的函数。

我们的 memoize 函数工作起来没有任何问题，虽然它缓存的并不是 http 请求所返回的结果，而是生成的函数。

现在来看这种方式意义不大，不过很快我们就会学习一些技巧来发掘它的用处。重点是我们可以缓存任意一个函数，不管它们看起来多么具有破坏性。

## 2.2. 可移植性／自文档化（Portable / Self-Documenting）

纯函数是完全自给自足的，它需要的所有东西都能轻易获得。仔细思考思考这一点...这种自给自足的好处是什么呢？首先，纯函数的依赖很明确，因此更易于观察和理解——没有偷偷摸摸的小动作。

```js
// 不纯的
var signUp = function(attrs) {
  var user = saveUser(attrs);
  welcomeUser(user);
};

var saveUser = function(attrs) {
    var user = Db.save(attrs);
    ...
};

var welcomeUser = function(user) {
    Email(user, ...);
    ...
};

// 纯的
var signUp = function(Db, Email, attrs) {
  return function() {
    var user = saveUser(Db, attrs);
    welcomeUser(Email, user);
  };
};

var saveUser = function(Db, attrs) {
    ...
};

var welcomeUser = function(Email, user) {
    ...
};
```

这个例子表明，纯函数对于其依赖必须要诚实，这样我们就能知道它的目的。仅从纯函数版本的 `signUp` 的签名就可以看出，它将要用到 `Db`、`Email` 和 `attrs`，这在最小程度上给了我们足够多的信息。

后面我们会学习如何不通过这种仅仅是延迟执行的方式来让一个函数变纯，不过这里的重点应该很清楚，那就是相比不纯的函数，纯函数能够提供多得多的信息；前者天知道它们暗地里都干了些什么。

其次，通过强迫“注入”依赖，或者把它们当作参数传递，我们的应用也更加灵活；因为数据库或者邮件客户端等等都参数化了（别担心，我们有办法让这种方式不那么单调乏味）。如果要使用另一个 `Db`，只需把它传给函数就行了。如果想在一个新应用中使用这个可靠的函数，尽管把新的 `Db` 和 `Email` 传递过去就好了，非常简单。

在 JavaScript 的设定中，可移植性可以意味着把函数序列化（serializing）并通过 socket 发送。也可以意味着代码能够在 web workers 中运行。总之，可移植性是一个非常强大的特性。

命令式编程中“典型”的方法和过程都深深地根植于它们所在的环境中，通过状态、依赖和有效作用（available effects）达成；纯函数与此相反，它与环境无关，只要我们愿意，可以在任何地方运行它。

你上一次把某个类方法拷贝到新的应用中是什么时候？我最喜欢的名言之一是 Erlang 语言的作者 Joe Armstrong 说的这句话：

> 面向对象语言的问题是，它们永远都要随身携带那些隐式的环境。你只需要一个香蕉，但却得到一个拿着香蕉的大猩猩...以及整个丛林。
>
> Joe Armstrong

## 2.3. 可测试性（Testable）

第三点，纯函数让测试更加容易。我们不需要伪造一个“真实的”支付网关，或者每一次测试之前都要配置、之后都要断言状态（assert the state）。只需简单地给函数一个输入，然后断言输出就好了。

事实上，我们发现函数式编程的社区正在开创一些新的测试工具，能够帮助我们自动生成输入并断言输出。这超出了本书范围，但是我强烈推荐你去试试 Quickcheck——一个为函数式环境量身定制的测试工具。

## 2.4. 合理性（Reasonable）

很多人相信使用纯函数最大的好处是引用透明性（referential transparency）。如果一段代码可以替换成它执行所得的结果，而且是在不改变整个程序行为的前提下替换的，那么我们就说这段代码是引用透明的。

由于纯函数总是能够根据相同的输入返回相同的输出，所以它们就能够保证总是返回同一个结果，这也就保证了引用透明性。我们来看一个例子。

```js
var Immutable = require('immutable');

var decrementHP = function(player) {
  return player.set("hp", player.hp-1);
};

var isSameTeam = function(player1, player2) {
  return player1.team === player2.team;
};

var punch = function(player, target) {
  if(isSameTeam(player, target)) {
    return target;
  } else {
    return decrementHP(target);
  }
};

var jobe = Immutable.Map({name:"Jobe", hp:20, team: "red"});
var michael = Immutable.Map({name:"Michael", hp:20, team: "green"});

punch(jobe, michael);
//=> Immutable.Map({name:"Michael", hp:19, team: "green"})
```

`decrementHP`、`isSameTeam` 和 `punch` 都是纯函数，所以是引用透明的。我们可以使用一种叫做“等式推导”（equational reasoning）的技术来分析代码。所谓“等式推导”就是“一对一”替换，有点像在不考虑程序性执行的怪异行为（quirks of programmatic evaluation）的情况下，手动执行相关代码。我们借助引用透明性来剖析一下这段代码。

首先内联 isSameTeam 函数：

```js
var punch = function(player, target) {
  if(player.team === target.team) {
    return target;
  } else {
    return decrementHP(target);
  }
};
```

因为是不可变数据，我们可以直接把 team 替换为实际值：

```js
var punch = function(player, target) {
  if("red" === "green") {
    return target;
  } else {
    return decrementHP(target);
  }
};
```

if 语句执行结果为 false，所以可以把整个 if 语句都删掉：

```js
var punch = function(player, target) {
  return decrementHP(target);
};
```

如果再内联 decrementHP，我们会发现这种情况下，punch 变成了一个让 hp 的值减 1 的调用：

```js
var punch = function(player, target) {
  return target.set("hp", target.hp-1);
};
```

总之，等式推导带来的分析代码的能力对重构和理解代码非常重要。事实上，我们重构海鸥程序使用的正是这项技术：利用加和乘的特性。对这些技术的使用将会贯穿本书，真的。

## 2.5. 并行代码

最后一点，也是决定性的一点：我们可以并行运行任意纯函数。因为纯函数根本不需要访问共享的内存，而且根据其定义，纯函数也不会因副作用而进入竞争态（race condition）。

并行代码在服务端 js 环境以及使用了 web worker 的浏览器那里是非常容易实现的，因为它们使用了线程（thread）。不过出于对非纯函数复杂度的考虑，当前主流观点还是避免使用这种并行。

# 3. 纯函数的应用

## 3.1. Reducer

Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。
纯函数是函数式编程的概念，必须遵守以下一些约束。

- 不得改写参数
- 不能调用系统 I/O 的 API
- 不能调用`Date.now()`或者`Math.random()`等不纯的方法，因为每次会得到不一样的结果

由于 Reducer 是纯函数，就可以保证同样的 State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法。

```javascript
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
```

最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。

# 4. 参考资料

1. [简单点，理解函数式编程](<https://mp.weixin.qq.com/s?__biz=MzI5MjEzNzA1MA==&mid=2650264291&idx=1&sn=02dcff8719b7a285d8e94a63a45473d0&chksm=f40683d6c3710ac0dba9a5b416cb9dfc14546ebb6771dd406c5191ed520cc8babd2c3b94c0bd&key=1ec2040cbb2ee42f36ba042b09fa916202a6e38dce54af4ff2aa186ca5258e83dc0a38f5cfd5c8f7a86481e5aee8b393acc822f22b9df8b535690524041019f399e22d42170f9343490608da71d808a8&ascene=0&uin=MjYzMTM3MDAyMA%3D%3D&devicetype=iMac+MacBookPro11%2C5+OSX+OSX+10.12.1+build(16B2555)&version=12010210&nettype=WIFI&fontScale=100&pass_ticket=C5ii2XXBIPXGmlqXGL4HuqbBQspacoIHyGyp9W4ouSIHHb14KDO%2Be0uK5x2ONJH%2B>)
1. [JavaScript 中的“纯函数”](http://web.jobbole.com/86136/)
1. [JS 函数式编程指南 第 3 章：纯函数的好处](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch3.html)
1. [高阶函数对系统的“提纯”](https://75team.com/post/higher-order-function-play-with-pure-function.html)
1. [Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
