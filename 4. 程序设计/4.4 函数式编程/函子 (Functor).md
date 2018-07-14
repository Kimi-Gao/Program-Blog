## 函子 (Functor)

一个实现了 map 函数的对象，map 会遍历对象中的每个值并生成一个新的对象。遵守两个准则

### Pointed Functor

一个实现了 of 函数的对象。

ES2015 添加了 `Array.of`，使 Array 成为了 Pointed Functor。

```js
Array.of(1);
```

## 加强版函子 (Applicative Functor)

一个拥有 ap 函数的对象。

```js
// 实现
Array.prototype.ap = function(xs) {
  return this.reduce((acc, f) => acc.concat(xs.map(f)), []);
};

// 示例
[a => a + 1].ap([1]); // [2]
```

如果你有两个对象，并需要对他们的元素执行一个二元函数

```js
// Arrays that you want to combine
const arg1 = [1, 3];
const arg2 = [4, 5];

// combining function - must be curried for this to work
const add = x => y => x + y;

const partiallyAppliedAdds = [add].ap(arg1); // [(y) => 1 + y, (y) => 3 + y]
```

由此得到了一个函数数组，并且可以调用 `ap` 函数得到结果

```js
partiallyAppliedAdds.ap(arg2); // [5, 6, 7, 8]
```

[示例](https://github.com/shfshanyue/fp-jargon-zh/blob/master/demos/applicativeFunctor.js)

http://skaka.me/blog/2015/12/19/functor-applicative-monad-scala-haskell/
