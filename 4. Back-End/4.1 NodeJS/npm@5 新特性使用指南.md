npm@5 的一些变化：
1. 改写了 cache 机制，速度跟 yarn 接近了（仍然慢一点点）
1. 安装完成后会打印耗时，跟 yarn 简直一样
1. 安装时默认产生 `package-lock.json` 文件来记录依赖树信息，进行依赖锁定，并使用新的 shrinkwrap 格式
1. npm 的 lock 文件中的 registry 优先级低于配置的 registry 
1. 发布的模块不会包含 `package-lock.json` 文件
1. 使用`npm install xxx`命令安装模块时，不再需要`--save`选项，会自动将模块依赖信息保存到 `package.json` 文件，除非加上 `--no-save`


本来 yarn 相对于 npm@4 的区别主要就是：
1. yarn 安装速度更快
1. yarn 默认会用 lock file 锁住依赖版本

现在 npm@5 一改多年的挤牙膏作风，在以上方面都有改进，npm 相对于 yarn 更成熟，而且 yarn 用起来也不完美：
1. yarn.lock 里带有 registry url ，且优先级高于配置中的 registry，切换 registry 时不太方便
1. yarn 对 npm 参数的支持度有限，可以说大部分参数都不支持
1. yarn 对 npm scripts 支持不完善，而且 npm 也再不断增加新的 life cycle scripts， yarn 在这方面有滞后性

## 特性一：锁文件（lockfile）

### package-lock.json
重新安装模块之所以快，是因为 `package-lock.json` 文件中已经记录了整个 node_modules 文件夹的**树状结构**，甚至连模块的**下载地址**都记录了，再重新安装的时候只需要直接下载文件即可

详细机制注意事项请看：[npm 命令和机制指南 3. 新增包](https://github.com/muwenzi/Program-Blog/issues/104#3)

### npm-shrinkwrap.json
npm@5 新增的 `package-lock.json` 文件和之前通过 `npm shrinkwrap` 命令生成的 `npm-shrinkwrap.json` 文件的格式完全相同，文件内记录了**版本，来源，树结构等所有依赖的 metadata**。

需要注意的是 npm shrinkwrap 并不是一个新功能特性，而是从 npm@2 就开始有的功能。也就是说在 npm@5 之前的版本也是可以通过 shrinkwrap 锁定依赖的。（在这一点上，其实 Facebook 也是早期在使用 npm shrinkwrap 等功能时无法满足需求才导致了现在 yarn 的出现。可以阅读 Facebook 的这篇文章了解他们开发 yarn 的动机。）

而最新的 npm@5 在生成了 `package-lock.json` 之后，再运行 `npm shrinkwrap` 命令，会发现就是把 `package-lock.json` 重命名为 `npm-shrinkwrap.json` 而已。

因此 `package-lock.json` 表面上看只是把 `npm-shrinkwrap.json` 作为了默认创建，为何还要新建一个文件呢？官方对于此也给出了答复和解释：新增 `package-lock.json` 主要是为了使得 `npm-shrinkwrap.json` 可以**向下兼容，保证旧版也可使用**。另外 package-lock 的名称也比 shrinkwrap 相对更加直观。

### 适用场景：

1. **开发**时提交和使用 `package-lock.json` 来保证不同环境、人员安装依赖的一致性。
1. **发布包**时如果有锁定的需求，可以用 `npm shrinkwrap` 命令把 `package-lock.json` 转为 `npm-shrinkwrap.json` 随包发布。
1. 如果项目中已经在使用 `npm-shrinkwrap.json`，可以继续使用（但要注意从旧版本升级到 npm@5 后 install 时会被更新），其优先级高于 `package-lock.json`，并且不会再被重复创建。


## 特性二：缓存优化

### 缓存策略
npm 的缓存目录是通过 cache 变量指定的，一般默认是在` ~/.npm` 文件夹，可以执行下面的命令查看

```bash
npm config get cache
```
在 npm@5 以前，每个缓存的模块在 `~/.npm` 文件夹中以模块名的形式直接存储，例如 koa 模块存储在` ~/.npm/koa` 文件夹中。而 npm@5 版本开始，数据存储在 `~/.npm/_cacache` 中，并且不是以模块名直接存放。

npm@5重写了整个缓存系统，缓存将由 npm 来全局维护不用用户操心，这点也是在向 yarn 看齐。升级新版后，用户基本没有手动操作 npm cache 的场景。npm cache clean 将必须带上 --force 参数才能执行，并且会收到警告：

npm 的缓存是使用 [pacote](https://www.npmjs.com/package/pacote) 模块进行下载和管理，基于 [cacache](https://www.npmjs.com/package/cacache) 缓存存储。由于 npm 会维护缓存数据的完整性，一旦数据发生错误，就回重新获取。因此不推荐手动清理缓存，除非需要释放磁盘空间，这也是要强制加上` --force` 参数的原因。

目前没有提供用户自己管理缓存数据的命令，随着你不断安装新的模块，缓存数据也会越来越多，因为 npm 不会自己删除数据。

## 特性三：文件依赖优化
在之前的版本，如果将本地目录作为依赖来安装，将会把文件目录作为副本拷贝到 node_modules 中。而在 npm@5 中，将改为使用创建 symlinks 的方式来实现（使用本地 tarball 包除外），而不再执行文件拷贝。这将会提升安装速度：
```bash
npm install ../packages/mylib
npm install file://packages/mylib
```
有关新的 file:// 规范描述可以参考官方的 [file-specifiers](https://github.com/npm/npm/blob/link-specifier/doc/spec/file-specifiers.md)。


## 最后：速度对比
网上测评结论（未考证）：yarn 的速度在大部分正常场景下还是略高一筹，不过相比之下 npm@5 的差距已经很小。

**参考资料**
1. [npm 5 发布，有什么值得关注的新特性吗？](https://www.zhihu.com/question/60519361/answer/177577759)
1. [说说 npm 5 的新坑](https://toutiao.io/posts/hrihhs/preview)
1. [npm 和 yarn 缓存策略对比](https://segmentfault.com/a/1190000009709213)
1. [npm5 新版功能特性解析及与 yarn 评测对比](https://www.qcloud.com/community/article/171211)