> https://github.com/muwenzi/Program-Blog/issues/7

- [命令行的艺术](https://github.com/jlevy/the-art-of-command-line/blob/master/README-zh.md)
- [Linux命令大全](http://man.linuxde.net/)

## mkdir/rmdir——创建/删除目录

创建单个目录

``` shell
$ mkdir dir1
```

创建多个目录

``` shell
$ mkdir dir1 dir2 dir3     //将分别创建dir1、dir2、dir3三个目录
```

创建多级目录

```
$ mkdir -p dir1/dir2/dir3  
```

例如我们想要建立目录Project，其中含有4个文件夹a, b, c, d，且这4个文件都含有一个src文件夹。

```
$ mkdir -p Project/{a,b,c,d}/src
```
rmdir 删除目录

## cat

**cat主要有三大功能**
- 一次显示整个文件。`$ cat filename`
- 从键盘创建一个文件。`$ cat > filename`  只能创建新文件,不能编辑已有文件
- 将几个文件合并为一个文件： `$ cat file1 file2 > file`

cat经常用来显示文件的内容。 
注意：当文件较大时，文本在屏幕上迅速闪过（滚屏），用户往往看不清所显示的内容。因此，一般用more等命令分屏显示。为了控制滚屏，可以按Ctrl+S键，停止滚屏；按Ctrl+Q键可以恢复滚屏。按Ctrl+C（中断）键可以终止该命令的执行，并且返回Shell提示符状态。

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
## lsof -i:端口号——查看端口号对应的进程id

lsof命令用于查看你进程开打的文件，打开文件的进程，进程打开的端口(TCP、UDP)。因为lsof命令需要访问核心内存和各种文件，所以需要root用户执行。

## curl——文件上传和下载
curl命令是一个利用URL规则在命令行下工作的文件传输工具。它支持文件的上传和下载，所以是综合传输工具，但按传统，习惯称curl为下载工具。作为一款强力工具，curl支持包括HTTP、HTTPS、ftp等众多协议，还支持POST、cookies、认证等。

### 语法
```sh
curl (选项) (参数)
```

### 实例
**文件下载**
将下载的文件copy到本地
```sh
curl URL > newfilename
```

以当前文件名命名
```sh
curl -O URL
```

[see more](http://man.linuxde.net/curl)

## chown 修改权限
```sh
sudo chown -R $USER:$USER .
```
比如：

![image](https://user-images.githubusercontent.com/12554487/34808549-8f8ef9ce-f6ca-11e7-8a9b-fbc849360110.png)
```sh
sudo chown root:admin 路径
```
// TODO
## grep、touch、open、rm -rf、ln -s、cmd z
[cp命令](http://man.linuxde.net/cp)
kill -9 processId
更新shell命令
(权限 端口 下载等)

**参考资料**
- [lsof命令](http://man.linuxde.net/lsof)
- [osx下关于目录wheel和admin权限的问题](http://blog.csdn.net/qdujunjie/article/details/33713293)
