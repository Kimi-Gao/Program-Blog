<!-- TOC -->

- [1. 什么是 Shell 脚本](#1-什么是-shell-脚本)
  - [1.1. 示例](#11-示例)
  - [1.2. 示例解释](#12-示例解释)
  - [1.3. shell 和 shell 脚本的概念](#13-shell-和-shell-脚本的概念)
- [2. 环境](#2-环境)
  - [2.1. OS](#21-os)
    - [2.1.1. Linux](#211-linux)
    - [2.1.2. Mac OS](#212-mac-os)
    - [2.1.3. Windows 上的模拟器](#213-windows-上的模拟器)
  - [2.2. 脚本解释器](#22-脚本解释器)
    - [2.2.1. sh](#221-sh)
    - [2.2.2. bash](#222-bash)
    - [2.2.3. 高级编程语言](#223-高级编程语言)
- [3. 如何选择 shell 编程语言](#3-如何选择-shell-编程语言)
  - [3.1. 熟悉 vs 陌生](#31-熟悉-vs-陌生)
  - [3.2. 简单 vs 高级](#32-简单-vs-高级)
  - [3.3. 环境兼容性](#33-环境兼容性)
- [4. 参考资料](#4-参考资料)

<!-- /TOC -->

# 1. 什么是 Shell 脚本

## 1.1. 示例

看个例子吧：

    #!/bin/sh
    cd ~
    mkdir shell_tut
    cd shell_tut

    for ((i=0; i<10; i++)); do
    	touch test_$i.txt
    done

## 1.2. 示例解释

- 第 1 行：指定脚本解释器，这里是用/bin/sh 做解释器的
- 第 2 行：切换到当前用户的 home 目录
- 第 3 行：创建一个目录 shell_tut
- 第 4 行：切换到 shell_tut 目录
- 第 5 行：循环条件，一共循环 10 次
- 第 6 行：创建一个 test_0…9.txt 文件
- 第 7 行：循环体结束

mkdir, touch 都是系统自带的程序，一般在/bin 或者/usr/bin 目录下。for, do, done 是 sh 脚本语言的关键字。

## 1.3. shell 和 shell 脚本的概念

shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。Ken Thompson 的 sh 是第一种 Unix Shell，Windows Explorer 是一个典型的图形界面 Shell。

shell 脚本（shell script），是一种为 shell 编写的脚本程序。业界所说的 shell 通常都是指 shell 脚本，但读者朋友要知道，shell 和 shell script 是两个不同的概念。由于习惯的原因，简洁起见，本文出现的“shell 编程”都是指 shell 脚本编程，不是指开发 shell 自身（如 Windows Explorer 扩展开发）。

# 2. 环境

shell 编程跟 java、php 编程一样，只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了。

## 2.1. OS

当前主流的操作系统都支持 shell 编程，本文档所述的 shell 编程是指 Linux 下的 shell，讲的基本都是 POSIX 标准下的功能，所以，也适用于 Unix 及 BSD（如 Mac OS）。

### 2.1.1. Linux

Linux 默认安装就带了 shell 解释器。

### 2.1.2. Mac OS

Mac OS 不仅带了 sh、bash 这两个最基础的解释器，还内置了 ksh、csh、zsh 等不常用的解释器。

### 2.1.3. Windows 上的模拟器

windows 出厂时没有内置 shell 解释器，需要自行安装，为了同时能用 grep, awk, curl 等工具，最好装一个 cygwin 或者 mingw 来模拟 linux 环境。

- [cygwin](http://www.cygwin.com)
- [mingw](http://www.mingw.org)

## 2.2. 脚本解释器

### 2.2.1. sh

即 Bourne shell，POSIX（Portable Operating System Interface）标准的 shell 解释器，它的二进制文件路径通常是/bin/sh，由 Bell Labs 开发。

本文讲的是 sh，如果你使用其它语言用作 shell 编程，请自行参考相应语言的文档。

### 2.2.2. bash

Bash 是 Bourne shell 的替代品，属 GNU Project，二进制文件路径通常是/bin/bash。业界通常混用 bash、sh、和 shell，比如你会经常在招聘运维工程师的文案中见到：熟悉 Linux Bash 编程，精通 Shell 编程。

在 CentOS 里，/bin/sh 是一个指向/bin/bash 的符号链接:

```sh
[root@centosraw ~]# ls -l /bin/*sh
-rwxr-xr-x. 1 root root 903272 Feb 22 05:09 /bin/bash
-rwxr-xr-x. 1 root root 106216 Oct 17  2012 /bin/dash
lrwxrwxrwx. 1 root root      4 Mar 22 10:22 /bin/sh -> bash
```

但在 Mac OS 上不是，/bin/sh 和/bin/bash 是两个不同的文件，尽管它们的大小只相差 100 字节左右:

```sh
iMac:~ wuxiao$ ls -l /bin/*sh
-r-xr-xr-x  1 root  wheel  1371648  6 Nov 16:52 /bin/bash
-rwxr-xr-x  2 root  wheel   772992  6 Nov 16:52 /bin/csh
-r-xr-xr-x  1 root  wheel  2180736  6 Nov 16:52 /bin/ksh
-r-xr-xr-x  1 root  wheel  1371712  6 Nov 16:52 /bin/sh
-rwxr-xr-x  2 root  wheel   772992  6 Nov 16:52 /bin/tcsh
-rwxr-xr-x  1 root  wheel  1103984  6 Nov 16:52 /bin/zsh
```

### 2.2.3. 高级编程语言

理论上讲，只要一门语言提供了解释器（而不仅是编译器），这门语言就可以胜任脚本编程，常见的解释型语言都是可以用作脚本编程的，如：Perl、Tcl、Python、PHP、Ruby。Perl 是最老牌的脚本编程语言了，Python 这些年也成了一些 linux 发行版的预置解释器。

编译型语言，只要有解释器，也可以用作脚本编程，如 C shell 是内置的（/bin/csh），Java 有第三方解释器 Jshell，Ada 有收费的解释器 AdaScript。

如下是一个 PHP Shell Script 示例（假设文件名叫 test.php）：

```sh
#!/usr/bin/php
<?php
for ($i=0; $i < 10; $i++)
        echo $i . "\n";
```

执行：

```sh
/usr/bin/php test.php
```

或者：

```sh
chmod +x test.php
./test.php
```

# 3. 如何选择 shell 编程语言

## 3.1. 熟悉 vs 陌生

如果你已经掌握了一门编程语言（如 PHP、Python、Java、JavaScript），建议你就直接使用这门语言编写脚本程序，虽然某些地方会有点啰嗦，但你能利用在这门语言领域里的经验（单元测试、单步调试、IDE、第三方类库）。

新增的学习成本很小，只要学会怎么使用 shell 解释器（Jshell、AdaScript）就可以了。

## 3.2. 简单 vs 高级

如果你觉得自己熟悉的语言（如 Java、C）写 shell 脚本实在太啰嗦，你只是想做一些备份文件、安装软件、下载数据之类的事情，学着使用 sh，bash 会是一个好主意。

shell 只定义了一个非常简单的编程语言，所以，如果你的脚本程序复杂度较高，或者要操作的数据结构比较复杂，那么还是应该使用 Python、Perl 这样的脚本语言，或者是你本来就已经很擅长的高级语言。因为 sh 和 bash 在这方面很弱，比如说：

- 它的函数只能返回字串，无法返回数组
- 它不支持面向对象，你无法实现一些优雅的设计模式
- 它是解释型的，一边解释一边执行，连 PHP 那种预编译都不是，如果你的脚本包含错误(例如调用了不存在的函数)，只要没执行到这一行，就不会报错

## 3.3. 环境兼容性

如果你的脚本是提供给别的用户使用，使用 sh 或者 bash，你的脚本将具有最好的环境兼容性，perl 很早就是 linux 标配了，python 这些年也成了一些 linux 发行版的标配，至于 mac os，它默认安装了 perl、python、ruby、php、java 等主流编程语言。

# 4. 参考资料

[Shell脚本编程30分钟入门，作者：覃健祥](https://github.com/qinjx/30min_guides/blob/master/shell.md)