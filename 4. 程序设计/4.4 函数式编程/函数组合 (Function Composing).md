## 函数组合 (Function Composing)

接收多个函数作为参数，从右到左，一个函数的输入为另一个函数的输出。

```js
const compose = (f, g) => a => f(g(a)); // 定义
const floorAndToString = compose(
  val => val.toString(),
  Math.floor
); // 使用
floorAndToString(12.12); // '12'
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/compose.js)

### 组合性 (Composable)

```js
object.map(compose(f, g)) ≍ object.map(g).map(f)  // f, g 为任意函数
```

在 javascript 中一个常见的函子是 Array, 因为它遵守因子的两个准则。

```js
const f = x => x + 1;
const g = x => x * 2;
[1, 2, 3].map(x => f(g(x)));
[1, 2, 3].map(g).map(f);
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/functor.js)
