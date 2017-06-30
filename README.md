文章均发布在[issues](https://github.com/muwenzi/Program-Blog/issues)中，仓库仅作为备份，欢迎阅读、交流和:star:

:point_right: [留言板块](https://github.com/muwenzi/Program-Blog/issues/91)

:envelope: mrgaonju@gmail.com

:copyright: [署名-非商业性使用-相同方式共享](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh)

## 目录结构

```
.
├── Dev Basic
│   ├── Tools                         # Shell、Git、IDE、Tips
│   └── Network                       # HTTP、Ajax、RESTful
├── Javascript
│   ├── Grammar                       # ES5、ES2015+、Babel、Webpack
│   ├── Data Structure & Algorithm    # 数据结构和算法
│   ├── Design Patterns               # 设计模式
│   └── Functional Programming        # 函数式编程
├── Front-End
│   ├── CSS                           # 盒模型、定位、字体图标、布局、动画
│   ├── DOM                           # HTML、Event、jQuery
│   ├── Frameworks                    # Angular、React、Vue
│   └── Mobile                        # Cordova、ReactNative、H5
├── Back-End
│   ├── NodeJS                        # npm、Koa、V8 Engine、微服务
│   └── DataBase                      # MySQL、MongoDB、Redis
│
└── Book Notes                        # 读书笔记
```

<h2 align="center">Part 1 Dev Basic</h2>

### 1. 基础工具

包括Shell、Git、IDE、Tips等

| 序号  | 标题                                                                   | 标签                                                                                  | 发布日期    |
| :--- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------- | ---------- |
| 1    | [Shell命令小结](https://github.com/muwenzi/Program-Blog/issues/7)               | [Shell](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2016-08-24 |
| 2    | [iTerm2快捷键](https://github.com/muwenzi/Program-Blog/issues/21)               | [Shell](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2016-09-09 |
| 3    | [iTerm之Solarized颜色主题配置](https://github.com/muwenzi/Program-Blog/issues/1) | [Shell](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2016-07-25 |
| 4    | [oh-my-zsh常用git命令](https://github.com/muwenzi/Program-Blog/issues/4)        | [Shell](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2016-08-16 |
| 5    | [oh-my-zsh常用插件](https://github.com/muwenzi/Program-Blog/issues/105)        | [Shell](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2017-06-30 |
| 6    | [oh-my-zsh问题汇总](https://github.com/muwenzi/Program-Blog/issues/15)          | [Shell](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2016-09-06 |
| 7    | [Mac系统问题和命令汇总](https://github.com/muwenzi/Program-Blog/issues/11)        | [Shell](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2016-08-29 |
| 8    | [Git生成SSH密匙](https://github.com/muwenzi/Program-Blog/issues/5)              | [Git](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AGit)     | 2016-08-24 |
| 9    | [Git常用操作小结](https://github.com/muwenzi/Program-Blog/issues/13)             | [Git](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AGit)     | 2016-08-31 |
| 10    | [Git合并多个commit](https://github.com/muwenzi/Program-Blog/issues/60)             | [Git](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AGit)     | 2016-11-25 |
| 11    | [用emoji表情提交代码指南](https://github.com/muwenzi/Program-Blog/issues/71)             | [Git](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AGit)     | 2016-12-20 |
| 12    | [Google 和 Baidu 搜索技巧](https://github.com/muwenzi/Program-Blog/issues/54)    | [Tips](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ATips)     | 2016-11-16 |
| 13    | [初识常见的开源许可证](https://github.com/muwenzi/Program-Blog/issues/65)    | [Tips](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ATips)     | 2016-12-07 |
| 14    | [vi/vim 快捷键小结](https://github.com/muwenzi/Program-Blog/issues/85)    | [Tips](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ATips)     | 2017-02-15 |
| 15    | [JS 程序员常用英语单词](https://github.com/muwenzi/Program-Blog/issues/97)    | [Tips](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ATips)     | 2017-06-13 |

### 2. 网络基础知识

包括HTTP/Ajax/OAuth/RESTful等

| 序号  | 标题                                                   | 标签                                                                                   | 发布日期 |
| :--- | :---------------------------------------------------- | :------------------------------------------------------------------------------------- | ------- |
| 1    | [HTTP协议的前身今世](https://github.com/muwenzi/Program-Blog/issues/35)  | [HTTP](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AHTTP) | 2016-10-17    |
| 2    | [常见HTTP响应状态码](https://github.com/muwenzi/Program-Blog/issues/40)  | [HTTP](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AHTTP) | 2016-10-30    |
| 3    | [localhost和127.0.0.1的异同](https://github.com/muwenzi/Program-Blog/issues/52)  | [HTTP](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AHTTP) | 2016-11-14    |
| 4    | [PUT 和 POST的区别](https://github.com/muwenzi/Program-Blog/issues/88)  | [HTTP](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AHTTP) | 2017-03-02    |
| 5    | [RESTful入门指南录](https://github.com/muwenzi/Program-Blog/issues/20)  | [RESTful](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ARESTful) | 2016-09-06    |

<h2 align="center">Part 2 JavaScript</h2>

### 1. Grammar

包括ES5/ES2015+/Babel/Webpack等

| 序号  | 标题                                                                     | 标签                                                                                        | 发布日期    |
| :--- | :----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------- |
| 1   | [ES2015+语言规范](https://github.com/muwenzi/Program-Blog/issues/38)    | [ES2015](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES2015)           | 2016-10-26       |
| 2   | [JavaScript History](https://github.com/muwenzi/Program-Blog/issues/43)    | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-10-30       |
| 3   | [Babel Plugin](https://github.com/muwenzi/Program-Blog/issues/39)    | [Babel](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ABabel)           | 2016-10-26       |
| 4    | [ES2015箭头函数初探](https://github.com/muwenzi/Program-Blog/issues/2)                | [ES2015](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES2015) | 2016-07-26 |
| 5    | [const装逼指法精解](https://github.com/muwenzi/Program-Blog/issues/72)                | [ES2015](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES2015) | 2017-01-05 |
| 6    | [setTimeout黑魔法](https://github.com/muwenzi/Program-Blog/issues/3)              | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-07-27 |
| 7    | [JS中奇葩的假值](https://github.com/muwenzi/Program-Blog/issues/14)                | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-09-01 |
| 8    | [JS中的数据类型及判断](https://github.com/muwenzi/Program-Blog/issues/17)           | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-09-06 |
| 9    | [Math对象中一些常用和奇葩的方法](https://github.com/muwenzi/Program-Blog/issues/19)   | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-09-06 |
| 10    | [Array数组相关操作小结](https://github.com/muwenzi/Program-Blog/issues/18)          | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-09-10 |
| 11    | [JSON对象的使用](https://github.com/muwenzi/Program-Blog/issues/25)                | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-09-23 |
| 12    | [JS拼接HTML字符串的方法及效率](https://github.com/muwenzi/Program-Blog/issues/24)    | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-09-20 |
| 13    | [JS是动态弱类型语言的理解](https://github.com/muwenzi/Program-Blog/issues/34)    | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-10-16       |
| 14   | [JavaScript Error Types](https://github.com/muwenzi/Program-Blog/issues/36)    | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-10-24       |
| 15   | [剖析JS的浅拷贝与深拷贝](https://github.com/muwenzi/Program-Blog/issues/62)    | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-11-30       |
| 16   | [slice 和 splice 的区别备忘](https://github.com/muwenzi/Program-Blog/issues/83)    | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2017-02-13       |
| 17   | [对===运算符的理解](https://github.com/muwenzi/Program-Blog/issues/93)    | [ES5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2017-03-16       |

### 2. Data Structure & Algorithm

数据结构和算法

| 序号  | 标题                                             | 标签                                                                                     | 发布日期 |
| :--- | :----------------------------------------------- | --------------------------------------------------------------------------------------- | ------- |
| 1    | [数据结构概述](https://github.com/muwenzi/Program-Blog/issues/28)                 | [数据结构](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | 2016-09-30 |
| 2    | [Array 数组](https://github.com/muwenzi/Program-Blog/issues/23)                 | [数据结构](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | 2016-09-13 |
| 3    | [Stack 栈](https://github.com/muwenzi/Program-Blog/issues/56)                      | [数据结构](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | 2016-11-19 |
| 4    | [Queue 队列](https://github.com/muwenzi/Program-Blog/issues/)                    | [数据结构](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 5    | [Graph 图](https://github.com/muwenzi/Program-Blog/issues/)                      | [数据结构](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 6    | [LinkedList 链表](https://github.com/muwenzi/Program-Blog/issues/)               | [数据结构](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 7    | [Tree 树](https://github.com/muwenzi/Program-Blog/issues/)                       | [数据结构](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 8    | [BinarySearchTree 二叉搜索树](https://github.com/muwenzi/Program-Blog/issues/)    | [数据结构](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 9   | [B Tree B树](https://github.com/muwenzi/Program-Blog/issues/)                    | [数据结构](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 10   | [Heap 堆](https://github.com/muwenzi/Program-Blog/issues/)                       | [数据结构](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 11    | [HashTable 哈希表](https://github.com/muwenzi/Program-Blog/issues/)              | [数据结构](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 12   | [算法概述](https://github.com/muwenzi/Program-Blog/issues/30)                       | [算法](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A算法)         | 2016-10-09       |
| 13   | [深入探讨两个整数的交换问题](https://github.com/muwenzi/Program-Blog/issues/31)                       | [算法](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A算法)         | 2016-10-09       |
| 14   | [Bubble Sort 冒泡排序](https://github.com/muwenzi/Program-Blog/issues/26)         | [算法](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A算法)                | 2016-09-28 |

### 3. Design Patterns

常用设计模式

| 序号  | 标题                                                                     | 标签                                                                                            | 发布日期    |
| :--- | :---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- |
| 1  | [Singleton 单例模式](https://github.com/muwenzi/Program-Blog/issues/45)         | [设计模式](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A设计模式)                | 2016-11-03 |

### 4. Functional Programming

函数式编程

| 序号  | 标题                                                                     | 标签                                                                                            | 发布日期    |
| :--- | :---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- |
| 1   | [JS中的非可变性 (Immutability)](https://github.com/muwenzi/Program-Blog/issues/29) | [函数式编程](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A函数式编程)      | 2016-09-30 |

<h2 align="center">Part 3 Front-End</h2>

### 1. CSS

包括CSS基础/CSS奇技淫巧等

| 序号  | 标题                                                                                | 标签                                                                                       | 发布日期     |
| :--- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | ---------- |
| 1   | [伪类和伪元素](https://github.com/muwenzi/Program-Blog/issues/67) | [CSS基础](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ACSS基础)      | 2016-12-09 |
| 2   | [去除inline-block元素间间距](https://github.com/muwenzi/Program-Blog/issues/69) | [CSS基础](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ACSS基础)      | 2016-12-17 |
| 3   | [css基础样式表](https://github.com/muwenzi/Program-Blog/issues/70) | [CSS基础](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ACSS基础)      | 2016-12-19|
| 4   | [textarea禁用拖动和固定大小的方法](https://github.com/muwenzi/Program-Blog/issues/84) | [CSS基础](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ACSS基础)      | 2017-02-15|
| 5   | [用CSS画一个三角形](https://github.com/muwenzi/Program-Blog/issues/89) | [CSS基础](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ACSS基础)      | 2017-03-09|
| 6   | [CSS中特殊字符转Unicode](https://github.com/muwenzi/Program-Blog/issues/92) | [CSS基础](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ACSS基础)      | 2017-03-16|
| 7   | [浏览器页面渲染错位问题追踪与解决](https://github.com/muwenzi/Program-Blog/issues/102) | [CSS基础](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ACSS3)      | 2017-06-21|

### 2. DOM

包括HTML/Event/jQuery

| 序号  | 标题                                                                                | 标签                                                                                       | 发布日期     |
| :--- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | ---------- |
| 1   | [明析相对路径、绝对路径以及base](https://github.com/muwenzi/Program-Blog/issues/58) | [HTML](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AHTML)      | 2016-11-22 |
| 2   | [HTML Cheat Sheet](https://github.com/muwenzi/Program-Blog/issues/95) | [HTML](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AHTML)      | 2017-05-26 |
| 3   | [事件流](https://github.com/muwenzi/Program-Blog/issues/55) | [Event](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AEvent)      | 2016-11-18 |
| 4   | [JS滚动 scroll (1): 自动滚动到底部](https://github.com/muwenzi/Program-Blog/issues/86) | [Event](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AEvent)      | 2017-02-19 |

### 3. 前端框架

包括Angular/React/Vue等

| 序号  | 标题                                                                                | 标签                                                                                       | 发布日期     |
| :--- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | ---------- |
| 1    | [用ES6/7语法来写兼容IE8的Angular1应用](https://github.com/muwenzi/Program-Blog/issues/8)       | [Angular](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AAngular) | 2016-08-26 |
| 2    | [Angular's jqLite API汇总](https://github.com/muwenzi/Program-Blog/issues/9)                | [Angular](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AAngular) | 2016-08-27 |
| 3    | [angular.element和$document的使用方法分析](https://github.com/muwenzi/Program-Blog/issues/10) | [Angular](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AAngular) | 2016-08-28 |
| 4    | [Angular中$timeout与window.setTimeout的区别](https://github.com/muwenzi/Program-Blog/issues/87) | [Angular](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AAngular) | 2017-02-20 |
| 5    | [React基本思想](https://github.com/muwenzi/Program-Blog/issues/32) | [React](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AReact) | 2016-10-09 |
| 6    | [React ES6 class 中的this 绑定问题](https://github.com/muwenzi/Program-Blog/issues/37) | [React](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AReact) | 2016-10-24 |
| 7    | [用ng-cloak/v-cloak 解决 Angular/Vue 初始化闪烁问题](https://github.com/muwenzi/Program-Blog/issues/46) | [Angular](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AAngular) [Vue](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AVue)| 2016-11-08 |


### 4. Mobile

包括Cordova/ReactNative/H5

| 序号  | 标题                                                                                | 标签                                                                                       | 发布日期     |
| :--- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | ---------- |
| 1    | [移动端浏览器上下滚动露出底色问题](https://github.com/muwenzi/Program-Blog/issues/42)       | [H5](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AH5) | 2016-10-31 |

<h2 align="center">Part 4 Back-End</h2>

### 1. NodeJS

包括npm/Koa/V8 Engine/微服务等

| 序号  | 标题                                                                        | 标签                                                                             | 发布日期    |
| :--- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------- | ---------- |
| 1    | [用n管理不同版本的Node](https://github.com/muwenzi/Program-Blog/issues/6)             | [npm](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3Anpm) | 2016-08-24 |
| 2    | [如何发布node模块到npm社区](https://github.com/muwenzi/Program-Blog/issues/12)        | [npm](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3Anpm) | 2016-08-31 |
| 3    | [package.json-node项目的设计图纸](https://github.com/muwenzi/Program-Blog/issues/22) | [npm](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3Anpm) | 2016-09-12 |
| 4    | [Node Packaged Modules (npm) 基础命令和介绍](https://github.com/muwenzi/Program-Blog/issues/104) | [npm](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3Anpm) | 2017-06-30 |
| 5    | [浅析NodeJS模块加载机制](https://github.com/muwenzi/Program-Blog/issues/94) | [NodeJS](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3ANodeJS) | 2017-04-28 |
| 6    | [V8引擎介绍](https://github.com/muwenzi/Program-Blog/issues/33) | [V8 Engine](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-10-11 |
| 7    | [Chrome背后的故事（一）稳定性、严格和多任务架构](https://github.com/muwenzi/Program-Blog/issues/47) | [V8 Engine](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-11-10 |
| 8    | [Chrome背后的故事（二）速度：WebKit和V8](https://github.com/muwenzi/Program-Blog/issues/48) | [V8 Engine](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-11-10 |
| 9    | [Chrome背后的故事（三）搜索和用户体验](https://github.com/muwenzi/Program-Blog/issues/49) | [V8 Engine](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-11-10 |
| 10    | [Chrome背后的故事（四）安全性、沙盒模式和没有危险的浏览体验](https://github.com/muwenzi/Program-Blog/issues/51) | [V8 Engine](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-11-10 |
| 11    | [Chrome背后的故事（五）Gears，标准和开放源代码](https://github.com/muwenzi/Program-Blog/issues/50) | [V8 Engine](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-11-10 |
| 12    | [V8内存机制](https://github.com/muwenzi/Program-Blog/issues/61) | [V8 Engine](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-12-06 |

### 2. DataBase

包括MySQL/MongoDB/Redis等


| 序号  | 标题                                                                        | 标签                                                                             | 发布日期    |
| :--- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------- | ---------- |
| 1    | [MySQL在Mac上的基本配置](https://github.com/muwenzi/Program-Blog/issues/44)             | [MySQL](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AMySQL) | 2016-11-01 |
| 2    | [了解MongoDB](https://github.com/muwenzi/Program-Blog/issues/90)             | [MongoDB](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3AMongoDB) | 2017-03-09 |

<h2 align="center">Part 5 Book Notes</h2>

包括技术/小说/历史/古诗文/其他等

| 序号  | 标题                                                                        | 标签                                                                             | 发布日期    |
| :--- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------- | ---------- |
| 1    | [《编写可维护的JavaScript》读书笔记（一）编程风格](https://github.com/muwenzi/Program-Blog/issues/59)             | [技术类书籍](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A技术类书籍) | 2016-11-23 |
| 2    | [《玫瑰的名字》读书笔记](https://github.com/muwenzi/Program-Blog/issues/63)             | [小说类书籍](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A小说类书籍) | 2016-11-30 |
| 3    | [梁文道《一千零一夜》第四十九夜：古文观止（一）](https://github.com/muwenzi/Program-Blog/issues/64)             | [古诗文类书籍](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A古诗文类书籍) | 2016-12-04 |
| 4    | [《老南京·旧影秦淮》读书笔记](https://github.com/muwenzi/Program-Blog/issues/66)             | [历史类书籍](https://github.com/muwenzi/Program-Blog/issues?q=is%3Aissue+is%3Aopen+label%3A历史类书籍) | 2016-12-08 |

## License

[![license][license-image]][license-url]

[license-url]: https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh
[license-image]: https://img.shields.io/badge/license-CC%20BY--NC--SA-green.svg