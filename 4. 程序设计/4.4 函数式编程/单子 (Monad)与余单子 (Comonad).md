## Monad

拥有 `of` 和 `chain` 函数的对象。`chain` 很像 `map`， 除了用来铺平嵌套数据。

```js
Array.prototype.chain = function(f) {
  return this.reduce((acc, it) => acc.concat(f(it)), []);
};

// ['cat', 'dog', 'fish', 'bird']
Array.of("cat,dog", "fish,bird").chain(s => s.split(","));

// [['cat', 'dog'], ['fish', 'bird']]
Array.of("cat,dog", "fish,bird").map(s => s.split(","));
```

在有些语言中，`of` 也称为 `return`，`chain` 也称为 `flatmap` 与 `bind`。

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/monad.js)

## Comonad

拥有 `extract` 与 `extend` 函数的对象。

```js
const CoIdentity = v => ({
  val: v,
  extract() {
    return this.val;
  },
  extend(f) {
    return CoIdentity(f(this));
  }
});
```

```js
CoIdentity(1).extract()
CoIdentity(1).extend(x => x.extract() + 1)   # CoIdentity(2)
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/comonad.js)
