> https://github.com/muwenzi/Program-Blog/issues/42

## 问题描述

### Web端
![image](https://user-images.githubusercontent.com/12554487/37186541-0de1a3c0-2381-11e8-9d4c-d0ee9d2d0fe3.png)

### 移动端
![image](https://cloud.githubusercontent.com/assets/12554487/19838265/762bb6ba-9f06-11e6-9de5-1047ad489f91.png)

## 滚动

全局滚动：滚动条在body节点或者更顶层 
局部滚动：在body下的某一个dom节点上

在iOS下： 
全局滚动：默认支持 
局部滚动：默认没有滚动条，切滑动起来干涩

局部滚动使用弹性滚动效果：

``` css
body{  
  -webkit-overflow-scrolling:touch;
}
//局部滚动的dom节点
.scroll-el{
  overflow:auto;
}
```

建议：将属性挂在body上，可以避免很多奇怪的bug

Android上： 
定制版本比较多，表现各异，默认没有弹性滚动效果，且 -webkit-overflow-scrolling 默认浏览器不支持

## 出界问题

比如在微信里的页面，向上向下拉动常常会露出底色 

在iOS/Mac触控板滚动网页会引发出界：
全局滚动：滚动到页面顶部或底部时继续向下向上滑动，就会出现 
局部滚动：滚动到页面顶部或底部时，手指离开停下，再继续向下向上滑动，就会出现

解决方法：
局部滚动：使用scrollFix

``` javascript
if(startTopScroll <= 0)  
  elem.scrollTop = 1;
if(startTopScroll + elem.offsetHeight >= elem.scrollHeight )  
  elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
```

当底部有固定部分时，拉动页面也会引发出界。

解决方法： 页面的固定区域禁止touchmove默认事件
```js
// ref https://github.com/WICG/EventListenerOptions/pull/30
function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        }));
    } catch(e) {}
    return supportsPassiveOption;
}

// ref https://github.com/cubiq/iscroll/blob/master/demos/scrollbars/index.html
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
	capture: false,
	passive: false
} : false);
```

需要配合页面定位布局以及`overflow`属性来使用，详情请参考 https://github.com/cubiq/iscroll/blob/master/demos/scrollbars/index.html

但是全局滚动暂时没有更好的方法，可以考虑把全局滚动改成局部滚动。 从ios8以后safari的出界部分的背景色和body的背景色保持一致，之前的出界颜色是黑色

在android下使用局部滚动，会导致滚动条异常显示，且不流畅，所以在android下只能使用全局滚动！

如果在顶部、底部有固定的部分，中间内容区域滚动怎么变成全局滚动呢？

``` css

.top{
  top:0;
  left:0;
  height:60px;
  width:100%;
  position:fixed;
}
.bottom{
  bottom:0;
  left:0;
  height:60px;
  width:100%;
  position:fixed;
}
.content{
  padding-top:60px;  //此处可以用padding值填充上下固定部分，从而达到局部变全局的目的
  padding-bottom:60px;
}
```

流畅滚动的N条军规：
1. body上加上 -webkit-overflow-scrolling: touch
2. iOS尽量使用局部滚动
3. iOS引进scrollFix避免出界
4. android下尽量使用全局滚动： 
   - 尽量不用 overflow：auto 
   - 使用min-height：100% 替代 height：100%；
5. iOS下带有滚动条且position: absolute 的节点不要设置背景色

## Tips

**移动端的解决方案来源于网上没有测试过，仅供参考。web端的解决方案如下建议：**

1. 把`<body>`设置`overflow:hidden`用`fixed`布局导航栏可以完全固定住导航拦（布局效果大致如下图，注意滚动条的位置），导航栏不会出现橡皮筋效果，但内容块向上滚动的时候会有橡皮筋效果（chrome没有，safari会有），但是这个问题也不大，相比导航栏露底色好了很多。

![image](https://user-images.githubusercontent.com/12554487/37186597-51710dd8-2381-11e8-8185-1c3896560992.png)

1. 如果要想完全解决该问题，可以利用第三方比较成熟的库：[iscroll(~4kb)](https://github.com/cubiq/iscroll) 在线示例：http://lab.cubiq.org/iscroll5/demos/scrollbars/

## 参考资料
- [iOS safari 如何阻止“橡皮筋效果”？](https://www.zhihu.com/question/22256539)
- [移动端H5经验总结](http://www.silent-lavender.cn/yi-dong-duan-h5jing-yan-zong-jie/)
- [css属性对浏览器的影响](https://csstriggers.com/)
- [微信里面防止下拉"露底"组件](http://www.cnblogs.com/yuanzm/p/4849568.html)
