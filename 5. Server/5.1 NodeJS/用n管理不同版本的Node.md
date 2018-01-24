> https://github.com/muwenzi/Program-Blog/issues/6

# n

是管理多个Node版本的工具，作者是[TJ Holowaychuk](https://github.com/tj)（鼎鼎大名的Express框架作者），就像它的名字一样，它的理念就是简单。之前用的是nvm，貌似大家都说好，但是用起来切换版本配置有点麻烦，而且结合zsh启动会有延迟等等导致我弃用了nvm，投入了TJ大神n的怀抱（可能是我不太会用nvm），n管理Node版本体验真的很simple and easy，顿时世界变得清爽许多 :smiley:

**另外补充一下n和nvm的区别：**
```
n命令是作为一个node的模块而存在，而nvm 是一个独立于node/npm的外部 shell 脚本。

由于npm安装的模块路径一般为/usr/local/lib/node_modules（可以使用npm root -g命令查看你的系统中全局的路径）
当使用n切换不同的node版本时，实际上会共用全局的node/npm目录。
而nvm是每个版本的node都有独立的全局目录。

So

if (需求 == 按不同node版本使用不同全局node模块) use nvm，以免出现全局模块无法更新的问题。
if (需求 == 频繁更新node，不想新版本的node再全局安装node模块) use n，省事省心，当然会有坑哦。
```

- [n官方使用说明](https://github.com/tj/n)
- [NodeJS官网](https://nodejs.org/zh-cn/)

## 基本使用

### 安装n

> curl -L http://git.io/n-install | bash

安装完记得source一下
### 安装node
#### [1] 安装指定版本

> n 6.4.0
#### [2] 安装最新版本

> n latest
#### [3] 安装稳定版本

> n stable
### 切换版本

直接输入n后输出当前已经安装的node版本以及正在使用的版本（前面有一个o），你可以通过移动上下方向键来选择要使用的版本，最后按回车生效。**注：要在root权限下切换方可生效**

> n
>  4.4.1 
> o   6.4.0 

### 查看当前版本在node所有版本中的位置

> n ls

### 删除某个版本

> n rm 0.12.9

### 查看某版本node的安装路径

> n bin 7.1.0
/Users/Kimi/n/n/versions/node/7.1.0/bin/node

### 以指定的版本来执行脚本

> n use 0.12.9 some.js

`use` can be replace with `as`

## 坑1

今天（2016-10-17）遇到n切换node版本的时候无法选择切换不知道什么地方出了问题，搜了一圈没有找到解决办法，就直接删掉n文件夹准备重装，可是报了下面的错误：
![image](https://cloud.githubusercontent.com/assets/12554487/19428450/d2d7f872-947c-11e6-8484-d5186bacf2e0.png)
需要彻底删除node，执行下面shell脚本[uninstallNodejs.sh](https://github.com/jesseyu/uninstallNodejs)

``` shell
#!/bin/bash
lsbom -f -l -s -pf /var/db/receipts/org.nodejs.pkg.bom \
| while read i; do
  sudo rm /usr/local/${i}
done
sudo rm -rf /usr/local/lib/node \
     /usr/local/lib/node_modules \
     /var/db/receipts/org.nodejs.*
```

再重新安装n

> curl -L http://git.io/n-install | bash

问题就解决了，不知道是什么原因导致不能切换node版本，maybe a bug...

更新（2016-10-26）这个问题在另一个电脑上也发现了，而且n也有一些莫明的bug，安装不上新版的node，有时候就不得不卸载重装，卸载感觉也稍微麻烦。

``` shell
npm rm -g n (uninstall n via npm) 
sudo rm -rf /usr/local/n (where n stores binaries)
```

**Note**: The version you were last using will remain (at /usr/local/bin/node) along with npm (at /usr/local/lib/node_modules/npm/bin/npm).

这个问题貌似升级一下n，或者直接安装一下新版本也能修复，有点迷

## 坑2
之前用n装的node7.0.0就发现存在这个问题，今天（2016-11-18）用n装node7.1.0版本时候，运行`npm i`会报如下错误：

![image](https://cloud.githubusercontent.com/assets/12554487/20438712/87b00cbe-adf3-11e6-8dee-e6f968f6deaa.png)

搜索的一下，发现网上出现这种情况的很多很多，最后找到了解决办法，大致意思就是需要把npm升级到4最新版，这有点迷，难道自带的npm不应该是最新的嘛，不知何解，可能和n共用全局模块，导致不兼容性有关，但更新npm4就可以解决，为何？总之安装一下npm@4就可以解决问题，当然不能直接安装，需要进入n的对应node版本的目录下安装，比如这是我的目录：

```sh
$ ~/n/n/versions/node/7.1.0/bin/npm i -g npm@4
```
maybe 你的目录是

```sh
$ ~/.n/n/versions/node/7.1.0/bin/npm i -g npm@4
```
安装完成后`npm i`就不会出错了，真是折腾。

- [填坑原地址](https://github.com/npm/npm/issues/14438)

**更多**
- [n-install](https://github.com/mklement0/n-install#uninstalling-n)
- [利用n和nvm管理Node的版本](http://www.hi-linux.com/2016/04/07/%E5%88%A9%E7%94%A8n%E5%92%8Cnvm%E7%AE%A1%E7%90%86Node%E7%9A%84%E7%89%88%E6%9C%AC/)
