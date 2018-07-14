> https://github.com/muwenzi/Program-Blog/issues/12

[NPM官网](https://www.npmjs.com/)

![image](https://cloud.githubusercontent.com/assets/12554487/18139129/a47e1d1c-6fe2-11e6-9fa4-48a320ad5b83.png)

## 首先注册一个用户

```sh
npm adduser
Username: YOUR_USER_NAME
Password: YOUR_PASSWORD
Email: YOUR_EMAIL@domain.com
```

也可以[NPM官网注册](https://www.npmjs.com/signup)
成功之后，npm会把认证信息存储在~/.npmrc中，并且可以通过以下命令查看npm当前使用的用户：

```sh
npm whoami
```

## 如果已经注册过，就使用下面的命令登录

```sh
npm login
```

需要输入用户名、密码和邮箱。

## files

在你发布一个npm包之前一定要明确项目的哪些文件需要发布，默认npm会去读 `.npmignore` 文件，如果没有就会去读 `.gitignore` 。一般来说你不用刻意地加入 `.npmignore` 文件，往往我们需要发布的东西只有`dist`, `lib`, `es`等打包后的东西，所以我们直接在 `package.json` 里面加入 `files` 字段声明即可：

```json
// package.json
{
  "files": [
    "dist",
    "lib",
    "es",
    "foo.js"
  ]
}
```

`files` 属性的值是一个数组，内容是模块下文件名或者文件夹名，如果是文件夹名，则文件夹下所有的文件也会被包含进来（除非文件被另一些配置排除了）。你也可以在模块根目录下创建一个 `.npmignore` 文件，写在这个文件里边的文件即便被写在 `files` 属性里边也会被排除在外，这个文件的写法 `.gitignore` 类似。

**Details**
- Entries in `files` are [minimatch globs](https://www.npmjs.com/package/minimatch). That means `*.js`, `lib/**/*.js`, etc, all work.
- Entries in `files` are converted to include subdirectories, even ones intended as files. For example, foo.js will be treated as both `foo.js` and `foo.js/**`. It also means `lib` is all you need in order to include everything in that directory.
- A trailing `/` in `files` does nothing.
- npm automatically includes and excludes certain files, regardless of your settings. The entire list is [in the npm documentation for package.json](https://docs.npmjs.com/files/package.json#files).
- `node_modules/` gets special treatment. If you want to include dependencies in your publish, use `bundledDependencies`.
- *"The consequences are undefined"* if you try to negate any of the `files` entries (that is, `"!foo.js"`). Please don't. Use `.npmignore` .

`.npmignore` 文件的编写规则请参考：https://docs.npmjs.com/misc/developers#keeping-files-out-of-your-package

## 更新包

更新包的话，**coding完了千万不直接发布**，这里我们需要修改package的version号，但这里不要直接修改，修改之前先说下npm维护package版本的规则x.y.z.
x: 主版本号,通常有重大改变或者达到里程碑才改变;
y: 次要版本号,或二级版本号,在保证主体功能基本不变的情况下,如果适当增加了新功能可以更新此版本号;
z: 尾版本号或者补丁号,一些小范围的修修补补就可以更新补丁号.

```sh
npmsh version patch <=> z++
npmsh version minor <=> y++ && z=0
npm version major <=> x+= && y=0 && z=0
```

再执行`npm publish`就是重新发布新的package
同时注意:
如果npm包同时又是一个git仓库，在运行了npm version <update_type>和npm publish之后，npm会自动给git仓库打上一个跟当前版本号一样的tag，对于挂在github上的npm包很有用。

如果你希望项目发布的时候能够自动生成 `CHANGELOG.md` 文件，可以借助 [standard-version](https://github.com/conventional-changelog/standard-version) 这样的工具, 自动生成 CHANGELOG, 甚至是 语义化的版本号([Semantic Version](https://semver.org/lang/zh-CN/)).

安装:

```sh
npm i standard-version
```

package.json 配置:

```json
"script": {
    "release": "standard-version"
}
```

详细用法请参考 [standard-version](https://github.com/conventional-changelog/standard-version) 文档，结合 [commitizen/cz-cli](https://github.com/commitizen/cz-cli) 和 [commitizen/cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) 使用效果更佳。

## 撤销发布自己发布过的某个版本代码

```sh
npm unpublish YOUR_PACKAGE@version
```

:warning: npm新的规则：发布过后24h内可以自己手动删除，需要加上`-f` 参数，参见https://docs.npmjs.com/cli/unpublish
>With the default registry (registry.npmjs.org), unpublish is only allowed with versions published in the last 24 hours. If you are trying to unpublish a version published longer ago than that, contact support@npmjs.com.

:warning: 如果你删除之后再重新发布同名的包，会报如下错误，需要再等24h方可发布：

```sh
~/D/p/wait-for-user-input (master) npm publish
npm ERR! publish Failed PUT 403
npm ERR! code E403
npm ERR! wait-for-user-input cannot be republished until 24 hours have passed. : wait-for-user-input
```

## 废弃某个版本的模块

```sh
npm deprecate YOUR_PACKAGE@"< 0.2.3" "critical bug fixed in v0.2.3"
```

运行上面的命令以后，小于0.2.3版本的模块的package.json都会写入一行警告，用户安装这些版本时，这行警告就会在命令行显示。

## 管理模块的维护者

**列出指定模块的维护者**

```sh
npm owner ls PACKAGE_NAME
```

**新增维护者**

```sh
npm owner add USER_NAME PACKAGE_NAME
```

**删除维护者**

```sh
npm owner rm USER_NAME PACKAGE_NAME
```

## 其他命令

npm home命令可以打开一个模块的主页，npm repo命令则是打开一个模块的代码仓库。

```sh
npm home PACKAGE_NAME
npm repo PACKAGE_NAME
```

这两个命令不需要模块先安装。

npm outdated命令检查当前项目所依赖的模块，是否已经有新版本。

```sh
npm outdated
```

它会输出当前版本（current version）、应当安装的版本（wanted version）和最新发布的版本（latest version）。

## 参考文章

1. [npm模块管理器（by 阮一峰）](http://javascript.ruanyifeng.com/nodejs/npm.html)
1. [NPM 使用介绍](http://www.runoob.com/nodejs/nodejs-npm.html)
1. [如何发布Node模块到NPM社区](http://weizhifeng.net/how-to-publish-a-node-module.html)
1. [从零写一个npm包](http://warjiang.github.io/devcat/2016/05/02/%E4%BB%8E%E9%9B%B6%E5%86%99%E4%B8%80%E4%B8%AAnpm%E5%8C%85/)
1. [深入 Node 模块的安装和发布](https://segmentfault.com/a/1190000004221514)
1. [A story about npm publish / unpublish](https://christianfei.com/posts/a-story-about-npm-publish-unpublish/)
1. [优雅的提交你的 Git Commit Message](https://zhuanlan.zhihu.com/p/34223150)
1. [npm package.json属性详解（by 桃子夭夭）](https://www.cnblogs.com/tzyy/p/5193811.html)
1. [Files and Ignores (by npm)](https://github.com/npm/npm/wiki/Files-and-Ignores)
