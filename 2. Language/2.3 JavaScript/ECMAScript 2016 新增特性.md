> https://github.com/muwenzi/Program-Blog/issues/117

## 目录

| 序号 | 标题 |
| :-- | :-- |
| 1 | [Array.prototype.includes](#1) |
| 2 | [指数运算符 ** ](#2)|

<h2 id="1">1. Array.prototype.includes</h2>

使用 `.indexOf()` 来确定一个元素是否在数组中存在的方式已经成为历史。

```js
['my','mom','hates','me'].indexOf('mom')  // 1
```

虽然有些难以理解，但返回值 1 表示 'mom' 字符串在数组中的索引值，而不是数组中只有一个 'mom'。重点其实是“存在”。

`.indexOf() `的“本职工作”应该是用来确定某个值在数组中的索引。

而如果我们的目的是确定一个元素是否在数组中存在，那么使用 .indexOf() 并不是最好的选择。理由很简单：当查询某个东西的存在性时我们希望得到一个**布尔值**，而不是数值。

`Array.prototype.includes()`做的恰恰就是这件事。它能确定数组中是否包含给定元素，有就返回 true，否则返回 false 。

```js
let life = ['mom', 'dad', 'brother']
life.includes('mom')          // true
life.includes('girlfriend')   // false
```
> Array.prototype.includes ( searchElement [ , fromIndex ] )

- searchElement —— 要查找的元素。
- fromIndex （可选的） — 开始查询的起始索引。

`includes`是数组上的简单实例方法，并有助于轻松查找某个项是否在Array中（包括`NaN`不像`indexOf`）

```js
const arr = [ 1, 2, 3, 4, NaN];

// es2016不使用
if(arr.indexOf(3) >= 0){
  console.log(true);
}

//使用
if(arr.includes(3)){
  console.log(true);
}

//ps: 注意 indexOf 是不支持查找NaN的
arr.includes(NaN) // true
arr.indexOf(NaN) // -1 (indexOf 不支持 NaN)
```

> 琐事：人们想要命名的JavaScript规范contains，但这显然已被Mootools使用，因此他们使用了includes。

<h2 id="2">2. 指数运算符 **</h2>

我们一直期待着指数计算也能像进行加减乘除一样方便。
操作符 ** 和 `Math.pow()` 的行为一致。它返回第一个操作数的第二个操作数次的乘方值 (例如 x ** y)。

```js
// 不使用
Math.pow(7,2) //49

//使用
7**2 //49

2 ** 'operand'
// NaN
```

## 参考资料
1. [ES7 只有两个新功能，这是它们的工作原理](https://mp.weixin.qq.com/s/JM-kySByI0ppGI0ZJiJEMg)
1. [ECMAScript 2016, 2017, 和2018中新增功能及示例](https://juejin.im/entry/5acdcc0b518825482e393f07?utm_source=gold_browser_extension)