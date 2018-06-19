> https://github.com/muwenzi/Program-Blog/issues/11

**不定期更新**

## 目录

| 序号 | 标题 |
| :-- | :-- |
| 1 | [音量微调](#1)|
| 2 | [Homebrew安装的时候自动更新太慢](#2)|
| 3 | [显示和隐藏文件/文件夹](#3)|
| 4 | [mac升级后，出现的 xcrun: error](#4)|
| 5 | [找回消失的「允许任何来源应用运行」选项](#5)|
| 6 | [禁止 Adobe Creative Cloud 开机启动](#6)|
| 7 | [启用mac三指拖动的窗口](#7)|

<h2 id="1">音量微调</h2>

按住 <kbd>shift + option</kbd> ，再按音量调节键。

<h2 id="2">Homebrew安装的时候自动更新太慢</h2>

主要是国内brew update有点龟速，可以先临时禁用自动更新
```sh
HOMEBREW_NO_AUTO_UPDATE=1 brew install <package>
```
可以放到配置文件里面，以zsh为例：
```sh
echo 'export HOMEBREW_NO_AUTO_UPDATE=true' >> ~/.zshrc
source ~/.zshrc
```
bash需要将`.zshrc`换成`.bash_profile`
当然你也可以更换镜像源，提高update速度，会有一定的同步差：
1. 替换 homebrew-core源 
```sh
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote set-url origin git://mirrors.ustc.edu.cn/homebrew-core.git
```
2. 替换 Homebrew Bottles源
```sh
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc

brew update
```

<h2 id="3">显示和隐藏文件/文件夹</h2>

``` bash
defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder
```

取消显示隐藏文件和文件夹

``` shell
defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
```

PS: 以上命令只适用于OS 10.8+的MAC

<h2 id="4">mac升级后，出现的 xcrun: error</h2>

``` shell
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

重装了一下xcode command line，结果就正常了……

``` shell
xcode-select --install
```

不过看帖子里并不是所有人重装都能解决问题，有些人似乎还要手动切换下xcode的路径才能解决。

``` shell
sudo xcode-select -switch /
```

因为帖子标题说是在升级到“冲浪湾”时遇到了这问题，所以看来这问题属于每次升级时候都会碰到的月经型问题了OTL

问题解决后，我又去各处翻了下问题出现的原因，可惜没有找到。个人推断可能是因为git所需的lib关联到了command line tools，升级时改动了lib的路径所致吧。

<h2 id="5">找回消失的「允许任何来源应用运行」选项</h2>

不少人在升级之后，发现「系统偏好设置 - 安全与隐私 - 通用」中「允许任何来源应用运行」的选项消失了，这是因为 macOS Sierra 加强了系统安全性，降低不良应用威胁电脑安全的几率，但是这也导致某些未经过开发者签名的应用无法在电脑上正常运行。
![image](https://cloud.githubusercontent.com/assets/12554487/25262992/d6fc1e98-268e-11e7-9680-ac9d51c3cb77.png)

要想找回这个选项，可以在终端中输入`sudo spctl --master-disable`指令，验证密码之后即可重新开启这个选项。
![image](https://cloud.githubusercontent.com/assets/12554487/25262997/df803f2c-268e-11e7-8ec1-245411119544.png)
需要说明的是，如果在系统偏好设置的“安全与隐私”中重新选中允许 App Store 和被认可的开发者 App，即重新打开 Gatekeeper 后，允许“任何来源”App 的选项会再次消失，可运行上述命令再次关闭 Gatekeeper。

<h2 id="6">禁止 Adobe Creative Cloud 开机启动</h2>

禁止开机启动：
```bash
launchctl unload -w /Library/LaunchAgents/com.adobe.AdobeCreativeCloud.plist
```

恢复开机启动：
```bash
launchctl load -w /Library/LaunchAgents/com.adobe.AdobeCreativeCloud.plist
```

<h2 id="7">启用mac三指拖动的窗口</h2>

设置-->辅助功能-->左菜单栏下滑，找到鼠标与触控板-->点选触控板选项，勾选启用拖移：三指拖移
![image](https://bbsimg.fengimg.com/2015/08/25/10478577_%E5%B1%8F%E5%B9%95%E5%BF%AB%E7%85%A7%202015-08-25%20%E4%B8%8B%E5%8D%889.42.26.png)

## Reference

1. [mac-xcrun-error](http://elfxp.com/mac-xcrun-error/)
1. [macOS Sierra 来了，升级需知和 8 大新变化都在这里](http://sspai.com/35529)
1. [锋友分享：找回Sierra允许“任何来源” 的应用](http://www.feng.com/iPhone/news/2016-06-27/Feng-friends-sharing-find-Sierra-allows-the-application-of-any-source-_650342.shtml)
1. [Homebrew有比较快的源（mirror）吗](https://www.zhihu.com/question/31360766/answer/132082951)
1. [Mac 下禁止 Adobe Creative Cloud 开机启动的方法](https://amdyxu.com/mac-adobe-photoshop-creative-cloud-autostart/)
1. [EI Captain OS X10.11Beta7如何使用三指拖动应用窗口](https://bbs.feng.com/forum.php?mod=viewthread&tid=9809561&page=1&extra=#pid151071333)
