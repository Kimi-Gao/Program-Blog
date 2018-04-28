> https://github.com/muwenzi/Program-Blog/issues/121

## 现象描述

img标签在HTML5和HTML4.0.1的严格模式渲染的时候，下面会有几像素的空白，如图所示：

<img width="393" alt="image" src="https://user-images.githubusercontent.com/12554487/39394007-df3ba098-4afe-11e8-854b-c1100bf269a8.png">

## 原因

图片默认是行内元素（`inline-block`），行内元素默认是`baseline`对齐的，和底部会有一段距离。如图所示：

![image](https://user-images.githubusercontent.com/12554487/39394006-d50dd5dc-4afe-11e8-9a76-028b9a2496b8.png)

## 解决方法

解决方法有很多种，根据场景需要选择合适的处理方式

### 1. img标签增加vertical-align:top

```css
img {
  vertical-align: top;
}
```

### 2. img标签的父标签增加font-size:0;

```css
.parent {
  font-size: 0;
}
```

### 3. img标签增加display:block;

```css
img {
  display:block;
}
```

## After fixed

<img width="389" alt="image" src="https://user-images.githubusercontent.com/12554487/39394023-118d0212-4aff-11e8-94c6-bbe69f500d18.png">

### 参考资料

1. [著名的 img标签3像素问题](https://www.jianshu.com/p/1ccaf78bf508)
1. [img下几像素空白产生原因](https://segmentfault.com/q/1010000000441100)