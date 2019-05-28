> https://github.com/muwenzi/Program-Blog/issues/13

[zsh-git](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugin:git)

## 目录

| 序号 | 标题 |
| :-- | :-- |
| 1 | [总体流程图](#1) |
| 2 | [git clone ](#2) `gcl` |
| 3 | [git fetch ](#3) `gf` |
| 4 | [git branch](#4) `gb` |
| 5 | [git checkout](#5)  `gco` |
| 6 | [git merge ](#6) `gm` |
| 7 | [git pull ](#7) `gl` |
| 8 | [git revert](#8) |
| 9 | [git reset](#9)|
| 10 | [git cherry-pick](#10) `gcp` |
| 11 | [git rebase](#11) `grb` |
| 12 | [git stash](#12) `gsta` |
| 13 | [git clean](#13) `gclean`|
| 14 | [git remote](#14) `gr`|
| 15 | [git tag](#15)|
| 16 | [HEAD](#16)|
| 17 | [git config](#17)|
| 18 | [git rm](#18)|

<h2 id="1">总体流程图</h2>

<img width="959" alt="image" src="https://user-images.githubusercontent.com/12554487/43994426-2c99e55c-9dcf-11e8-9fb0-0040988b4af4.png">

<h2 id="2">git clone</h2>

该命令很简单不详细说，这里主要说一下如何重命名仓库，对当前文件夹已经存在同名仓库的时候会很有用：
```bash
git clone git@github.com:muwenzi/repo.git new-repo-name
```

<h2 id="3">git fetch</h2>

用于远端仓库和本地仓库的同步，并不会进行本地仓库和工作区的同步（即合并merge）。
默认情况下，fetch会更新本地仓库中所有 **origin/分支**（包括远端新的分支和现有分支的新commit）。

```bash
git fetch
```

如果只想取回特定分支的更新，可以指定分支名。

```bash
git fetch <远程主机名> <分支名>
```

比如，取回 `origin` 主机的 `master` 分支。

```bash
git fetch origin master
```

方便的话可以直接

```bash
git fetch master
```

> :warning: fetch 的操作只会让本地仓库分支（默认 origin/开头的这些分支）与远端仓库保持同步，但并不会更新工作区的分支代码。

如果还需要让本地仓库和工作区保持同步，fetch 完之后还需要执行一下操作：

```bash
git merge origin/<分支名>
```

<h2 id="4">git branch</h2>

git fetch所取回的更新，在本地主机上要用 `远程主机名/分支名` 的形式读取。比如origin主机的master，就要用 `origin/master` 读取。

### 查看分支

git branch命令的-r选项，可以用来查看远程分支，-a选项查看所有分支，无选项则查看本地分支。

```bash
git branch -r
  origin/master
```

```bash
git branch -a
* master
  remotes/origin/master
```

### 删除分支

方式一：安全删除，Git会阻止你删除包含 **未合并更改** 的分支。

```bash
git branch -d <分支名>
```

方式二：强制删除，即使包含 **未合并更改**，如果你对那条分支看都不想看一眼立马删除的话。

```bash
git branch -D <分支名>
```

删除远程分支:

```bash
git push origin :<分支名>
```

### 新建分支

```bash
git branch <新分支名> // 基于当前所在分支新建分支
```

> :warning: 新建完后 **不会** 自动切换到那个分支去，其实就是新建了一个`指针`而已。推荐使用 `git checkout -b <新分支名>` 的方式去建立新分支，会自动切换。

### 修改当前分支名

```bash
git branch -m <新分支名>
```

### 手动建立远程分支与本地分支的追踪关系

git clone的时候Git会自动在本地分支与远程分支之间，建立一种追踪关系（tracking）。所有本地分支**默认**与远程主机的**同名分支**，建立追踪关系，也就是说，本地的master分支自动"追踪"origin/master分支。
Git也允许手动建立追踪关系

```bash
git branch --set-upstream master origin/next
```

上面命令指定master分支追踪origin/next分支。

<h2 id="5">git checkout</h2>

该 命令可以用于三种场景：
- 切换分支
- 创建分支
- 撤销修改

### 创建分支

取回远程主机的更新以后，可以在它的基础上，使用git checkout命令创建一个新的分支。

```bash
git fetch # 本地仓库和远端仓库先进行同步
git checkout <新分支名> origin/master     # gcb <新分支名> origin/master
```

上面命令表示，在 `origin/master` 的基础上，创建一个新的 **本地** 分支(没有origin/开头的分支)。**当切换到远程某个分支，本地没有这个分支的时候就需要这样做。**

> :warning: 如果没有写 `origin/master` 那么将会基于当前所在的分支进行创建。

如果要将新分支推送到远端，还需要执行以下命令：

```bash
# 推送并建立追踪当前分支至远端
git push --set-upstream origin <分支名>  # gpsup
```

这时会在远端创建一个与本地同名的 `<分支名>`，加`-u`会自动追踪该分支，不然还要手动 `--set-upstream`，其实这条命令就是去修改`.git`文件夹下`config`的配置。

如果远端有分支 `<分支名>` 通过一下操作可以将该分支拉取到本地，并与远端自动建立关联：

```bash
git fetch # gf
git checkout <分支名>  # gco <分支名>
```

### example: 基于当前本地分支创建一个新分支并推送到远端

![image](https://cloud.githubusercontent.com/assets/12554487/25841692/b4bcb9e8-34d3-11e7-8920-746740d0a010.png)

### 撤销修改

修改文件后，使用 status 命令查看一下文件状态：

```bash
git status
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

      modified:   /there/is/a/modified/file
```

对于未 add 进暂存区的文件，此时还在工作区，可以使用 `git checkout -- <file>` 快速撤销本地修改。

```bash
git checkout [some_dir|file.txt]
```

恢复所有本地未提交的更改（应在项目根目录中执行）：

```bash
git checkout . // git checkout -- .
```

> :warning: "--" 可加可不加

那么，对于已 add 进暂存区的文件，如何撤销本地修改？还是先使用 status 命令查看一下文件状态：

```bash
git status
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

      modified:   /there/is/a/modified/file
```

先取消暂存修改
Git 提示我们，可以使用 reset 命令取消暂存：

```bash
git reset /there/is/a/modified/file
```

取消暂存后，文件状态就回到了跟之前一样了：

```bash
git status
Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

      modified:   /there/is/a/modified/file
```

再撤销本地修改
这时按提示使用 `checkout`即可：

```bash
git checkout -- /there/is/a/modified/file
```

这时工作目录就干净了：

```bash
git status
nothing to commit, working directory clean
```

### 一步到位

那么有更便捷的、一步到位的办法吗？有，指定提交即可：

```bash
git status
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

      modified:   /there/is/a/modified/file
```

```bash
git checkout HEAD -- /there/is/a/modified/file
```

```bash
git status
nothing to commit, working directory clean
```

checkout 与 reset区别

| 命令 | 操作目标 | 描述 |
| :-- | :-- | :-- |
| checkout | 工作目录（working tree） | 用于撤销本地修改 |
| reset | 暂存区（index） | 只用于覆盖暂存区 |

因此 `git reset <paths>` 等于 `git add <paths>` 的逆向操作。
如果企图用 `reset` 命令覆盖工作目录，是会报错的。

<h2 id="6">git merge</h2>

使用git merge命令或者git rebase命令，在本地分支上合并远程分支。

```bash
git merge origin/master
# 或者
git rebase origin/master
```

上面命令表示在当前分支上，合并origin/master。与本地的其他分支合并则不用加`origin/`

<h2 id="7">git pull</h2>

git pull命令的作用是，取回远程主机某个分支的更新，再与本地的指定分支合并。它的完整格式稍稍有点复杂。如果当前分支与远程分支存在追踪关系，git pull就可以省略远程分支名

```bash
git pull origin
```

上面命令表示，本地的当前分支自动与对应的origin主机"追踪分支"进行合并。
如果当前分支只有一个追踪分支，连远程主机名都可以省略。

```bash
git pull
```

上面命令表示，当前分支自动与唯一一个追踪分支进行合并。这条命令也就等于

```bash
git fetch
git merge 当前分支
```

对于稍复杂的一点情况，比如远程有master, dev, kimi三个分支，本地的分支对应是kimi。如果想将远程的dev分支最新的提交合并到本地的kimi分支中（在kimi分支发起pull request请求合并到dev分支时候会用到），需要执行以下命令：

```bash
git fetch
git merge origin/dev
```

等价于

```bash
git pull origin dev:kimi
```

因为是取回远程的dev分支再与当前本地所在的kimi分支进行合并可以省略`:后面的命令`

```bash
git pull origin dev
```

如果是取回远程的kimi分支再与当前本地所在的kimi分支进行合并，那就是最常用的场景了

```bash
git pull
```

**PS**: 如果远程主机删除了某个分支，默认情况下，git pull 不会在拉取远程分支的时候，删除对应的本地分支。这是为了防止，由于其他人操作了远程主机，导致git pull不知不觉删除了本地分支。
但是，你可以改变这个行为，加上参数 -p 就会在本地删除远程已经删除的分支。

```bash
git pull -p
```

Git force pull to overwrite local files
```bash
git fetch --all
git reset --hard origin/<<分支名>>
```

<h2 id="8">git revert</h2>

只是删除某一个提交，后面的提交不影响

```bash
git revert <commit id>

# 撤销刚刚的提交
git revert HEAD
```

<h2 id="9">git reset</h2>

`reset` 是将指定的 `commit id` 之前的提交从本地仓库移除。假设 `git reset` 之前，工作区和暂存区都有内容：

| 模式  | 本地仓库         | 暂存区           | 工作区              | zsh git              |
| :--    | :--        | :--                | :--                | :--                |
| soft  | 移出指定 id 之前代码  |  1. 本地仓库移出代码 <br> 2. 当前暂存区代码   | 当前工作区代码 | ~~gru soft~~ |
| mixed  | 移出指定 id 之前代码 | 清空 | 1. 本地仓库移出代码 <br> 2. 之前暂存区代码 <br> 3. 当前工作区代码 | ~~gru mixed~~ |
| hard | 移出指定 id 之前代码  | 清空    | 清空 | ~~gru hard~~ |


> 上一个区域代码进入下一个区域，代码有冲突的地方会以下一个区域为准。  

- 如果 `本地仓库移出代码` 进入 `暂存区/工作区`，有冲突会以 `暂存区/工作区` 为准。
- 如果 `之前暂存区代码` 进入 `工作区`，有冲突会以 `工作区` 为准。

> 默认是 `--mixed` 模式。  

这也解释了，为什么 `git reset HEAD <file>` 能将暂存区的代码回退到工作区。

- `HEAD` 可以理解为一个 **游标**，一直指向当前我们所在版本库的地址，就是我们当前所在版本库的 **头指针**。
- 我们也可以不使用 `HEAD`，可以直接使用版本库的 hash 值。
- `HEAD` 也可以省略，直接写成 `git reset <file>`。
- `git reset HEAD <file>`，zsh-git 缩写 `grh`

> `git reset --hard` 的丢失的代码如何找回？

**从代码库移除的代码**

```sh
$ git reflog
b7057a9 HEAD@{0}: reset: moving to b7057a9
98abc5a HEAD@{1}: commit: more stuff added to foo
b7057a9 HEAD@{2}: commit (initial): initial commit
```

`reflog` 会记录所有 `HEAD` 的历史，也就是说当你做 `reset`，`checkout` 等操作的时候，这些操作会被记录在`reflog`中。

所以，我们要找回我们第二个 commit，只需要做如下操作：

```sh
git reset --hard 98abc5a
```

**暂存区丢失的代码**

**据说** `git fsck --lost-found` 可以

```sh
git fsck --lost-found
```

用 `git show` 看一下回来的内容对不对

```sh
git show ce1b401ce1a3138e66603fa0b751c2eff974cc78

```

也可以到 `.git/lost-found` 目录下找找看有没有你丢失的文件。

详情请参考：[《Git Community Book 中文版：找回丢失的对象》](http://gitbook.liuhui998.com/6_1.html)

**工作区丢失的代码**

<kbd>cmd + z</kbd> 或者到 IDEA 的 Local History 里找找看，也许还能恢复。

<h2 id="10">git cherry-pick</h2>

### 合并某个分支上的单个commit

git cherry-pick可以选择某一个分支中的一个或几个commit(s)来进行操作。例如，假设我们有个稳定版本的分支，叫v2.0，另外还有个开发版本的分支v3.0，我们不能直接把两个分支合并，这样会导致稳定版本混乱，但是又想增加一个v3.0中的功能到v2.0中，这里就可以使用cherry-pick了。

```bash
git fetch # gf cherry-pick之前要先进行fetch，拉取到最新的commit
git cherry-pick <commit id>
```

就是对已经存在的commit 进行**再次提交**，然后合并到目前所在的分支。
**注意**：当执行完 cherry-pick 以后，将会 生成一个新的提交。这个新的提交的哈希值和原来的不同，但标识名一样。

### 合并某个分支上的一系列commits

在一些特性情况下，合并单个commit并不够，你需要合并一系列相连的commits。这种情况下就不要选择cherry-pick了，rebase 更适合。还以上例为例，假设你需要合并feature分支的commit`76cada`~`62ecb3` 到master分支。
首先需要基于feature创建一个新的分支，并指明新分支的最后一个commit：

```bash
git checkout -bnewbranch 62ecb3 
```

然后，rebase这个新分支的commit到master（--ontomaster）。`76cada^` 指明你想从哪个特定的commit开始。

```bash
git rebase --ontomaster 76cada^  
```

得到的结果就是feature分支的commit `76cada` ~`62ecb3` 都被合并到了master分支。

<h2 id="11">git rebase</h2>

[git merge 和 rebase 的区别](https://github.com/muwenzi/Program-Blog/issues/75)

<h2 id="12">git stash</h2>

用于保存和恢复工作进度

```bash
git stash
```

保存当前的工作进度。会分别对暂存区和工作区的状态进行保存

```bash
git stash list
```

显示进度列表。此命令显然暗示了git stash 可以多次保存工作进度，并用在恢复时候进行选择

```bash
git stash pop stash@{1}
```

如果不使用任何参数，会恢复最新保存的工作进度，并将恢复的工作进度从存储的工作进度列表中清除。
    
如果提供<stash>参数（来自 `git stash list` 显示的列表），则从该 `<stash>` 中恢复。恢复完毕也将从进度列表中删除 `<stash>`。
    
选项--index 除了恢复工作区的文件外，还尝试恢复暂存区。
    
```bash
git stash apply stash@{1}
```

除了不删除恢复的进度之外，其余和 `git stash pop` 命令一样

```bash
git stash clear
```
删除所有存储的进度

<h2 id="13">git clean</h2>

`git clean`命令用来从你的工作区中删除所有**没有tracked**过的文件. 
`git clean`经常和`git reset --hard`一起结合使用. 记住reset只影响被track过的文件, 所以需要clean来删除没有track过的文件. 结合使用这两个命令能让你的工作区完全回到一个指定的<commit>的状态.

### QA

1. 什么叫没有tracked？

不考虑`.gitignore`的话：你创建了些文件 或者 IDE自动创建了些文件，但是你从来没有add它们，也没有commit它们，它们就是没有untracked。

2. 与`git checkout .`的区别？

二者都是针对在工作区没有`git add`的情况，但`git checkout .`是对修改文件而言，`git clean`是对新文件而言。

### git clean 参数

```bash
-n 显示 将要 删除的 文件 和  目录（只是一个演习和提醒）
-f 删除 文件
-df 删除 文件 和 目录 zsh缩写：gclean
```

```bash
git clean -n
```

是一次clean的演习, 告诉你哪些文件会被删除. 记住他不会真正的删除文件, 只是一个提醒.

```bash
git clean -f
```

删除当前目录下所有没有track过的文件. 他不会删除 `.gitignore` 文件里面指定的文件夹和文件, 不管这些文件有没有被track过.

```bash
git clean -f <path>
```

删除指定路径下的没有被track过的文件.

```bash
git clean -df # gclean
```

删除当前目录下没有被track过的文件和文件夹.

```bash
git clean -xf
```

删除当前目录下所有没有track过的文件. 不管他是否是.gitignore文件里面指定的文件夹和文件

```bash
git clean -fdx
```

这将删除所有本地未跟踪的文件/夹，所以只有 git跟踪的文件保留：
警告： -x 也将删除所有被忽略的文件！

小结： `git reset --hard` 和 `git clean -f` 是一对好基友. 结合使用他们能让你的工作目录完全回退到最近一次commit的时候

<h2 id="14">git remote</h2>

### 查看远端仓库的地址

```bash
git remote -v  # grv
```

### 修改远端仓库地址

```bash
git remote set-url 远端名称 git@github.com:muwenzi/Program-Blog.git
```

### 添加远端仓库

常用的就是 fork 仓库，用来区分 `pull/push` 的究竟是哪一个远端：

```sh
git remote add 远端名称 git@github.com:muwenzi/Program-Blog.git # gra
```

### 删除远端仓库

```sh
git remote remove 远端名称 git@github.com:muwenzi/Program-Blog.git
```

### 拉取上游仓库的代码

```bash
git pull 上游仓库名 分支名
```

### 清除远端冗余分支

```bash
git remote show origin
```

可以查看本地与远端的分支是否还关联或者已经过时（远端已经不存在了）

然后就会提示另一条命令

```bash
git remote prune origin
```

这是用来清除 **本地仓库对应的远端** 已经失效的。

如果要删除本地分支，可以进行过滤再批量删除：

```sh
git branch -D `git branch --list 'fix-'`
```

删除除 master 以外所有本地分支，执行前需要切换到master分支执行：

```sh
git branch | grep -v "master" | xargs git branch -D
```

[完整git-remote命令](https://www.git-scm.com/docs/git-remote)

<h2 id="15">git tag</h2>

### 打tag

```sh
git tag -a v1.1 -m "注释"
```

### 推送tag

git push不会推送标签（tag），除非使用--tags选项。

```sh
git push origin --tags
# or
git tag -l # 查看所有tag
git push origin v1.1
```

### 删除本地tag

```sh
git tag -d v1.1.1
```

### 删除远程tag

```sh
git push origin :v1.1.1
# 也可以这样
git push origin --delete tag v1.1.1
```

<h2 id="16">HEAD</h2>

> `HEAD~` 是 `HEAD~1` 的缩写，表示当前 commit 的第一个父 commit。  
> `HEAD~2` 表示当前 commit 的第一个父 commit的第一个父 commit。  
> `HEAD~3` 表示当前 commit 的第一个父 commit的第一个父 commit的第一个父 commit，以此类推。

> `HEAD^` 是 `HEAD^1` 的缩写，也是表示当前 commit 的第一个父 commit。  
> 但 `HEAD^2` 表示当前 commit 的 **第二个** 父 commit (当有分支 merge 操作的时候就会有两个父 commit)。

`~1` 和 `~2` 类似树中的父子节点，`^1` 和 `^2` 类似树中的兄弟节点，如下图所示：
![image](https://user-images.githubusercontent.com/12554487/46857500-ae738a00-ce3b-11e8-9359-5f850ee57bfc.png)

![image](https://user-images.githubusercontent.com/12554487/43994118-12211088-9dca-11e8-8229-4289455c532c.png)

Others:

- `^` and `~` 可以组合去写。
-  `HEAD` 也可以换成任意一个 `commit id`。

<h2 id="17">git config</h2>

config 配置有：

- system
- global
- local（当前仓库）

三个 设置先从`system->global->local` 底层配置会覆盖顶层配置 分别使用 `--system/global/local` 可以定位到配置文件

查看系统config

```sh
git config --system --list
```

查看当前用户（global）配置

```sh
git config --global  --list
```

查看当前仓库配置信息

```sh
git config --local  --list
```

`--global` 中存储了提交用户的email和用户名 如果需要手动设置则可以使用如下指令：

```sh
git config --global user.name "myname"
git config --global user.email  "test@gmail.com"
```

<h2 id="18">git rm</h2>

有时候在项目开发过程中，把某些目录或文件加入`.gitignore`后发现并未生效，原因是`.gitignore`**只能忽略那些原来没有被track的文件**，如果某些文件已经被纳入了版本管理中，则修改`.gitignore`是无效的。那么解决方法就是先把本地缓存删除（改变成未track状态），然后再提交：

```sh
git rm -r --cached .
git add .
git commit -m 'update .gitignore
```

`.gitignore` 的匹配规则：

```sh
.a       # 忽略所有 .a 结尾的文件
!lib.a    # 但 lib.a 除外
/TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
build/    # 忽略 build/ 目录下的所有文件
doc/.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
```

## 参考资料

1. [Git远程操作详解（阮一峰）](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)
2. [git-recipes](https://github.com/geeeeeeeeek/git-recipes/wiki)
3. [回滚错误的修改](https://github.com/geeeeeeeeek/git-recipes/wiki/2.6-%E5%9B%9E%E6%BB%9A%E9%94%99%E8%AF%AF%E7%9A%84%E4%BF%AE%E6%94%B9)
4. [Git合并特定commits 到另一个分支](http://blog.csdn.net/ybdesire/article/details/42145597)
5. [git checkout 命令撤销修改](http://cnblog.me/2015/08/15/git-checkout/)
6. [自定义 Git - 配置 Git](https://git-scm.com/book/zh/v1/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git)
7. [git stash用于保存和恢复工作进度](https://gist.github.com/subchen/3409a16cb46327ca7691)
8. [git clean 小结](http://blog.csdn.net/wh_19910525/article/details/8233858)
9. [How do I force “git pull” to overwrite local files?](https://stackoverflow.com/questions/1125968/how-do-i-force-git-pull-to-overwrite-local-files)
10. [[译]git clean](http://www.cnblogs.com/irocker/p/git-clean.html)
11. [git-remote - Manage set of tracked repositories](https://www.git-scm.com/docs/git-remote)
12. [git创建、删除分支和tag](https://blog.csdn.net/revitalizing/article/details/49056411)
13. [Can you delete multiple branches in one command with Git?](https://stackoverflow.com/questions/3670355/can-you-delete-multiple-branches-in-one-command-with-git)
14. [GIT本地删除除master以外所有分支，作者：风匀坊](https://www.huuinn.com/archives/234)
15. [Git docs: git-remote - Manage set of tracked repositories](https://git-scm.com/docs/git-remote)
16. [Git 初接触 （三） Git的撤销操作 git reset HEAD -- <file>，作者：上官二狗](https://blog.csdn.net/qq_36431213/article/details/78858848)
17. [找回Git中丢失的Commit，作者：drybeans](https://www.jianshu.com/p/8b4c95677ee0)
18. [git reset 后代码丢失 代码未commit](https://www.oschina.net/question/255789_155537)
19. [在 git 中找回丢失的 commit，作者：alsotang](https://cnodejs.org/topic/546e0512c4922d383a82970f)
20. [What's the difference between HEAD^ and HEAD~ in Git? 作者：dr01](https://stackoverflow.com/a/43046393/9287383)
21. [What's the difference between HEAD^ and HEAD~ in Git? 作者：Alex Janzik](https://stackoverflow.com/a/29120883/9287383)
22. [GIT-查看config配置信息 作者：Merray](https://www.cnblogs.com/merray/p/6006411.html)
23. [Git忽略规则及.gitignore规则不生效的解决办法 作者：Android_大船](https://blog.csdn.net/yingpaixiaochuan/article/details/53729446)
24. [Git 中.gitignore 使用和.gitignore 无效的解决方法 作者：JohnnyB0Y](https://www.jianshu.com/p/e5360fa04152)
