## 间距问题
inline-block水平呈现的元素间，换行显示或空格分隔的情况下会有间距，如下demo所示：

![image](https://cloud.githubusercontent.com/assets/12554487/21287532/db3c7752-c4a8-11e6-81df-81ce704d7955.png)

```html
<style>
  .demo div {
    display: inline-block;
    padding: .5em 1em;
    background-color: #cad5eb;
  }
</style>

<div class="demo">
  <div>inline-block</div>
  <div>inline-block</div>
  <div>inline-block</div>
</div>
```
html标签中`display`属性默认为`inline-block`的包括：
```html
<input>
<button></button>
<select></select>
<textarea></textarea>
```
![image](https://cloud.githubusercontent.com/assets/12554487/21287657/b1f7e6c6-c4ab-11e6-8801-b6eac9778026.png)


## 消除间距的方法1——去掉标签之间的空格（最直接）

元素间留白间距出现的原因就是**标签段之间的空格**，因此，去掉标签段之间的空格，自然间距就木有了。考虑到代码可读性，显然连成一行的写法是不可取的，我们可以：
```html
<div class="demo">
  <div>inline-block</div><div
  >inline-block</div><div
  >inline-block</div>
</div>
```

或者

```html
<div class="demo">
  <div>inline-block</div><div>
  inline-block</div><div>
  inline-block</div>
</div>
```

或者是借助HTML注释：

```html
<div class="demo">
  <div>inline-block</div><!-- 
  --><div>inline-block</div><!-- 
  --><div>inline-block</div>
</div>
```

【注】这种方法虽然最直接，但是对于多人协作开发，不能要求其他开发者也使用这样的形式避免，所以要么提前约定统一这样操作，要么采用其他可以共用的“方法”。

## 消除间距的方法2——对父元素使用font-size:0

```html
<style>
  .demo {
    font-size: 0;
  }
  .demo div {
    font-size: 12px;
  }
</style>

<div class="demo">
  <div>inline-block</div>
  <div>inline-block</div>
  <div>inline-block</div>
</div>
```

奇怪？为什么font-size会对间隙有影响。我们知道space是由换行或回车所产生空白符所致，既然是字符当然无法摆脱font的控制。

【注】内部元素的font-size不要受父元素的影响。

## 小结
以上总结了两种我平时常用的方法，各有利弊，看情况选择使用，另外还有其他letter-spacing、word-spacing、margin-right负值等方法我觉得都不是很好，数值难记，不同浏览器或其他不同情况下也数值也不同，所以还是`font-size:0`好记点。还有一些去掉闭合标签这些的更是不可取，破坏了标准的结构我觉得是得不偿失，而且是div标签时候往往不是所预想的那样。

**参考资料**
- [去除inline-block元素间间距的N种方法](http://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/)

- [WEB基础之HTML的各个标签的默认样式](https://segmentfault.com/a/1190000006822049)

- [inline-block元素间间隙产生及去除详解](http://demo.doyoe.com/css/inline-block-space/)

- [有哪些好方法能处理 display: inline-block 元素之间出现的空格？知乎](https://www.zhihu.com/question/21468450)
