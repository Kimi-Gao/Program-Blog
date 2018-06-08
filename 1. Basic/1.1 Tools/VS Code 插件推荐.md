> https://github.com/muwenzi/Program-Blog/issues/129

Visual Studio Code 是我用起来最顺手方便和强大的`文本编辑器`，可以配合IDAE系列进行愉快的coding。

一般稍大的工程项目我会用IDAE系列，而快速地看github上别人库，跑别人代码，写一个代码小片段，运行一段小程序，我通常会选择 `VS Code`。

小巧，强大，插件丰富，界面也很优雅，可定制化程度也很高，大厂支持，更新非常快速，别的就不多说，这里给大家推荐一些比较不错实用的插件。

## 分类概览

- Markdown
  - [markdownlint](#markdownlint)
  - [Markdown Preview Github Styling](#markdown-preview-github-styling)
  - [Markdown Emoji](#markdown-emoji)
- Code Style
  - [ESLint](#eslint)
  - [TSLint](#tslint)
  - [Prettier](#prettier)
  - [Code Spell Checker](#code-spell-checker)
- Language Support
  - [Babel ES6/ES7](#babel-es6-es7)
  - [Code Runner](#code-runner)

## Markdown

<h3 id="markdownlint">markdownlint</h3>

> 规范你的markdown写法，适合于有强迫症的程序员

<h3 id="markdown-preview-github-styling">Markdown Preview Github Styling</h3>

> 装上这个插件，基本可以模仿 github 上页面写 markdown 的样子，非常赞的插件，写github markdown 必备。

<h3 id="markdown-emoji">Markdown Emoji</h3>

> 使用 `:emoji:` 语法即可在markdown里面加入emoji标签，preview的时候即可见，搭配 `Markdown Preview Github Styling` 插件更赞。

## Code Style

<h3 id="eslint">ESLint</h3>

>你在编写代码的时候，利用这个软件可以轻易获取有关漏洞的提示，而且在编码过程中，它还可以帮助你养成良好的编码习惯。

<h3 id="tslint">TSLint</h3>

>有了ESLint，当然也少不了TSLint

<h3 id="prettier">Prettier</h3>

> 自动代码格式化程序。忘掉那些你不得不手动缩进代码的日子吧，有了这个工具，事情就变得简单多啦。这个程序会比你自己做得更快更好。还有一个类似的`Beautify`，也挺火的。

<h3 id="code-spell-checker">Code Spell Checker</h3>

> 这一工具正如其名，是拼写检查程序。漏洞的的另一个常见来源是变量或函数名。这一拼写检查工具可以查找不常见的单词，而且还可以把我们用JavaScript编写的东西进行有效的审核。

## Language Support

<h3 id="babel-es6-es7">Babel ES6/ES7</h3>

> JavaScript Babel的辅助工具。如果你用的是Babel，这个工具可以让你更容易区分代码。如果你喜欢JavaScript，那务必也不要错过这款插件。

<h3 id="code-runner">Code Runner</h3>

> 可以快速地运行一段代码片段，支持的语言有: C, C++, Java, JavaScript, PHP, Python, Perl, Perl 6, Ruby, Go, Lua, Groovy, PowerShell, BAT/CMD, BASH/SH, F# Script, F# (.NET Core), C# Script, C# (.NET Core), VBScript, TypeScript, CoffeeScript, Scala, Swift, Julia, Crystal, OCaml Script, R, AppleScript, Elixir, Visual Basic .NET, Clojure, Haxe, Objective-C, Rust, Racket, AutoHotkey, AutoIt, Kotlin, Dart, Free Pascal, Haskell, Nim, D。

目前发现跑 Java 代码的时候中文会出现乱码，Github上已经有人提出这个问题了，目前作者推荐的临时解决方案是运行时候强制用VS自带的控制台去查看：

```json
"code-runner.executorMap": {
  "java": "cd $dir && javac -encoding utf-8 $fileName && java $fileNameWithoutExt"
},
"code-runner.runInTerminal": true
```