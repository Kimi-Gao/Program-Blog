> 事情如果有变坏的可能，不管这种可能性有多小，它总会发生。 —— 墨菲定律（Murphy's Law）

<h1> 目录 </h1>

<!-- TOC -->

- [1. 理论知识](#1-理论知识)
  - [1.1. Error 实例对象](#11-error-实例对象)
  - [1.2. 错误类型](#12-错误类型)
    - [1.2.1. RangeError](#121-rangeerror)
    - [1.2.2. ReferenceError](#122-referenceerror)
    - [1.2.3. SyntaxError](#123-syntaxerror)
    - [1.2.4. TypeError](#124-typeerror)
    - [1.2.5. URIError](#125-urierror)
    - [1.2.6. EvalError](#126-evalerror)
- [2. 错误处理](#2-错误处理)
  - [2.1. 捕获错误](#21-捕获错误)
    - [2.1.1. 捕获同步代码的错误](#211-捕获同步代码的错误)
    - [2.1.2. 捕获异步代码的错误](#212-捕获异步代码的错误)
    - [2.1.3. 用事件捕获错误](#213-用事件捕获错误)
  - [2.2. 抛出错误](#22-抛出错误)
  - [2.3. 错误等级](#23-错误等级)
  - [2.4. 记录错误](#24-记录错误)
    - [2.4.1. window 事件监听](#241-window-事件监听)
    - [2.4.2. new Image()](#242-new-image)
- [3. 小结](#3-小结)
- [4. 参考资料](#4-参考资料)

<!-- /TOC -->

# 1. 理论知识

错误处理在软件开发中应给予相当的重视，也是一个产品的健壮性和容错性的重要组成部分。

## 1.1. Error 实例对象

JS 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。JS 原生提供 Error 构造函数，所有抛出的错误都是这个构造函数的实例。

```js
let err = new Error("错误提示信息");
err.message; // "错误提示信息"
err.name; // "Error"
```

Error 实例对象包含的属性：

> - **message**: 人类可阅读的错误提示信息，默认空字符串
> - **name**：错误名称，默认"Error"
> - **stack**：错误的堆栈（非标准属性，Chrome/Mozilla 有，Microsoft 没有）

详情请参考：[MDN web docs: JavaScript/Error.prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/prototype)

## 1.2. 错误类型

Error 实例对象是最一般的错误类型，执行代码期间可能会发生的错误有多种类型。每种错误都有对应的错误类型，而当错误发生时，就会抛出相应类型的错误对象。在它的基础上，[ECMA-262 2018 - 19.5.5 Native Error Types Used in This Standard](https://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf) 定义了下列 **6** 种原生错误类型：

> 1.  RangeError
> 1.  ReferenceError
> 1.  SyntaxError
> 1.  TypeError
> 1.  URIError
> 1.  EvalError

### 1.2.1. RangeError

错误在数值超出相应范围时触发：

```js
try {
  let items1 = new Array(-20);
  let items2 = new Array(Number.MAX_VALUE);
} catch (e) {
  console.error(e); // RangeError: Invalid array length
}
```

### 1.2.2. ReferenceError

通常访问不存在的变量产生这种错误。

```js
let box = a; // ReferenceError: a is not defined
```

当尝试给一个不能被赋值的变量赋值时将发生该错误。看下面的典型例子：

```js
if(doSomething() = 'somevalue') // ReferenceError: left-hand side in assignment
```

在上面例子中，开发人员不小心将 `==` 写成了 `=`，错误消息“left-hand side in assignment”指等号左边包含不能被赋值的变量。

### 1.2.3. SyntaxError

通常是语法错误导致的。

```js
a $ b; // SyntaxError: missing ; before statement
```

### 1.2.4. TypeError

在 JS 中会经常用到，在变量中保存着意外的类型时，或者在访问不存在的方法时，都会导致这种错误。

例如尝试将一个值（value）当作函数使用，但该值并不是一个函数：

```js
let foo = undefined;
foo();
```

这个错误很常见，当调用对象中的一个方法，但写错了方法名：

```js
let x = document.getElementById("foo");
```

访问对象中不存在的属性时将返回 `undefined`，上面代码就将出现该错误。

### 1.2.5. URIError

在使用 `encodeURI()` 或 `decodeURI()` ，而 URI 格式不正确时，就会导致 URIError 错误。但这两个函数的容错性非常高，所以这种错误很少见。

### 1.2.6. EvalError

全局函数 `eval()` 的使用方式与定义的不同时抛出，但主流 JS 规范都会禁用 `eval`，实际上碰到的可能性不大。

另外，ES 2018 最新版的文档里面说目前已经不用了，保留该类型错误只是为了兼容。

# 2. 错误处理

## 2.1. 捕获错误

### 2.1.1. 捕获同步代码的错误

ECMA262 第 3 版引入了 try-catch 语句，使用 try-catch 最适合处理那些我们无法控制的错误。假设你在使用某个 npm 包中的函数，该函数可能会有意无意地抛出一些错误。由于我们不能修改这个库的源代码，所以大可将对该函数的调用放在 try-catch 语句当中。另外 try-catch 性能并不是很好，在后来的 JS 发展当中逐步得到了改善，详情请看这篇文章：[新 V8 为 NODE.JS 带来的性能变化](https://juejin.im/entry/59b63a68f265da06624e2e63)。

```js
try {
  // 可能会导致错误的代码
} catch (e) {
  // 在错误发生时怎么处理
} finally {
  // 总是会被执行
}
```

在 e 对象（即上文所说的 `Error 实例对象`）包含两个属性：`message` 和 `name`。

finally 的作用一般是为了防止出现异常后，无法往下再执行的备用。也就是说，如果有一些清理操作，那么出现异常后，就执行不到清理操作，那么可以把这些清理操作放到 finally 里即可。finally 语句作为 try-catch 的 **可选** 语句，不管是否发生异常处理，都会执行。

当然你也可以使用 try-finally，不进行 catch，那么将会进入包裹它的 try 语句的 catch 子句（如果有外层 try-catch 的话），但这样使用很少。

> :warning: 不管 try 或是 catch 里包含 return 语句，也不会阻止 finally 执行。

理想情况下可以利用不同错误类型，可以获悉更多有关异常的信息，从而有助于对错误作出恰当的处理。当然实际中的代码很少这样写，你也可以把错误的处理统一包装成函数或者库。

```js
try {
  // ......
} catch (e) {
  if (e instanceof TypeError) {
    // 处理类型错误
  }
  if (e instanceof ReferenceError) {
    // 处理引用错误
  }
  // ......
}
```

在跨浏览器编程中，检查错误类型是确定处理方式的最简便途径，且包含在 message 属性中的错误消息会因浏览器而异。

### 2.1.2. 捕获异步代码的错误

在异步代码中，try-catch 可以和 ES2018 的 `await/async` 搭配使用：

```js
const makeRequest = async () => {
  try {
    // this parse may fail
    const data = JSON.parse(await getJSON());
    console.log(data);
  } catch (e) {
    console.err(e);
  }
};
```

> :warning: 注意: `JSON.parse(undefined)` 会报错，`JSON.parse(null) -> null`

还有一种是 ES2015 的 `Promise` 语法：

```js
promise
  .then(result => {···})
  .catch(error => {···})
  .finally(() => {···});
```

注意点：

- `Promise.prototype.catch` 方法是 `.then(null, rejection)` 的别名，用于指定发生错误时的回调函数。
- catch 方法返回的还是一个 Promise 对象，因此后面还可以接着调用 then 方法。

跟传统的 try-catch 不同的是，如果没有使用 catch 方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应。这就是说，Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是 **“Promise 会吃掉错误”**。不过，Node 有一个 `unhandledRejection` 事件，专门监听未捕获的 reject 错误

> (node:10856) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): SyntaxError: Unexpected token e in JSON at position 1

也可以在监听函数里面抛出错误：

```js
process.on("unhandledRejection", function(err, p) {
  throw err;
});
```

上面代码中，`unhandledRejection` 事件的监听函数有两个参数，第一个是错误对象，第二个是报错的 Promise 实例，它可以用来了解发生错误的环境信息。

:warning: Node 有计划在未来废除 `unhandledRejection` 事件。如果 Promise 内部有未捕获的错误，会直接终止进程，并且进程的退出码不为 0（0 即表示执行成功）。

> (node:10856) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.

### 2.1.3. 用事件捕获错误

使用 `window.onerror` 事件处理程序，这种方式可以接受 try-catch 不能处理的所有错误。

```js
window.onerror = function(message, sourceUrl, lineno, colno, error) {
  // 处理错误
};
```

详细解释请参考；[MDN web docs: Web/GlobalEventHandlers.onerror](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror)

## 2.2. 抛出错误

与 try-catch 语句相配的还有一个 throw 操作符，用于随时抛出自定义错误。

```js
throw new Error("Something bad happend");
```

上面这行代码抛出一个通用错误，带有一条自定义错误消息。也可以像下面使用其他错误类型，也可以模拟出类似的浏览器错误。

```js
throw new SyntaxError("I dont like your syntax");

throw new TypeError("What type of variable do you take me for?");

throw new RangeError("Sorry, you just dont have the range");

throw new EvalError("That doesnt evaluate.");

throw new URIError("Uri, is that you?");

throw new ReferenceError("You didnt cite your references properly");
```

try-catch 和 if-else 语言一样也可以发生嵌套，这里注意三点：

- 任何给定的异常只会被离它最近的 catch 块捕获一次。
- catch 块里的代码也可以抛出异常，将会被外面一层 catch 捕获。

```js
try {
  try {
    throw new Error("oops");
  } catch (ex) {
    console.error("inner", ex.message);
    throw ex; // 在“inner”块抛出的任何新异常将会被“outer”块所捕获
  } finally {
    console.log("finally");
  }
} catch (ex) {
  console.error("outer", ex.message);
}
```

Output:

```text
// "inner" "oops"
// "finally"
// "outer" "oops"
```

> :warning: 如果从 finally 块中返回一个值，那么这个值将会成为整个 try-catch-finally 的返回值，无论是否有 return 语句在 try 和 catch 中。这包括在 catch 块里抛出的异常。

```js
try {
  try {
    throw new Error("oops");
  } catch (ex) {
    console.error("inner", ex.message);
    throw ex;
  } finally {
    console.log("finally");
    return;
  }
} catch (ex) {
  console.error("outer", ex.message);
}
```

Output:

```text
// "inner" "oops"
// "finally"
```

## 2.3. 错误等级

任何错误处理策略中最重要的一部分，就是确定错误是否致命。对于非致命错误，可以根据下列一或多个条件来确定：

- 不影响用户的主要任务
- 只影响页面的一部分
- 可以恢复
- 重复相同操作可以消除错误

通过这些条件，将程序中出现的错误进行分级，可以简单地分成非致命和致命错误，当然也可以划分的更为详细，更有利于错误的分析。

## 2.4. 记录错误

开发 Web 应用程序中的一种常见的做法，就是根据错误的等级，集中保存错误日志，以便查找重要错误的原因。

### 2.4.1. window 事件监听

调用栈在定位问题时超级有用。好消息是，浏览器提供了这个信息。理所当然，查看错误异常中的栈属性不是标准的一部分，但是只在新的浏览器中可以使用。所以，你就可以这样来把错误日志发送给服务器了。

```js
window.addEventListener("error", function(e) {
  const stack = e.error.stack;
  let message = e.error.toString();
  if (stack) {
    message += "\n" + stack;
  }
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/log", true);
  xhr.send(message);
});
```

### 2.4.2. new Image()

要建立这样一种 JS 错误记录系统，首先需要在服务器上创建一个页面，用于处理错误数据。这个页面的作用无非就是从查询字符中取得数据，然后再将数据写入错误日志中。这个页面可能会使用如下所示的函数：

```js
function logError(sev, msg) {
  const img = new Image();
  //只要为image对象设置src属性值，即可完成请求，图片预加载也使用了image的这个特性
  img.src =
    "log.php?sev=" +
    encodeURIComponent(sev) +
    "&msg=" +
    encodeURIComponent(msg);
}
```

这个 `logError()` 函数接收两个参数：**表示严重程度的数值或字符串及错误消息**。其中使用了 Image 对象来发送请求，这样做非常灵活，主要表现如下几方面：

- 所有浏览器都支持 Image 对象，包括那些不支持 `XMLHttpRequest` 对象。
- 可以避免跨域限制。
- 在记录错误的过程中出问题的概率比较低。大多数 Ajax 通信都是由 JS 库提供的包装函数来处理的，如果库代码本身有问题，而你还在依赖该库记录错误，可想而知，错误消息是不可能得到记录的。

只要是使用 try-catch 语句，就应该把相应错误记录到日志中。来看下面的例子。

```js
for (let i = 0, len = mods.length; i < len; i++) {
  try {
    mods[i].init();
  } catch (e) {
    logError("nonfatal", "Module init failed: " + e.message);
  }
}
```

在这里，一旦模块初始化失败，就会调用 `logError()` 。第一个参数是 `nonfatal` （非致命） ，表示错误的严重程度。第二个参数是上下文信息加上真正的 JS 错误消息。记录到服务器中的错误消息应该尽可能多地带有上下文信息，以便鉴别导致错误的真正原因。

# 3. 小结

本文主要是对 JS 中常见的错误以及如何捕获和处理，作了一个简单基础的介绍，包括同步和异步代码的错误处理。另外，对任何 Web 应用程序都应该分析可能发生的错误。要进行相关的划分等级和记录，便于相关分析。

# 4. 参考资料

1.  [如何修复那些奇怪的 JavaScript 错误（作者：bubkoo）](http://bubkoo.com/2015/01/25/Strange-JavaScript-Errors-and-How-to-Fix-Them/)
1.  [前端的水平线，错误处理和调试（作者：ZhangCheng）](https://juejin.im/post/5b1637f3e51d4506d33cf262)
1.  [JavaScript 标准参考教程（alpha）：错误处理机制（作者：阮一峰）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)
1.  [MDN web docs: JavaScript/Error.prototype](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/prototype)
1.  [MDN web docs: JavaScript/try...catch](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)
1.  [MDN web docs: Web/GlobalEventHandlers.onerror](https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onerror)
1.  [ES6 Async/Await 完爆 Promise 的 6 个原因（作者：LucasHC）](https://segmentfault.com/a/1190000009070711)
1.  [ECMAScript 6 入门：Promise 对象（作者：阮一峰）](http://es6.ruanyifeng.com/#docs/promise)
