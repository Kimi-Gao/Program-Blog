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
| 9 | [本地调试](#9) |
| 10 | [包执行器](#10) |
| i | [问题处理](#10) |

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

<h2 id="9">9. 本地调试</h2>

 https://docs.npmjs.com/cli/link

同一个目录下：
 ```bash
cd path/my-project
npm link path/my-package
```

不同目录下：
```bash
# 先到模块目录，把它 link 到全局
cd path/my-package
npm link

# 再去项目目录通过包名来 link
cd path/my-project
npm link my-package
````

去掉 link：
```bash
npm unlink my-package
```

> :warning: 注意：
> - 如果在 my-project 里面重新执行过 `npm i ` 那么link就会失效，需要重新link。
> - 在 my-package 里面的修改能自动同步到 my-project。

<h2 id="10">10. 包执行器</h2>

- **安装**

如果 npm 的版本 `>=5.2.0` 应该会自带 npx 命令，直接使用即可。如果没有则 `npm install -g npx`。完整的命令使用说明，运行`npx`即可

- **机制**

1. 首先会自动检查当前项目中的可执行依赖文件（即`./node_modules/.bin`下面的可用依赖）
1. 如果不存在就会去环境变量path中寻找
2. 如果还没有就会自动安装，其安装的依赖位于`~/.npm/_npx`之中(*macOS@10.14, npm@6.3.0*，`npm config get cache`可查看`_npx`所在目录)，安装的依赖只是临时的。

比如运行了 `npx http-server` 会在该目录下面生成 `24745`，当服务停掉时，该目录会自动删除。

![image](https://user-images.githubusercontent.com/12554487/50697107-43250700-107c-11e9-8c73-b8779e17a2b6.png)

> PS: 具体能临时存放多久，待补充。

- **本地二进制的简写方式**
  
一般情况下，如果你想执行一个本地项目安装的二进制文件而不是全局安装的，你需要这样：

```bash
./node_modules/.bin/jest
```
有了 npx 之后可以 简写如下形式：

```bash
$ npx jest
```

- **不用下载直接使用的 npm 包命令**
  
使用 `npx create-react-app my-app` 来执行 create-react-app 命令时，它会正常地帮我们创建 React 应用而不会实际安装 create-react-app。

也可以快速开启一个静态服务器：

```bash
$ npx serve
   ┌─────────────────────────────────────────────────┐
   │                                                 │
   │   Serving!                                      │
   │                                                 │
   │   - Local:            http://localhost:5000     │
   │   - On Your Network:  http://172.20.10.8:5000   │
   │                                                 │
   │   Copied local address to clipboard!            │
   │                                                 │
   └─────────────────────────────────────────────────┘
```

这将可以简化一次性命令的包，比如 xxx-init 来初始化项目，直接 `npx xxx-init`  即可。

- **直接运行来自于 Gist 的脚本**

```bash
$ npx https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32
npx: 1 安装成功，用时 9.985 秒
yay gist
```

- **测试不同的 npm 包版本**

查询最新的 uglify-js 的版本：
```bash
$ npx uglify-js --version
uglify-js 3.4.9
```

现在我们想获得最新的 2.x 版本的 uglify-js：
```bash
$ npx uglify-js@2 --version
uglify-js 2.8.29
```

所以我们就可以很轻松的使用不同版本的 uglify-js 来压缩代码了：
```bash
npx uglify-js@2.8.29 main.js -o ./dist/main.js
```

更多阅读：
- https://github.com/zkat/npx
- [Introducing npx: an npm package runner(The npm Blog)](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner)

<h2 id="qa">问题处理</h2>

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
2. [The .bin folder stackoverflow](https://stackoverflow.com/questions/25306168/the-bin-folder)
3. [npm入门](https://zhuanlan.zhihu.com/p/27539908)
4. [npm 模块安装机制简介](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)
5. [你所不知道的模块调试技巧 - npm link `作者：atian25`](https://github.com/atian25/blog/issues/17)
6. [npx 简介 `作者：jackPan`](https://www.jianshu.com/p/84daa0bea35c)
