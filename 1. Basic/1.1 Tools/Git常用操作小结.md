> https://github.com/muwenzi/Program-Blog/issues/13

## 目录

| 序号 | 标题 |
| :-- | :-- |
| 1 | [总体流程图](#1) |
| 2 | [git fetch ](#2) `gf` |
| 3 | [git branch](#3) `gb` |
| 4 | [git checkout](#4)  `gco` |
| 5 | [git merge ](#5) `gm` |
| 6 | [git pull ](#6) `gl` |
| 7 | [git revert](#7) |
| 8 | [git reset](#8) |
| 9 | [git cherry-pick](#9) `gcp` |
| 10 | [git rebase](#10) `grb` |
| 11 | [git stash](#11) `gsta` |
| 12 | [git clean](#12) |
| 13 | [git remote](#13)|

[zsh-git](https://github.com/muwenzi/Blog/issues/4)

<h2 id="1">总体流程图</h2>

![image](https://cloud.githubusercontent.com/assets/12554487/18863263/fba7d124-84c2-11e6-9c12-5ae4e8f55cdd.png)

**结合IDE讲解各个仓库区域之间的扭转过程**

<h2 id="2">git fetch</h2>

用于拉取远程的更新，只是取回本地，并不会进行`合并(merge)`。
默认情况下，git fetch取回所有分支（branch）的更新。

```
$ git fetch
```

如果只想取回特定分支的更新，可以指定分支名。

```
$ git fetch <远程主机名> <分支名>
```

比如，取回origin主机的master分支。

```
$ git fetch origin master
```

方便的话可以直接

```
$ git fetch master
```

<h2 id="3">git branch</h2>

git fetch所取回的更新，在本地主机上要用"远程主机名/分支名"的形式读取。比如origin主机的master，就要用origin/master读取。

**查看分支**
git branch命令的-r选项，可以用来查看远程分支，-a选项查看所有分支，无选项则查看本地分支。

``` shell
$ git branch -r
  origin/master
```

``` shell
$ git branch -a
* master
  remotes/origin/master
```

**删除分支**
方式一：安全删除，Git会阻止你删除包含未合并更改的分支。

```
$ git branch -d <branch>
```

方式二：强制删除，即使包含`未合并更改`，如果你对那条分支看都不想看一眼立马删除的话。

```
$ git branch -D <branch>
```

**新建分支**

```
$ git branch <分支名>
```

注意：新建完后`不会`自动切换到那个分支去，其实就是新建了一个`指针`而已。
**based on which branch ?**

**修改当前分支名**

```
$ git branch -m <newBranchName>
```

**手动建立远程分支与本地分支的追踪关系**

git clone的时候Git会自动在本地分支与远程分支之间，建立一种追踪关系（tracking）。所有本地分支**默认**与远程主机的**同名分支**，建立追踪关系，也就是说，本地的master分支自动"追踪"origin/master分支。
Git也允许手动建立追踪关系

```
$ git branch --set-upstream master origin/next
```

上面命令指定master分支追踪origin/next分支。

<h2 id="4">git checkout</h2>

该 命令可以用于三种场景：
- 切换分支
- 创建分支
- 撤销修改

**创建分支**
取回远程主机的更新以后，可以在它的基础上，使用git checkout命令创建一个新的分支。

``` shell
$ git checkout -b newBranch origin/master     # gcb newBranch origin/master
```

上面命令表示，在origin/master的基础上，创建一个新的`本地`分支。**当切换到远程某个分支，本地木有的时候就需要这样做。**
如果要将新分支推送到远端，还需要执行以下命令：

``` shell
# 推送并建立追踪当前分支至远端   
$ git push --set-upstream origin currentBranch  # gpsup
```

这时会在远端创建一个与本地同名的newBranch，加`-u`会自动追踪该分支，不然还要手动--set-upstream，其实这条命令就是去修改`.git`文件夹下`config`的配置。

**example: 基于当前本地分支创建一个新分支并推送到远端**

![image](https://cloud.githubusercontent.com/assets/12554487/25841692/b4bcb9e8-34d3-11e7-8920-746740d0a010.png)

**撤销修改**
修改文件后，使用 status 命令查看一下文件状态：

``` shell
$ git status
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

      modified:   /there/is/a/modified/file
```

对于未 add 进暂存区的文件，此时还在工作区，可以使用 git checkout -- <file> 快速撤销本地修改。

``` shell
$ git checkout [some_dir|file.txt] 
```
恢复所有本地未提交的更改（应在项目根目录中执行）：
```sh
$ git checkout .
```

那么，对于已 add 进暂存区的文件，如何撤销本地修改？还是先使用 status 命令查看一下文件状态：

``` shell
$ git status
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

      modified:   /there/is/a/modified/file
```

先取消暂存修改
Git 提示我们，可以使用 reset 命令取消暂存：

``` shell
$ git reset /there/is/a/modified/file
```

取消暂存后，文件状态就回到了跟之前一样了：

``` shell
$ git status
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

      modified:   /there/is/a/modified/file
```

再撤销本地修改
这时按提示使用 `checkout`即可：

``` shell
$ git checkout -- /there/is/a/modified/file
```

这时工作目录就干净了：

``` shell
$ git status
nothing to commit, working directory clean
```

**一步到位**
那么有更便捷的、一步到位的办法吗？有，指定提交即可：

``` shell
$ git status
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

      modified:   /there/is/a/modified/file
```

``` shell
$ git checkout HEAD -- /there/is/a/modified/file
```

``` shell
$ git status
nothing to commit, working directory clean
```

checkout 与 reset区别

| 命令 | 操作目标 | 描述 |
| :-- | :-- | :-- |
| checkout | 工作目录（working tree） | 用于撤销本地修改 |
| reset | 暂存区（index） | 只用于覆盖暂存区 |

因此 `git reset <paths>` 等于 `git add <paths>` 的逆向操作。
如果企图用 `reset` 命令覆盖工作目录，是会报错的。

<h2 id="5">git merge</h2>

使用git merge命令或者git rebase命令，在本地分支上合并远程分支。

``` shell
$ git merge origin/master
# 或者
$ git rebase origin/master
```

上面命令表示在当前分支上，合并origin/master。与本地的其他分支合并则不用加`origin/`

<h2 id="6">git pull</h2>

git pull命令的作用是，取回远程主机某个分支的更新，再与本地的指定分支合并。它的完整格式稍稍有点复杂。如果当前分支与远程分支存在追踪关系，git pull就可以省略远程分支名

```
$ git pull origin
```

上面命令表示，本地的当前分支自动与对应的origin主机"追踪分支"进行合并。
如果当前分支只有一个追踪分支，连远程主机名都可以省略。

```
$ git pull
```

上面命令表示，当前分支自动与唯一一个追踪分支进行合并。这条命令也就等于

```
$ git fetch
$ git merge 当前分支
```

对于稍复杂的一点情况，比如远程有master, dev, kimi三个分支，本地的分支对应是kimi。如果想将远程的dev分支最新的提交合并到本地的kimi分支中（在kimi分支发起pull request请求合并到dev分支时候会用到），需要执行以下命令：

```
$ git fetch
$ git merge origin/dev
```

等价于

```
$ git pull origin dev:kimi
```

因为是取回远程的dev分支再与当前本地所在的kimi分支进行合并可以省略`:后面的命令`

```
$ git pull origin dev
```

如果是取回远程的kimi分支再与当前本地所在的kimi分支进行合并，那就是最常用的场景了

```
$ git pull
```

**PS**: 如果远程主机删除了某个分支，默认情况下，git pull 不会在拉取远程分支的时候，删除对应的本地分支。这是为了防止，由于其他人操作了远程主机，导致git pull不知不觉删除了本地分支。
但是，你可以改变这个行为，加上参数 -p 就会在本地删除远程已经删除的分支。

```
$ git pull -p
```

Git force pull to overwrite local files
```
git fetch --all
git reset --hard origin/<branch_name>
```

<h2 id="7">git revert</h2>

只是删除某一个提交，后面的提交不影响

```
$ git revert <commit id>

# 撤销刚刚的提交
$ git revert HEAD
```

<h2 id="8">git reset</h2>
默认是--mixed模式，不会改变工作区，但是会用指定的commit覆盖暂存区，需要再次commit

```sh
$ git reset <commit id>
```

soft 不会改变暂存区，改变工作区，需要再次add和commit
```sh
$ git reset --soft <commit id>
```

hard 会使用指定的commit的内容覆盖暂存区和工作区。
```sh
$ git reset --hard <commit id>
```

<h2 id="9">git cherry-pick</h2>

**合并某个分支上的单个commit**

git cherry-pick可以选择某一个分支中的一个或几个commit(s)来进行操作。例如，假设我们有个稳定版本的分支，叫v2.0，另外还有个开发版本的分支v3.0，我们不能直接把两个分支合并，这样会导致稳定版本混乱，但是又想增加一个v3.0中的功能到v2.0中，这里就可以使用cherry-pick了。

```
$ git cherry-pick <commit id>
```

就是对已经存在的commit 进行**再次提交**，然后合并到目前所在的分支。
**注意**：当执行完 cherry-pick 以后，将会 生成一个新的提交。这个新的提交的哈希值和原来的不同，但标识名一样。

**合并某个分支上的一系列commits**

在一些特性情况下，合并单个commit并不够，你需要合并一系列相连的commits。这种情况下就不要选择cherry-pick了，rebase 更适合。还以上例为例，假设你需要合并feature分支的commit`76cada`~`62ecb3` 到master分支。
首先需要基于feature创建一个新的分支，并指明新分支的最后一个commit：

``` shell
$ git checkout -bnewbranch 62ecb3 
```

然后，rebase这个新分支的commit到master（--ontomaster）。`76cada^` 指明你想从哪个特定的commit开始。

``` shell
$ git rebase --ontomaster 76cada^  
```

得到的结果就是feature分支的commit `76cada` ~`62ecb3` 都被合并到了master分支。

<h2 id="10">git rebase</h2>
http://gitbook.liuhui998.com/4_2.html

<h2 id="11">git stash</h2>

用于保存和恢复工作进度

```sh
git stash
```

保存当前的工作进度。会分别对暂存区和工作区的状态进行保存

```sh    
git stash list
```

显示进度列表。此命令显然暗示了git stash 可以多次保存工作进度，并用在恢复时候进行选择

```sh
git stash pop stash@{1}
```

如果不使用任何参数，会恢复最新保存的工作进度，并将恢复的工作进度从存储的工作进度列表中清除。
    
如果提供<stash>参数（来自 `git stash list` 显示的列表），则从该 `<stash>` 中恢复。恢复完毕也将从进度列表中删除 `<stash>`。
    
选项--index 除了恢复工作区的文件外，还尝试恢复暂存区。
    
```sh
git stash apply stash@{1}
```

除了不删除恢复的进度之外，其余和 `git stash pop` 命令一样

```sh
git stash clear
```
删除所有存储的进度

<h2 id="12">git clean</h2>

`git clean`命令用来从你的工作区中删除所有**没有tracked**过的文件. 
`git clean`经常和`git reset --hard`一起结合使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作区完全回到一个指定的<commit>的状态.

**QA**

1. 什么叫没有tracked？
不考虑`.gitignore`的话：你创建了些文件 或者 IDE自动创建了些文件，但是你从来没有add它们，也没有commit它们，它们就是没有untracked。

2. 与`git checkout .`的区别？
二者都是针对在工作区没有`git add`的情况，但`git checkout .`是对修改文件而言，`git clean`是对新文件而言。


git clean 参数
```
-n 显示 将要 删除的 文件 和  目录（只是一个演习和提醒）
-f 删除 文件
-df 删除 文件 和 目录 zsh缩写：gclean
```
```sh
git clean -n
```
是一次clean的演习, 告诉你哪些文件会被删除. 记住他不会真正的删除文件, 只是一个提醒.
```sh
git clean -f
```
删除当前目录下所有没有track过的文件. 他不会删除.gitignore文件里面指定的文件夹和文件, 不管这些文件有没有被track过.

```sh
git clean -f <path>
```
删除指定路径下的没有被track过的文件.

```sh
git clean -df
```
删除当前目录下没有被track过的文件和文件夹.

```sh
git clean -xf
```
删除当前目录下所有没有track过的文件. 不管他是否是.gitignore文件里面指定的文件夹和文件

```sh
git clean -fdx
```
这将删除所有本地未跟踪的文件/夹，所以只有 git跟踪的文件保留：
警告： -x 也将删除所有被忽略的文件！

小结： git reset --hard和git clean -f是一对好基友. 结合使用他们能让你的工作目录完全回退到最近一次commit的时候. 

<h2 id="13">git remote</h2>

### 查看远端仓库的地址

```sh
git remote -v
```

### 修改远端仓库地址

```sh
git remote set-url 名称 git@github.com:muwenzi/Program-Blog.git
```

### 拉取上游仓库的代码

```sh
git pull upstream 分支名
```

`upstream`为上游仓库名

### 清除远端冗余分支

```sh
git remote show origin
```

可以查看本地与远端的分支是否还关联或者已经过时（远端已经不存在了）

然后就会提示另一条命令

```sh
git remote prune origin
```

用来清除已经失效的

[完整git-remote命令](https://www.git-scm.com/docs/git-remote)

## 参考资料

1. [Git远程操作详解（阮一峰）](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)
1. [git-recipes](https://github.com/geeeeeeeeek/git-recipes/wiki)
1. [回滚错误的修改](https://github.com/geeeeeeeeek/git-recipes/wiki/2.6-%E5%9B%9E%E6%BB%9A%E9%94%99%E8%AF%AF%E7%9A%84%E4%BF%AE%E6%94%B9)
1. [Git合并特定commits 到另一个分支](http://blog.csdn.net/ybdesire/article/details/42145597)
1. [git checkout 命令撤销修改](http://cnblog.me/2015/08/15/git-checkout/)
1. [自定义 Git - 配置 Git](https://git-scm.com/book/zh/v1/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git)
1. [git stash用于保存和恢复工作进度](https://gist.github.com/subchen/3409a16cb46327ca7691)
1. [git clean 小结](http://blog.csdn.net/wh_19910525/article/details/8233858)
1. [How do I force “git pull” to overwrite local files?](https://stackoverflow.com/questions/1125968/how-do-i-force-git-pull-to-overwrite-local-files)
1. [[译]git clean](http://www.cnblogs.com/irocker/p/git-clean.html)
1. [git-remote - Manage set of tracked repositories](https://www.git-scm.com/docs/git-remote)

