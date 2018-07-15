## 类型签名 (Type Signatures)

> 类型签名在写纯函数时所起的作用非常大，大到英语都不能望其项背。这些签名轻轻诉说着函数最不可告人的秘密。

通常 js 会在注释中指出参数与返回值的类型。

```js
// functionName :: firstArgType -> secondArgType -> returnType

// add :: Number -> Number -> Number
const add = x => y => x + y;

// increment :: Number -> Number
const increment = x => x + 1;
```

如果函数的参数也是函数，那么这个函数需要用括号括起来。

```js
// call :: (a -> b) -> a -> b
const call = f => x => f(x);
```

字符 a, b, c, d 表明参数可以是任意类型。以下版本的 `map` 的参数 f，把一种类型 a 的数组转化为另一种类型 b 的数组。

```js
// map :: (a -> b) -> [a] -> [b]
const map = f => list => list.map(f);
```

## 联合类型 (Union Type)

连接不同的数据类型。

js 没有静态类型，我们假设一个数据类型是 `NumOrString` 用来对 `Number` 与 `String` 两种类型求和。

js 中可以对数值或字符串使用 `+` 操作符，因此我们可以使用这个新类型去描述输入输出。

```js
// add :: (NumOrString, NumOrString) -> NumOrString
const add = (a, b) => a + b;

add(1, 2); // Returns number 3
add("Foo", 2); // Returns string "Foo2"
add("Foo", "Bar"); // Returns string "FooBar"
```

联合类型又称为代数类型 algebraic types，tagged union 或者 sum type。

这里有一些 js 库可以帮助我们定义和使用联合类型。

- [union-type](https://github.com/paldepind/union-type)
- [daggy](https://github.com/fantasyland/daggy)

## Product type

用一种你可能更熟悉的方式把数据类型联合起来

```js
// point :: (Number, Number) -> {x: Number, y: Number}
const point = (x, y) => ({ x: x, y: y });
```

又见 [Set theory](https://en.wikipedia.org/wiki/Set_theory)

## Option

Option 是一种联合类型，它有两种情况，`Some` 或者 `None`。

```js
// 定义
const Some = v => ({
  val: v,
  map(f) {
    return Some(f(this.val));
  },
  chain(f) {
    return f(this.val);
  }
});

const None = () => ({
  map(f) {
    return this;
  },
  chain(f) {
    return this;
  }
});

// maybeProp :: (String, {a}) -> Option a
const maybeProp = (key, obj) =>
  typeof obj[key] === "undefined" ? None() : Some(obj[key]);
```

使用 `chain` 可以序列化返回 `Option` 的函数。

```js
// getItem :: Cart -> Option CartItem
const getItem = cart => maybeProp("item", cart);

// getPrice :: Item -> Option Number
const getPrice = item => maybeProp("price", item);

// getNestedPrice :: cart -> Option a
const getNestedPrice = cart => getItem(obj).chain(getPrice);

getNestedPrice({}); // None()
getNestedPrice({ item: { foo: 1 } }); // None()
getNestedPrice({ item: { price: 9.99 } }); // Some(9.99)
```

在其它的一些地方，`Option` 也称为 `Maybe`，`Some` 也称为 `Just`，`None` 也称为 `Nothing`。

[示例 option.js](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/option.js)
[示例 maybe.js](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/maybe.js)
