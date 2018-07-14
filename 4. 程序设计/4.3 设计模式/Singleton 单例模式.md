## 应用背景
>定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点

在 JavaScript 开发中，单例模式的用途同样非常广泛。试想一下，当我们单击登录按钮的时候，页面中会出现一个登录悬浮窗，而这个登录悬浮窗是唯一的，无论单击多少次登录按钮，这个浮窗都只会被创建一次，那么这个登录浮窗就适合用单例模式来创建。

## 实现单例模式
要实现一个标准的单例模式并不复杂，无非是用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象。代码如下:
```javascript
var Singleton = function( name ) { 
    this.name = name; 
    this.instance = null;
};
Singleton.prototype.getName = function() { 
    alert ( this.name );
};
Singleton.getInstance = function( name ) { 
    if ( !this.instance ) {
          this.instance = new Singleton( name ); 
    }
    return this.instance; 
};

var a = Singleton.getInstance( 'sven1' ); 
var b = Singleton.getInstance( 'sven2' );
alert(a===b); //true
```
或者
```javascript
var Singleton = function( name ){
    this.name = name;
};
Singleton.prototype.getName = function() { 
    alert ( this.name );
};
Singleton.getInstance = (function() { 
    var instance = null;
    return function( name ) {
        if (!instance) {
            instance = new Singleton(name);
        }
        return instance; 
    }
})();
```
我们通过 Singleton.getInstance 来获取 Singleton 类的唯一对象，这种方式相对简单，但有一个问题，就是增加了这个类的“**不透明性**”，Singleton 类的使用者必须知道这是一个单例类， 跟以往通过 new XXX 的方式来获取对象不同，这里要使用`Singleton.getInstance`来获取对象。

接下来顺便进行一些小测试，来证明这个单例类是可以的信赖的:
```javascript
var a = Singleton.getInstance( 'sven1' ); 
var b = Singleton.getInstance( 'sven2' );
alert(a===b); //true
```
虽然现在已经完成了一个单例模式的编写，但这段单例模式代码的意义并不大。下面我们将一步步编写出更好的单例模式。

##  透明的单例模式