![image](https://cloud.githubusercontent.com/assets/12554487/20549386/a168a5aa-b166-11e6-9ec8-ff645d9415dd.png)


# 第一部分  编程风格

## 1. 基本的格式化

### 1.1 缩进层次

作者推荐tab缩进（4个空格），而现在的ESlint的JS Standard Style和Airbnb JavaScript Style Guide则推荐2个空格，目测2个空格是现在的趋势。

### 1.2 语句结尾
语句结尾要有分号，理由是分析器的自动插入分号（ASI）机制非常复杂且很难记住（我反而觉得有分号的机制更难记，干脆都不写分号，看上去和`groovy`、`swift`一样清爽简洁），有些开发场景会产生意想不到的错误，同样js standard style则明显地反对写分号，个人也偏向于不写分号，这些错误一般可以人为的避免，遵循js standard style规范的写法，应该出错不太可能吧，具体在实践中检验这句话的真理性。这篇笔记为了以后的阅读存档，与书中的代码风格尽量保持一致。

### 1.3 行的长度

最好限定在80字符

### 1.4 换行
超过80字符要换行，不能在操作符后换行，且第二行要缩进两次（即2个tab）
```javascript
callAFunction(document, element, window, "some string value", true, 123,
        navigator);
```

总是将一个运算符置于行尾，ASI就不会自作主张地插入分号，也就避免了错误的发生。

```javascript
if (balblabla && babababababbab && 
        babababba) {
    doSomething()
}
```

需要主要的是上面这段代码if语句的主体依然是1个tab缩进。

有一条规则例外：当给变量赋值时，第二行的位置应当和赋值运算符的位置保持对齐。比如：
```javascript
var result = something1 + something2 + something3 + something4 +
             something5
```
保持左对齐，确保代码的可读性，并能一眼看清折行文本的上下文。

### 1.5 空行

增加空行可以提高可读性，以下场景中常常添加空行：

- 方法之间
- 方法中的局部变量和第一条语句之间
- 多行或单行注释之前
- 方法内的逻辑片段（if、for等）之间

并不是强制规范，只是粗略地建议。

### 1.6 命名
```
小驼峰 camelCase
大驼峰 PascalCase
```
小驼峰最常用，但我们不排斥更多其他的命名风格。

#### 1.6.1 变量和函数

变量名和函数名都是小驼峰命名

```
变量名前缀是名词
函数名前缀是动词
```

命名规则：
- 长度尽可能短
- 尽量体现值的数据类型，比如：count、length和size表明数据类型是数字。name、title和message表明数据类型是字符串
- 循环中可以用单个字符命名，如i, j, k

避免没有意义的命名，如foo、bar、tmp之类应当避免，因为这些随拿随用的名字，如果没有看过上下文，是无法理解这些变量的含义和用处的。

对于动词前缀的函数名小结：
```
can // 函数返回一个布尔值
has // 函数返回一个布尔值
is  // 函数返回一个布尔值
get  // 函数返回一个非布尔值
set  // 函数用来保存一个值
```
例如：
```javascript
if (isEnabled) {
    setName('Nick');
}

if (getName() === 'Nick') {
    doSomething();
}
```
但是jQuery的函数并没有遵守这个规则，一些函数即是get也是set

#### 1.6.2 常量

大写字母和下划线命名（来源于C语言）

```javascript
var MAX_COUNT = 10;
```

【注】在ES6中，增加了const关键字，**但是**它是定义那些不能被再次赋值的变量，而不是真正的无法修改的变量，例如：
```javascript
const a = [1, 2]
a.push(3) // 3
a[0] = 99 // 99
a = [5,6,7] // Uncaught TypeError: Assignment to constant variable.
```
所以往往是const用的次数多于let，便于进行一些静态类型的检查

#### 1.6.3 构造函数

大驼峰命名（PascalCase）

这样可以将构造函数和普通的函数区分开，命名也常是名词，因为它们是用来创建某个类型的实例的。
```javascript
function Person (name) {
    this.name = name;
}
```

【注】在ES6中class的命名也和构造函数一样

### 1.7 原始类型变量

#### 1.7.1 字符串

单引号和双引号都可以，区别就是：单引号内部出现单引号或者双引号内部出现双引号，需要用字符串**界定符**进行转义：
```javascript
var name = "Nick says, \"Hi.\"";

// or

var name = 'Nick says, \'Hi.\'';
```

或者在单引号里面使用双引号，双引号里面使用单引号。

Google和JS Standard Style风格都是明确规定使用单引号，Crockford和jQuery推荐使用双引号，具体使用单引号还是双引号可以根据具体的应用场景和个人习惯加以权衡,， 统一风格就好。

另外创建多行字符串时候
```javascript
// bad
var longString = "bababbabababababababab \
bababbaba";

// good
var longString = "bababbbbbbbbbbbbb" +
"bababbabaa";
```
【注】ES6的模板字符串（Template Strings）也可以更加便捷的来表示多行字符串：
```javascript
var longString = `bababbababbabba
bababababa`
```

#### 1.7.2 数字

JS的数字类型只有一种，所有的数字形式都会存储为相同的数据类型，但要注意一些写法的问题：
```javascript
// 整数
var count = 10;

// 小数
var price = 10.0;
var price = 10.00;

// 不推荐小数写法：没有小数部分
var price = 10.;

// 不推荐小数写法：没有整数部分
var price = .1;

// 不推荐八进制写法，已经被弃用
var price = 010;  // 不是表示10而是表示八进制中的8，有歧义

// 十六进制写法
var price = 0xA2;

// 科学计数法
var price = 1e23;
```

省略小数和整数部分都有同一个问题，很难搞清楚被省略的部分是不小心丢掉还是刻意为之。为了避免歧义，请不要省略。

JS支持八进制写法是很多错误和歧义的根源，大多数开发者对八进制格式并不熟悉，也很少用到，所以最好的做法是禁止使用八进制。

#### 1.7.3 null

以下场景应当使用`null`：

- 用来初始化一个变量，这个变量可能赋值为一个对象
- 用来和一个已经初始化的变量比较，这个变量可以是也可以不是一个对象
- 当函数的参数期望是对象时，用作参数传入
- 当函数的返回值期望是对象时，用作返回值传出

不应当使用`null`的场景：

- 不要使用null来检测是否传入了某个参数

代码示例：

```javascript
// good
var person = null;

// good
function getPerson () {
    if (con) return new Person('Nick');
    else return null;
}

// good
var person = getPerson()
if (person !== null) {
    doSomething();
}

// bad: 用来和未初始化的变量比较
var person;
if (person != null) {
    doSometing();
}

// bad: 检测是否传入了参数
function doSomething(arg1, arg2, arg3) {
    if (arg3 != null) doSomething();
}
```

理解null的最好方式是将它当做**对象的占位符**，对于全局可维护性来说至关重要。

#### 1.7.4 undefined

万恶的缘由：
```javascript
null == undefined; // true
```

那些没有被初始化的变量都有一个初始值，即`undefined`，表示这个变量等待赋值。但是要避免这样做，not good。

```javascript
// bad
var person; // undefined
```

建议避免在代码中使用`undefined`，这个值常常和返回`undefined`的typeof运算符混淆。

事实上，typeof的行为也很让人费解，因为不管是值是`undefined`变量还是未声明的变量，typeof都是`undefined`，比如：
```javascript
// foo 未被声明
var person;
console.log(typeof person); // "undefined"
console.log(typeof foo); // "undefined"
```

通过禁止使用`undefined`，可以有效地确保只在一种情况下typeof才会返回"undefined"：
```
当变量未被声明时。如果你使用了一个可能(or not)赋值为一个对象的变量的时，则将其赋值为null
```

```javascript
// good
var person = null;
```
这样就表明了这个变量的意图：它最终很可能赋值为对象。

```javascript
typeof null; // object
```

这样就可以和undefined区分开了

#### 1.7.5 && 1.7.6 字面量写法

3行代码就可阐述作者这两小节的意思：
```javascript
// good
var object = {}
var array = []
```
【注】不知道翻译的人为啥要把`字面量`翻译成`直接量`，看了半天才明白啥叫`直接量`。个人觉得这两小节叫做`1.8 引用类型变量`更为恰当。

## 2. 注释

### 2.1 单行注释
```javascript
// 好的写法
if (con) {
  
    // 如果代码执行到这，则表明通过了所有的安全性检查
    allowed()；
}

// 其他语句的注释
```
注意缩进，前后空格，空行即可

### 2.2 多行注释
TODO
[文档注释概览](http://www.cnblogs.com/boring09/p/4274893.html)
http://zh-google-styleguide.readthedocs.io/en/latest/google-cpp-styleguide/comments/
