## Point-Free 风格 (Point-Free Style)

定义函数时，不显式地指出函数所带参数。这种风格通常需要柯里化或者高阶函数。也叫 Tacit programming。

```js
const map = (fn) => (list) => list.map(fn)
const add = (a) => (b) => a + b

# Points-Free   list 是显式参数
const incrementAll = (numbers) => map(add(1))(numbers)

# Points-Free   list 是隐式参数
const incrementAll2 = map(add(1))
```

`incrementAll` 识别并且使用了 `numbers` 参数，因此它不是 Point-Free 风格的。
`incrementAll2` 连接函数与值，并不提及它所使用的参数，因为它是 Point-Free 风格的。

Point-Free 风格的函数就像平常的赋值，不使用 `function` 或者 `=>`。

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/pointFree.js)
