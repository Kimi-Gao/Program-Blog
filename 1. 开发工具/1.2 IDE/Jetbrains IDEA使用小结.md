<!-- TOC -->

- [1. 写在最前](#1-%E5%86%99%E5%9C%A8%E6%9C%80%E5%89%8D)
- [2. IDEA](#2-idea)
  - [2.1. 界面](#21-%E7%95%8C%E9%9D%A2)
    - [2.1.1. Code Map](#211-code-map)
    - [2.1.2. 调整Tabs的位置](#212-%E8%B0%83%E6%95%B4tabs%E7%9A%84%E4%BD%8D%E7%BD%AE)
    - [2.1.3. 面包屑导航](#213-%E9%9D%A2%E5%8C%85%E5%B1%91%E5%AF%BC%E8%88%AA)
  - [2.2. Git](#22-git)
    - [2.2.1. 查看本地的改动/提交代码](#221-%E6%9F%A5%E7%9C%8B%E6%9C%AC%E5%9C%B0%E7%9A%84%E6%94%B9%E5%8A%A8%E6%8F%90%E4%BA%A4%E4%BB%A3%E7%A0%81)
    - [2.2.2. 增删改冲突的颜色](#222-%E5%A2%9E%E5%88%A0%E6%94%B9%E5%86%B2%E7%AA%81%E7%9A%84%E9%A2%9C%E8%89%B2)
    - [2.2.3. Resolve Conflicts](#223-resolve-conflicts)
    - [2.2.4. Annotate](#224-annotate)
    - [2.2.5. Auto fetch](#225-auto-fetch)
    - [2.2.6. Delete old branches](#226-delete-old-branches)
    - [2.2.7. Create Github Gist](#227-create-github-gist)
  - [2.3. Snippets](#23-snippets)
    - [2.3.1. Share code snippets](#231-share-code-snippets)
  - [2.4. Refactor](#24-refactor)
    - [2.4.1. Rename](#241-rename)
  - [2.5. Markdown](#25-markdown)
- [3. WebStorm](#3-webstorm)
  - [3.1. Auto Competition](#31-auto-competition)
  - [3.2. Refactor](#32-refactor)
  - [3.3. Test](#33-test)
  - [3.4. 在IDE里自动运行代码](#34-%E5%9C%A8ide%E9%87%8C%E8%87%AA%E5%8A%A8%E8%BF%90%E8%A1%8C%E4%BB%A3%E7%A0%81)
- [4. IntelliJ](#4-IntelliJ)
  - [4.1 Maven Helper](#41-maven-helper)
- [5. Others](#5-others)

<!-- /TOC -->

# 1. 写在最前

IDEA 系列是我工作时候主打的 IDE，个人喜好主要有两点原因：

- 无需太多折腾，功能非常强大，插件基本上不用装就可以愉快coding。
- UI 设计很棒，字体，图标都设计的非常精致小巧，视觉效果，屏幕利用率都很好。

功能上个人认为至少有以下几个优势，其他编辑器与之相比火候还欠缺一些：

- Git resolve conflicts：就单单这一点就让我无法完全从IDEA迁移到VSCode。
- Refactor：强大，功能很多，省心省力，VSCode与之相比就像小孩和成人的差距。
- Quick Definition：项目打开的Indexing比较慢，但Quick Definition还是很快的，对less跳转的支持度也很好。

当然它也有一些劣势：

- 收费，费用相对来说也比较贵，但是对于一个程序员来说，天天用的东西花钱买一个我觉得还是值得的。
- 项目打开的速度偏慢，尤其是项目打开，进行indexing的时候，但是如果你的电脑配置是16g或者32g那基本无压力。
- 第三方插件比较少，对于一些新新的不太知名的库或框架，支持得不是很及时，好在本身足够强大，无需太多插件。

其他：  

- **语言**：有些人喜欢找汉化版的，个人觉得完全没有必要，英语是一个程序员的基本功，况且命令、代码都是英文，当你熟悉了英文，再看中文的翻译过来的名词，会有一脸懵逼的感觉。
- **版权**：鼓励去买正版，https://www.jetbrains.com/idea/buy/ ，学生凭学生证或学校邮箱可免费申请正版授权，创业公司可5折购买正版授权。
- **更新**：推荐下载 JetBrains 的 [Toolbox App](https://www.jetbrains.com/toolbox/app/) 可以对IDEA的版本进行管理和更新，所有项目也都可以在这里显示。官方会经常更新，每次升级都会有新的惊喜。

# 2. IDEA

## 2.1. 界面

程序员可以分为白屏党和黑屏党两大类，青菜萝卜个有所好，我用的是 `Darcula` 默认的黑色主题。不过建议不要在主题的选择方面花费太多的时间，默认的可能刚开始不喜欢，习惯就好。

### 2.1.1. Code Map

![image](https://user-images.githubusercontent.com/12554487/48839397-5890eb00-edc6-11e8-8199-832a659dec97.png)

推荐 [CodeGlance](https://plugins.jetbrains.com/plugin/7275-codeglance) 这个插件，打开/隐藏Map的快捷键: <kbd>Cmd + Shift + G</kbd>

### 2.1.2. 调整Tabs的位置

![image](https://user-images.githubusercontent.com/12554487/48839724-5aa77980-edc7-11e8-8e26-b8efa98733e0.png)

### 2.1.3. 面包屑导航

![image](https://user-images.githubusercontent.com/12554487/48839860-d275a400-edc7-11e8-8685-5350f6304e97.png)

![image](https://user-images.githubusercontent.com/12554487/48839817-a8bc7d00-edc7-11e8-8a1f-be2f9080f6bc.png)

// 其他方面，后面继续补充。

## 2.2. Git

IDEA 的git本身已经足够强大了，但有几个地方需要注意一下：

### 2.2.1. 查看本地的改动/提交代码

<kbd>Cmd + K</kbd> 这种方式可以快速查看，但要注意在`2018.3`以前如果项目用了`lint-stage`提交代码的时候会有一个bug，<kbd>Cmd + Shift+ K</kbd> 可以push代码。

![image](https://user-images.githubusercontent.com/12554487/48839572-dce36e00-edc6-11e8-9da6-1745fc1a6358.png)

提交的时候要注意右侧的选项，有些会影响到一些git hook的使用。

或者你可以通过 `Version Control -> Local Changes` 查看改动，更直观一点，选中文件名点左边绿色的钩即可提交：

![image](https://user-images.githubusercontent.com/12554487/48831549-0219b180-edb2-11e8-8bd7-b28f929957b1.png)

顶部旁边的 `Log` tab可以查看 git history

### 2.2.2. 增删改冲突的颜色

我觉得这个地方好好定义一下颜色对写代码和处理冲突都非常有帮助，我的习惯是：

- 修改：黄色
- 新增：绿色
- 删除：红色
- 冲突：紫色

分为下面几类去定制化：

- 文件名的颜色
![image](https://user-images.githubusercontent.com/12554487/48832065-478aae80-edb3-11e8-86ee-b439e05d0872.png)

- Gutter的颜色
![image](https://user-images.githubusercontent.com/12554487/48831858-b4ea0f80-edb2-11e8-9c61-efba2f589053.png)

- ScrollBar的颜色 & Git Diff的颜色
![image](https://user-images.githubusercontent.com/12554487/48832544-5a51b300-edb4-11e8-955c-9cc54bba34a3.png)

### 2.2.3. Resolve Conflicts

项目中任意一个文件编辑区，右击选择`git -> Resolve conflicts`，注意只有在有冲突需要处理的时候才会出现这个选项。这个冲突处理的GUI，我个人认为是最强大的，没有之一。

### 2.2.4. Annotate

在 Gutter 上右击，简单方便不需要额外插件，查责任人必备技能，但是如果改文件是复制粘贴过来的话该信息则会丢失。

![image](https://user-images.githubusercontent.com/12554487/48832789-f5e32380-edb4-11e8-8164-8fefaff8db16.png)

当鼠标hover在message上时会有更详细的信息：

![image](https://user-images.githubusercontent.com/12554487/48832866-1e6b1d80-edb5-11e8-8bd7-a7b2698f4482.png)

日期格式设置：

![image](https://user-images.githubusercontent.com/12554487/72771948-7dd4ef80-3c3d-11ea-989e-8f28fbdef325.png)

### 2.2.5. Auto fetch

IDEA 原生没有这个功能，需要安装插件才能实现，去 `Browse Repositories` 搜索 [GitToolBox](https://plugins.jetbrains.com/plugin/7499-gittoolbox)

<img width="800" alt="wx20181006-222004 2x" src="https://user-images.githubusercontent.com/12554487/46572302-15192380-c9b6-11e8-9f25-9baebcdb014b.png">

重启后会发现左下角多了一个 `Git Stat`：

<img width="150" alt="wx20181006-222356 2x" src="https://user-images.githubusercontent.com/12554487/46572330-88bb3080-c9b6-11e8-8e3e-32e5a5e47ddf.png">

默认是15分钟自动fetch一次，如果看到有箭头就可以手动去进行pull或push操作。

### 2.2.6. Delete old branches

当远端的仓库分支删除的时候，本地没有手动删除，久而久之本地的无用分支越来越多，这时推荐用[Git Branch Cleaner](https://plugins.jetbrains.com/plugin/10059-git-branch-cleaner)插件进行检测本地无用分支，批量删除：

![image](https://user-images.githubusercontent.com/12554487/48833194-cbde3100-edb5-11e8-9cde-e7d0a5c5a03c.png)

![image](https://user-images.githubusercontent.com/12554487/48833324-0fd13600-edb6-11e8-8ecb-f3f811ed7710.png)

### 2.2.7. Create Github Gist

首先要登录到github，如果你开启了两步验证，可以用token的方式登录。去 https://github.com/settings/tokens 创建一个包含`repo`和`gist`权限的token，然后在IDEA设置里面搜索 github 在对应的地方输入 token 即可：

<img width="800" alt="wx20181006-214542 2x" src="https://user-images.githubusercontent.com/12554487/46572038-0f214380-c9b2-11e8-8280-a371df7f4299.png">

然后你可以选中对应的代码片段，或者不选（则为该文件所有内容）右击选择 `Create Gist...` 即可。

## 2.3. Snippets

### 2.3.1. Share code snippets

![image](https://user-images.githubusercontent.com/10369094/30791512-cb001438-a167-11e7-952b-f0f0e5c4499e.png)

安装插件：[carbon-now-sh](https://plugins.jetbrains.com/plugin/10469-carbon-now-sh)

选中代码右击选择 `Open in carbon.now.sh` 即可。

## 2.4. Refactor

### 2.4.1. Rename

amelCase, kebab-lowercase, KEBAB-UPPERCASE, snake_case, SCREAMING_SNAKE_CASE, dot.case, words lowercase, Words Capitalized, PascalCase 的相互转换推荐 [String Manipulation](https://plugins.jetbrains.com/plugin/2162-string-manipulation)这个插件：

![image](https://user-images.githubusercontent.com/12554487/46918244-681c5780-d002-11e8-8f8f-7d72a8cefa8f.png)

变量命名之间的转换非常实用，可以多选：

<img width="280" alt="2018-11-21 5 08 53" src="https://user-images.githubusercontent.com/12554487/48830738-4015d600-edb0-11e8-9681-b5ba76b16580.png">

## 2.5. Markdown

对 IDEA 的 markdown 不要抱很高的期望，能基本打开md查看就行了，下载一个官方的[Markdown Support](https://plugins.jetbrains.com/plugin/7793-markdown-support)插件即可，[Markdown Navigator](https://plugins.jetbrains.com/plugin/7896-markdown-navigator)这个插件高级功能都是收费的，基本功能也很一般，还不如不装。

另外想要支持 github markdown 语法，有一个[gfm](https://plugins.jetbrains.com/plugin/7701-gfm)插件，一个插件200多M，一个webstorm才200多M，反正我是不会下这么大的一个插件了，所以对IDEA里面Markdown的支持程度不要抱太高期望，我是用vscode装了一些插件来写markdown的，详情看[VS Code 插件推荐](https://github.com/muwenzi/Program-Blog/issues/129)。

# 3. WebStorm

WebStorm 的使用手册：https://www.jetbrains.com/help/webstorm/meet-webstorm.html

这里面有很多关于前端方面的实用tips，先给出一些文档链接，具体玩法后面再陆续更新。

## 3.1. Auto Competition

https://www.jetbrains.com/help/webstorm/auto-completing-code.html

## 3.2. Refactor

这是我认为 WebStorm 最强大的地方之一，TODO...

## 3.3. Test

与 jest 的集成非常好，debug也很方便：

![image](https://user-images.githubusercontent.com/12554487/48840047-82e3a800-edc8-11e8-86c1-8571dabdc251.png)

## 3.4. 在IDE里自动运行代码

https://quokkajs.com/docs/?editor=jb

![jb-intro](https://user-images.githubusercontent.com/12554487/55778776-62e22600-5ad6-11e9-94bd-d477f0efe0f6.gif)

# 4. IntelliJ

## 4.1 Maven Helper

https://plugins.jetbrains.com/plugin/7179-maven-helper/

![image](https://user-images.githubusercontent.com/12554487/72771766-eb345080-3c3c-11ea-8032-279645c4050d.png)

# 5. Others

1. webstorm最新版，为什么设置tab了也没效果？

> 因为你的项目下有个`.editorconfig`文件，这个文件会自动被 webstorm 读取，用来格式化当前项目下的代码，所以你在 webstorm 配置没有用。

2. How to auto format code in WebStorm?

> <kbd>Cmd + Alt + L</kbd>

3. js import的顺序

> https://www.jetbrains.com/help/webstorm/settings-code-style-javascript.html#ws_js_settings_editor_code_style_imports_tab

// 未完待续...
