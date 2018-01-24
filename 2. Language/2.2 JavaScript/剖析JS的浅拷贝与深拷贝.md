## 何为浅拷贝和深拷贝？

浅拷贝和深拷贝只针对像`Object`, `Array` 这样的复杂对象的。简单来说
>浅拷贝，只对其第一层基础类型的属性进行复制开辟新空间，引用类型只存地址，指向同一块空间
>深拷贝，则递归复制了所有层级，全部开辟新的空间，不会影响先前的对象

下面再深入理解这两句话

## 正常赋值

先抛开浅拷贝和深拷贝，看一下正常的赋值情况：
```js
let x = {
    a: 1,
    b: { z: 0 }
};
let y = x
y === x   // true，代表它们指向同一块空间
y.a === x.a   // true
y.a = 2
x.a  // 2 x的值也发生的改变
y.b === x.b   // true，代表它们指向同一块空间
x.b.z = 100
y.b.z     // 100
```
内存地址分布如图1所示：

![image](https://user-images.githubusercontent.com/12554487/28048699-3460ae84-6625-11e7-992c-ae5fe1d8e542.png)
（图1）


## 浅拷贝
下面是一个简单的浅拷贝实现：
```js
function shallowCopy(src) {
  let dst = {};
  for (var prop in src) {
    if (src.hasOwnProperty(prop)) {
      dst[prop] = src[prop];
    }
  }
  return dst;
}
let obj = { a:1, arr: [2,3] };
let shallowObj = shallowCopy(obj);
```
因为浅复制只会将对象的各个属性进行依次复制，并不会进行递归复制，而 JavaScript 存储对象都是存地址的，所以浅复制会导致 obj.arr 和 shallowObj.arr 指向同一块内存地址，大概的示意图如下。

![image](https://user-images.githubusercontent.com/12554487/28029387-72018856-65d2-11e7-8253-780bd9e95021.png)
（图2）

导致的结果就是：
```js
shallowObj.arr[1] = 5;
obj.arr[1]   // = 5
```
以`lodash`v3.10.1的`_.clone`方法为例：
```js
let x = {
    a: 1,
    b: { z: 0 }
};
let y = _.clone(x);
y === x   // false，没有指向同一块空间
y.a === x.a   // true
y.a = 2
x.a  // 1，基础类型的值并没有改变，因为在y中新开辟了空间存储 
y.b === x.b   // true，包含的第一层元素若为引用类型则指向同一块空间
x.b.z = 100
y.b.z     // 100
```
可以结合图2理解

## 深拷贝
深拷贝则不同，它不仅将原对象的各个属性逐个复制出去，而且将原对象各个属性所包含的对象也依次采用深复制的方法**递归复制**到新对象上。这就不会存在上面 obj 和 shallowObj 的 arr 属性指向同一个对象的问题。
```js
let obj = { a:1, arr: [1,2] };
let obj2 = deepCopy(obj);
```
结果如下面的示意图所示：

![image](https://user-images.githubusercontent.com/12554487/28029358-5bbb6e86-65d2-11e7-98bf-943ef8eec8c1.png)
（图3）

下面以`lodash`的`_.cloneDeep`方法为例进行说明：
```js
let x = {
    a: 1,
    b: { z: 0 }
};
let y = _.cloneDeep(x);
y === x   // false
y.a === x.a   // true
y.b === x.b   // false
x.b.z = 100
y.b.z     // 0
```
可以结合图3理解

深拷贝对象的一个实现：
对于非引用值类型的数值，直接赋值，而对于引用值类型（object）还需要再次遍历，递归赋值。
```js
var cloneObj = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};
```

最简单的深拷贝：

```js
b = JSON.parse(JSON.stringify(a))
```
不过这有局限性：

- 无法复制函数
- 原型链没了，对象就是object，所属的类没了。

但是他简单呀，大多时候完全可以满足需求了

需要注意的是，如果对象比较大，层级也比较多，深复制会带来性能上的问题。在遇到需要采用深复制的场景时，可以考虑有没有其他替代的方案。在实际的应用场景中，也是浅复制更为常用。

// 未完待续

**参考资料**
1. [javascript中的深拷贝和浅拷贝？知乎（邹润阳、青笠、Mark）](https://www.zhihu.com/question/23031215)
1. [Javascript中的一种深复制实现](http://jerryzou.com/posts/deepcopy/)
1. [深入剖析 JavaScript 的深复制](http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)
1. [lodash cloneDeep](http://lodashjs.com/docs/#_clonedeepvalue-customizer-thisarg)
1. [结构化克隆算法 mozilla](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)
1. [JAVASCRIPT深拷贝(DEEPCLONE)](http://hao.jser.com/archive/11640/)
1. [jQuery .clone方法](http://www.jquery123.com/clone/)