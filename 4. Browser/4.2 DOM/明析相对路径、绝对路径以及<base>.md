在平时的开发过程中经常后遇到相对路径、绝对路径以及如何去匹配一个文件正确的路径问题，为了搞清这个问题，下面我们先以vue-cli@2生成的[vue2.0官方例子](https://github.com/vuejs/vue-hackernews-2.0)的目录结构做一下分析：

## 绝对路径
![image](https://cloud.githubusercontent.com/assets/12554487/20489764/aa17281e-b046-11e6-818a-f4145d6ee009.png)

在`index.template.html`文件中可以看到`8`、`10`、`11`分别都用到了路径
```html
8  <link rel="shortcut icon" sizes="48x48" href="/logo.png">
10 <link rel="manifest" href="/manifest.json">
11 <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,700' rel='stylesheet' type='text/css'>
```

第11行比较容易理解，第8、9行：
```
前端--> (表示) 服务器的根路径（例如：http://localhost:8080/)
后端-->（表示) 应用的根路径　(例如: http://localhost:8080/yourWebAppName/)
```

这里指根目录下的两个文件，也就是`绝对路径`。
```
绝对路径，以"/"开头。
```

## 相对路径
```
相对路径，开头不带"/"。它包括以"./"、"../"以及啥斜杠也没有的开头
```

相对路径的前后端表现是一致的。

![image](https://cloud.githubusercontent.com/assets/12554487/20508125/56c867be-b09a-11e6-9cf4-0455d8e093d8.png)

如上图第8行就是一个相对路径， `'../'`会跳到父目录所在的目录下寻找文件或文件夹

如果要在当前文件所在的目录下寻找就用`'./'`开头的相对路径或者直接`文件路径`前面啥也不加。

小结一下：
```
1. 父级目录：../index.html
2. 同级目录：./index.html，index.html
```

## base标签

```
HTML 的<base> 标签为页面上的所有链接的相对路径的基准。
```
完整的base路径包括：
```
协议://服务器地址:端口/Web应用的虚拟路径
```
但我可以只写`/Web应用的虚拟路径`

比如，我的网站地址是`http://muwenzi.com`，我想`http://muwenzi.com/film`路径下定位的是服务器应用根目录的`kimi`文件夹下文件，那么我在<head>标签下加上：
```html
<head>
    <meta charset="UTF-8">
    <title>电影推荐</title>
    <base href="/kimi/">
    <link rel="stylesheet" href="css/film.css">
</head>
```
这样link标签的href链接就会实际以应用的根目录下`kimi`文件夹为基准定位`css/film.css`。

也可以配置动态<base>标签：

```html
<base href="http://${pageContext.request.serverName }:${pageContext.request.serverPort}${pageContext.request.contextPath}/" />
```

注意事项：

（1）写在<head>标签内——写在所有URL之前

（2）<base>标签指定的基准仅对**相对路径**有效

（3）在 HTML 中，<base> 标签没有结束标签；在 XHTML 中，<base> 标签必须被正确地关闭。

**参考资料**
- [相对路径和绝对路径](http://www.cnblogs.com/solverpeng/p/5623405.html)
- [开发收获 <base href="<%=basePath%>">JSP页面中的相对路径问题](http://blog.csdn.net/xuan6251237011/article/details/16907251)
- [html相对路径变绝对路径（一个标签解决）](http://flysnowxf.iteye.com/blog/1460390)
- [相对路径和绝对路径](http://www.dreamdu.com/webbuild/relativepath_vs_absolutepath/)
