## 无参风格 (Point-Free Style)

定义函数时，不显式地指出函数所带参数。这种风格通常需要柯里化或者高阶函数。也叫 Tacit programming (无参编程)。

pointfree style 是指，函数无须提及将要操作的数据是什么样的。一等公民的函数、柯里化以及组合协作起来非常有助于实现这种风格，pointfree style 能够帮助我们减少不必要的命名，让代码保持简洁和通用。

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

compose 就是典型的 Points-Free