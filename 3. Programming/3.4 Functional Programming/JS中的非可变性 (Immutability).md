> https://github.com/muwenzi/Program-Blog/issues/29

非可变性是函数式编程的一个核心规则，对于面向对象编程也有很多用处。
## 什么是非可变性？（Immutability）

如果用非可变性来形容一个对象，对么这个对象的特点是：**这个对象在创建之后不会被修改**。JS中很多值是非可变的，例如：

``` javascript
var statement = "I am an immutable value";
var otherStr = statement.slice(8, 17);
```

在执行完以上代码后，`statement`的值并不会改变。实际上JS中所有字符串方法都不会改变原字符串，而是返回新的字符串。因为字符串是非可变的--不能被修改，只能创建新的字符串。在JS中不只有字符串是非可变，普通的数值也是非可变的。`2 + 3`并不会改变`2`的值。
