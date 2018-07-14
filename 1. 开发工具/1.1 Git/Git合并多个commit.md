当同一个功能或bug的提交数量过多的时候，可以进行commit合并操作，比如如下场景：

![image](https://cloud.githubusercontent.com/assets/12554487/22638879/20487670-ec86-11e6-8b8a-bbccc03dc9d4.png)

我想将前面两个commit进行合并，我先找到第三个commit的hash值（git log 或 glol），执行以下命令：

```shell
$ git rebase -i e6c829f
```

oh-my-zsh: `grbi e6c829f`

一旦运行了'rebase -i'命令，你所预设的编辑器会被调用，其中含有如下的内容：

<img width="600" alt="2017-02-06 10 21 22" src="https://cloud.githubusercontent.com/assets/12554487/22640544/117a8144-ec8e-11e6-871b-db3a07b90b0a.png">

上面有命令包括缩写的提示

现在你可以将操作改为'edit'（使用提交，但是暂停以便进行修正）或者'squash'（使用提交，但是把它与前一提交合并），默认是'pick'（使用提交）。你可以对这些行上下移动从而对提交进行重排序。当你退出编辑器时，git会按照你指定的顺序去应用提交，并且做出相应的操作。

如果指定进行'pick'操作，git会应用这个补丁，以同样的提交信息（commit message）保存提交。

如果指定进行'squash'操作，git会把这个提交和前一个提交合并成为一个新的提交。这会再次调用编辑器，你在里面合并这两个提交的提交信息。

我将第二行的`pick`改成了`s`，保存后，将会进入下一步：

<img width="643" alt="2017-02-06 10 22 51" src="https://cloud.githubusercontent.com/assets/12554487/22640855/4c7ddc36-ec8f-11e6-9e03-02d1feda2888.png">

然后我将message#2都删掉了，这样合并的commit只有一个记录信息，如果忘记删除，之后也可以执行以下命令再进行修改：
```shell
git commit --amend
```

最后执行：
```shell
# or gp -f
git push --force  
```

最终的效果：
![image](https://cloud.githubusercontent.com/assets/12554487/22640987/ededdd32-ec8f-11e6-8d9a-efb597f24d38.png)

**参考资料**
1. [Git合并多个 Commit](http://www.jianshu.com/p/964de879904a)
1. [7.6 Git 工具 - 重写历史](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E5%86%99%E5%8E%86%E5%8F%B2)
1. [Git Community Book 中文版：交互式rebase](http://gitbook.liuhui998.com/4_3.html)