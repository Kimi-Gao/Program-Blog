> https://github.com/muwenzi/Program-Blog/issues/22

使用`npm init`命令自动生成。

这个命令采用互动方式，要求用户回答一些问题，然后在当前目录生成一个基本的package.json文件。所有问题之中，只有`项目名称（name）`和`项目版本（version）`是必填的，其他都是选填的。
## dependencies，devDependencies

`指定版本`：比如1.2.2，遵循“大版本.次要版本.小版本”的格式规定，安装时只安装指定版本。

`~波浪号`-小版本最新：比如~1.2.2，表示安装1.2.x的最新版本（不低于1.2.2），但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。

`^插入号`-次版本最新：比如ˆ1.2.2，表示安装1.x.x的最新版本（不低于1.2.2），但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容。

`latest`-大版本最新：安装最新版本。
## main

模块引入方法require()在引入包时，会优先检查这个字段，并将其作为包中其余模块的入口。如果不存在这个字段，require()方法会查找包目录下的`index.js`, `index.node`, `index.json`文件作为默认入口。
## config

config字段用于向环境变量输出值。

下面是一个`package.json`文件。

``` javascript
{
  "name" : "foo",
  "config" : { "port" : "8080" },
  "scripts" : { "start" : "node server.js" }
}
```

然后，在server.js脚本就可以引用config字段的值。

``` javascript
http.createServer(...).listen(process.env.npm_package_config_port)
```

用户可以改变这个值。

``` bash
$ npm config set foo:port 80
```
## bin

一些包作者希望包可以作为命令行工具使用。配置好bin字段后，通过`npm i package_name -g`命令可以将脚本添加到执行路径中，之后可以在命令行直接执行，`node-gyp`即是这样安装的。
## engines字段

engines指明了该项目所需要的node.js版本
## 附：express的package.json参考

``` json
{
  "name": "express",
  "description": "Fast, unopinionated, minimalist web framework",
  "version": "4.14.0",
  "author": "TJ Holowaychuk <tj@vision-media.ca>",
  "contributors": [
    "Aaron Heckmann <aaron.heckmann+github@gmail.com>",
    "Ciaran Jessup <ciaranj@gmail.com>",
    "Douglas Christopher Wilson <doug@somethingdoug.com>",
    "Guillermo Rauch <rauchg@gmail.com>",
    "Jonathan Ong <me@jongleberry.com>",
    "Roman Shtylman <shtylman+expressjs@gmail.com>",
    "Young Jae Sim <hanul@hanul.me>"
  ],
  "license": "MIT",
  "repository": "expressjs/express",
  "homepage": "http://expressjs.com/",
  "keywords": [
    "express",
    "framework",
    "sinatra",
    "web",
    "rest",
    "restful",
    "router",
    "app",
    "api"
  ],
  "dependencies": {
    "accepts": "~1.3.3",
    "array-flatten": "1.1.1",
    "content-disposition": "0.5.1",
    "content-type": "~1.0.2",
    "cookie": "0.3.1",
    "cookie-signature": "1.0.6",
    "debug": "~2.2.0",
    "depd": "~1.1.0",
    "encodeurl": "~1.0.1",
    "escape-html": "~1.0.3",
    "etag": "~1.7.0",
    "finalhandler": "0.5.0",
    "fresh": "0.3.0",
    "merge-descriptors": "1.0.1",
    "methods": "~1.1.2",
    "on-finished": "~2.3.0",
    "parseurl": "~1.3.1",
    "path-to-regexp": "0.1.7",
    "proxy-addr": "~1.1.2",
    "qs": "6.2.0",
    "range-parser": "~1.2.0",
    "send": "0.14.1",
    "serve-static": "~1.11.1",
    "type-is": "~1.6.13",
    "utils-merge": "1.0.0",
    "vary": "~1.1.0"
  },
  "devDependencies": {
    "after": "0.8.1",
    "body-parser": "~1.15.1",
    "cookie-parser": "~1.4.3",
    "ejs": "2.4.2",
    "istanbul": "0.4.3",
    "marked": "0.3.5",
    "method-override": "~2.3.6",
    "mocha": "2.5.3",
    "morgan": "~1.7.0",
    "should": "9.0.2",
    "supertest": "1.2.0",
    "connect-redis": "~2.4.1",
    "cookie-session": "~1.2.0",
    "express-session": "~1.13.0",
    "jade": "~1.11.0",
    "multiparty": "~4.1.2",
    "vhost": "~3.0.2"
  },
  "engines": {
    "node": ">= 0.10.0"
  },
  "files": [
    "LICENSE",
    "History.md",
    "Readme.md",
    "index.js",
    "lib/"
  ],
  "scripts": {
    "test": "mocha --require test/support/env --reporter spec --bail --check-leaks test/ test/acceptance/",
    "test-ci": "istanbul cover node_modules/mocha/bin/_mocha --report lcovonly -- --require test/support/env --reporter spec --check-leaks test/ test/acceptance/",
    "test-cov": "istanbul cover node_modules/mocha/bin/_mocha -- --require test/support/env --reporter dot --check-leaks test/ test/acceptance/",
    "test-tap": "mocha --require test/support/env --reporter tap --check-leaks test/ test/acceptance/"
  }
}
```

**参考**
1. [package.json文件 by 阮一峰](http://javascript.ruanyifeng.com/nodejs/packagejson.html)
1. [深入浅出NodeJS by 朴灵](https://book.douban.com/subject/25768396/)
1. [Node项目的依赖管理](http://deadhorse.me/nodejs/2014/01/18/node_dependences_version.html)
1. [Specifics of npm's package.json handling](https://docs.npmjs.com/files/package.json)