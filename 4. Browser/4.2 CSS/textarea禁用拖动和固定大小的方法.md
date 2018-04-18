HTML标签textarea在大部分浏览器中只要指定行（rows）和列（cols）属性，就可以规定 textarea 的尺寸，大小就不会改变，不过更好的办法是使用 CSS 的 height 和 width 属性,但是Chrome,Safari和FireFox渲染的效果不同，可以拖动右下角图标改变大小。但是过分拖动大小会影响页面布局，造成页面样式混乱。可以通过添加如下两个样式禁用拖动，固定大小：

### 1：彻底禁用拖动

```css
resize: none;
```

### 2：只是固定大小，右下角的拖动图标仍在
```css
width: 200px;
height: 100px;
max-width: 200px;
max-height: 100px;
```

## 属性

### wrap 属性
在文本输入区内的文本行间，用 "%OD%OA" （回车/换行）进行分隔。

可以通过 <textarea> 标签的 wrap 属性设置文本输入区内的换行模式。

通常情况下，当用户在输入文本区域中键入文本后，浏览器会将它们按照键入时的状态发送给服务器。只有用户按下 Enter 键的地方生成换行。

如果您希望启动自动换行功能（word wrapping），请将 wrap 属性设置为 virtual 或 physical。当用户键入的一行文本长于文本区的宽度时，浏览器会自动将多余的文字挪到下一行，在文字中最近的那一点换行。

**wrap="virtual"** 将实现文本区内的自动换行，以改善对用户的显示，但在传输给服务器时，文本只在用户按下 Enter 键的地方进行换行，其他地方没有换行的效果。

**wrap="physical"** 将实现文本区内的自动换行，并以这种形式传送给服务器，就像用户真的那样键入的。因为文本要以用户在文本区内看到的效果传输给服务器，因为使用自动换行是非常有用的方法。
如果把 wrap 设置为 off，将得到默认的动作。

**例子**

以下面这个例子为例,将 60 个字符的文本输入到一个 40 个字符宽的文本区域内：

```
word wrapping is  a feature that makes life easier for users.
```

如果设置为 wrap="wrap"，文本区会包含一行文本，用户必须将光标移动到右边才能看到全部文本，这时将把一行文本传送给服务器。

如果设置为 wrap="virtual"，文本区会包含两行文本，并在单词 "makes" 后面换行。但是只有一行文本被传送到服务器：没有嵌入新行字符。

如果设置为 wrap="physical"，文本区会包含两行文本，并在单词 "makes" 后面换行，这时发送给服务器两行文本，单词 "makes" 后的新行字符将分隔这两行文本。

### 其他属性
![image](https://cloud.githubusercontent.com/assets/12554487/22960992/824aa822-f37d-11e6-9f38-63cd1f64056f.png)

**参考资料**
- [textarea禁用拖动和固定大小的方法](http://www.tonitech.com/2093.html)
- [HTML <textarea> 标签](http://www.w3school.com.cn/tags/tag_textarea.asp)