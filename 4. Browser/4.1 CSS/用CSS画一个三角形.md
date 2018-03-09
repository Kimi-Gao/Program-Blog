在平时开发中经常会遇到要画这样的一个图形：
![image](https://cloud.githubusercontent.com/assets/12554487/23733612/efa6eb7c-04b4-11e7-9918-ad5d21563658.png)

一般的做法是将它分为三部分：
左---中---右

画了一个简易的分析图
![image](https://cloud.githubusercontent.com/assets/12554487/23733687/496a02de-04b5-11e7-889b-8ef682fca50c.png)

那么就废话不多说，上代码：
```html
<html>
<head>
<style type="text/css">
   .container {
      overflow: hidden;
      font-size: 0;  // 兼容IE
   }
   div {
     float: left;
   }
   .test1 {
      width: 0;
      height: 0;
      border: 25px solid red;
      border-left-color: #fff;
    }
    .test2 {
      width: 80px;
      height: 50px;
      font-size: 12px;
      background-color: red;
    }
    .test3 {
      width: 0;
      height: 0;
      border: 25px solid #fff;
      border-left-color: red;
    }
</style>
</head>

<body>
<div class="container">
  <div class="test1"></div>
  <div class="test2"></div>
  <div class="test3"></div>
</div>
</body>

</html>
```

最终的效果：
![image](https://cloud.githubusercontent.com/assets/12554487/23733555/8f0e6a1a-04b4-11e7-8329-b3d23874e20b.png)

需要注意的是ie下会出现这样的情况：
![image](https://cloud.githubusercontent.com/assets/12554487/23733760/a0eb41ee-04b5-11e7-80ca-297c653ae6de.png)

所以需要在div上加`font-size:0`做兼容处理

其实这个很简单，主要是长时间不用会忘，在此总结一下。

其他方法，懒得折腾了= =

**参考资料**
1. [div Height: 0 problem in IE](http://stackoverflow.com/questions/2927337/div-height-0-problem-in-ie)