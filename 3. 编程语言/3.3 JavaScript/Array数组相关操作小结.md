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

// 手动挖坑TODO

**参考**
- [数组（阮一峰）](http://javascript.ruanyifeng.com/grammar/array.html)
- [Array 对象](http://javascript.ruanyifeng.com/stdlib/array.html)
- [js删除数组里的某个元素](http://caibaojian.com/js-splice-element.html)
