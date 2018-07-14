## 目录

| 序号 | 标题 |
| :-- | :-- |
| 1 | [Elements 面板的拖拽](#1) |
| 2 | [在 Console 面板获取当前选中元素](#2)|
| 3 | [在 Console 面板获取上一步的值](#3)|
| 4 | [添加类名并修改节点状态](#4)|
| 5 | [保存修改后的 css 文件](#5)|
| 6 | [对单个节点截屏](#6)|
| 7 | [使用 css 选择器查找节点](#7)|
| 8 | [多行命令](#8)|
| 9 | [快速跳转](#9)|
| 10 | [监控表达式变量](#10)|
| 11 | [设置 XHR/Fetch 断点](#11)|
| 12 | [对 DOM 的修改进行断点](#12)|

<h2 id="1">1. Elements 面板的拖拽</h2>

在 Elements 面板拖拽任何 HTML 节点可以改变它在页面的位置。

![image](https://cdn-images-1.medium.com/max/1600/1*YJ4pbintkGmF67YSLH7UEQ.gif)

<h2 id="2">2. 在 Console 面板获取当前选中元素</h2>

在 Elements 面板选中一个节点，在 Console 面板输入 $0 就可以获得这个节点。

![image](https://cdn-images-1.medium.com/max/1600/1*Ua9Z12CO8LYWcx5L2zpQAw.gif)

<h2 id="3">3. 在 Console 面板获取上一步的值</h2>

在 Console 面板输入 $_ 就可以获取上一步操作的结果。

![image](https://cdn-images-1.medium.com/max/1600/0*zxJYnGdu8QUPGSiW.gif)

<h2 id="4">4. 添加类名并修改节点状态</h2>

![image](https://cdn-images-1.medium.com/max/1600/0*SVTP4Rl82XYNc4Kp.gif)

修改节点状态，例如：active, hovered, 或on focus

![image](https://cdn-images-1.medium.com/max/1600/0*1nCZIzP73fr2xAwQ.png)

<h2 id="5">5. 保存修改后的 css 文件</h2>

这个方法对通过 + 号新增类名和节点内部样式改变不起作用，只对已有类名的修改生效。

![image](https://cdn-images-1.medium.com/max/1600/1*7Q-CbjzcXYR20dbtmyMbJw.gif)
https://cdn-images-1.medium.com/max/1600/1*7Q-CbjzcXYR20dbtmyMbJw.gif

<h2 id="6">6. 对单个节点截屏</h2>

选择一个节点，cmd + shift + p （或者 ctrl + shift + p Window ）打开命令列表，选择 Capture node screenshot 就可以截屏了。

![image](https://cdn-images-1.medium.com/max/1600/0*CjWhHTmoZbCeMXSw.gif)

<h2 id="7">7. 使用 css 选择器查找节点</h2>

在 Elements 面板 cmd + f （ ctrl + f Window）就可以打开搜索工具栏。

![image](https://cdn-images-1.medium.com/max/1600/0*ipqpirAGqDRlEbes.gif)

<h2 id="8">8. 多行命令</h2>

shift + enter 可以在 Console 面板输入多行命令。

![image](https://cdn-images-1.medium.com/max/1600/0*QizwVdkFs7FC1kv1.gif)

<h2 id="9">9. 快速跳转</h2>

在 Sources 面板：

- `cmd + o` （ctrl + o Window）显示所有加载文件。
- `cmd + shift + o` （ctrl + shift + o）显示当前文件的代码。
- `ctrl + g` 定位到具体的某一行。

![image](https://cdn-images-1.medium.com/max/1600/0*mxGuyBT02JoiSlb-.png)

<h2 id="10">10. 监控表达式变量</h2>

在 debug 过程中，允许输入表达式监控变量运行状态。

![image](https://cdn-images-1.medium.com/max/1600/0*gSpZcWiUho4z9DoW.gif)

<h2 id="11">11. 设置 XHR/Fetch 断点</h2>

在断点时，可以设置 XHR/Fetch 断点。

![image](https://cdn-images-1.medium.com/max/1600/0*r_-hBTOJ23eSDX-g.png)

<h2 id="12">12. 对 DOM 的修改进行断点</h2>

选中节点，右键，选择 Break on 选项，选择下一级 subtree modifications。当该节点及子节点被修改时，就会触发断点。

![image](https://cdn-images-1.medium.com/max/1600/0*VYABHtIwKZ5eeu-p.png)

### 原文地址

[Cool Chrome DevTools tips and tricks you wish you knew already](https://medium.freecodecamp.org/cool-chrome-devtools-tips-and-tricks-you-wish-you-knew-already-f54f65df88d2)
[Chrome 调试工具使用小技巧](https://mp.weixin.qq.com/s/Nyrav5fx_pqgSDEXNRb6Ug)