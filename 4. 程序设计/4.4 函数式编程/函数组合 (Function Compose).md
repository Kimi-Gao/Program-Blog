<!-- TOC -->

- [1. 函数组合 (Function Compose)](#1-函数组合-function-compose)
- [结合律 (associativity)](#结合律-associativity)
- [2. 组合性 (Composable)](#2-组合性-composable)

<!-- /TOC -->

# 1. 函数组合 (Function Compose)

接收多个函数作为参数，**从右到左**，一个函数的输入为另一个函数的输出。

组合看起来像是在饲养函数。你就是饲养员，选择两个有特点又遭你喜欢的函数，让它们结合，产下一个崭新的函数。

```js
const compose = (f, g) => a => f(g(a)); // 定义
const floorAndToString = compose(
  val => val.toString(),
  Math.floor
); // 使用
floorAndToString(12.12); // '12'
```

```js
// redux compose 源码
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

const r1 = compose(
  x => 3 * x,
  Number,
  val => val.toString(),
  Math.floor
);
console.log(r1(12.22)); // 36
```

# 结合律 (associativity)

```js
const associative = compose(f, compose(g, h)) === compose(compose(f, g), h); // true
```

结合律的一大好处是任何一个函数分组都可以被拆开来，然后再以它们自己的组合方式打包在一起：

```js

```

# 2. 组合性 (Composable)

```js
object.map(compose(f, g)) ≍ object.map(g).map(f)  // f, g 为任意函数
```

在 javascript 中一个常见的函子是 Array, 因为它遵守因子的两个准则。

```js
const f = x => x + 1;
const g = x => x * 2;
[1, 2, 3].map(x => f(g(x)));
[1, 2, 3].map(g).map(f);

console.log(a, b); // [3, 5, 7], [3, 5, 7]
```
