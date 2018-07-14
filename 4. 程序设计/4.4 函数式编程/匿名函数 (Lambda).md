Lambda 表达式有何用处？如何使用？
https://www.zhihu.com/question/20125256/answer/324121308

## 匿名函数 (Lambda)

匿名函数被视作一个值

```js
(function(a) {
  return a + 1;
});
a => a + 1;
```

匿名函数通常作为高阶函数的参数

```js
[1, 2].map(a => a + 1);
```

可以把 Lambda 赋值给一个变量

```js
const add1 = a => a + 1;
```

## Lambda Caculus

数学的一个分支，使用函数创造 [通过计算模型](https://en.wikipedia.org/wiki/Lambda_calculus)
