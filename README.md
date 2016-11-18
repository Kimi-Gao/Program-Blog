## 目录结构

```
.
├── Web Basic
│   ├── Tools         # Shell、Git、IDE
│   └── Network       # HTTP、Ajax、RESTful
├── Language
│   ├── Javascript    # ES5、ES6+、Babel、lodash
│   ├── C++           # 基础语法、面向对象、标准库STL
│   ├── Swift         # TODO
│   └── Advanced      # 数据结构、算法、设计模式、函数式编程
├── Front-End
│   ├── CSS           # 盒模型、定位、字体图标、布局、动画
│   ├── DOM           # Event、jQuery
│   ├── Frameworks    # Angular、React、Vue
│   └── Mobile        # iOS、Cordova、ReactNative、H5
└── Back-End
    ├── NodeJS        # npm、Koa、V8 Engine
    └── DataBase      # MySQL、PostgreSQL、MongoDB、Redis
```

<h2 align="center">Part 1 Web编程基础</h2>

### 1. 基础工具

包括Shell、Git、IDE等

| 序号  | 标题                                                                   | 标签                                                                                  | 发布日期    |
| :--- | :--------------------------------------------------------------------- | :----------------------------------------------------------------------------------- | ---------- |
| 1    | [Shell命令小结](https://github.com/muwenzi/Blog/issues/7)               | [Shell](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2016-08-24 |
| 2    | [iTerm2快捷键](https://github.com/muwenzi/Blog/issues/21)               | [Shell](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2016-09-09 |
| 3    | [iTerm之Solarized颜色主题配置](https://github.com/muwenzi/Blog/issues/1) | [Shell](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2016-07-25 |
| 4    | [oh-my-zsh常用git命令](https://github.com/muwenzi/Blog/issues/4)        | [Shell](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2016-08-16 |
| 5    | [oh-my-zsh问题汇总](https://github.com/muwenzi/Blog/issues/15)          | [Shell](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2016-09-06 |
| 6    | [Mac系统问题和命令汇总](https://github.com/muwenzi/Blog/issues/11)        | [Shell](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AShell) | 2016-08-29 |
| 7    | [Git生成SSH密匙](https://github.com/muwenzi/Blog/issues/5)              | [Git](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AGit)     | 2016-08-24 |
| 8    | [Git常用操作小结](https://github.com/muwenzi/Blog/issues/13)             | [Git](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AGit)     | 2016-08-31 |

### 2. 网络基础知识

包括HTTP/Ajax/OAuth/RESTful等

| 序号  | 标题                                                   | 标签                                                                                   | 发布日期 |
| :--- | :---------------------------------------------------- | :------------------------------------------------------------------------------------- | ------- |
| 1    | [HTTP协议的前身今世](https://github.com/muwenzi/Blog/issues/35)  | [HTTP](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AHTTP) | 2016-10-17    |
| 2    | [常见HTTP响应状态码](https://github.com/muwenzi/Blog/issues/40)  | [HTTP](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AHTTP) | 2016-10-30    |
| 3    | [localhost和127.0.0.1的异同](https://github.com/muwenzi/Blog/issues/52)  | [HTTP](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AHTTP) | 2016-11-14    |
| 4    | [RESTful入门指南录](https://github.com/muwenzi/Blog/issues/20)  | [RESTful](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3ARESTful) | 2016-09-06    |

<h2 align="center">Part 2 编程语言</h2>

### 1. JavaScript

包括ES5/ES6+/Babel/lodash等

| 序号  | 标题                                                                     | 标签                                                                                        | 发布日期    |
| :--- | :----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------- |
| 1   | [ES6+语言规范](https://github.com/muwenzi/Blog/issues/38)    | [ES6+](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES6%2B)           | 2016-10-26       |
| 2   | [JavaScript History](https://github.com/muwenzi/Blog/issues/43)    | [ES5](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-10-30       |
| 3   | [Babel Plugin](https://github.com/muwenzi/Blog/issues/39)    | [Babel](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3ABabel)           | 2016-10-26       |
| 4    | [ES6箭头函数初探](https://github.com/muwenzi/Blog/issues/2)                | [ES6+](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES6%2B) | 2016-07-26 |
| 5    | [setTimeout黑魔法](https://github.com/muwenzi/Blog/issues/3)              | [ES5](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-07-27 |
| 6    | [JS中奇葩的假值](https://github.com/muwenzi/Blog/issues/14)                | [ES5](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-09-01 |
| 7    | [JS中的数据类型及判断](https://github.com/muwenzi/Blog/issues/17)           | [ES5](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-09-06 |
| 8    | [Math对象中一些常用和奇葩的方法](https://github.com/muwenzi/Blog/issues/19)   | [ES5](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-09-06 |
| 9    | [Array数组相关操作小结](https://github.com/muwenzi/Blog/issues/18)          | [ES5](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-09-10 |
| 10    | [JSON对象的使用](https://github.com/muwenzi/Blog/issues/25)                | [ES5](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-09-23 |
| 11    | [JS拼接HTML字符串的方法及效率](https://github.com/muwenzi/Blog/issues/24)    | [ES5](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-09-20 |
| 12    | [JS是动态弱类型语言的理解](https://github.com/muwenzi/Blog/issues/34)    | [ES5](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-10-16       |
| 13   | [JavaScript Error Types](https://github.com/muwenzi/Blog/issues/36)    | [ES5](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES5)           | 2016-10-24       |

### 2. C++

包括基础语法/面向对象/标准库等

| 序号  | 标题                                             | 标签                                                                                     | 发布日期 |
| :--- | :----------------------------------------------- | --------------------------------------------------------------------------------------- | ------- |
| 1    | [TODO](https://github.com/muwenzi/Blog/issues/2) | [TODO](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES6%2FES7) | TODO    |

### 3. Swift

包括 等

| 序号  | 标题                                             | 标签                                                                                     | 发布日期 |
| :--- | :----------------------------------------------- | --------------------------------------------------------------------------------------- | ------- |
| 1    | [TODO](https://github.com/muwenzi/Blog/issues/2) | [TODO](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AES6%2FES7) | TODO    |

### 4. Advanced

包括数据结构/算法/设计模式/函数式编程/异步编程等

| 序号  | 标题                                                                     | 标签                                                                                            | 发布日期    |
| :--- | :---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------- |
| 1    | [数据结构概述](https://github.com/muwenzi/Blog/issues/28)                 | [数据结构](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | 2016-09-30 |
| 2    | [List 数组](https://github.com/muwenzi/Blog/issues/23)                 | [数据结构](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | 2016-09-13 |
| 3    | [HashTable 哈希表](https://github.com/muwenzi/Blog/issues/)              | [数据结构](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 4    | [Stack 栈](https://github.com/muwenzi/Blog/issues/)                      | [数据结构](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 5    | [Queue 队列](https://github.com/muwenzi/Blog/issues/)                    | [数据结构](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 6    | [Graph 图](https://github.com/muwenzi/Blog/issues/)                      | [数据结构](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 7    | [LinkedList 链表](https://github.com/muwenzi/Blog/issues/)               | [数据结构](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 8    | [Tree 树](https://github.com/muwenzi/Blog/issues/)                       | [数据结构](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 9    | [BinarySearchTree 二叉搜索树](https://github.com/muwenzi/Blog/issues/)    | [数据结构](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 10   | [B Tree B树](https://github.com/muwenzi/Blog/issues/)                    | [数据结构](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 11   | [Heap 堆](https://github.com/muwenzi/Blog/issues/)                       | [数据结构](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A数据结构)         | TODO       |
| 12   | [算法概述](https://github.com/muwenzi/Blog/issues/30)                       | [算法](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A算法)         | 2016-10-09       |
| 13   | [两个整数的交换问题](https://github.com/muwenzi/Blog/issues/31)                       | [算法](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A算法)         | 2016-10-09       |
| 14   | [Bubble Sort 冒泡排序](https://github.com/muwenzi/Blog/issues/26)         | [算法](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A算法)                | 2016-09-28 |
| 15   | [Singleton 单例模式](https://github.com/muwenzi/Blog/issues/45)         | [设计模式](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A设计模式)                | 2016-11-03 |
| 16   | [JS中的非可变性 (Immutability)](https://github.com/muwenzi/Blog/issues/29) | [函数式编程](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A函数式编程)      | 2016-09-30 |

<h2 align="center">Part 3 Front-End</h2>

### 1. CSS

包括CSS2.1/CSS3

### 2. DOM

包括Event/jQuery
| 1   | [事件流](https://github.com/muwenzi/Blog/issues/55) | [DOM](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3ADOM)      | 2016-11-18 |

### 3. 前端框架

包括Angular/React/Vue等

| 序号  | 标题                                                                                | 标签                                                                                       | 发布日期     |
| :--- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | ---------- |
| 1    | [用ES6/7语法来写兼容IE8的Angular1应用](https://github.com/muwenzi/Blog/issues/8)       | [Angular](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AAngular) | 2016-08-26 |
| 2    | [Angular's jqLite API汇总](https://github.com/muwenzi/Blog/issues/9)                | [Angular](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AAngular) | 2016-08-27 |
| 3    | [angular.element和$document的使用方法分析](https://github.com/muwenzi/Blog/issues/10) | [Angular](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AAngular) | 2016-08-28 |
| 4    | [React基本思想](https://github.com/muwenzi/Blog/issues/32) | [React](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AReact) | 2016-10-09 |
| 5    | [React ES6 class 中的this 绑定问题](https://github.com/muwenzi/Blog/issues/37) | [React](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AReact) | 2016-10-24 |
| 6    | [用ng-cloak/v-cloak 解决 Angular/Vue 初始化闪烁问题](https://github.com/muwenzi/Blog/issues/46) | [Angular](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AAngular) [Vue](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AVue)| 2016-11-08 |


### 4. Mobile

包括iOS/Cordova/ReactNative/H5

| 序号  | 标题                                                                                | 标签                                                                                       | 发布日期     |
| :--- | :---------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | ---------- |
| 1    | [移动端浏览器上下滚动露出底色问题](https://github.com/muwenzi/Blog/issues/42)       | [H5](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AH5) | 2016-10-31 |

<h2 align="center">Part 4 Back-End</h2>

### 1. NodeJS

包括npm/Koa/V8 Engine等

| 序号  | 标题                                                                        | 标签                                                                             | 发布日期    |
| :--- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------- | ---------- |
| 1    | [用n管理不同版本的Node](https://github.com/muwenzi/Blog/issues/6)             | [npm](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3Anpm) | 2016-08-24 |
| 2    | [如何发布node模块到npm社区](https://github.com/muwenzi/Blog/issues/12)        | [npm](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3Anpm) | 2016-08-31 |
| 3    | [package.json-node项目的设计图纸](https://github.com/muwenzi/Blog/issues/22) | [npm](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3Anpm) | 2016-09-12 |
| 4    | [V8引擎介绍](https://github.com/muwenzi/Blog/issues/33) | [V8 Engine](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-10-11 |
| 5    | [Chrome背后的故事（一）稳定性、严格和多任务架构](https://github.com/muwenzi/Blog/issues/47) | [V8 Engine](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-11-10 |
| 6    | [Chrome背后的故事（二）速度：WebKit和V8](https://github.com/muwenzi/Blog/issues/48) | [V8 Engine](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-11-10 |
| 7    | [Chrome背后的故事（三）搜索和用户体验](https://github.com/muwenzi/Blog/issues/49) | [V8 Engine](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-11-10 |
| 8    | [Chrome背后的故事（四）安全性、沙盒模式和没有危险的浏览体验](https://github.com/muwenzi/Blog/issues/51) | [V8 Engine](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-11-10 |
| 9    | [Chrome背后的故事（五）Gears，标准和开放源代码](https://github.com/muwenzi/Blog/issues/50) | [V8 Engine](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3A"V8+Engine") | 2016-11-10 |

### 2. DataBase

包括MySQL/PostgreSQL/MongoDB/Redis等


| 序号  | 标题                                                                        | 标签                                                                             | 发布日期    |
| :--- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------- | ---------- |
| 1    | [MySQL在Mac上的基本配置](https://github.com/muwenzi/Blog/issues/44)             | [MySQL](https://github.com/muwenzi/Blog/issues?q=is%3Aissue+is%3Aopen+label%3AMySQL) | 2016-11-01 |

