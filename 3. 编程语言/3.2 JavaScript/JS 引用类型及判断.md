> https://github.com/muwenzi/Program-Blog/issues/17

## 动态类型

JavaScript 是一种动态语言。这意味着你不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。这也意味着你可以使用同一个变量保存不同类型的数据：

``` javascript
var foo = 42;    // foo is a Number now
var foo = "bar"; // foo is a String now
var foo = true;  // foo is a Boolean now
```
## 数据类型

最新的 ECMAScript 标准定义了 7 种数据类型:

**6种 原始类型 primitive type，直接取值**:

> boolean
> null      // 类比：李商隐今天木有写诗
> undefined   // 类比：李商隐今天写了一首《无题》的诗
> number
> string
> symbol (ES2015 新定义)

``` javascript
const foo = 1;
let bar = foo;

bar = 9;

console.log(foo, bar); // => 1, 9
```

**1种 引用类型/复合类型 complex type，引用取值**

> object（array、function）

``` javascript
const foo = [1, 2];
const bar = foo;

bar[0] = 9;

console.log(foo[0], bar[0]); // => 9, 9
```

该类型实例化的对象，是一组数据和功能（函数）的集合。

实例化对象的过程有两种，一种是通过`new操作符`，一种是通过`对象字面量表示法`。

Object类型是最基本的类型，我们可以在其基础上继承出更多的类型，像我们知道的Array()、Date()、Function()类型等，都是从Object继承的，而且这些类型都在程序员使用前被默认设置了属性和方法，供程序员调用。

而以上类型又有一个笼统的称呼为引用类型。为什么是引用类型呢？

``` javascript
var obj=new Object();
```

在声明一个引用类型时，是会将实例化对象地址存到栈内存中，然后通过地址访问堆内存：
![image](https://cloud.githubusercontent.com/assets/12554487/18320136/38135740-755b-11e6-9263-5caf2a6d8a49.png)
另外注意JS中**函数的参数都是值传递的**，而对于JS内的引用类型，其值，也就默认为栈内存中的地址。

删除属性存在的坑：

``` javascript
a = {n: {x: 2}};
b = a.n; 
delete a.n; 

b.x   // 2
```

原因是 {x:2} 这个对象被 a 和 b 同时引用，delete 指令只删除了 a 对它的引用，b 上的引用依然存在。这种问题有可能造成内存泄漏。

String的变量复制不可改变问题？// TODO
## 三种判断数据类型的方法
### typeof

``` javascript
typeof null =='object'  // true 
typeof [] =='object' // true 
typeof {} =='object' // true 
```

typeof一般只能返回如下几个结果：number,boolean,string,`function`,object,undefined

至于 `typeof null = 'object'`，可以参考: [The history of “typeof null”](http://www.2ality.com/2013/10/typeof-null.html)

在实际的项目应用中，typeof只有两个用途，就是检测一个元素是否为undefined，或者是否为function。
为何呢？我们可以使用typeof来获取一个变量是否存在，如`if(typeof a!="undefined"){}`，而不要去使用if(a)因为如果a不存在（未声明）则会出错，对于Array,Null等特殊对象使用typeof一律返回object，这正是typeof的局限性。
JavaScript Garden整理出来了如下表格：

``` javascript
Value               function   typeof
-------------------------------------
"foo"               String     string
new String("foo")   String     object
1.2                 Number     number
new Number(1.2)     Number     object
true                Boolean    boolean
new Boolean(true)   Boolean    object
new Date()          Date       object
new Error()         Error      object
[1,2,3]             Array      object
new Array(1, 2, 3)  Array      object
new Function("")    Function   function
/abc/g              RegExp     object
new RegExp("meow")  RegExp     object
{}                  Object     object
new Object()        Object     object 
```
### instanceof

所有可以通过构造函数创建的对象都可以用 instanceof 检查。
instanceof 是用来判断 A 是否为 B 的实例对，表达式为：A instanceof B，如果A是B的实例，则返回true,否则返回false。 在这里需要特别注意的是：instanceof检测的是原型。当 A 的 **proto** 指向 B 的 prototype 时，就认为A就是B的实例。如：

``` javascript
var a=new Array();
alert(a instanceof Array);  // true
alert(a instanceof Object) // true
```

这是因为Array是object的子类。我们发现，虽然 instanceof 能够判断出 [] 是Array的实例，但它认为 [] 也是Object的实例，为什么呢？ 我们来分析一下[]、Array、Object 三者之间的关系: 从instanceof 能够判断出 [].**proto** 指向 Array.prototype， 而 Array.prototype.**proto** 又指向了Object.prototype，Object.prototype.**proto** 指向了null,标志着原型链的结束。因此，[]、Array、Object就形成了如下图所示的一条原型链：

![image](https://cloud.githubusercontent.com/assets/12554487/18273177/b16d5fac-746e-11e6-9743-6f69586c6135.png)

从原型链可以看出，[] 的 **proto**  直接指向Array.prototype, 间接指向Object.prototype, 所以按照 instanceof 的判断规则，[] 就是Object的实例。当然，类似的new Date()、new Person() 也会形成这样一条原型链，因此，instanceof 只能用来判断两个对象是否属于原型链的关系， 而不能获取对象的具体类型。

谈到instanceof我们要多插入一个问题，就是function的arguments，我们大家也许都认为arguments是一个Array，但如果使用instaceof去测试会发现arguments不是一个Array对象，尽管看起来很像。

x instanceof Array
看上去不错？可惜这不是最佳答案！问题在于window.Array乃至[].constructor都不100%靠谱，因为检查的值可能来自另外一个 frame 也就是要算上执行环境的话，你怎么知道 Object.prototype.toString 没有被事先重载过？

公认的靠谱解法是

``` javascript
Object.prototype.toString.call(x) === '[object Array]'
```

还可以用ES5的Array.isArray()方法来判断一个值是否为数组。它可以弥补typeof运算符的不足。

``` javascript
var a = [1, 2, 3];

typeof a // "object"
Array.isArray(a) // true
```

如果是NodeJS还可以用`util`模块

``` javascript
var util = require("util");
var a = [];

console.log(util.isArray(a));
```

[Node util 参考手册](http://nodejs.org/api/util.html#util_util_isarray_object)
### Object.prototype.toString

toString是Object原型对象上的一个方法，该方法默认返回其调用者的具体类型，更严格的讲，是 toString运行时this指向的对象类型, 返回的类型格式为[object,xxx],xxx是具体的数据类型，其中包括：String,Number,Boolean,Undefined,Null,Function,Date,Array,RegExp,Error,HTMLDocument,... 基本上所有对象的类型都可以通过这个方法获取到。

``` javascript
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(window) ; //[object global] window是全局对象global的引用
```

需要注意的是，必须通过Object.prototype.toString.call来获取，而不能直接 new Date().toString(), 从原型链的角度讲，所有对象的原型链最终都指向了Object, 按照JS变量查找规则，其他对象应该也可以直接访问到Object的toString方法，而事实上，大部分的对象都实现了自身的toString方法，这样就可能会导致Object的toString被终止查找，因此要用call来强制执行Object的toString方法。

ES6有木有新的方法？待考证
## 小测验

``` javascript
[typeof null, null instanceof Object]
```

两个知识点:
- [Operators/typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)
- [Operators/instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

typeof 返回一个表示类型的字符串.

instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上.

这个题可以直接看链接... 因为 `typeof null === 'object'` 自语言之初就是这样....

typeof 的结果请看下表:

``` javascript
type         result
-------------------
Undefined   "undefined"
Null        "object"
Boolean     "boolean"
Number      "number"
String      "string"
Symbol      "symbol"
Host object Implementation-dependent
Function    "function"
Object      "object"
```

所以答案`[object, false]`

**参考**
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [JavaScript 数据类型和数据结构](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures)
- [JS-基本数据类型](http://www.jianshu.com/p/4841fcc6b4e7)
- [JavaScript 被忽视的细节](http://mp.weixin.qq.com/s?__biz=MzA5NTM2MTEzNw==&mid=2736710568&idx=1&sn=7775c4c8e01f4f1a1c20281b2c7724c1&scene=1&srcid=09083XIREXKjGHFdsRb5DECy#rd)
- [JS 判断数据类型的三种方法](http://www.cnblogs.com/onepixel/p/5126046.html)
- [如何正确判断js数据类型](https://segmentfault.com/q/1010000000464600)
- [44个 Javascript 变态题解析 (上)](https://github.com/xiaoyu2er/blog/issues/1)
- [Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)