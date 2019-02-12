# 1. 目录

<!-- TOC -->

- [1. 目录](#1-%E7%9B%AE%E5%BD%95)
- [2. 为什么要使用npmrc](#2-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E4%BD%BF%E7%94%A8npmrc)
- [3. npmrc工作机制](#3-npmrc%E5%B7%A5%E4%BD%9C%E6%9C%BA%E5%88%B6)
- [4. 如何使用npmrc](#4-%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8npmrc)
- [5. 相关配置说明](#5-%E7%9B%B8%E5%85%B3%E9%85%8D%E7%BD%AE%E8%AF%B4%E6%98%8E)
  - [5.1. registry=https://registry.npmjs.org](#51-registryhttpsregistrynpmjsorg)
  - [5.2. save-exact=true](#52-save-exacttrue)
  - [5.3. engine-strict=true](#53-engine-stricttrue)
- [6. 注意](#6-%E6%B3%A8%E6%84%8F)
- [7. 参考资料](#7-%E5%8F%82%E8%80%83%E8%B5%84%E6%96%99)

<!-- /TOC -->

# 2. 为什么要使用npmrc

常用场景：前端项目开发离不开安装各种npm依赖包，可以选择npm官方仓库也可以私有仓库，但更改仓库地址需要在安装时控制台打命令，比较麻烦，而npmrc可以很方便地解决上面问题。

# 3. npmrc工作机制

当安装项目的依赖包时，会优先查找并读取项目根目录下的.npmrc文件的配置。

# 4. 如何使用npmrc

npmrc使用起来非常的方便。只需要如下几个步骤：

1. 在项目根目录创建一个.npmrc的文件
2. 在这个文件中写入相关配置信息

# 5. 相关配置说明

## 5.1. registry=https://registry.npmjs.org

定义仓库地址，进入该工程目录下，npm registry会自动以该配置为准，不需要手动执行 `npm config set registry https://registry.npmjs.org`

## 5.2. save-exact=true

例如配置该项之后执行 `npm install lodash` 会产生如下效果：

```json
{
  "dependencies": {
    "lodash": "3.10.1"
  }
}
```

## 5.3. engine-strict=true

执行 `npm install` 的时候会检查是否满足 package.json 中"engines"定义的node和npm的版本。

但要注意的是如果开启了此项，**也会检查依赖包的 package.json 中"engines"定义的node和npm的版本**。有可能会版本定义不一致报错，此配置要慎用。

node和默认的npm版本对照：https://nodejs.org/zh-cn/download/releases/

`.npmrc`完整配置请参考: https://docs.npmjs.com/misc/config

# 6. 注意

`.npmrc` 在 `npm publish` 的时候会自动忽略该文件

<img src="https://user-images.githubusercontent.com/12554487/52620734-567b8b80-2ee0-11e9-878d-d7e868e4c819.png" width="400">

See more: https://docs.npmjs.com/files/package.json

# 7. 参考资料

1. [npmrc使用小记，作者：绯雨闲丸](https://www.vanadis.cn/2017/03/25/npmrc/)
1. https://docs.npmjs.com/files/package.json
1. https://gist.github.com/kentcdodds/5352dcce1c62630fe9d0
1. https://docs.npmjs.com/files/npmrc.html
1. https://docs.npmjs.com/files/package.json
1. https://nodesource.com/blog/configuring-your-npmrc-for-an-optimal-node-js-environment/
