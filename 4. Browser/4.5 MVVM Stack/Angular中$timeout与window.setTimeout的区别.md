> https://github.com/muwenzi/Program-Blog/issues/87

## $timeout的用法

angular.js的$timeout指令对window.setTimeout做了一个封装，它的返回值是一个promise对象。当定义的时间到了以后，这个promise对象就会被resolve,回调函数就会被执行。

如果需要取消一个timeout，调用$timeout.cancel(promise)方法。

用法:

```javascript
$timeout(fn, [delay], [invokeApply])；
```

fn: 回调函数(必填)

delay: number类型。延迟的时间(非必填)，如果不填，表示等线程空下来以后就执行，比如当页面被渲染完成后。

invokeApply: 布尔值。是否需要进行脏值检测(非必填)，不填默认为false，如果设置为true，则fn回调会被包在$scope.$apply()中执行。

返回值: 返回一个promise对象。当定义的时间到了以后，这个promise对象就会被resolve，resolve的值就是fn回调函数的返回值。

方法:

$timeout.cancel([promise])

promise: 一个由$timeout()所创建的promise对象(非必填)。调用cancel()以后，这个promise对象就会被reject。

返回值: 如果$timeout()的回调还没有被执行，那就取消成功，返回true

下面来简单的测试一下:

```javascript
var timeoutApp = angular.module('timeoutApp',[]);
      timeoutApp.run(function($timeout){
          var a = $timeout(function(){
              console.log('执行$timeout回调');
              return 'angular'
          },1000);
          a.then(function(data){
              console.log(data)
          },function(data){
              console.log(data)
          });
          //$timeout.cancel(a);
      })
```

运行以后看到控制台打印:

```text
执行$timeout回调
angular
```

如果我打开注释，执行.cancel()方法，那么$timeout的回调就不会被执行，它返回的promise被reject，控制台打印:

```text
canceled
```

## 示例

下面做个很实用的小demo: 延迟下拉菜单: 鼠标放到button上的时候，延迟500毫秒显示下拉菜单，当鼠标离开button的时候，延迟500毫秒隐藏下拉菜单，如果鼠标是进入了下拉菜单部分，那么就不隐藏下拉菜单。如果鼠标离开了下拉菜单，延迟500毫秒隐藏下拉菜单,如果鼠标是进入了button，那么还是不隐藏下拉菜单。

html:

```html
<!DOCTYPE html>
<html ng-app="timeoutApp">
<head>
    <title>$timeout服务</title>
    <meta charset="utf-8">
    <link rel="stylesheet" href="../bootstrap.css"/>
    <script src="../angular.js"></script>
    <script src="script.js"></script>
    <style type="text/css">
    * {
      font-family:'MICROSOFT YAHEI'
    }
    </style>
</head>
<body >

  <div ng-controller="myCtrl">
      <div class="dropdown" dropdown >
          <button class="btn btn-default dropdown-toggle" type="button" ng-mouseenter = "showMenu()" ng-mouseleave = "hideMenu()">
              Dropdown
              <span class="caret"></span>
          </button>
          <ul class="dropdown-menu" ng-show="ifShowMenu" ng-mouseenter = "showMenu()" ng-mouseleave = "hideMenu()">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li><a href="#">Separated link</a></li>
          </ul>
      </div>
  </div>

</body>
</html>
```

JS:

```javasrcipt
var timeoutApp = angular.module('timeoutApp',[]);
timeoutApp.controller('myCtrl',function($scope){
    $scope.ifShowMenu = false;
});
timeoutApp.directive('dropdown',function($timeout){
    return {
        restrict:"EA",
        link:function(scope,iele,iattr){
            scope.showMenu = function(){
                $timeout.cancel(scope.t2);
                scope.t1 = $timeout(function(){
                    scope.ifShowMenu = true
                },500)
            };
            scope.hideMenu = function(){
                $timeout.cancel(scope.t1);
                scope.t2 = $timeout(function(){
                    scope.ifShowMenu = false
                },500)
            };
        }
    }
})
```

代码应该很好理解: 就是进入button和进入ul下拉菜单的时候，都定义一个timeout回调(过500毫秒以后显示下拉菜单)，同时取消隐藏下拉菜单的回调，而离开button和ul的时候相反。

## Angular中$timeout与window.setTimeout的区别

1. 在$timeout中传入的函数会被包含在try...catch中，并且在异常时将异常交给$exceptionHandler

2. window.setTimeout返回的是数字id，可以通过window.clearTimeout(id)取消，而$timeout返回的是promise对象，要取消要用$timeout.cancel(返回的promise对象)。

3. $timeout传入的function会更新作用域内的数据绑定，也就是说在function中对$scope的修改会触发更新，而window.setTimeout中对$scope的修改不会触发更新。当然$timeout有第三个参数，默认为true，如果传入false，则不会更新当前作用域的数据绑定。

## 参考资料

1. [Angular JS中$timeout的用法及其与window.setTimeout的区别](http://www.cnblogs.com/xiaxianfei/p/5729444.html)
1. [说说Angular中的$timeOut定时器](http://www.html-js.com/article/AngularJS-tips-about-Angular-timeOut-timer)