> https://github.com/muwenzi/Program-Blog/issues/75

# 分支的合并

分支的合并主要有两种方法：**merge** 和 **rebase**，例如 `release` 分支或 `hotfix` 分支测试完成后，最后要合并回 `master` 分支，使用这两种方法，合并后分支的历史记录会有很大的差别，本文主要详细论述了这两种方法的差异以及使用场景。

## 目录

- [1. merge](#1)
  - [1.1 master 没有新的提交](#11)
  - [1.2 master 也有新的提交](#12)
    - [1.2.1 master 和 bugfix 新的提交没有文件冲突](#121)
    - [1.2.2 master 和 bugfix 新的提交有文件冲突](#122)
  - [1.3 fast-forward 和 non fast-forward 优缺点](#13)
  - [1.4 `git merge --squash`](#14)
  - [1.5 小结](#15)
- [2. rebase](#2)
- [3. 总结](#3)
- [4. 参考资料](#4)

<h2 id="1">1. merge</h2>

假设有两个分支：`bugfix` 分支是从 `master` 分支分叉出来的。下面主要分两种情况来讨论 `merge` 操作。

<h3 id="11">1.1 master 没有新的提交</h3>

如下图所示：

![image](https://user-images.githubusercontent.com/12554487/40920014-ed215ee4-683d-11e8-8092-73a0f1deaab0.png)

在 `master` 分支上执行一下命令会合并 `bugfix` 分支到 `master`分支：

```sh
git merge bugfix # 等价于 git merge --ff bugfix
```

如果 `master` 分支的状态没有被更改过，那么这个合并是非常简单的。 `bugfix` 分支的历史记录包含 `master` 分支所有的历史记录，所以通过把 `master` 分支的指针向前 **移动** 到 `bugfix` 的最新分支上，Git 就会合并。这样的合并被称为 `fast-forward`（快进）合并。

![image](https://user-images.githubusercontent.com/12554487/40920036-ffd3fa38-683d-11e8-8dc1-480e83a85d7b.png)

>换句话说，**如果顺着一个分支走下去可以到达另一个分支的话，那么 Git 在合并两者时，只会简单地把指针右移**，因为这种单线的历史分支不存在任何需要解决的分歧，所以这种合并过程可以称为快进（Fast forward）。

执行合并时，如果设定了 `non fast-forward` 选项，即使在能够 `fast-forward` 合并的情况下也会生成新的提交并合并。

```sh
git merge --no-ff bugfix
```

如图所示：

![image](https://user-images.githubusercontent.com/12554487/40920080-1678ce80-683e-11e8-8bc8-c871806cae59.png)

<h3 id="12">1.2 master 也有新的提交</h3>

`master` 分支的历史记录有可能在 `bugfix` 分支分叉出去后有新的更新。这种情况下，要把 `master` 分支的修改内容和 `bugfix` 分支的修改内容汇合起来。

![image](https://user-images.githubusercontent.com/12554487/40920113-26fc3f80-683e-11e8-9329-ff8c55d7bb4e.png)

如果对于这种两个分支都有新的提交，主要分两种情况讨论：

<h4 id="121">1.2.1 master 和 bugfix 新的提交没有文件冲突</h4>

执行 `git merge bugfix` 会出现以下信息，可以修改 merge 的 commit message 信息。

```sh
Merge branch 'bugfix'

# Please enter a commit message to explain why this merge is necessary,
# especially if it merges an updated upstream into a topic branch.
#
# Lines starting with '#' will be ignored, and an empty message aborts
# the commit.
~
~
```

合并两个修改会生成一个提交。这时，`master`分支的 HEAD 会移动到该提交上。新的合并节点 E 的 commit message 是“Merge branch 'bugfix'”，加不加 `--ff` 的效果其实是一样的。

![image](https://user-images.githubusercontent.com/12554487/40920133-391771a8-683e-11e8-8f15-f4db4e2820b9.png)

<h4 id="122">1.2.2 master 和 bugfix 新的提交有文件冲突</h4>

如果它们都同时修改了 `README.md` 且导致该文件的有冲突（*修改同一行包括该行的前后一行，都会出现冲突。如果连续修改该行的下一行以及下下一行，那么这些连续行也会算是同一个冲突*），执行 `git merge bugfix` 会出现以下错误：

```sh
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

**处理冲突的时候**

（1）如果用了 `bugfix` 的代码 或者 修改了部分代码，则处理冲突完成后，不仅需要 `add` ，还需要 `commit` 。

```sh
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)

Changes to be committed:

	modified:   README.md
```

那么将会生成一个新的合并节点，其实就是默认的 `--ff` 模式不能走下去，走的是 `--no-ff` 模式。 message 就是以上代码 commit 的 message，分支合并示意图如下图所示：

![image](https://user-images.githubusercontent.com/12554487/40920133-391771a8-683e-11e8-8f15-f4db4e2820b9.png)

当然合并的时候你可以强制只有 `--ff` 走得通的情况下才合并，否则终止合并：

```sh
git merge --ff-only bugfix
```

（2）如果全部用master的代码，则处理冲突完成后，只需要执行：

```sh
git add --all
```

add 之后看一下 status 会返回以下信息：

```sh
On branch master
Your branch is ahead of 'origin/master' by 1 commit.
  (use "git push" to publish your local commits)
All conflicts fixed but you are still merging.
  (use "git commit" to conclude merge)
```

注意这里不需要进行 `commit` 即可将 `master` 的 commit（包括 message 和 hash） 会覆盖掉 `bugfix` 的 commit。且无论加不加 `--no-ff` 合并后分支是 **线性** 的。其实就是还是原来的 master 分支走向。当然现实中这种情况还是比较少的。

> PS: 如果中途想无害终止 merge 可以直接 `git merge --abort`

<h3 id="13">1.3 fast-forward 和 non fast-forward 优缺点</h3>

- `fast-forward` ：删除分支后，会丢掉分支信息，因为合并完之后的视图为线性的，看不出其他分支和交叉合并的信息，但是线性的分支会看起来更加赏心悦目，有洁癖的程序员推荐。
- `non fast-forward` ：即使 bugfix 分支被删除，master 的分叉合并形状图也会保留下来。那么要查明在这个分支里的操作就很容易了。但当分支很多的时候，分支图会很乱。

<h3 id="14">1.4 <code>git merge --squash</code></h3>

`git merge --squash`会在**当前分支新建一个提交节点**，无论 `master` 和 `bugfix` 是否都有新的提交，冲突处理都会增加一个新的提交节点，但最后的分支图都是 **线性** 的。

`--squash` 和 `--no-ff` 非常类似，区别只有一点不会保留对合入分支的引用。

```sh
git merge --squash bugfix
```

![image](https://upload-images.jianshu.io/upload_images/2387568-2a3cf2f539d61d7b.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/665)

<h3 id="15">1.5 小结</h3>

- git merge 默认是 先 `fast-forward` 模式，如果走不通的情况再 `non fast-forward`。可以手动强制一直使用 `--no-ff` 来保留分支图，也可以使用 `--ff-only`，在不能 `fast-forward` 的时候自动终止。
- 在两个分支都有新的提交情况下，合并冲突的时候除非全部使用 **当前分支** 的代码，否则都会产生新的 merge 节点，分支分叉图会被保留。
- 想要完全线性的分支图，可以使用 `squash` ，但会产生一个新的 squash 节点，团队多分支开发的时候可以统一用这个方式，如果使用的是 github 仓库，可以设置 Pull Request 默认 merge 按钮为 `Squash and merge` ，但 github 的这种方式的前提是要先处理完冲突。
![image](https://user-images.githubusercontent.com/12554487/40919264-9a7bbdda-683b-11e8-8516-3e4253ab7874.png)

<h2 id="2">2. rebase</h2>

跟 `merge` 的例子一样，`bugfix` 分支是从 `master` 分支分叉出来的。如果 master 没有新的提交，完全没有必要 rebase 使用 `git merge bugfix` 即可。下面我们将讨论 master 和 bugfix 分支都有新的提交情况：

![image](https://user-images.githubusercontent.com/12554487/40920208-714fbf76-683e-11e8-9e88-254a20d24544.png)

如果在 master 分支使用 `rebase` 方法进行分支合并：

```sh
git checkout master
git rebase bugfix  # bugfix 的分支 commit hash 不会变，变的是 master
```

> :warning: 这样操作的话将会导致 master 分支的 commit 被重新改写，最好 master 的 commit 保持不变，去改写 bugfix 分支的 commit ，最后再将新的 bugfix 分支 `fast-forward` 到 master 分支。

所以我们现在用 `git rebase master` 来保持 master 的 commit 不变。

现在再想想如果我们在 bugfix 分支上 rebase 没有新提交的 master，其实是不会有任何效果的，所以如果 master 没有新的提交，完全没有必要 rebase 使用 `git merge bugfix` 即可。

如果 C, D, X, Y 都没有冲突的话，执行以下命令：

```sh
git checkout bugfix
git rebase master  # 保持 master 的 commit hash 不变
git checkout master
git merge bugfix # 自动使用 fast-forward 模式
```

最后会出现下图所显示的历史记录：

![image](https://user-images.githubusercontent.com/12554487/40920233-81563eea-683e-11e8-8818-985f4ead97ff.png)

经过 rebase 相关操作后历史记录成一条线，相当整洁。

注意移动提交X和Y有可能会发生冲突，所以需要修改各自的提交时发生冲突的部分。

```sh
git checkout bugfix
git rebase master  # 保持 master 的 commit hash 不变
```

![image](https://user-images.githubusercontent.com/12554487/40917872-4a9e6e38-6837-11e8-85db-fb1d6aebfb8c.png)

其中冲突的比较过程是：

>1. D 和 X 比较，处理完冲突，`git rebase --continue` 生成 X'
>1. X' 和 Y 比较，处理完冲突，`git rebase --continue` 生成 Y'

如果比较过程中没有冲突则会自动跳过，进入下一轮比较，命令行操作示例：

![image](https://user-images.githubusercontent.com/12554487/40916102-104b7e02-6831-11e8-8204-bcad775e7278.png)

![image](https://user-images.githubusercontent.com/12554487/40916451-58bd5ca4-6832-11e8-87a2-82ccdc1f2b4f.png)

最后一次 `git rebase --continue` 会生成 Y', rebase 的过程就此结束。

> :warning: 这样不断生成新的节点（该节点只是 commit message 一样，比如 X', Y' ）进行比较，可能会导致在冲突的处理过程中会出现类似的冲突要多次重复处理。

最后将 `master` 的 `HEAD` 移动到 `bugfix` 的 `HEAD` 这里：

```sh
git checkout master
git merge bugfix
```

![image](https://user-images.githubusercontent.com/12554487/40920250-95f9b0f2-683e-11e8-81eb-fb34e463b087.png)

<h2 id="3">3. 总结</h2>

merge 和 rebase都是合并历史记录，但是各自的特征不同：

- **merge**: 保持修改内容的历史记录，但是历史记录会很复杂。
- **rebase**: 历史记录线性整洁，是在原有提交的基础上将差异内容反映进去。提交较多冲突多的时候处理起来非常麻烦。

可以根据开发团队的需要分别使用 merge 和 rebase 。

例如，**想简化历史记录** ：

- feature 分支中导入 master 分支的最新代码，使用 rebase。
- master 分支导入 hotfix 分支的话，先使用 `rebase master`，再使用 `merge hotfix`。

<h2 id="4">参考资料</h2>

1. [Git 分支 - 分支的衍合](https://git-scm.com/book/zh/v1/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E8%A1%8D%E5%90%88)
1. [git rebase和merge的区别，rebase的运动过程和conflict的解决](http://www.tangshuang.net/2960.html)
1. [Git Community Book 中文版: rebase](http://gitbook.liuhui998.com/4_2.html)
1. [猴子都能懂的GIT入门：分支的合并（by 贝格乐）](https://backlog.com/git-tutorial/cn/stepup/stepup1_4.html)
1. [分支的整合：git rebase Or git merge（by 柳兮）](https://zhuanlan.zhihu.com/p/34592377)
1. [图解4种git合并分支方法（by 颜海镜）](https://www.jianshu.com/p/ce7d0513525c)
1. [git究竟什么时候才会遇到conflict？（by 浪漫海贼）](https://zhidao.baidu.com/question/646827134232664205.html)