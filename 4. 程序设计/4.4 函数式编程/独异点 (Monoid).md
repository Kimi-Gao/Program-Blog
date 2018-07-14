## Monoid

一个对象拥有一个函数用来连接相同类型的对象。

数值加法是一个简单的 Monoid

```js
1 + 1; // 2
```

以上示例中，数值是对象而 `+` 是函数。

与另一个值结合而不会改变它的值必须存在，称为 `identity`。

加法的 `identity` 值为 0:

```js
1 + 0; // 1
```

需要满足结合律

```js
1 + (2 + 3) === 1 + 2 + 3; // true
```

数组的结合也是 Monoid

```js
[1, 2].concat([3, 4]);
```

`identity` 值为空数组

```js
[1, 2].concat([]);
```

identity 与 compose 函数能够组成 monoid

```js
const identity = a => a;
const compose = (f, g) => x => f(g(x));
```

foo 是只带一个参数的任意函数

```js
compose(foo, identity) ≍ compose(identity, foo) ≍ foo
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/monoid.js)
