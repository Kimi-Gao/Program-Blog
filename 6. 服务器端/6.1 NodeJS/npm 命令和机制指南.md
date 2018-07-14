[npm (Node Packaged Modules)](https://www.npmjs.com/) 是官方的 node.js 包管理器。

## 目录
| 序号 | 标题 |
| :-- | :-- |
| 1 | [命令一览](#1) |
| 2 | [版本管理](#2) |
| 3 | [新增包](#3)  |
| 4 | [更新包](#4)  |
| 5 | [删除包](#5) |
| 6 | [列出所有包](#6) |
| 7 | [清除缓存](#7) |
| 8 | [更改配置信息](#8) |
| 9 | [问题处理](#9) |

<h2 id="1">1. 命令一览</h2>

[npm API Documentation](https://docs.npmjs.com/)

![image](https://user-images.githubusercontent.com/12554487/32787690-c8120da8-c91c-11e7-92b0-d335bffe073f.png)

<h2 id="2">2. 版本管理</h2>

说npm之前先谈谈node的package是如何进行版本定义的。

先在node项目下运行一下`npm outdated`命令，会如下图所示：

![image](https://user-images.githubusercontent.com/12554487/32788322-8c072026-c91e-11e7-8447-4d51d2e4f7b5.png)

`wanted` 就是 dependencies字段，devDependencies字段中指定的版本号应当升级的版本，对wanted版本号的指定有以下几种形式：

>大版本.次要版本.小版本
>固定版本号：如 2.1.1
>波浪号：比如 ~1.2.2，只更新小版本号。
>插入号：比如 ˆ1.2.2，不改变大版本号。
>latest：安装最新版本。

:warning:注意
>如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。

可以看出上面列表less用的是插入号，所以wanted会提示更新次要版本号

<h2 id="3">3. 新增包</h2>

**先说说npm@5.4版的对于新增包的处理：**

`npm i packageName` 会把 `node_modules` 的对于的包更新到 `wanted` 版本，且会自动更新`package.josn`和`lock`文件

:warning:注意
>① npm i 和 npm i packageName 的行为是不一样的，前者会优先去lock里面找对应的版本，即使有wanted的更新版本也不会去下载安装，除非是没有lock文件的情况。
② `npm@5.3`和`5.4`及`5.5`的安装机制不一样，`5.4`会丢失部分包的`.bin`文件，尤其是需要`cli`的包，慎用。`5.5`不稳定，坑也很多，证书登录方面也有问题，目前`5.3`相对比较稳定，问题也较少。

**下面部分是包安装的基础知识：**

任何包可以用以下命令安装：

```sh
npm install packageName  # npm i packageName
```
这个命令会将包安装在当前目录下 `node_modules` 目录内，可执行命令（如果有）安装在 `node_modules/.bin` 目录下

作为系统级的全局安装使用 -g 选项:
```sh
npm install -g packageName  # npm i -g packageName
```

默认情形下这个命令会将包安装至  `/usr/lib/node_modules/npm` ，需要管理员权限.
用`n`安装的node，npm全局包将会放在`~/n/lib/node_modules/`下面
作为个人用户级的安装你可以使用一个本地目录来配置  `npm`  。这可以通过多种方式完成：

- 在命令中添加  `--prefix`  标记 (e.g.  `npm i -g packageName --prefix ~/.node_modules` )。
- 使用  `npm_config_prefix`  环境变量。
- 使用用户配置文件  `~/.npmrc` 。

第一个方法已不被推荐因为你需要记住位置并且每次操作都需要添加参数。
第二个方法只是添加下列行到你的 shell 配置文件 (e.g. `.bash_profile`, `.zshrc`)。

```sh
PATH="$HOME/.node_modules/bin:$PATH"
export npm_config_prefix=~/.node_modules
```

不要忘记`source`一下shell 配置文件。

第三个方法你可以使用命令：
```sh
npm config edit
```
你可以找到  prefix  选项并且设置一个期望的位置：
```sh
prefix=~/.node_modules
```
不要忘记删除行前面的` ; ` 否则会被当作注释。
你现在可以添加可执行命令的位置到你的 shell 配置文件。

```sh
export PATH="$HOME/.node_modules/bin:$PATH"
```
不要忘记`source`一下shell 配置文件。

<h2 id="4">4. 更新包</h2>

更新包有两种方式 `npm i packageName<@version>` 或者 `npm up packageName`

:warning:注意
>① `npm i` 的方式不加版本号和 `up` 的效果是一样的，只更新到 `wanted` 版本，有新版的改动都会更新package.json和lock文件。
② `npm i` 可以加版本号更新到最新版，比如`^2.3.0`更新到最新版`^3.0.0`之后，package.json和lock文件都会更新，且以插入号的方式来更新package.json文件。但是 `up` 命令无论加不加版本号它只会更新到wanted版本。

**关于up命令方面的基础知识**
```sh
npm update packageName # alias up
```
对于全局环境安装的包 (  `-g` )
```sh
npm up -g packageName
```
>Note: 全局安装的包可能需要管理员权限

**更新所有包**
有时你只希望更新所有包，去掉包名将试图更新所有包。
```sh
npm up
```
或者添加  `-g` 标记更新全局环境安装的包
```sh
npm up -g
```
更新单个全局包，比如`yarn`
```sh
npm up -g yarn
```

<h2 id="5">5. 删除包</h2>

删除使用  `-g`  标记安装的包只须：
```sh
npm uninstall -g packageName # aliases: un, r
```
>Note: 全局安装的包可能需要管理员权限

若删除个人用户目录下的包去掉标记执行：

```sh
npm r packageName
```
<h2 id="6">6. 列出所有包</h2>

若要显示已安装的包的树形视图执行：

```sh
npm ls -g  # aliases: list, la, ll
```

若只要显示第一层结构的包（你自己安装的包），可以执行：

```sh
npm ls -g --depth=0
```

<h2 id="7">7. 清除缓存</h2>

`npm install`或`npm update`命令，从 registry 下载压缩包之后，都存放在本地的缓存目录。npm 的缓存目录是通过 `cache` 变量指定的，一般默认是在` ~/.npm` 文件夹，可以执行下面的命令查看

```bash
npm config get cache
```

:warning:注意
>npm@5 版本开始，数据存储在 `~/.npm/_cacache` 中，并且不是以模块名直接存放。

### 缓存命令
[npm cache](https://docs.npmjs.com/cli/cache) 提供了三个命令，分别是`npm cache add`, `npm cache clean`, `npm cache verify`。

```bash
npm cache add
```

官方解释说这个命令主要是 npm 内部使用，但是也可以用来手动给一个指定的 package 添加缓存。(This command is primarily intended to be used internally by npm, but it can provide a way to add data to the local installation cache explicitly.)

```bash 
npm cache clean --force
```

删除缓存目录下的所有数据。从 npm@5 开始，为了保证缓存数据的有效性和完整性，必须要加上 `--force` 参数。

```bash
npm cache verify
```

验证缓存数据的有效性和完整性，清理垃圾数据。

### 离线安装
npm 提供了离线安装模式，使用 `--offline`, `--prefer-offline`, `--prefer-online` 可以指定离线模式。

#### `--prefer-offline / --prefer-online`

离线优先/网络优先模式。

如果设置为 --prefer-offline 则优先使用缓存数据，如果没有匹配的缓存数据，则从远程仓库下载。
如果设置为 --prefer-online 则优先使用网络数据，忽略缓存数据，这种模式可以及时获取最新的模块。

#### `--offline`

完全离线模式，安装过程不需要网络，直接使用匹配的缓存数据，一旦缓存数据不存在，则安装失败。

<h2 id="8">8. 更改配置信息</h2>

```sh
npm config set <key> <value>
npm config get [<key>]
npm config delete <key>
npm config list [--json]
npm config edit
npm set <key> <value>
npm get [<key>]
```
比如更换仓库
```sh
npm config set registry https://registry.npmjs.org/
```

<h2 id="9">9. 问题处理</h2>

**node-gyp python 错误**

有些使用 node-gyp 的工具不支持系统上的 Python 3，要解决这个问题，需要安装 `python2`并在 nvm 中设置:

```sh
npm config set python /usr/bin/python2
```
如果出现 `gyp WARN EACCES user "root" does not have permission to access the ... dir`，可以使用 `--unsafe-perm` 选项:
```sh
sudo npm install --unsafe-perm -g node-inspector
```

**参考资料**
1. [Node.js (简体中文)](https://wiki.archlinux.org/index.php/Node.js_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87))
1. [The .bin folder stackoverflow](https://stackoverflow.com/questions/25306168/the-bin-folder)
1. [npm入门](https://zhuanlan.zhihu.com/p/27539908)
1. [npm 模块安装机制简介](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)