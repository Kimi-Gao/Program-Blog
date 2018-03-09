> https://github.com/muwenzi/Program-Blog/issues/3

> **”**任何足够先进的技术都和魔法无异**“**
> 
> ​——[Arthur C. Clarke](https://zh.wikipedia.org/wiki/%E4%BA%9E%E7%91%9F%C2%B7%E6%9F%A5%E7%90%86%E6%96%AF%C2%B7%E5%85%8B%E6%8B%89%E5%85%8B)

 Javascript 最简单的 async 函数是 setTimeout，俗称`定时器`，写JS代码必定会打交道的一个函数。接触的越多久会感到它越神奇，也越发苦恼，殊不知简单之中隐含着怎样的黑魔法。曾经天真的以为它就是JS实现多线程的工具，但实际的效果往往不是自己所想的那样。这也激发了我撕下它的面纱一探究竟的兴趣。

先看它的官方的定义：

> setTimeout() 方法用于在指定的毫秒数后调用函数或计算表达式。

看到这样一个说明，我们明白了它就是一个定时器，我们设定的函数就是一个”闹钟”，时间到了它就会去执行。然而聪明的你不禁有这样一个疑问，如果是setTimeout(fn,0)呢？按照定义的说明，它是否会立马执行？实践是检验真理的唯一标准，让我们来看看example1：

example1

``` javascript
setTimeout(function() {
    console.log(1);
}, 0); 
console.log(2); 
```

> 期望的结果：1->2
> 实际的结果：2->1

这说明了setTimeout(0)并不是立即执行，同时让我们对setTimeout的行为感到很诡异。
## JS引擎是单线程执行的

我们先把上面的问题放一放，首先来明确一下我们对JS语言的理解。

JS语言设计的一个很重要的点是：**JS是没有多线程的，JS引擎的执行是单线程执行**。这个特性使得demo1的结果变得十分的“诡异”，既然JS是单线程的，那么是谁来为定时器计时的？这个盲区在于`我们将JS等同于浏览器本身`。我们习惯了在浏览器里面执行代码，却忽略了浏览器本身的JS引擎是单线程的，可是浏览器却可以是多线程的。**JS引擎只是浏览器的一个线程而已**。定时器计时、网络请求、浏览器渲染等等都是由`不同的线程去`完成的。

下面用一张图去解释一下这些行为的过程：
![image](https://cloud.githubusercontent.com/assets/12554487/18198677/a0ca12c2-712f-11e6-84b6-4d91a0f42703.png)

JS引擎的确是单线程执行，它是基于`事件驱动`的语言。它的执行顺序是遵循一个叫做`事件队列`的机制。从图中我们可以看出，浏览器有各种各样的线程，比如`事件触发器`、`网络请求`、`定时器`等等。线程的联系都是基于**事件**的。JS引擎处理到与其他线程相关的代码，就会分发给其他线程，他们处理完之后，**需要JS引擎计算时就是在事件队列里面添加一个任务**。这个过程中，JS并不会阻塞代码等待其他线程执行完毕，而且其他线程执行完毕后添加事件任务告诉JS引擎执行相关操作。这就是JS的`异步编程模型`。

如此我们再回过头来看setTimeout(0)就会恍然大悟。JS代码执行到这里时，会立即开启一个定时器线程，然后继续执行**下面的代码**。同时定时器线程会在指定时间（这里是0ms）后往事件队列里面插入一个任务。由此可知setTimeout(0)里面的操作会放在所有主线程任务之后。这也就解释了为什么example1的实际结果是2->1 。

example2

``` javascript
setTimeout(function(){
    console.log('callback');
}, 1000);

while(true){
    var a = 1 * 2;
}
```

程序会先跑到 setTimeout，系统会设定在 1 秒之后把 function 要做的事放到 event queue，继续往下跑到while，一直算一些东西，等了一秒 function 被塞到 event queue。这时候因为一直有事情要做，所以虽然console.log('callback')已经被放到 event queue，但永远不会执行，因为程序要在做完主要的事情才会开始跑 event queue。

由此可见官方对于settimeout的定义是有迷惑性的。应该给一个新的定义：

> 执行到 setTimeout，系统会设定在毫秒之后把 function 要做的事放到 event queue (事件队列)，然后就继续执行后面代码，等待js引擎空闲后再执行event queue。

## PS1：JS异步单线程特性和事件循环

JS语言有一个很大的特点就是：**单线程**。单线程就是同一时间只能做一件事情，为什么这样设定，在此不作讨论。单线程就意味着，所有任务都是排队执行，如果某一个任务耗时很长，后面就不得不等。IO操作（包括Ajax读取数据）比较耗时，其间就造成了CPU的空闲和浪费。所以JS语言设计的时候考虑到这一点，就使得主线程完全不管IO操作，将需要等待的任务塞到**任务队列（Task Queue）**中，先运行后面不耗时的任务。因而所有的任务就被分为了两种：同步任务（正常的JS单线程任务，排队执行，在主线程中执行）、异步任务（IO操作等，将其从主线程移到任务队列中），待主线程的任务执行完成后再执行任务队列的任务。

这里就会涉及到**事件循环（Event Loop）**的概念，先上一张图（转引自Philip Roberts的演讲[《Help, I'm stuck in an event-loop》](http://vimeo.com/96425312)）。

![image](https://cloud.githubusercontent.com/assets/12554487/18198691/b37fce02-712f-11e6-9099-9b0d6dbb4bcd.png)

上图中，主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。（**执行栈的问题我也不是太清楚，有待进一步学习**）
## PS2：JS引擎和GUI引擎是互斥的

GUI渲染引擎在JS中渲染操作也是异步的。比如DOM操作的代码会在事件队列中生成一个任务，JS执行到这个任务时就会去调用GUI引擎渲染。JS语言设定JS引擎与GUI引擎是互斥的，也就是说GUI引擎在渲染时会阻塞JS引擎计算。原因很简单，如果在GUI渲染的时候，JS改变了DOM，那么就会造成渲染不同步。

// TODO
[谈谈setTimeout的作用域以及this的指向问题](http://www.cnblogs.com/hutaoer/p/3423782.html)
### 参考文章

[1. setTimeout 的黑魔法 by李三思](http://www.cnblogs.com/fly-snow/p/5427865.html)
[2. 你会用setTimeout吗 by唐光尧](http://tangguangyao.github.io/2015/11/10/%E4%BD%A0%E4%BC%9A%E7%94%A8setTimeout%E5%90%97/)
[3. JavaScript 运行机制详解：再谈Event Loop by阮一峰](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
[4. 理解 Node.js 事件驱动 by盧承億](http://mp.weixin.qq.com/s?__biz=MzA5NTM2MTEzNw==&mid=2736710726&idx=2&sn=9b72bc9113b8fc480be5156f6551c35f&chksm=b6aac55881dd4c4e450860ab21d238804a054f60a865c130348fca65997d7de65a916f7875f9&scene=0#rd)
