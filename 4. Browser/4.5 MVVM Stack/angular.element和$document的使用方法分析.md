> https://github.com/muwenzi/Program-Blog/issues/10

AngularJs是不直接操作DOM的，但是在平时的开发当中，我们有的时候还是需要操作一些DOM的，如果使用原生的JS的话操作过于麻烦，所以大家一般都是使用jQuery，jQuery虽然好用，但是AngularJs是不建议和JQuery同时使用的，所以AngularJs给我们也提供了一些操作DOM的方法———jqLite

下面以addClass（）方法为例给大家讲解一下jqLite的使用：详细的API请参考[Angular's jqLite API汇总](https://github.com/muwenzi/Blog/issues/9)，可以看到使用方法是angular.element(ele)，其中，允许传入的参数ele的类型是“HTML string or DOMElement to be wrapped into jQuery.”一般传入参数DOMElement
## 方法一

``` javascript
var test = angular.element(document.querySelector(‘#testId’));

test.addClass(‘testClass’);
```

以原生js的document对象的querySelector方法获取元素的id，括号内的使用方法同jquery一致，#代表id，该方法返回的是当前div的DOMElement对象，通过angular.element方法即可将即转化为一个jQuery对象，从而对其操作。
## 方法二

``` javascript
var test = angular.element(document.getElementById(‘test’);

test.addClass(‘testClass’);
```

getElementById的方法相信大家用到的比较多，其返回的也是一个DOMElement对象
## 方法三

``` javascript
angular.forEach(angular.element(document).find('div'),function(node){        
    if(node.id == 'testId'){
         node.addClass('testClass');
    }
    if(node.className == ‘testClass’){
        node.removeClass(‘testClass’)
    }
})
```

find搜索的是tagName，这里使用的是div，当然也可以是p标签等等。
## 方法四：使用$document

注：不要忘记注入
$document就和angular.element(document)是一样的，是一个整体的dom结构树，包含jqlite的所有方法，所以方法三也可以改为：

``` javascript
angular.forEach($document.find('div'),function(node){
    if(node.id == 'testId'){
         node.addClass('testClass');
    } 
    if(node.className == ‘testClass’){
        node.removeClass(‘testClass’)
    }
})
```

另外**$document[0]和原生JS的document等效**
所以，方法一和方法二可以改为

``` javascript
var test = angular.element($document[0].querySelector(‘#testId’));

test.addClass(‘testClass’);
```

以及

``` javascript
var test = angular.element($document[0].getElementById(‘test’);

test.addClass(‘testClass’);
```
