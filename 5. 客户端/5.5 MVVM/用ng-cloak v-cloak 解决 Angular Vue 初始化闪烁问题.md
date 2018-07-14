> https://github.com/muwenzi/Program-Blog/issues/46

Vue在很大程度上和Angular有惊人的相似，我觉得它才是真正的Angular2.0，就连处理`{{}}`、`ng-show`、`ng-if`等初始化的时候手法都堪称一模一样。

## 问题描述和原因分析
由于他们都用到了字符模板和条件判断等，在Angular/Vue没有载入进来的时候，DOM已经开始渲染了，所以`{{}}`、`ng-show`、`ng-if`代码块在最初0.几秒的时候会有一个闪烁

## 解决办法
用ng-cloak或者v-cloak指令，在<head>标签第一行（放在最开始效果比较好），写一个样式：
```html
<style type="text/css">[ng-cloak]{display:none}</style>
```
```html
<style type="text/css">[v-cloak]{display:none}</style>
```
在angular挂载的根节点比如`<body>`上写上`ng-cloak`，即`<body ng-cloak>`。如果碰到这种情况的节点不多，可以在相应的节点上加`ng-cloak`，可以加快渲染速度，不过这种速度差距非常小，为了省事，一般放在`<body>`上即可。

## 释义
最后为了深刻记住这个小技巧，附图解释一下`cloak`的意思
![image](https://cloud.githubusercontent.com/assets/12554487/20084835/efa3194e-a59f-11e6-9c3f-fd5d951f6205.png)

让我想起了**奇异博士**里的调皮可爱帅气的斗篷

![image](https://cloud.githubusercontent.com/assets/12554487/20084938/8ec02148-a5a0-11e6-963f-22436f77e217.png)

**参考资料**
1. [v-cloak API](https://cn.vuejs.org/v2/api/#v-cloak)
2. [奇异博士海报](https://movie.douban.com/photos/photo/2393507747/)
