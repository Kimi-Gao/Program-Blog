## 目录

| 序号 | 标题 |
| :-- | :-- |
| 1 | [autojump](#1) |
| 2 | [The Fuck ](#2) |

<h2 id="1">autojump</h2>
autojump是一个命令行工具，它允许你可以直接跳转到你喜爱的目录，而不用管你现在身在何处。

1. 命令行安装:

```sh
brew install autojump
```

2. 在用户目录下的 `.zshrc`文件中找到 `plugins=""`这一行，设置为
```sh
plugins=(git autojump)
```
如果 `.zshrc`文件中没有这一行，则在文件的末尾添加
```sh
plugins=(git autojump)
```
3. 在 `.zshrc` 文件的末尾添加
```sh
[[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh
```
4. 最后命令行输入 `source ~/.zshrc` 使 `.zshrc` 文件生效。
或者
注销用户后，重启终端即可。

**注意**
>autojump 自己是怎么描述自己的 ：
autojump is a faster way to navigate your filesystem. It works by maintaining a database of the directories you use the most from the command line.

>autojump 的使用：
假设你现在需要进入用户目录下的Music文件夹，可以使用 ` autojump Music` 或者` j Music` 即可进入 Music 文件夹，但**前提是要用 cd  Music 进入 Music 文件夹一次**，否则 autojump Music 或者  j Music 是无法生效的。

>autojump 有一个文件（里面存放着所有你去过的目录），你可以根据自己的情况，修改每一个路径权重(权重是根据你使用的频率决定)

<h2 id="2">The Fuck</h2>

如其名，就是输入fuck纠正前一条输错的命令

![image](https://raw.githubusercontent.com/nvbn/thefuck/master/example.gif)

**安装**
```sh
brew install thefuck
```
You should place this command in your .bash_profile, .bashrc, .zshrc or other startup script:
```sh
eval $(thefuck --alias)
# You can use whatever you want as an alias, like for Mondays:
eval $(thefuck --alias FUCK)
```

Changes will be available only in a new shell session. To make them available immediately, run source `~/.bashrc` (or your shell config file like `.zshrc`.

If you want separate alias for running fixed command without confirmation you can use alias like:
```sh
alias fuck-it='export THEFUCK_REQUIRE_CONFIRMATION=False; fuck; export THEFUCK_REQUIRE_CONFIRMATION=True'
```

**参考资料**
1. [oh my zsh + autojump 的安装和使用](http://www.jianshu.com/p/51e71087f732)
1. [nvbn/thefuck](https://github.com/nvbn/thefuck)