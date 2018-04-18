## css reset
重置样式，清除浏览器默认样式，并配置适合设计的基础样式（强调文本是否大多是粗体、主文字色，主链接色，主字体等）。
```css
/* reset */
html,body,h1,h2,h3,h4,h5,h6,div,dl,dt,dd,ul,ol,li,p,blockquote,pre,hr,figure,table,caption,th,td,form,fieldset,legend,input,button,textarea,menu{margin:0;padding:0;}
header,footer,section,article,aside,nav,hgroup,address,figure,figcaption,menu,details{display:block;}
table{border-collapse:collapse;border-spacing:0;}
caption,th{text-align:left;font-weight:normal;}
html,body,fieldset,img,iframe,abbr{border:0;}
i,cite,em,var,address,dfn{font-style:normal;}
[hidefocus],summary{outline:0;}
li{list-style:none;}
h1,h2,h3,h4,h5,h6,small{font-size:100%;}
sup,sub{font-size:83%;}
pre,code,kbd,samp{font-family:inherit;}
q:before,q:after{content:none;}
textarea{overflow:auto;resize:none;}
label,summary{cursor:default;}
a,button{cursor:pointer;}
h1,h2,h3,h4,h5,h6,em,strong,b{font-weight:bold;}
del,ins,u,s,a,a:hover{text-decoration:none;}
body,textarea,input,button,select,keygen,legend{font:12px/1.14 arial,\5b8b\4f53;color:#333;outline:0;}
body{background:#fff;}
a,a:hover{color:#333;}
```

## css function
功能样式，从常用样式方法中抽离，按需使用。
```css
/* function */
.f-cb:after,.f-cbli li:after{display:block;clear:both;visibility:hidden;height:0;overflow:hidden;content:".";}
.f-cb,.f-cbli li{zoom:1;}
.f-ib{display:inline-block;*display:inline;*zoom:1;}
.f-dn{display:none;}
.f-db{display:block;}
.f-fl{float:left;}
.f-fr{float:right;}
.f-pr{position:relative;}
.f-prz{position:relative;zoom:1;}
.f-oh{overflow:hidden;}
.f-ff0{font-family:arial,\5b8b\4f53;}
.f-ff1{font-family:"Microsoft YaHei",\5fae\8f6f\96c5\9ed1,arial,\5b8b\4f53;}
.f-fs1{font-size:12px;}
.f-fs2{font-size:14px;}
.f-fwn{font-weight:normal;}
.f-fwb{font-weight:bold;}
.f-tal{text-align:left;}
.f-tac{text-align:center;}
.f-tar{text-align:right;}
.f-taj{text-align:justify;text-justify:inter-ideograph;}
.f-vam,.f-vama *{vertical-align:middle;}
.f-wsn{word-wrap:normal;white-space:nowrap;}
.f-pre{overflow:hidden;text-align:left;white-space:pre-wrap;word-wrap:break-word;word-break:break-all;}
.f-wwb{white-space:normal;word-wrap:break-word;word-break:break-all;}
.f-ti{overflow:hidden;text-indent:-30000px;}
.f-ti2{text-indent:2em;}
.f-lhn{line-height:normal;}
.f-tdu,.f-tdu:hover{text-decoration:underline;}
.f-tdn,.f-tdn:hover{text-decoration:none;}
.f-toe{overflow:hidden;word-wrap:normal;white-space:nowrap;text-overflow:ellipsis;}
.f-csp{cursor:pointer;}
.f-csd{cursor:default;}
.f-csh{cursor:help;}
.f-csm{cursor:move;}
.f-usn{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none;}
```

## css media
通过媒体查询为不同的设备和大小配置不同的样式。
```css
/* media */
/* 横屏 */
@media screen and (orientation:landscape){
}
/* 竖屏 */
@media screen and (orientation:portrait){
}
/* 窗口宽度<960,设计宽度=768 */
@media screen and (max-width:959px){
}
/* 窗口宽度<768,设计宽度=640 */
@media screen and (max-width:767px){
}
/* 窗口宽度<640,设计宽度=480 */
@media screen and (max-width:639px){
}
/* 窗口宽度<480,设计宽度=320 */
@media screen and (max-width:479px){
}
/* windows UI 贴靠 */
@media screen and (-ms-view-state:snapped){
}
/* 打印 */
@media print{
}
```

## css animation
常见动画效果的集合，主要用于效果演示和参考（[点击查看代码库演示](http://nec.netease.com/library/category/#animation)），也可以直接调用。
代码展示（部分）
```css
/* animation */
/* 淡入 */
.a-fadein{-webkit-animation-name:fadein;-moz-animation-name:fadein;-ms-animation-name:fadein;animation-name:fadein;}
/* define */
/* 淡入 */
@-webkit-keyframes fadein{
    0%{opacity:0;}
    100%{opacity:1;}
}
@-moz-keyframes fadein{
    0%{opacity:0;}
    100%{opacity:1;}
}
@-ms-keyframes fadein{
    0%{opacity:0;}
    100%{opacity:1;}
}
@keyframes fadein{
    0%{opacity:0;}
    100%{opacity:1;}
}
```
[完整代码](http://nec.netease.com/download/framework/animation.css)

**参考资料**
- [NEC](http://nec.netease.com/framework)