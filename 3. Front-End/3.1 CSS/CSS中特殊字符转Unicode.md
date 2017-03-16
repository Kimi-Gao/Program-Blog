平时开发中，有可能在CSS写中文或特殊字符比如content等，有可能会出现乱码的问题

为了避免此类问题，平时写代码的时候可以使用以下的方法进行规避：

## 方法一：检查HTML文件，CSS文件的编码格式，统一编码
css文件头部加个`@charset "utf-8";`

## 方法二：转化为unicode
CSS，JS中尽量不要出现中文。如果一定要有，又怕出问题，可以将中文转化为unicode。

在线转化工具：
1. [Unicode code converter](https://r12a.github.io/apps/conversion/)
1. [Unicode编码转换](http://tool.chinaz.com/tools/unicode.aspx)

**参考资料**
1. [css before 中文乱码？segmentfault](https://segmentfault.com/q/1010000005744881)