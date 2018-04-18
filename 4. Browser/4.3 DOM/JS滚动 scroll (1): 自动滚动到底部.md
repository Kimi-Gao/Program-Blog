在发消息的时候，往往消息框会自动滚动到最后一条消息的位置。如以下的一个案例：

// todo

查询了一下相关的资料，Div没有自动滚动的属性，只能模拟鼠标的滚动来现实想要的效果。

关键的部分部分在这里：div.scrollTop = div.scrollHeight;

下面是具体实现的精简代码：

```html
<html>
<body>
    <div id="divDetail" style="overFlow-y:scroll; width:250px;height: 200px;">
        <table style="border:1px solid; ">
        <tr><td>id</td><td>name</td><td>age</td><td>memo</td></tr>
        <tr><td>000001</td><td>name1</td><td>24</td><td>memomemomemomemomemo</td></tr>
        <tr><td>000002</td><td>name2</td><td>23</td><td>memomemomemomemomemo</td></tr>
        <tr><td>000003</td><td>name3</td><td>23</td><td>memomemomemomemomemo</td></tr>
        <tr><td>000004</td><td>name4</td><td>23</td><td>memomemomemomemomemo</td></tr>
        <tr><td>000005</td><td>name5</td><td>23</td><td>memomemomemomemomemo</td></tr>
        <tr><td>000002</td><td>name2</td><td>23</td><td>memomemomemomemomemo</td></tr>
        <tr><td>000003</td><td>name3</td><td>23</td><td>memomemomemomemomemo</td></tr>
        <tr><td>000004</td><td>name4</td><td>23</td><td>memomemomemomemomemo</td></tr>
        <tr><td>000005</td><td>name5</td><td>23</td><td>memomemomemomemomemo</td></tr>
        </table>
    </div> 
</body>
<script type="text/javascript" defer>
    var div = document.getElementById('divDetail'); 
    
    div.scrollTop = div.scrollHeight; 
    //alert(div.scrollTop);
</script>
</html>
```

**参考资料**
- [Javascript实现DIV滚动自动滚动到底部](http://www.cnblogs.com/meil/archive/2012/03/01/2374992.html)