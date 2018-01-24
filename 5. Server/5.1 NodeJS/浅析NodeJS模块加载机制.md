这里所讲的模块加载是指通过`require`方式的加载

## 1. 模块定义
上下文提供了`exports`对象用于导出当前模块的方法或者变量，并且它是唯一导出的出口。

在模块中，还存在一个`moudle`对象，它代表模块自身，而`exports`是`moudle`的属性。

在NodeJS中，一个文件就是一个模块，将方法挂载在`exports`对象上作为属性即可定义导出方式。

每个 node 进程只有一个 VM 的上下文, 不会跟浏览器相差多少, 模块机制在文档中也描述的非常清楚了:
```javascript
function require(...) {
  var module = { exports: {} };
  ((module, exports) => {
    // Your module code here. In this example, define a function.
    function some_func() {};
    exports = some_func;
    // At this point, exports is no longer a shortcut to module.exports, and
    // this module will still export an empty default object.
    module.exports = some_func;
    // At this point, the module will now export some_func, instead of the
    // default object.
  })(module, module.exports);
  return module.exports;
}
```
每个单独的 `.js` 文件并不意味着单独的上下文, 在某个 `.js` 文件中污染了全局的作用域一样能影响到其他的地方。

## 2. 模块的类型和导入过程
在NodeJS中引入模块，需要经历如下3个步骤：
```
（1）路径分析
（2）扩展名分析
（3）编译执行
```

模块主要分为两类：`核心模块`和`文件模块`
```
核心模块：Node提供的模块，已经是编译后二进制文件，部分核心模块直接加载进内存，在步骤1中优先执行，
且2、3可省略，所以它的加载速度最快

文件模块：用户编写的模块，运行时动态加载，需要1，2，3完整的过程，速度比核心模块慢
```

**优先从缓存加载**

Node引入过的模块都会进行缓存，而且缓存的是编译和执行之后的对象。无论是`核心模块`还是`文件模块`，require的方式对相同模块的二次加载都一律采用缓存优先的方式。

且`核心模块`的缓存检查优先于`文件模块`的缓存检查。

优先级：缓存加载 > 核心模块 > 路径形式文件模块 > 自定义文件模块

## 3. 路径分析

其中文件模块还包括`路径形式文件模块`（如.、..和./开头的标识符）和`自定义文件模块`（第三方npm包）。

自定义文件模块的查找最耗时也是最慢的一种，查找顺序为：

1. 当前目录下`node_modules`目录
1. 父目录下`node_modules`目录
1. 向上逐级递归直到根目录下下`node_modules`目录

类似于JS的原型链查找，文件路径越深，模块查找越耗时，这就是它慢的原因

## 4. 扩展名分析

不加扩展名的时候，会按`.js`、`.json`、`.node`的次序补足扩展名，依次尝试。

在尝试的过程中，需要调用`fs`模块同步阻塞式地判断文件是否存在。

因为node单线程特性，为了提高一定的性能问题，有两个解决方案：
```
(1) 加扩展名
(2) 同步配合缓存，可以大幅度缓解Node单线程中阻塞式调用的缺陷
```

## 5. 文件定位（路径+扩展名分析）过程小结
require有可能通过文件扩展名之后没有找到对应的文件，但会得到一个目录，Node会将此目录当做一个包处理。

Node也一定程度上遵循了CommonJS规范，过程如下：

1. Node会在当前目录下查找`package.json`文件（JSON.parse解析），查找`main`字段指定的文件
1. 第一步不成功则会一次查找`index.js`、`index.json`、`index.node`
1. 遍历下一个模块路径还是没有则抛出查找失败的异常

**参考资料**
1. 深入浅出NodeJS by 朴灵
1. [node-interview module by ElemeFE](https://github.com/ElemeFE/node-interview/blob/master/sections/module.md#%E6%A8%A1%E5%9D%97%E6%9C%BA%E5%88%B6)

**思考**
> 如果 a.js require 了 b.js, 那么在 b 中定义全局变量 t = 111 能否在 a 中直接打印出来?

> a.js 和 b.js 两个文件互相 require 是否会死循环? 双方是否能导出变量? 如何从设计上避免这种问题?

> 既然可以通过新的上下文来避免污染, 那么为什么 Node.js 不给每一个.js文件以独立的上下文来避免作用域被污染?