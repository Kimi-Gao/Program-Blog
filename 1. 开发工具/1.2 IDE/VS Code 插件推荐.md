> https://github.com/muwenzi/Program-Blog/issues/129

[Visual Studio Code](https://code.visualstudio.com/) 是我用起来最顺手方便和强大的`文本编辑器`，可以配合 IDAE 系列进行愉快的 coding。

一般稍大的工程项目我会用 IDAE 系列，而快速地看 github 上别人库，跑别人代码，写一个代码小片段，运行一段小程序，写 markdown，我通常会选择 `VS Code`。

小巧，强大，插件丰富，界面也很优雅，可定制化程度也很高，大厂支持。更新非常快速，基本上每月一更，[insiders](https://code.visualstudio.com/insiders/) 版更是每日更新。一些相对小众的框架/库，vscode 有较为丰富的插件支持，而 IDAE 支持比较慢。 Github 与 vscode 的集成越来越好，功能也越来越强大，毕竟现在都是微软麾下。

不过要装很多插件，配置插件，这点个人认为没有 IDEA 一站式服务爽，能让你少点折腾，安心写代码。还好有可以同步配置的插件，也算是不错了。别的就不多说，这里给大家推荐一些比较不错实用的插件。

## 分类概览

- **Git**
  - [GitLens](#gitlens)
  - [Git Tags](#git-tags)
  - [GitHub Pull Requests](#github-pull-requests)
- **Markdown**
  - [markdownlint](#markdownlint)
  - [Markdown Preview Github Styling](#markdown-preview-github-styling)
  - [Markdown Emoji](#markdown-emoji)
  - [Markdown TOC](#markdown-toc)
- **Code Style**
  - [ESLint](#eslint)
  - [TSLint](#tslint)
  - [Prettier](#prettier)
  - [Code Spell Checker](#code-spell-checker)
- **Language Support**
  - [Babel ES6/ES7](#babel-es6-es7)
  - [Code Runner](#code-runner)
- **Test**
  - [Jest](#jest)
  - [AVA](#ava)
- **Theme**
  - [Darcula IntelliJ Theme](#darcula-intellij-theme)
  - [Material Icon Theme](#material-icon-theme)
  - [Webstorm Icon Theme](#webstorm-icon-theme)
- **Tools**
  - [Excel Viewer](#excel-viewer)
  - [Settings Sync](#settings-sync)
- **Tips**
  - [explorer 区文件颜色](#explorer-file-color)

## Git

<h3 id="gitlens">GitLens</h3>

> 对 vscode 自带的 git 一个增强，可以方便查看history, stash, remote, branch, tags, annotate 等，比较方便，但其配置也比较繁琐。相比于 webstorm，annotate 功能没有其简洁，排版也略显粗糙，resolve conflict 功能也没有 webtorm 直观便捷，用户体验上面还有待优化。

![gitlens](https://user-images.githubusercontent.com/12554487/46478240-19f79f00-c81f-11e8-9f78-ac1da5a6500e.png)

<h3 id="git-tags">Git Tags</h3>

> 可以快速地创建、查看和删除 git tag, 删除 tag 的时候会有对话框确认是否从远端也删除对应的 tag， 比 gitlens 里面的 tag 命令行式的管理更显可视化一点。

![images](https://raw.githubusercontent.com/leftstick/vscode-git-tags/master/images/git-tags.gif)

<h3 id="github-pull-requests">GitHub Pull Requests</h3>

> 微软官方出的一个新插件，使用 github token 登录后可以直接在 vscode 里面进行 github 的 codereview，对于 reviewer 还算比较实用。目前还是 preview 版本，checkout 和 exit review mode 会进场卡住，体验不是很好，但是能在代码里面加 comment 并且和 github 同步这点确实很酷炫，这也是目前相比于 webstorm 的一个亮点，功能还需完善，就像官方所说这是一个抛砖引玉，估计后面 gitlab 应该也会有类似的插件。

![image](https://github.com/Microsoft/vscode-pull-request-github/raw/master/.readme/demo.gif?raw=true)

## Markdown

> :warning: 目前用 vscode 开预览模式 写 markdown 的时候会出现一堆不可识别字符的 bug，详情参考这篇文章 [vscode 控制字符引起的问题以及解决思路](https://wdd.js.org/vscode-control-characters-problem.html)

<h3 id="markdownlint">markdownlint</h3>

> 规范你的 markdown 写法，适合于有强迫症的程序员

<h3 id="markdown-preview-github-styling">Markdown Preview Github Styling</h3>

> 装上这个插件，基本可以模仿 github 上页面写 markdown 的样子，非常赞的插件，写 github markdown 必备。

<h3 id="markdown-emoji">Markdown Emoji</h3>

> 使用 `:emoji:` 语法即可在 markdown 里面加入 emoji 标签，preview 的时候即可见，搭配 `Markdown Preview Github Styling` 插件更赞。

<h3 id="markdown-toc">Markdown TOC</h3>

> 按照 markdown 语法自动生成目录，右击选择 `Markdown Sections: Insert/Update` 会自动更新标题前面的编号，再 `cmd + s` 的时候会自动更新目录。github 语法可用，但 issue 中无效，wiki 有效。

## Code Style

<h3 id="eslint">ESLint</h3>

> 你在编写代码的时候，利用这个软件可以轻易获取有关漏洞的提示，而且在编码过程中，它还可以帮助你养成良好的编码习惯。

<h3 id="tslint">TSLint</h3>

> 有了 ESLint，当然也少不了 TSLint

<h3 id="prettier">Prettier</h3>

> 自动代码格式化程序。忘掉那些你不得不手动缩进代码的日子吧，有了这个工具，事情就变得简单多啦。这个程序会比你自己做得更快更好。还有一个类似的`Beautify`，也挺火的。

<h3 id="code-spell-checker">Code Spell Checker</h3>

> 这一工具正如其名，是检查程序拼写。Bug 的另一个常见来源是变量或函数名。这一拼写检查工具可以查找不常见的单词，而且还可以把我们用 JS 编写的东西进行有效的审核。

## Language Support

<h3 id="babel-es6-es7">Babel ES6/ES7</h3>

> JavaScript Babel 的辅助工具。如果你用的是 Babel，这个工具可以让你更容易区分代码。如果你喜欢 JavaScript，那务必也不要错过这款插件。

<h3 id="code-runner">Code Runner</h3>

> 可以快速地运行一段代码片段，支持的语言有: C, C++, Java, JavaScript, PHP, Python, Perl, Perl 6, Ruby, Go, Lua, Groovy, PowerShell, BAT/CMD, BASH/SH, F# Script, F# (.NET Core), C# Script, C# (.NET Core), VBScript, TypeScript, CoffeeScript, Scala, Swift, Julia, Crystal, OCaml Script, R, AppleScript, Elixir, Visual Basic .NET, Clojure, Haxe, Objective-C, Rust, Racket, AutoHotkey, AutoIt, Kotlin, Dart, Free Pascal, Haskell, Nim, D。

目前发现跑 Java 代码的时候中文会出现乱码，Github 上已经有人提出这个问题了，目前作者推荐的临时解决方案是运行时候强制用 VS 自带的控制台去查看：

```json
"code-runner.executorMap": {
  "java": "cd $dir && javac -encoding utf-8 $fileName && java $fileNameWithoutExt"
},
"code-runner.runInTerminal": true
```

## Test

<h3 id="jest">Jest</h3>

> 写 jest 测试必装的一个插件，可以自动跑测试，debug测试。从webstorm切换过来的时候我还找了半天怎么跑测试，原来是自动读取配置跑的，但是有个问题就是如果我项目的jest配置是放在`node_modules`的一个包里的，那么读取配置就会失效，如果我手动配置的话，那我换一个工程怎么办？捂脸:)，如果哪位小伙伴知道的话，也不妨留言告诉我，学习一下。个人觉得，这个jest插件相比webstorm的jest，是要差一点。

<h3 id="ava">AVA</h3>

> 喜欢 sindresorhus 大神的 ava 可以装这个插件玩玩，webstorm里面目前还不支持ava测试，当然真的写ava测试的人也不需要我推荐这个插件。

## Theme

<h3 id="darcula-intellij-theme">Darcula IntelliJ Theme</h3>

> 因为我喜欢 webstorm 的暗色主题，所以vscode也用了同样的主题。总的来说，这个插件的主题还原度还是比较高的，甚至某些颜色搭配比 webstorm 原生看起来的还更舒服一点。但是注释里面 `@param` 这些不是绿色，感觉有点乱，还是喜欢原生的全部绿色的注释。

<h3 id="material-icon-theme">Material Icon Theme</h3>

> 试过很多款 icon，个人最喜欢这款，只不过默认的文件夹颜色很多很花哨，我把它调整成单一的颜色，舒服多了。`classic theme` 就是比较单一的文件夹颜色，没事别整那么多花里胡哨的幺蛾子。

![image](https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/images/set-folder-theme.gif)


<h3 id="webstorm-icon-theme">Webstorm Icon Theme</h3>

> 一直很喜欢webstorm的文件夹小字小图标，图标也比较系统，不像 vscode 里面花里胡哨的，当然各有各的好处，只不过这个插件的 icon 比较老了，希望作者能更新到最新的webstorm的icon那就完美了。

## Tools

<h3 id="excel-viewer">Excel Viewer</h3>

> 主要不是为了在 vscode 里面使用 excel，而是开发中遇到 `csv` 文件可以快速地用 vscode 打开还能切换成表格的方式显示。

![image](https://github.com/jjuback/gc-excelviewer/raw/master/img/csv-preview-2.gif)

<h3 id="settings-sync">Settings Sync</h3>

> 不得不说 vscode 的插件多，但配置也非常繁琐，现在的配置支持可视化了，相对好一点了。这个插件可以减少你换个设备重复配置的问题，它会将你的配置自动上传到你的 github gist(secret)，下次换一个设备，验证一下token权限和 gistid 即可，非常方便。另外建议不要将配置public，因为你的插件里面可能是配置了token的，这样你的token也会暴露。

## Tips

<h3 id="explorer-file-color">explorer区文件颜色</h3>

VSCode 的版本控制系统会自动识别文件的改动给文件加颜色、文件名后面显示`M`（modify）、`U`（untracked）、`A`（add）和显示错误和警告的数量，就像下图这样：

<img width="318" alt="image" src="https://user-images.githubusercontent.com/12554487/41210381-dbf40f60-6d63-11e8-8cba-dd219e392575.png">

有些文件明明没有改动，文件名有时候却也变成绿色，其实是里面有一些错误或者警告而已。

```json
// Show Errors & Warnings on files and folder.
"problems.decorations.enabled": true,
```

把 `true` 改成 `false`，即可将文件名和文件夹名后面的错误警告数量去掉（如+9），且文件名的颜色也回归 git 本身的颜色，现在颜色的变化只有 git，更加容易辨识哪些文件发生了改动。

几个相关的配置说明：

```json
// git文件改动，文件名后面的U/M等是否显示，默认true
"git.decorations.enabled": true,
// git或者错误警告文件名是否用颜色标识，默认true
"explorer.decorations.colors": true,
// 文件名或者文件夹名后面是否显示Errors & Warnings的数量，默认true
"problems.decorations.enabled": false
```

<img width="318" alt="image" src="https://user-images.githubusercontent.com/12554487/41210327-95c6f85e-6d63-11e8-8516-d0e8894a7ea4.png">
