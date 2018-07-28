> https://github.com/muwenzi/Program-Blog/issues/133

<!-- TOC -->

- [1. 背景](#1-背景)
- [2. 安装 GPG](#2-安装-gpg)
- [3. 生成 GPG keys](#3-生成-gpg-keys)
- [4. 列出密钥](#4-列出密钥)
- [5. 输出密钥](#5-输出密钥)
- [6. 上传公钥至 Github 帐号](#6-上传公钥至-github-帐号)
- [7. 设置 Git](#7-设置-git)
- [8. 参考资料](#8-参考资料)

<!-- /TOC -->

# 1. 背景

[GnuPG（简称 GPG）](https://zh.wikipedia.org/wiki/GnuPG)，它是目前最流行、最好用的开源加密工具之一。

要了解什么是GPG，就要先了解 [PGP](https://zh.wikipedia.org/wiki/PGP)。

1991年，程序员 [Phil Zimmermann](https://en.wikipedia.org/wiki/Phil_Zimmermann) 为了避开政府监视，开发了加密软件PGP。这个软件非常好用，迅速流传开来，成了许多程序员的必备工具。但是，它是商业软件，不能自由使用。所以，自由软件基金会决定，开发一个PGP的替代品，取名为GnuPG。这就是GPG的由来。

GPG 有许多用途，比如对文件，邮件的加密。而本文要说的是，如何使用 GPG 来加密 Github Commits。

在 Github 上查看一些项目的 Commits 时，会发现「This commit was signed with a verified signature.」字样，具体来说，就是下图示例那样:

<img width="936" alt="image" src="https://user-images.githubusercontent.com/12554487/43182158-da8515c6-9012-11e8-8066-3c87c783b6cd.png">

那为什么要对 commit 进行验证呢？

引用一下 [Github 官方的解释](https://help.github.com/articles/signing-commits-with-gpg/):

> With GPG keys, tags or commits that you've authored on GitHub are verified and other people can trust that the changes you've made really were made by you.

说白了就是验证你的你的代码提交是不是来源于受信的电脑。当然没有绝对的安全，只是更进一步的确保代码提交是你本人操作。

# 2. 安装 GPG

macOS:

```sh
brew install gnupg gnupg2
```

Debian / Ubuntu:

```sh
sudo apt-get install gnupg
```

Fedora:

```sh
yum install gnupg
```

# 3. 生成 GPG keys

```sh
gpg --full-generate-key
```

回车，提示信息如下：

```sh
gpg (GnuPG) 2.2.4; Copyright (C) 2017 Free Software Foundation, Inc.
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

gpg: directory '/Users/Kimi/.gnupg' created
gpg: keybox '/Users/Kimi/.gnupg/pubring.kbx' created
请选择您要使用的密钥种类：
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (仅用于签名)
   (4) RSA (仅用于签名)
您的选择？
```

选择加密算法，默认选择第一个选项即可，表示加密和签名都使用 RSA 算法。
选 1，回车。

选择密钥长度，默认为 2048，建议输入 4096。

```sh
RSA 密钥长度应在 1024 位与 4096 位之间。
您想要用多大的密钥尺寸？(2048)4096
```

输入 4096，回车。

设定密钥的有效期。

```sh
请设定这把密钥的有效期限。
         0 = 密钥永不过期
      <n>  = 密钥在 n 天后过期
      <n>w = 密钥在 n 周后过期
      <n>m = 密钥在 n 月后过期
      <n>y = 密钥在 n 年后过期
密钥的有效期限是？(0)
密钥永远不会过期
```

密钥只是个人使用的话，建议选择第一个选项，即永不过期。
输入 0，回车。

系统会问你上述设置是否正确。

```sh
以上正确吗？(y/n)y
```

输入 y，回车。

系统会要求你输入个人信息。

```sh
You need a user ID to identify your key; the software constructs the user ID
from the Real Name, Comment and Email Address in this form:
    "Heinrich Heine (Der Dichter) <heinrichh@duesseldorf.de>"

真实姓名：
```

填入你的名字，需是英文。回车。

```sh
电子邮件地址：
```

填入你的邮箱地址。回车。

```sh
注释：
```

「注释」可以空着不填。回车。
系统会再次让你确认填入的信息。

```sh
选定了这个用户标识：
    “Kimi Gao <mrgaonju@gmail.com>”

更改姓名(N)、注释(C)、电子邮件地址(E)或确定(O)/退出(Q)？O
```

输入 O，回车。 
系统会让你设定一个私钥的密码。

<img width="451" alt="image" src="https://user-images.githubusercontent.com/12554487/43181246-b70ae8c2-900e-11e8-9f86-4bb819066c6a.png">

可以不填选择「OK」。系统这时开始生成密钥，这时会要求你做一些随机的举动，以生成一个随机数。你拿起鼠标随便晃晃，直到完成密钥生成。

```sh
我们需要生成大量的随机字节。这个时候您可以多做些琐事(像是敲打键盘、移动
鼠标、读写硬盘之类的)，这会让随机数字发生器有更好的机会获得足够的熵数。
我们需要生成大量的随机字节。这个时候您可以多做些琐事(像是敲打键盘、移动
鼠标、读写硬盘之类的)，这会让随机数字发生器有更好的机会获得足够的熵数。
```

最后，提示生成完毕。

```sh
gpg: /Users/Kimi/.gnupg/trustdb.gpg：建立了信任度数据库
gpg: 密钥 39CCA91BEB734105 被标记为绝对信任
gpg: directory '/Users/Kimi/.gnupg/openpgp-revocs.d' created
gpg: revocation certificate stored as '/Users/Kimi/.gnupg/openpgp-revocs.d/876BA0A4DDFCD1A330ED0A4439CCA91BEB734105.rev'
公钥和私钥已经生成并经签名。

pub   rsa4096 2018-07-24 [SC]
      876BA0A4DDFCD1A330ED0A4439CCA91BEB734105
uid                      Kimi Gao <mrgaonju@gmail.com>
sub   rsa4096 2018-07-24 [E]
```

# 4. 列出密钥

命令如下：

```sh
gpg --list-keys
```

输出结果如下：

```sh
gpg: 正在检查信任度数据库
gpg: marginals needed: 3  completes needed: 1  trust model: pgp
gpg: 深度：0 有效性：  1 已签名：  0 信任度：0-，0q，0n，0m，0f，1u
/Users/Kimi/.gnupg/pubring.kbx
------------------------------
pub   rsa4096 2018-07-24 [SC]
      876BA0A4DDFCD1A330ED0A4439CCA91BEB734105
uid           [ 绝对 ] Kimi Gao <mrgaonju@gmail.com>
sub   rsa4096 2018-07-24 [E]
```

gpg显示公钥文件名（pubring.gpg）
pub显示公钥特征（4096 位，Hash 字符串和生成时间）
uid显示用户信息
sub显示私钥特征

# 5. 输出密钥

公钥文件（.gnupg/pubring.kbx）以二进制形式储存，armor 参数可以将其转换为 ASCII 码显示。

```sh
gpg --armor --output [输出文件名] --export [密钥ID]
```

[密钥ID]指定用户的公钥，如 `876BA0A4DDFCD1A330ED0A4439CCA91BEB734105` 参数指定输出文件名，如 `public-key.txt`

同理，export-secret-keys 参数可以转换私钥。

```sh
gpg --armor --output private-key.txt --export-secret-keys
```

public-key.txt 和 private-key.txt 默认会导出至用户目录 `/Users/<用户名>/`

# 6. 上传公钥至 Github 帐号

点击用户头像，打开 Settings，左侧菜单点击 `SSH and GPG keys`，在 `GPG keys` 那里，点击 `New GPG key`。
在输入框里填入刚刚导出的 public-key.txt 内容。
点击 `Add GPG key`，完成上传。

详细参考：[GithubHelp - Adding a new GPG key to your GitHub account](https://help.github.com/articles/adding-a-new-gpg-key-to-your-github-account/)

# 7. 设置 Git

根据刚才 gpg –list-keys 显示的结果，此时已经知道密钥 ID 为 876BA0A4DDFCD1A330ED0A4439CCA91BEB734105。
设置 Git 使用该密钥 ID 加密：

```sh
git config --global user.signingkey  876BA0A4DDFCD1A330ED0A4439CCA91BEB734105
```

设置 Git 全局使用该密钥加密：

```sh
git config --global commit.gpgsign true
```

最后，再输入以下命令查看 Git 配置情况：

```sh
git config -l
```

包含以下信息：

```sh
user.signingkey=876BA0A4DDFCD1A330ED0A4439CCA91BEB734105
commit.gpgsign=true
```

至此，使用 GPG 加密 Github Commits 就正式完成了。
以后再 Git Commit，同步到 Github 上之后，就会发现该 Commit 已显示 Verified:

<img width="932" alt="image" src="https://user-images.githubusercontent.com/12554487/43181956-2001e832-9012-11e8-9d3e-43a8e79f23aa.png">

# 8. 参考资料

1. [How to resolve “gpg: command not found” error during RVM installation?](https://stackoverflow.com/questions/27041885/how-to-resolve-gpg-command-not-found-error-during-rvm-installation)
1. [GPG入门教程 作者：阮一峰](http://www.ruanyifeng.com/blog/2013/07/gpg.html)
1. [使用 GPG 加密 Github Commits 作者：秋水逸冰](https://teddysun.com/496.html)