> https://github.com/muwenzi/Program-Blog/issues/7

<!-- TOC -->

- [1. ps](#1-ps)
- [2. cat](#2-cat)
  - [2.1. 语法](#21-语法)
  - [2.2. 选项](#22-选项)
  - [2.3. 参数](#23-参数)
- [3. lsof](#3-lsof)
- [4. chown (修改权限)](#4-chown-修改权限)
- [5. grep](#5-grep)
- [6. awk](#6-awk)
- [7. sed](#7-sed)
- [8. mkdir/rmdir (创建/删除目录)](#8-mkdirrmdir-创建删除目录)
- [9. mv (移动、重命名文件)](#9-mv-移动重命名文件)
- [10. xargs](#10-xargs)
- [11. curl (文件上传和下载)](#11-curl-文件上传和下载)
- [12. more (按页显示文本内容)](#12-more-按页显示文本内容)
  - [12.1. 语法](#121-语法)
  - [12.2. 选项](#122-选项)
  - [12.3. 参数](#123-参数)
  - [12.4. 实例](#124-实例)
- [13. others](#13-others)
- [14. 参考资料](#14-参考资料)

<!-- /TOC -->

# 1. ps

ps aux | grep 搜索内容

查看进程列表

# 2. cat

cat 主要有三大功能

- 一次显示整个文件。`$ cat filename`
- 从键盘创建一个文件。`$ cat > filename` 只能创建新文件,不能编辑已有文件
- 将几个文件合并为一个文件： `$ cat file1 file2 > file`

cat 经常用来显示文件的内容。
注意：当文件较大时，文本在屏幕上迅速闪过（滚屏），用户往往看不清所显示的内容。因此，一般用 more 等命令分屏显示。为了控制滚屏，可以按 Ctrl+S 键，停止滚屏；按 Ctrl+Q 键可以恢复滚屏。按 Ctrl+C（中断）键可以终止该命令的执行，并且返回 Shell 提示符状态。

## 2.1. 语法

```sh
$ cat <选项> <参数>
```

## 2.2. 选项

```text
-n或-number：有1开始对所有输出的行数编号；
-b或--number-nonblank：和-n相似，只不过对于空白行不编号；
-s或--squeeze-blank：当遇到有连续两行以上的空白行，就代换为一行的空白行；
-A：显示不可打印字符，行尾显示“$”；
-e：等价于"-vE"选项；
-t：等价于"-vT"选项；
```

## 2.3. 参数

```text
文件列表：指定要连接的文件列表。
```

# 3. lsof

> -i:端口号——查看端口号对应的进程 id

lsof 命令用于查看你进程开打的文件，打开文件的进程，进程打开的端口(TCP、UDP)。因为 lsof 命令需要访问核心内存和各种文件，所以需要 root 用户执行。

# 4. chown (修改权限)

```sh
sudo chown -R $USER:$USER .
```

比如：

![image](https://user-images.githubusercontent.com/12554487/34808549-8f8ef9ce-f6ca-11e7-8a9b-fbc849360110.png)

```sh
sudo chown root:admin 路径
```

# 5. grep

在字符处理领域，有 grep、awk、sed 三剑客，grep 负责找出特定的行，awk 能将行拆分成多个字段，sed 则可以实现更新插入删除等写操作。

**排除 grep 自身**

**查找与 target 相邻的结果**

# 6. awk

# 7. sed

**插入**

**替换**

# 8. mkdir/rmdir (创建/删除目录)

创建单个目录

```shell
$ mkdir dir1
```

创建多个目录

```shell
$ mkdir dir1 dir2 dir3     //将分别创建dir1、dir2、dir3三个目录
```

创建多级目录

```
$ mkdir -p dir1/dir2/dir3  
```

例如我们想要建立目录 Project，其中含有 4 个文件夹 a, b, c, d，且这 4 个文件都含有一个 src 文件夹。

```
$ mkdir -p Project/{a,b,c,d}/src
```

rmdir 删除目录

# 9. mv (移动、重命名文件)

例如：

```bash
mv ~/.npmrc.bak ~/.npmrc
```

# 10. xargs

# 11. curl (文件上传和下载)

curl 命令是一个利用 URL 规则在命令行下工作的文件传输工具。它支持文件的上传和下载，所以是综合传输工具，但按传统，习惯称 curl 为下载工具。作为一款强力工具，curl 支持包括 HTTP、HTTPS、ftp 等众多协议，还支持 POST、cookies、认证等。

**语法**

```sh
curl (选项) (参数)
```

**示例**

**文件下载**
将下载的文件 copy 到本地

```sh
curl URL > newfilename
```

以当前文件名命名

```sh
curl -O URL
```

[see more](http://man.linuxde.net/curl)

# 12. more (按页显示文本内容)

more命令是一个基于vi编辑器文本过滤器，它以全屏幕的方式按页显示文本文件的内容，支持vi中的关键字定位操作。more名单中内置了若干快捷键，常用的有H（获得帮助信息），Enter（向下翻滚一行），空格（向下滚动一屏），Q（退出命令）。

该命令一次显示一屏文本，满屏后停下来，并且在屏幕的底部出现一个提示信息，给出至今己显示的该文件的百分比：--More--（XX%）可以用下列不同的方法对提示做出回答：

- 按Space键：显示文本的下一屏内容。
- 按Enier键：只显示文本的下一行内容。
- 按斜线符<kbd>|</kbd>：接着输入一个模式，可以在文本中寻找下一个相匹配的模式。
- 按H键：显示帮助屏，该屏上有相关的帮助信息。
- 按B键：显示上一屏内容。
- 按Q键：退出rnore命令。

## 12.1. 语法

```sh
more(语法)(参数)
```

## 12.2. 选项

```text
-<数字>：指定每屏显示的行数；
-d：显示“[press space to continue,'q' to quit.]”和“[Press 'h' for instructions]”；
-c：不进行滚屏操作。每次刷新这个屏幕；
-s：将多个空行压缩成一行显示；
-u：禁止下划线；
+<数字>：从指定数字的行开始显示。
```

## 12.3. 参数

文件：指定分页显示内容的文件。

## 12.4. 实例

显示文件file的内容，但在显示之前先清屏，并且在屏幕的最下方显示完核的百分比。

```sh
more -dc file
```

显示文件file的内容，每10行显示一次，而且在显示之前先清屏。

```sh
more -c -10 file
```

# 13. others

touch、open、rm -rf、ln -s、cmd z

```bash
lsof -i:{port}
```

[cp 命令](http://man.linuxde.net/cp)
kill -9 {processId}
更新 shell 命令
(权限 端口 下载等)

# 14. 参考资料

1. [lsof 命令](http://man.linuxde.net/lsof)
1. [osx 下关于目录 wheel 和 admin 权限的问题](http://blog.csdn.net/qdujunjie/article/details/33713293)
1. [命令行的艺术](https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md)
1. [Linux 命令大全](http://man.linuxde.net/)
