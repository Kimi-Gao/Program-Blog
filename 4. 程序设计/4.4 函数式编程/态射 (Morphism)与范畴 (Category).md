## 态射 (Morphism)

一个变形的函数。

### 自同态 (Endomorphism)

输入输出是相同类型的函数。

```js
// uppercase :: String -> String
const uppercase = str => str.toUpperCase();

// decrement :: Number -> Number
const decrement = x => x - 1;
```

### 同构 (Isomorphism)

不用类型对象的变形，保持结构并且不丢失数据。

例如，一个二维坐标既可以表示为数组 `[2, 3]`，也可以表示为对象 `{x: 2, y: 3}`。

```js
// 提供函数在两种类型间互相转换
const pairToCoords = pair => ({ x: pair[0], y: pair[1] });

const coordsToPair = coords => [coords.x, coords.y];

coordsToPair(pairToCoords([1, 2])); // [1, 2]

pairToCoords(coordsToPair({ x: 1, y: 2 })); // {x: 1, y: 2}
```

## 范畴 (Category)

在范畴论中，范畴是指对象集合及它们之间的态射 (morphism)。在编程中，数据类型作为对象，函数作为态射。

一个有效的范畴遵从以下三个原则：

1.  必有一个 identity 态射，使得 map 一个对象是它自身。`a` 是范畴里的一个对象时，必有一个函数使 `a -> a`。
2.  态射必是可组合的。`a`，`b`，`c` 是范畴里的对象，`f` 是态射 `a -> b`，`g` 是 `b -> c` 态射。`g(f(x))` 一定与 `(g ● f)(x)` 是等价的。
3.  组合满足结合律。`f ● (g ● h)` 与 `(f ● g) ● h` 是等价的。

这些准则是非常抽象的，范畴论对与发现组合的新方法是伟大的。

#### 进一步阅读

- [Category Theory for Programmers](https://bartoszmilewski.com/2014/10/28/category-theory-for-programmers-the-preface/)
