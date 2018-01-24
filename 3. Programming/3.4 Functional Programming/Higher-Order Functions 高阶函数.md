## 定义
>一个函数可以接收另一个函数作为参数，也可以返回一个函数作为返回值

## 一个最简单的高阶函数
```js
function add(x, y, f) {
    return f(x) + f(y);
}
```

当我们调用`add(-5, 6, Math.abs)`时，参数`x`，`y`和`f`分别接收`-5`，`6`和函数`Math.abs`，根据函数定义，我们可以推导计算过程为：
```js
x = -5;
y = 6;
f = Math.abs;
f(x) + f(y) ==> Math.abs(-5) + Math.abs(6) ==> 11;
return 11;
```
用代码验证一下：
```js
add(-5, 6, Math.abs); // 11
```
编写高阶函数，就是**让函数的参数能够接收别的函数**。

## JS中的高阶函数
你可能使用过高阶函数但是并没有真正意识到

>例如`Array.forEach`、`Array.map`、`setTimeout`这些都是高阶函数

我们都知道这些函数全都是接受一个函数作为参数

另外React中的`高阶组件(Higher-Order Components)`也是类似的概念
>一个高阶组件只是一个包装了另外一个 React 组件的 React 组件

**参考资料**
1. [高阶函数 by 廖雪峰](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434499355829ead974e550644e2ebd9fd8bb1b0dd721000)
1. [函数式编程术语解析](http://pinggod.com/2016/%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BC%96%E7%A8%8B%E6%9C%AF%E8%AF%AD%E8%A7%A3%E6%9E%90/)