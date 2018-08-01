## 柯里化 (Currying)

将一个多元函数转变为一元函数的过程。
每当函数被调用时，它仅仅接收一个参数并且返回带有一个参数的函数，直到传递完所有的参数。

```js
const sum = (a, b) => a + b;

const curriedSum = a => b => a + b;

curriedSum(3)(4); // 7

const add2 = curriedSum(2);

add2(10); // 12
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/curry.js)

## 自动柯里化 (Auto Currying)

`lodash`，`understore` 和 `ramda` 有 `curry` 函数可以自动完成柯里化。

```js
const add = (x, y) => x + y;

const curriedAdd = _.curry(add);

curriedAdd(1, 2); // 3
curriedAdd(1)(2); // 3
curriedAdd(1); // (y) => 1 + y
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/curry2.js)

#### 进一步阅读

- [Favoring Curry](http://fr.umio.us/favoring-curry/)
- [Hey Underscore, You're Doing It Wrong!](https://www.youtube.com/watch?v=m3svKOdZijA)


柯里化与反柯里化 https://juejin.im/post/5b561426518825195f499772
