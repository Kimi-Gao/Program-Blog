> https://github.com/muwenzi/Program-Blog/issues/23

## 前言

几乎所有的编程语言都原生支持数组类型，因为数组是最简单的内存数据结构。javascript也有数组类型，而数组呢，其实就是一种特殊的栈或是队列，利用Javascript Array所内置的API可以很方便的模拟栈和队列。

我想对于数组每一个学过编程语言的都不会陌生吧，我们知道，我们可以在数组的任意位置添加或是删除元素，然而，有时候我们还需要一种在添加或是删除元素的时候有**更多控制**的数据结构。有两种数据结构类似于数组。但在添加或是删除元素的时候更为的**可控**。他们就是栈和队列。

本文主要讨论**栈**的定义、应用和实现。

## 栈的定义和应用
```
栈是限定仅在表尾进行插入和删除操作的线性表
```
**栈遵从后进先出(LIFO)原则的有序集合新添加的或是待删除的元素都保存在栈的末尾。我们称作栈顶，而另一端我们称作栈底。栈是一种特殊的线性表，栈元素具有线性关系，即前驱后继关系**

在现实生活中就有很多栈的例子，比如下图的书本，这一摞书如果要取肯定是先去最上面的那一本，但它是最后一个放上去的，也就是栈顶的元素都是待添加或是待删除的。这就是后进先出的实际例子。

![image](https://cloud.githubusercontent.com/assets/12554487/20453370/acbd9714-ae5d-11e6-8945-3532e27323dc.png)

弹夹式手枪中弹夹的设计其实就是栈思想的一个应用

![image](https://cloud.githubusercontent.com/assets/12554487/20454079/f4bb175e-ae70-11e6-9721-7d9ca0562f52.png)

Chrome中的后退按钮

![image](https://cloud.githubusercontent.com/assets/12554487/20454105/733ec3e6-ae71-11e6-9ee9-75829085ee1a.png)

还有很多类似的软件，比如微信打开某个网页或者某个聊天界面左上角会有返回按钮，还有Word、PS等都有撤销（undo）的操作，他们都是用栈来实现的。

**另外要注意**的是，进栈出栈变化的问题，不一定最先进入的元素就最后出栈，因为它并没有对进出的时间顺序做限制，比如：1，2，3依次进栈，会有很多种情况，1进1出2进3进3出2出，出栈顺序就是`132`，但要注意不会出现`312`这样的次序。

## 栈的顺序存储结构的实现

首先我们先创建一个类：
```javascript
class Stack{
  //各种属性和方法的声明
}
```

然后我们需要一种数据结构来保存栈里面的数据：

```javascript
constructor() {
  this.items = []
}
```

接下来，我们需要给栈声明一些方法：

- push(element): 添加一个或是几个新元素到栈顶。
- pop(): 移除栈顶的元素，同时返回被移除元素。
- peek(): 返回栈顶的元素，但并不对栈顶的元素做出任何的修改。
- isEmpty(): 检查栈内是否有元素，如果有返回true，没有返回false。
- size(): 返回栈的元素个数。
- clear(): 清除栈里的元素。
- print(): 打印栈里的元素。

### 栈的完整代码 (JS版)

我们通过Javascript提供的API，实现栈如下：

```javascript
class Stack {
  constructor() {
    this.items = []
  }
  push(...values) {
    this.items.push(...values)
  }
  pop() {
    return this.items.pop()
  }
  peek() {
    return this.items[this.items.length - 1]
  }
  isEmpty() {
    return this.items.length == 0
  }
  size() {
    return this.items.length
  }
  clear() {
    this.items = []
  }
  print() {
    console.log(this.items.toString())
  }
}
```
使用栈前，先实例化一个对象
```javascript
let stack = new Stack()

stack.push(3, 9, 5)
console.log(stack.peek())   // 5
stack.pop()
stack.print()  //  3, 9
```