> https://github.com/muwenzi/Program-Blog/issues/9

angular.element将DOM元素或者HTML字符串包装成一个jQuery元素。ele即包装成jquery对象的html字符串或者dom元素。

> angular.element(ele);
- [官方API文档](https://code.angularjs.org/1.2.29/docs/api/ng/function/angular.element)
- [jQuery API 中文文档](http://www.jquery123.com/)
- [angular.element和$document的使用方法分析](https://github.com/muwenzi/Blog/issues/10)
## jqLite API汇总

| 序号 | 方法 | 说明 |
| :-- | :-- | :-- |
| 1 | [addClass()](http://www.jquery123.com/addClass/) | 为每个匹配的元素添加指定的样式类名 |
| 2 | after() | 在匹配元素集合中的每个元素后面插入参数所指定的内容，作为其兄弟节点 |
| 3 | append() | 在每个匹配元素里面的末尾处插入参数内容 |
| 4 | attr() | 获取匹配的元素集合中的第一个元素的属性的值 |
| 5 | bind() | 为一个元素绑定一个事件处理程序 |
| 6 | [children()](http://www.jquery123.com/children/) | 获得匹配元素集合中每个元素的子元素，选择器选择性筛选 |
| 7 | clone() | 创建一个匹配的元素集合的深度拷贝副本 |
| 8 | contents() | 获得匹配元素集合中每个元素的子元素，包括文字和注释节点 |
| 9 | css() | 获取匹配元素集合中的第一个元素的样式属性的值 |
| 10 | data() | 在匹配元素上存储任意相关数据 |
| 11 | detach() | 从DOM中去掉所有匹配的元素 |
| 12 | empty() | 从DOM中移除集合中匹配元素的所有子节点 |
| 13 | [eq()](http://www.jquery123.com/eq/) | 减少匹配元素的集合为指定的索引的哪一个元素 |
| 14 | [find()](http://www.jquery123.com/find/) | 通过一个选择器，jQuery对象，或元素过滤，得到当前匹配的元素集合中每个元素的后代 |
| 15 | hasClass() | 确定任何一个匹配元素是否有被分配给定的（样式）类 |
| 16 | html() | 获取集合中第一个匹配元素的HTML内容 |
| 17 | next() | 取得匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合。如果提供一个选择器，那么只有紧跟着的兄弟元素满足选择器时，才会返回此元素 |
| 18 | on() | 在选定的元素上绑定一个或多个事件处理函数 |
| 19 | off() | 移除一个事件处理函数 |
| 20 | one() | 为元素的事件添加处理函数。处理函数在每个元素上每种事件类型最多执行一次 |
| 21 | parent() | 取得匹配元素集合中，每个元素的父元素，可以提供一个可选的选择器 |
| 22 | prepend() | 将参数内容插入到每个匹配元素的前面（元素内部） |
| 23 | prop() | 获取匹配的元素集中第一个元素的属性（property）值 |
| 24 | [ready()](http://www.jquery123.com/ready/) | 当DOM准备就绪时，指定一个函数来执行 |
| 25 | remove() | 将匹配元素集合从DOM中删除。（同时移除元素上的事件及 jQuery 数据。） |
| 26 | removeAttr() | 为匹配的元素集合中的每个元素中移除一个属性（attribute） |
| 27 | removeClass() | 移除集合中每个匹配元素上一个，多个或全部样式 |
| 28 | removeData() | 在元素上移除绑定的数据 |
| 29 | replaceWith() | 用提供的内容替换集合中所有匹配的元素并且返回被删除元素的集合 |
| 30 | text() | 得到匹配元素集合中每个元素的合并文本，包括他们的后代 |
| 31 | toggleClass() | 在匹配的元素集合中的每个元素上添加或删除一个或多个样式类,取决于这个样式类是否存在或值切换属性。即：如果存在（不存在）就删除（添加）一个类 |
| 32 | triggerHandler() | 为一个事件执行附加到元素的所有处理程序 |
| 33 | unbind() | 从元素上删除一个以前附加事件处理程序 |
| 34 | val() | 获取匹配的元素集合中第一个元素的当前值 |
| 35 | wrap() | 在每个匹配的元素外层包上一个html元素 |
## AngularJS 动态添加元素和删除元素

``` javascript
//通过$compile动态编译html

var html="我是后添加的";
var template = angular.element(html);
var mobileDialogElement = $compile(template)($scope);
angular.element("#"+id).append(mobileDialogElement); // remove移除创建的元素

var closeMobileDialog = function () {
    if (mobileDialogElement) {  
    mobileDialogElement.remove();
}
```

angular.element把Dom元素或者HTML的字符串包装成jQuery对象，假如你在angular之前引用了jQuery，那么这就相当于jQuery的选择器了，你也可以把jQuery的一些dom操作对他使用；那么如果你就是这么任性，不引用jQuery呢？别着急，ng自带jqLite，上面也把jqLite对这个方法包装成的对象提供的一些方法都列出来了，不过毕竟是轻量版的，功能没那么齐全，如需更多操作，可以考虑引入jQuery文件。
