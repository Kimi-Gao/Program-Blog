## 纯函数的应用-Reducer

Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。
纯函数是函数式编程的概念，必须遵守以下一些约束。

- 不得改写参数
- 不能调用系统 I/O 的API
- 不能调用`Date.now()`或者`Math.random()`等不纯的方法，因为每次会得到不一样的结果

由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象，请参考下面的写法。

```javascript
// State 是一个对象
function reducer(state, action) {
  return Object.assign({}, state, { thingToChange });
  // 或者
  return { ...state, ...newState };
}

// State 是一个数组
function reducer(state, action) {
  return [...state, newItem];
}
```

最好把 State 对象设成只读。你没法改变它，要得到新的 State，唯一办法就是生成一个新对象。这样的好处是，任何时候，与某个 View 对应的 State 总是一个不变的对象。

// todo

**参考资料**
- [简单点，理解函数式编程](https://mp.weixin.qq.com/s?__biz=MzI5MjEzNzA1MA==&mid=2650264291&idx=1&sn=02dcff8719b7a285d8e94a63a45473d0&chksm=f40683d6c3710ac0dba9a5b416cb9dfc14546ebb6771dd406c5191ed520cc8babd2c3b94c0bd&key=1ec2040cbb2ee42f36ba042b09fa916202a6e38dce54af4ff2aa186ca5258e83dc0a38f5cfd5c8f7a86481e5aee8b393acc822f22b9df8b535690524041019f399e22d42170f9343490608da71d808a8&ascene=0&uin=MjYzMTM3MDAyMA%3D%3D&devicetype=iMac+MacBookPro11%2C5+OSX+OSX+10.12.1+build(16B2555)&version=12010210&nettype=WIFI&fontScale=100&pass_ticket=C5ii2XXBIPXGmlqXGL4HuqbBQspacoIHyGyp9W4ouSIHHb14KDO%2Be0uK5x2ONJH%2B)
- [JavaScript 中的“纯函数”](http://web.jobbole.com/86136/)
- [JS函数式编程指南 第 3 章：纯函数的好处](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch3.html)
- [高阶函数对系统的“提纯”](https://75team.com/post/higher-order-function-play-with-pure-function.html)
- [Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)