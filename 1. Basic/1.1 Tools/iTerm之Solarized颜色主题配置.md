> https://github.com/muwenzi/Program-Blog/issues/1

## iTerm之Solarized颜色主题配置

第一打开MAC OS默认的终端时候，真心觉得样子好丑，字体难看，下载了iTerm2之后也是同样的难看，便折腾了一下它的主题颜色的配置，在此分享给大家，先上最终的效果图：

![image](https://cloud.githubusercontent.com/assets/12554487/18198593/4b8fe3ae-712f-11e6-87f0-14459e1cfae9.png)
### 基本配置

按`Command + ,` 勾选**Hotkey**中的**Show/hide iTerm2 with a system-wide hotkey**，然后设定一个热键。我个人偏爱 `Command + .`。 现在按`Command + .`就可以随时调出或者隐藏iTerm2了。 你还可以在**Profile**中更改字体等，其他的希望大家自己研究。
### 配色方案

[Solarized](http://ethanschoonover.com/solarized)可以说是目前网络上最流行的配色解决方案，其优美的配色和众多软件的支持，成就了她现在的火爆。我们这里就使用它来进行iTerm2的配色 下载，解压，打开iTerm2的偏好设定，**Profiles / Colors**，最下面的**Load Presets ... / Import... **直接加载**iterm2-colors-solarized/Solarized Dark.itermcolors**配色方案就可以了，这时候可以看到。看到效果了。

其实到这一步，iTerm2看上去已经好多了，但是为了能让它的样子更风骚，我们需要进一步配置。
### zsh和oh-my-zsh

众所周知在Unix/Linux系统下是存在很多不同的shell，常见的就有bash, csh，ksh，zsh等等。在Linux和MAC OS系统中，默认使用的是bash。这里我们要是功能更加强大的 **zsh**。这里可以通过**Homebrew**下载安装zsh：

```
brew install zsh
```

安装完成后，将zsh设置成系统默认shell，以代替bash。 用编辑器打开`/etc/shells`，在末尾添加`/usr/local/bin/zsh`,保存关闭。 在终端中执行以下命令：

```
chsh -s /usr/local/bin/zsh
```

然后重新启动iTerm2，zsh就已经被配置成默认的shell了。

此时的zsh还是最初始的样子，我们要将其变成强大的终端，需要对其进行配置，为了让zsh产生想上面图片那样的效果，我们需要安装**oh-my-zsh**。

**oh-my-zsh**是一个功能强大框架，发布于Github。它可以让你以纯傻瓜的方式对zsh进行配置已得到强大的功能，这里是其[发布页面](https://github.com/robbyrussell/oh-my-zsh)，如果有什么疑问，都可以去这个页面进行查询，里面有最详细的说明。 **on-my-zsh**的安装支持自动和手动，为了省去麻烦，我建议优先使用自动，如果要使用手动安装，请查看安装说明。这里只说一下自动安装。 在终端里，如果你有`curl`，则在终端输入

```
curl -L http://install.ohmyz.sh | sh
```

如果你使用`wget`,则在终端输入

```
wget --no-check-certificate http://install.ohmyz.sh -O - | sh
```

这样oh-my-zsh就安装完成了。开始对其进行配置。

zsh的配置几乎都在`~/.zshrc`下面，用编辑器打开文件，你会看到很多选项，建议你感觉自己的需求进行配置，不懂得可以查询文档。这里我只说一下主题的配置。在`~/.oh-my-zsh/themes`存在各式各样的主题文件，每个主题的样子你可以通过这个[网址](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes)进行查看，选好样式后，在`.zshrc`中的ZSH_THEME设置成你所选用的主题。重启iTerm2，便可以看到相应的效果。这里建议使用**agnoster**，比较好看。

做完上步后，iTerm2的大概样子应该跟我们的第一张图片差不多了，但是没有图片中的箭头，那是因为产生箭头效果是需要特殊字体支持的，这个字体最开始是一个叫[Powerline](https://powerline.readthedocs.org/)的项目开始的，其目的是美化Vim中操作栏的字体状态使其产生箭头效果，当然这个被移植到了iTerm2上。

使用这种字体有两种方式，第一种就是用此项目的[补丁程序](https://github.com/Lokaltog/vim-powerline/tree/develop/fontpatcher)对系统中现有的字体打补丁，然后再让iTerm2使用即可。如果你嫌麻烦，你可以直接使用作者已经打好补丁的[字体](https://github.com/powerline/fonts)。本人为了方便，直接下载了作者打完补丁的字体导入iTerm2，最终的效果便跟第一张图片中样式一样了，字体配置如图：

![image](https://cloud.githubusercontent.com/assets/12554487/18198637/76339c18-712f-11e6-97de-a472cb0ce871.png)

PS：注意Default和Hotkey Window的text配置都要进行相关的字体配置。
### 更多的配色方案

**Solarized**虽然很好，但是使用久了终究会变得平淡，这时候我们要换换主题，Github上有一个项目可以使用非常丰富的主题库，地址在[这里](https://github.com/mbadolato/iTerm2-Color-Schemes)，上面有详细的安装步骤，你可以根据自己的喜好来选择主题了。
