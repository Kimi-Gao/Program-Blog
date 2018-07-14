## 偏函数 (Partial Function)

对原始函数预设参数作为一个新的函数。

```js
// 创建偏函数，固定一些参数
const partical = (f, ...args) =>
  // 返回一个带有剩余参数的函数
  (...moreArgs) =>
    // 调用原始函数
    f(...args, ...moreArgs);

const add3 = (a, b, c) => a + b + c;

// (...args) => add3(2, 3, ...args)
// (c) => 2 + 3 + c
const fivePlus = partical(add3, 2, 3);

fivePlus(4); // 9
```

也可以使用 `Function.prototype.bind` 实现偏函数。

```js
const add1More = add3.bind(null, 2, 3);
```

偏函数应用通过对复杂的函数填充一部分数据来构成一个简单的函数。柯里化通过偏函数实现。

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/partial.js)
