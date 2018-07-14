## 惰性求值 (Lazy evaluation)

按需求值机制，只有当需要计算所得值时才会计算。

```js
const rand = function*() {
  while (true) {
    yield Math.random();
  }
};

const randIter = rand();
randIter.next();
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/functor.js)
