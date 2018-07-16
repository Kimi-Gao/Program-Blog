<!-- TOC -->

- [1. 第一个 shell 脚本](#1-第一个-shell-脚本)
  - [1.1. 编写](#11-编写)
  - [1.2. 运行](#12-运行)
    - [1.2.1. 作为可执行程序](#121-作为可执行程序)
    - [1.2.2. 作为解释器参数](#122-作为解释器参数)
- [2. 变量](#2-变量)
  - [2.1. 定义变量](#21-定义变量)
  - [2.2. 使用变量](#22-使用变量)
  - [2.3. 重定义变量](#23-重定义变量)
- [3. 注释](#3-注释)
  - [3.1. 多行注释](#31-多行注释)
- [4. 字符串](#4-字符串)
  - [4.1. 单引号](#41-单引号)
  - [4.2. 双引号](#42-双引号)
  - [4.3. 字符串操作](#43-字符串操作)
    - [4.3.1. 拼接字符串](#431-拼接字符串)
    - [4.3.2. 获取字符串长度](#432-获取字符串长度)
    - [4.3.3. 提取子字符串](#433-提取子字符串)
    - [4.3.4. 查找子字符串](#434-查找子字符串)
    - [4.3.5. 更多](#435-更多)
- [5. 数组](#5-数组)
- [6. 管道](#6-管道)
- [7. 条件判断](#7-条件判断)
- [8. 流程控制](#8-流程控制)
  - [8.1. if else](#81-if-else)
    - [8.1.1. if](#811-if)
    - [8.1.2. if else](#812-if-else)
    - [8.1.3. if else-if else](#813-if-else-if-else)
  - [8.2. for while](#82-for-while)
    - [8.2.1. for](#821-for)
    - [8.2.2. C 风格的 for](#822-c-风格的-for)
    - [8.2.3. while](#823-while)
    - [8.2.4. 无限循环](#824-无限循环)
    - [8.2.5. until](#825-until)
  - [8.3. case](#83-case)
- [9. 函数](#9-函数)
  - [9.1. 定义](#91-定义)
  - [9.2. 调用](#92-调用)
- [10. 文件包含](#10-文件包含)
- [11. 用户输入](#11-用户输入)
  - [11.1. 执行脚本时传入](#111-执行脚本时传入)
  - [11.2. 脚本运行中输入](#112-脚本运行中输入)
  - [11.3. select 菜单](#113-select-菜单)
- [12. stdin 和 stdout](#12-stdin-和-stdout)
- [14. 参考资料](#14-参考资料)

<!-- /TOC -->

# 1. 第一个 shell 脚本

## 1.1. 编写

打开文本编辑器，新建一个文件，扩展名为 sh（sh 代表 shell），扩展名并不影响脚本执行，见名知意就好，如果你用 php 写 shell 脚本，扩展名就用 php 好了。

输入一些代码，第一行一般是这样：

```sh
    #!/bin/bash
    #!/usr/bin/php
```

“#!”是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行。

## 1.2. 运行

运行 Shell 脚本有两种方法：

### 1.2.1. 作为可执行程序

```sh
chmod +x test.sh
./test.sh
```

注意，一定要写成./test.sh，而不是 test.sh，运行其它二进制的程序也一样，直接写 test.sh，linux 系统会去 PATH 里寻找有没有叫 test.sh 的，而只有/bin, /sbin, /usr/bin，/usr/sbin 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 test.sh 是会找不到命令的，要用./test.sh 告诉系统说，就在当前目录找。

通过这种方式运行 bash 脚本，第一行一定要写对，好让系统查找到正确的解释器。

这里的"系统"，其实就是 shell 这个应用程序（想象一下 Windows Explorer），但我故意写成系统，是方便理解，既然这个系统就是指 shell，那么一个使用/bin/sh 作为解释器的脚本是不是可以省去第一行呢？是的。

### 1.2.2. 作为解释器参数

这种运行方式是，直接运行解释器，其参数就是 shell 脚本的文件名，如：

```sh
/bin/sh test.sh
/bin/php test.php
```

这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。

# 2. 变量

## 2.1. 定义变量

定义变量时，变量名不加美元符号（$），如：

```sh
your_name="qinjx"
```

> :warning: 变量名和等号之间不能有空格，这可能和你熟悉的所有编程语言都不一样。

除了显式地直接赋值，还可以用语句给变量赋值，如：

```sh
for file in `ls /etc`
```

## 2.2. 使用变量

使用一个定义过的变量，只要在变量名前面加美元符号即可，如：

```sh
your_name="qinjx"
echo $your_name
echo ${your_name}
```

变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界，比如下面这种情况：

```sh
for skill in Ada Coffe Action Java; do
    echo "I am good at ${skill}Script"
done
```

如果不给 skill 变量加花括号，写成 echo "I am good at $skillScript"，解释器就会把$skillScript 当成一个变量（其值为空），代码执行结果就不是我们期望的样子了。

推荐给所有变量加上花括号，这是个好的编程习惯。IntelliJ IDEA 编写 shell script 时，IDE 就会提示加花括号。

## 2.3. 重定义变量

已定义的变量，可以被重新定义，如：

```sh
yo[ur_name="qinjx"
echo $your_name

your_name="alibaba"
echo $your_name]
```

这样写是合法的，但注意，第二次赋值的时候不能写$your_name="alibaba"，使用变量的时候才加美元符。

# 3. 注释

以“#”开头的行就是注释，会被解释器忽略。

## 3.1. 多行注释

sh 里没有多行注释，只能每一行加一个#号。就像这样：

```sh
#--------------------------------------------
# 这是一个自动打ipa的脚本，基于webfrogs的ipa-build书写：https://github.com/webfrogs/xcode_shell/blob/master/ipa-build

# 功能：自动为etao ios app打包，产出物为14个渠道的ipa包
# 特色：全自动打包，不需要输入任何参数
#--------------------------------------------

##### 用户配置区 开始 #####
#
#
# 项目根目录，推荐将此脚本放在项目的根目录，这里就不用改了
# 应用名，确保和Xcode里Product下的target_name.app名字一致
#
##### 用户配置区 结束  #####
```

如果在开发过程中，遇到大段的代码需要临时注释起来，过一会儿又取消注释，怎么办呢？每一行加个#符号太费力了，可以把这一段要注释的代码用一对花括号括起来，定义成一个函数，没有地方调用这个函数，这块代码就不会执行，达到了和注释一样的效果。

# 4. 字符串

字符串是 shell 编程中最常用最有用的数据类型（除了数字和字符串，也没啥其它类型好用了，哈哈），字符串可以用单引号，也可以用双引号，也可以不用引号。单双引号的区别跟 PHP 类似。

## 4.1. 单引号

```sh
str='this is a string'
```

单引号字符串的限制：

- 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的
- 单引号字串中不能出现单引号（对单引号使用转义符后也不行）

## 4.2. 双引号

```sh
your_name='qinjx'
str="Hello, I know your are \"$your_name\"! \n"
```
- 双引号里可以有变量
- 双引号里可以出现转义字符

## 4.3. 字符串操作

### 4.3.1. 拼接字符串

```sh
your_name="qinjx"
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"

echo $greeting $greeting_1
```

### 4.3.2. 获取字符串长度

```sh
string="abcd"
echo ${#string} #输出：4
```

### 4.3.3. 提取子字符串

```sh
string="alibaba is a great company"
echo ${string:1:4} #输出：liba
```

### 4.3.4. 查找子字符串

```sh
string="alibaba is a great company"
echo `expr index "$string" is`#输出：3，这个语句的意思是：找出字母i在这名话中的位置，要在linux下运行，mac下会报错
```

### 4.3.5. 更多

参见本文档末尾的参考资料中[Advanced Bash-Scripting Guid Chapter 10.1](http://tldp.org/LDP/abs/html/string-manipulation.html)

# 5. 数组

# 6. 管道

# 7. 条件判断

# 8. 流程控制

和 Java、PHP、JS 等语言不一样，sh 的流程控制不可为空，如：

```js
if (...) {
    search(q);
}
else {
    //do nothing
}
```

在 sh/bash 里可不能这么写，如果 else 分支没有语句执行，就不要写这个 else。

还要注意，sh 里的 `if [ $foo -eq 0 ]`，这个方括号跟 Java/PHP 里 if 后面的圆括号大不相同，它是一个可执行程序（和 ls, grep 一样），想不到吧？在 CentOS 上，它在/usr/bin 目录下：

```bash
ll /usr/bin/[
-rwxr-xr-x. 1 root root 33408 6月  22 2012 /usr/bin/[
```

正因为方括号在这里是一个可执行程序，方括号后面必须加空格，不能写成 `if [$foo -eq 0]`

## 8.1. if else

### 8.1.1. if

```sh
if condition
then
    command1
    command2
    ...
    commandN
fi
```

写成一行（适用于终端命令提示符）：

```sh
if `ps -ef | grep ssh`;  then echo hello; fi
```

末尾的 fi 就是 if 倒过来拼写，后面还会遇到类似的

### 8.1.2. if else

```sh
if condition
then
    command1
    command2
    ...
    commandN
else
    command
fi
```

### 8.1.3. if else-if else

```sh
if condition1
then
    command1
elif condition2
    command2
else
    commandN
fi
```

## 8.2. for while

### 8.2.1. for

在开篇的示例里演示过了：

```sh
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done
```

写成一行：

```sh
for var in item1 item2 ... itemN; do command1; command2… done;
```

### 8.2.2. C 风格的 for

```sh
for (( EXP1; EXP2; EXP3 ))
do
    command1
    command2
    command3
done
```

### 8.2.3. while

```sh
while condition
do
    command
done
```

### 8.2.4. 无限循环

```sh
while :
do
    command
done
```

或者

```sh
while true
do
    command
done
```

或者

```sh
for (( ; ; ))
```

### 8.2.5. until

```sh
until condition
do
    command
done
```

## 8.3. case

```sh
case "${opt}" in
    "Install-Puppet-Server" )
        install_master $1
        exit
    ;;

    "Install-Puppet-Client" )
        install_client $1
        exit
    ;;

    "Config-Puppet-Server" )
        config_puppet_master
        exit
    ;;

    "Config-Puppet-Client" )
        config_puppet_client
        exit
    ;;

    "Exit" )
        exit
    ;;

    * ) echo "Bad option, please choose again"
esac
```

case 的语法和 C family 语言差别很大，它需要一个 esac（就是 case 反过来）作为结束标记，每个 case 分支用右圆括号，用两个分号表示 break

# 9. 函数

## 9.1. 定义

## 9.2. 调用

# 10. 文件包含

可以使用 source 和.关键字，如：

```sh
source ./function.sh
. ./function.sh
```

在 bash 里，source 和.是等效的，他们都是读入 function.sh 的内容并执行其内容（类似 PHP 里的 include），为了更好的可移植性，推荐使用第二种写法。

包含一个文件和执行一个文件一样，也要写这个文件的路径，不能光写文件名，比如上述例子中:

```sh
. ./function.sh
```

不可以写作：

```sh
. function.sh
```

如果 function.sh 是用户传入的参数，如何获得它的绝对路径呢？方法是：

```sh
real_path=`readlink -f $1`#$1是用户输入的参数，如function.sh
. $real_path
```

# 11. 用户输入

## 11.1. 执行脚本时传入

## 11.2. 脚本运行中输入

## 11.3. select 菜单

# 12. stdin 和 stdout

# 14. 参考资料

1. [Shell脚本编程30分钟入门，作者：覃健祥](https://github.com/qinjx/30min_guides/blob/master/shell.md)
1. [Advanced Bash-Scripting Guide](http://tldp.org/LDP/abs/html/)，非常详细，非常易读，大量 example，既可以当入门教材，也可以当做工具书查阅
1. [Unix Shell Programming](http://www.tutorialspoint.com/unix/unix-shell.htm)
1. [Linux Shell Scripting Tutorial - A Beginner's handbook](http://bash.cyberciti.biz/guide/Main_Page)