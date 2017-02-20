数组的slice和splice的方法经常会搞混淆，所以在此好好梳理一下。

## 释义

slice英语释义：
<img width="534" alt="2017-02-14 12 22 40" src="https://cloud.githubusercontent.com/assets/12554487/22890628/e694fad0-f247-11e6-883a-3ce0b9247a2c.png">

splice英语释义：
<img width="534" alt="2017-02-14 12 22 40" src="https://cloud.githubusercontent.com/assets/12554487/22891907/cae741cc-f24b-11e6-89e7-aa6ce1736542.png">

一个是切分，一个是拼接，一字之差，经常谬以千里，从某种程度上说也是一对反义词。

## slice

`slice`方法用于提取原数组的一部分，返回一个新数组，原数组**不变**。

就好像将大蛋糕（原数组）中切出一小块🍰（新数组），不过要注意原来的蛋糕是不变的。

它的第一个参数为起始位置（从0开始），第二个参数为终止位置（但该位置的元素本身不包括在内）。如果省略第二个参数，则一直返回到原数组的最后一个成员。

```javascript
// 格式
arr.slice(start_index, upto_index);

// 用法
let a = ['a', 'b', 'c'];

a.slice(0) // ["a", "b", "c"]
a.slice(1) // ["b", "c"]
a.slice(1, 2) // ["b"]
a.slice(2, 6) // ["c"]
a.slice() // ["a", "b", "c"]
```

上面代码中，最后一个例子slice没有参数，实际上等于返回一个原数组的拷贝(深拷贝，重新占用一块内存空间)。比如：
```javascript
let a = [1,2,3]
let b = a.slice()   // [1, 2, 3]
b[1] = 2222
// b    [1, 2222, 3]
// a   [1, 2, 3]
```

如果slice方法的参数是负数，则表示倒数计算的位置。

```javascript
let a = ['a', 'b', 'c'];
a.slice(-2) // ["b", "c"]
a.slice(-2, -1) // ["b"]
```
上面代码中，-2表示倒数计算的第二个位置，-1表示倒数计算的第一个位置。

尽量避免用负数，不太直观。

如果参数值大于数组成员的个数，或者第二个参数小于第一个参数，则返回空数组。

```javascript
let a = ['a', 'b', 'c'];
a.slice(4) // []
a.slice(2, 1) // []
```

`slice`方法的一个重要应用，是将类似数组的对象转为真正的数组。

```javascript
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })
// ['a', 'b']

Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```

上面代码的参数都不是数组，但是通过call方法，在它们上面调用slice方法，就可以把它们转为真正的数组。

## splice

splice方法用于删除原数组的一部分成员，并可以在被删除的位置添加入新的数组成员，返回值是被删除的元素。注意，该方法会**改变**原数组。

```javascript
arr.splice(index, count_to_remove, addElement1, addElement2, ...);
```

splice的第一个参数是删除的起始位置，第二个参数是被删除的元素个数。如果后面还有更多的参数，则表示这些就是要被插入数组的新元素。

```javascript
let a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(4, 2) // ["e", "f"]
a // ["a", "b", "c", "d"]
a.splice(2, 2, 1, 2) // ["c", "d"]
a // ["a", "b", 1, 2]
```

起始位置如果是负数，就表示从倒数位置开始删除。

```javascript
let a = ['a', 'b', 'c', 'd', 'e', 'f'];
a.splice(-4, 2) // ["c", "d"]
```

上面代码表示，从倒数第四个位置c开始删除两个成员。

如果只是单纯地插入元素，splice方法的第二个参数可以设为0。

```javascript
let a = [1, 1, 1];

a.splice(1, 0, 2) // []
a // [1, 2, 1, 1]
```

如果只提供第一个参数，等同于将原数组在指定位置拆分成两个数组。

```javascript
let a = [1, 2, 3, 4];
a.splice(2) // [3, 4]
a // [1, 2]
```
`a.splice(0)`也可以用于将数组清空

**参考资料**
- [Array 对象实例方法：slice, splice](http://javascript.ruanyifeng.com/stdlib/array.html#toc11)
