> https://github.com/muwenzi/Program-Blog/issues/7

- [命令行的艺术](https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md)
- [Linux 命令大全](http://man.linuxde.net/)

# 0.1. mkdir/rmdir——创建/删除目录

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

## 0.2. cat

**cat 主要有三大功能**

- 一次显示整个文件。`$ cat filename`
- 从键盘创建一个文件。`$ cat > filename` 只能创建新文件,不能编辑已有文件
- 将几个文件合并为一个文件： `$ cat file1 file2 > file`

cat 经常用来显示文件的内容。
注意：当文件较大时，文本在屏幕上迅速闪过（滚屏），用户往往看不清所显示的内容。因此，一般用 more 等命令分屏显示。为了控制滚屏，可以按 Ctrl+S 键，停止滚屏；按 Ctrl+Q 键可以恢复滚屏。按 Ctrl+C（中断）键可以终止该命令的执行，并且返回 Shell 提示符状态。

**语法**

```
$ cat <选项> <参数>
```

**选项**

```
-n或-number：有1开始对所有输出的行数编号；
-b或--number-nonblank：和-n相似，只不过对于空白行不编号；
-s或--squeeze-blank：当遇到有连续两行以上的空白行，就代换为一行的空白行；
-A：显示不可打印字符，行尾显示“$”；
-e：等价于"-vE"选项；
-t：等价于"-vT"选项；
```

**参数**

```
文件列表：指定要连接的文件列表。
```

## 0.3. lsof -i:端口号——查看端口号对应的进程 id

lsof 命令用于查看你进程开打的文件，打开文件的进程，进程打开的端口(TCP、UDP)。因为 lsof 命令需要访问核心内存和各种文件，所以需要 root 用户执行。

## 0.4. curl——文件上传和下载

curl 命令是一个利用 URL 规则在命令行下工作的文件传输工具。它支持文件的上传和下载，所以是综合传输工具，但按传统，习惯称 curl 为下载工具。作为一款强力工具，curl 支持包括 HTTP、HTTPS、ftp 等众多协议，还支持 POST、cookies、认证等。

### 0.4.1. 语法

```sh
curl (选项) (参数)
```

### 0.4.2. 实例

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

## 0.5. chown 修改权限

```sh
sudo chown -R $USER:$USER .
```

比如：

![image](https://user-images.githubusercontent.com/12554487/34808549-8f8ef9ce-f6ca-11e7-8a9b-fbc849360110.png)

```sh
sudo chown root:admin 路径
```

// TODO

## 0.6. grep、touch、open、rm -rf、ln -s、cmd z、lsof

```bash
lsof -i:{port}
```

[cp 命令](http://man.linuxde.net/cp)
kill -9 {processId}
更新 shell 命令
(权限 端口 下载等)

## 0.7. mv

移动、重命名文件，例如：

```bash
mv ~/.npmrc.bak ~/.npmrc
```

## 0.8. ps aux | grep 搜索内容

# 1. 常用的命令

sh 脚本结合系统命令便有了强大的威力，在字符处理领域，有 grep、awk、sed 三剑客，grep 负责找出特定的行，awk 能将行拆分成多个字段，sed 则可以实现更新插入删除等写操作。

## 1.1. ps

查看进程列表

## 1.2. grep

### 1.2.1. 排除 grep 自身

### 1.2.2. 查找与 target 相邻的结果

## 1.3. awk

## 1.4. sed

### 1.4.1. 插入

### 1.4.2. 替换

### 1.4.3. 删除

## 1.5. xargs

## 1.6. curl

## 1.7. 参考资料

1.  [lsof 命令](http://man.linuxde.net/lsof)
1.  [osx 下关于目录 wheel 和 admin 权限的问题](http://blog.csdn.net/qdujunjie/article/details/33713293)
