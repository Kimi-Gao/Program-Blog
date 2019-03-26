> https://github.com/muwenzi/Program-Blog/issues/18

## 查找
查找数组中是否包含某个元素可以使用indexOf()方法，如果返回值为-1则说明不存在，如果返回值为大于-1的整数，则说明存在。例如：
```javascript
var arr = [1,2,3];
arr.indexOf(1);    // 返回0
arr.indexOf(5);    // 返回-1
```
注：返回值为数组中第一个匹配的元素在数组的位置

另外`indexOf`并不能发现`NaN`，可以使用ES2015的`findIndex`方法：
```javascript
[NaN].indexOf(NaN)  // -1

[NaN].findIndex(v => Object.is(NaN, v))  // 0
```

ES7，推荐
```javascript
arr.includes(elem)
```

## 删除
### 1. 删除某一个指定的元素
```javascript
Array.prototype.remove = function(val) {
   var index = this.indexOf(val);
   if (index > -1) {
      this.splice(index, 1);
   }
};
```
这样就构造了这样一个函数，比如我有有一个数组：
```javascript
var a = ['abs','dsf','sdf','fd']
````
假如我们要删除其中的fd,就可以使用:
```javascript
a.remove('fd');
```

### 2. 根据下标批量地删除、添加和替换
```javascript
splice(index,len,[item])    
```
注释：该方法会改变原始数组。

`splice`有3个参数，它也可以用来替换/删除/添加数组内某一个或者几个值

```
index: 数组开始下标        
len: 替换/删除的长度       
item: 替换的值，删除操作的话 item为空
```

如：arr = ['a','b','c','d']

**删除**
```javascript
arr.splice(1,1)   //['a','c','d'] 删除起始下标为1，长度为1的一个值，len设置的1，如果为0，则数组不变

arr.splice(1,2)  //['a','d'] 删除起始下标为1，长度为2的一个值，len设置的2
```
**替换**
```javascript
arr.splice(1,1,'ttt')        //['a','ttt','c','d'] 替换起始下标为1，长度为1的一个值为‘ttt’，len设置的1

arr.splice(1,2,'ttt')        //['a','ttt','d'] 替换起始下标为1，长度为2的两个值为‘ttt’，len设置的1
```
**添加** ----  len设置为0，item为添加的值
```javascript
arr.splice(1,0,'ttt')        //['a','ttt','b','c','d'] 表示在下标为1处添加一项'ttt'
```

### 3.delete      

delete删除掉数组中的元素后，会把该下标出的值置为undefined,数组的长度不会变
```javascript
delete arr[1]  // ['a',undefined x 1,'c','d'] 数组长度不变，有一项为undefined
```

## map()

`map`方法对数组的所有成员依次调用一个`函数`，根据函数结果返回一个新数组。可以先简单理解为一个`forEach`
### 1. 基本使用

``` javascript
var numbers = [1, 2, 3];

numbers.map(function (n) {
  return n + 1;
});
// [2, 3, 4]

numbers
// [1, 2, 3]
```

**注意** 只是返回一个新数组，但原数组并没有发生变化
### 2. 回调函数中传入多个参数

map方法接受一个函数作为参数。该函数调用时，map方法会将其传入三个参数，分别是`当前成员`、`当前位置`和`原数组`。

``` javascript
[1, 2, 3].map(function(elem, index, arr) {
  return elem * index;
});
// [0, 2, 6]
```
### 3. 其他类型使用map函数

map方法不仅可以用于数组，还可以用于字符串，用来遍历字符串的每个字符。但是，不能直接使用，而要通过函数的call方法间接使用，或者先将字符串转为数组，然后使用。

``` javascript
var upper = function (x) {
  return x.toUpperCase();
};

[].map.call('abc', upper)
// [ 'A', 'B', 'C' ]

// 或者
'abc'.split('').map(upper)
// [ 'A', 'B', 'C' ]
```
### 4. 数组中的空位

如果数组有空位，map方法的回调函数在这个位置不会执行，会跳过数组的空位。

``` javascript
var f = function(n){ return n + 1 };

[1, undefined, 2].map(f) // [2, NaN, 3]
[1, null, 2].map(f) // [2, 1, 3]
[1, , 2].map(f) // [2, , 3]
```

上面代码中，map方法不会跳过`undefined`和`null`，但是会跳过空位。

下面的例子会更清楚地说明这一点。

``` javascript
Array(2).map(function (){
  console.log('enter...');
  return 1;
})
// [, ,]
```

上面代码中，map方法根本没有执行，直接返回了Array(2)生成的空数组。

数组是最简单的内存数据结构，往往在学习数据结构的时候会忽略数组的重要性。数组是最开始接触到的也是最简单的数据结构，它是其他数据结构的基石。从ES3到ES5、6，JS封装了许多数组的方法，在讨论JS数据结构的时候，这些方法为数据结构提供了很大的便利，当然如果想深入了解Array的这些方法的实现过程，可以参考C/C++的实现，这里不再深入研究底层的实现，毕竟封装好的方法可以直接拿来用，还是少点折腾，人生还是有其他有意思的事情可做的。

## Array的真相

JS的数组和其他传统语言的数组有一些明显的不同：

1. 数组元素可以是不同类型的值
2. 可以随时修改数组，它会动态增长，是动态数组
3. JS不支持二维或多维数组的定义。但是数组里面可以包含对象，而数组也是对象，因此可以通过将数组元素再次声明为数组的方式，来达到实现二维或多维数组的目的。(其实就是定义数组的时候只能定义一维数组，所以有些书就说JS只支持一维数组)
```javascript
const a = []
a[0] = []
a[1] = []
a[0][0] = 72
a[0][1] = 76
a[1][0] = 68
a[1][1] = 66

// or

const a = [[72,76], [68,66]]
```
【注意】这种方式实现的多维数组，实际上是不可控的，可以随时改变某个元素的类型或插入新类型的元素，将会导致不再是多维数组，这也是JS十分灵活的地方，例如：
```javascript
const a = [[72,76], [68,66]]
a.push(12)
console.log(a) // [[72,76], [68,66], 12]
```
4. Array 的索引并不是指偏移量。实际上， Array 的索引也不是 Number 类型，而是 **String** 类型的。我们可以正确使用如`arr[0]`的写法的原因是语言可以自动将 Number 类型的 0 转换成 String 类型的 "0" 。所以，在 Javascript 中从来就没有 Array 的索引，而只有类似 "0" 、 "1" 等等的属性。

【注意】其实Array本质上就是Object，只不过是对象的定制版，增加一些专有的属性和方法，相比于传统语言的Array只是看起来像，其实本质上还有很大差别的。

## 数组在内存中的存储

JS中Array的存储和传统语言中的数组也有很大的不同，数组在`栈`中存放的是对象的引用，实际数据是存储在`堆`中的，如下图：

![untitled diagram-2](https://cloud.githubusercontent.com/assets/12554487/20649718/8ce11a84-b500-11e6-840c-b491685b1682.png)

// Q: 数组在堆中的存储是连续的吗？如果不是那是怎么标识各个属性在内存的位置的呢？

// Q: string是存储在栈中还是堆中？（JS内存机制，tolearn）

## 数组中常用的方法

Array非常灵活，也是JS种其他数据结构的基石，下面这张图展示了它们之间的微妙关系：

![untitled diagram](https://cloud.githubusercontent.com/assets/12554487/20649032/d89d03ee-b4f0-11e6-99af-1053d2a80787.png)

在JS中数组是可以修改的对象，相比于其他语言的数组，JS数组有许多很好用的方法，这样就不再为它开发一些基本功能了，这也使得JS的数组十分强大。和数据结构相关的方法主要包括：

| 方法分类     | 方法名         | 标准     | 描述   | 注意                            |
| -------- | ----------- | ------ | ---- | ----------------------------- |
| 尾部增删     | push        |        |      |                               |
|          | pop         |        |      |                               |
| 头部增删     | unshift     |        |      |                               |
|          | shift       |        |      |                               |
| 修改       | splice      |        |      |                               |
|          | concat      |        |      |                               |
|          | fill        | ES2015 |      |                               |
|          | copyWithin  | ES2015 |      |                               |
| 查找       | indexOf     |        |      |                               |
|          | lastIndexOf |        |      |                               |
|          | find        | ES2015 |      |                               |
|          | findIndex   | ES2015 |      |                               |
|          | includes    | ES2017 |      | babel已支持                      |
| 迭代器函数    | forEach     |        |      |                               |
|          | every       |        |      |                               |
|          | some        |        |      |                               |
|          | filter      |        |      |                               |
|          | map         |        |      |                               |
|          | reduce      |        |      |                               |
| 排序       | sort        |        |      |                               |
|          | reverse     |        |      |                               |

还有一些方法是用于不同数据类型之间的转换的：

| 方法分类     | 方法名         | 标准     | 描述   | 注意                            |
| -------- | ----------- | ------ | ---- | ----------------------------- |
| 数组=>字符串  | toString    |        |      |                               |
|          | join        |        |      |                               |
| 两类对象=>数组 | Array.from  |        |      | 两类对象包括：类数组对象和可遍历对象（包括Set和Map） |
| 数值=>数组   | Array.of    |        |      |                               |

// TODO
_isArray

- [javascript之数组操作](http://www.cnblogs.com/zhangzt/archive/2011/04/01/2002213.html)
- [JavaScript数组方法的兼容性写法](http://www.dengzhr.com/js/362)

**参考**
- [数组（阮一峰）](http://javascript.ruanyifeng.com/grammar/array.html)
- [Array 对象](http://javascript.ruanyifeng.com/stdlib/array.html)
- [js删除数组里的某个元素](http://caibaojian.com/js-splice-element.html)
