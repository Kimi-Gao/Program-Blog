# GitHub Flavored Markdown

GitHub 的 markdown 语法在标准的 markdown 语法基础上做了扩充，称之为`GitHub Flavored Markdown`。简称`GFM`，GFM 在 GitHub 上有广泛应用，除了README文件外，issues 和 wiki 均支持 markdown 语法。

## 锚点

> Github 并不支持 HTML 形式的锚点链接，它有自己的规则

可把鼠标放到 Github 的标题上进行观察，如下图

![image](https://static.oschina.net/uploads/img/201707/19103223_ugM1.png)

- 任意 1-6 个 # 标注的标题都会被添加上同名的锚点链接

```text
[标题1](#标题1) 
[标题2](#标题2) 
[标题3](#标题3) 

# 标题1
## 标题2
### 标题3
```

- 锚点跳转的标识名称，可使用任意字符，大写字母要转换成小写

```text
[Github标题1](#github标题1)

### Github标题1
```

- 多单词锚点的空格用 - 代替

```text
[Github 标题2 Test](#github-标题2-test)

### Github 标题2 Test
```

- 多级序号需要去除 .

```text
[2.3. Github 标题](#23-github-标题)

### 2.3. Github 标题
```

> :warning: 注意：
> - 非英文的锚点字符，在单击跳转时，在浏览器的 url 中会按照规则进行 encode 和 decode 。
> - issue 的这种方式锚点是不生效的。

## 参考资料

1. [Github 中 Markdown 锚点链接如何写（by whoru）](https://my.oschina.net/antsky/blog/1475173)
1. [快速生成Github README.md的目录（by 胖胖雕）](https://my.oschina.net/u/2424163/blog/1647414)
1. [GFM教程（by guodongxiaren）](https://github.com/guodongxiaren/README/blob/master/README.md)
1. [GitHub上README写法暨GFM语法解读（by guodongxiaren）](http://blog.csdn.net/guodongxiaren/article/details/23690801)
1. [markdownlint（by DavidAnson）](https://github.com/DavidAnson/markdownlint/blob/v0.8.1/doc/Rules.md)