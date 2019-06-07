> https://github.com/muwenzi/Program-Blog/issues/11

**不定期更新**

<h1>Contents</h1>

<!-- TOC -->

- [1. OS Tips](#1-os-tips)
  - [1.1. 升级 Mojave 后字体渲染过细](#11-%E5%8D%87%E7%BA%A7-mojave-%E5%90%8E%E5%AD%97%E4%BD%93%E6%B8%B2%E6%9F%93%E8%BF%87%E7%BB%86)
  - [1.2. 音量微调](#12-%E9%9F%B3%E9%87%8F%E5%BE%AE%E8%B0%83)
  - [1.3. 显示和隐藏文件/文件夹](#13-%E6%98%BE%E7%A4%BA%E5%92%8C%E9%9A%90%E8%97%8F%E6%96%87%E4%BB%B6%E6%96%87%E4%BB%B6%E5%A4%B9)
  - [1.4. 找回消失的「允许任何来源应用运行」选项](#14-%E6%89%BE%E5%9B%9E%E6%B6%88%E5%A4%B1%E7%9A%84%E5%85%81%E8%AE%B8%E4%BB%BB%E4%BD%95%E6%9D%A5%E6%BA%90%E5%BA%94%E7%94%A8%E8%BF%90%E8%A1%8C%E9%80%89%E9%A1%B9)
  - [1.5. 启用mac三指拖动的窗口](#15-%E5%90%AF%E7%94%A8mac%E4%B8%89%E6%8C%87%E6%8B%96%E5%8A%A8%E7%9A%84%E7%AA%97%E5%8F%A3)
  - [1.6. 去除两指左右滑动回退/前进网页](#16-%E5%8E%BB%E9%99%A4%E4%B8%A4%E6%8C%87%E5%B7%A6%E5%8F%B3%E6%BB%91%E5%8A%A8%E5%9B%9E%E9%80%80%E5%89%8D%E8%BF%9B%E7%BD%91%E9%A1%B5)
- [2. CLI](#2-cli)
  - [2.1. Homebrew安装的时候自动更新太慢](#21-homebrew%E5%AE%89%E8%A3%85%E7%9A%84%E6%97%B6%E5%80%99%E8%87%AA%E5%8A%A8%E6%9B%B4%E6%96%B0%E5%A4%AA%E6%85%A2)
  - [2.2. mac升级后，出现的 xcrun: error](#22-mac%E5%8D%87%E7%BA%A7%E5%90%8E%E5%87%BA%E7%8E%B0%E7%9A%84-xcrun-error)
- [3. Software](#3-software)
  - [3.1. 禁止 Adobe Creative Cloud 开机启动](#31-%E7%A6%81%E6%AD%A2-adobe-creative-cloud-%E5%BC%80%E6%9C%BA%E5%90%AF%E5%8A%A8)
  - [3.2. Magnet: 调节屏幕窗口大小](#32-magnet-%E8%B0%83%E8%8A%82%E5%B1%8F%E5%B9%95%E7%AA%97%E5%8F%A3%E5%A4%A7%E5%B0%8F)
  - [3.3. LastPass: 密码管理利器](#33-lastpass-%E5%AF%86%E7%A0%81%E7%AE%A1%E7%90%86%E5%88%A9%E5%99%A8)
- [4. Reference](#4-reference)

<!-- /TOC -->
# 1. OS Tips

## 1.1. 升级 Mojave 后字体渲染过细

升级 macOS Mojave 新系统后，苹果默认关闭了次像素抗锯齿(Sub-pixel anti-aliasing），导致字体变细锯齿增多。像 VS Code / JetBrains 之类的代码编辑器显示的字体效果会**变细**变模糊很多，可以通过如下方式来解决这个问题：

```sh
defaults write -g CGFontRenderingFontSmoothingDisabled -bool NO
```

重启软件即可。

## 1.2. 音量微调

按住 <kbd>shift + option</kbd> ，再按音量调节键。

## 1.3. 显示和隐藏文件/文件夹

``` bash
defaults write com.apple.finder AppleShowAllFiles -boolean true ; killall Finder
```

取消显示隐藏文件和文件夹

``` shell
defaults write com.apple.finder AppleShowAllFiles -boolean false ; killall Finder
```

PS: 以上命令只适用于OS 10.8+的MAC

## 1.4. 找回消失的「允许任何来源应用运行」选项

不少人在升级之后，发现「系统偏好设置 - 安全与隐私 - 通用」中「允许任何来源应用运行」的选项消失了，这是因为 macOS Sierra 加强了系统安全性，降低不良应用威胁电脑安全的几率，但是这也导致某些未经过开发者签名的应用无法在电脑上正常运行。
![image](https://cloud.githubusercontent.com/assets/12554487/25262992/d6fc1e98-268e-11e7-9680-ac9d51c3cb77.png)

要想找回这个选项，可以在终端中输入`sudo spctl --master-disable`指令，验证密码之后即可重新开启这个选项。
![image](https://cloud.githubusercontent.com/assets/12554487/25262997/df803f2c-268e-11e7-8ec1-245411119544.png)
需要说明的是，如果在系统偏好设置的“安全与隐私”中重新选中允许 App Store 和被认可的开发者 App，即重新打开 Gatekeeper 后，允许“任何来源”App 的选项会再次消失，可运行上述命令再次关闭 Gatekeeper。

## 1.5. 启用mac三指拖动的窗口

设置-->辅助功能-->左菜单栏下滑，找到鼠标与触控板-->点选触控板选项，勾选启用拖移：三指拖移
![image](https://user-images.githubusercontent.com/12554487/55286121-01c99c80-53ca-11e9-89f3-8b6a913a351c.png)

## 1.6. 去除两指左右滑动回退/前进网页

这个功能看似便捷，但对于我来说经常都是误操作，尤其是在页面上左右滚动的时候会尤其小心触发网页的左右回退：

![image](https://user-images.githubusercontent.com/12554487/55286225-6afddf80-53cb-11e9-93ab-931ea282c06c.gif)

介绍一下关闭此功能的方法：

![image](https://user-images.githubusercontent.com/12554487/55286240-9e406e80-53cb-11e9-9454-65e4dd3188e1.png)

# 2. CLI

## 2.1. Homebrew安装的时候自动更新太慢

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

## 2.2. mac升级后，出现的 xcrun: error

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

# 3. Software

## 3.1. 禁止 Adobe Creative Cloud 开机启动

禁止开机启动：
```bash
launchctl unload -w /Library/LaunchAgents/com.adobe.AdobeCreativeCloud.plist
```

恢复开机启动：
```bash
launchctl load -w /Library/LaunchAgents/com.adobe.AdobeCreativeCloud.plist
```

## 3.2. Magnet: 调节屏幕窗口大小

Magnet，也不贵，支持正版，详情请搜索AppStore。

![image](https://user-images.githubusercontent.com/12554487/55286279-36d6ee80-53cc-11e9-8a82-c75a1d744ff4.png)

还有一款免费开源的：https://www.spectacleapp.com/  和 Magnet 基本差不多。

## 3.3. LastPass: 密码管理利器

1Password 和 LastPass，我觉得 LastPass 易用性更强，chrome插件也比1Password做得好，mac 版还支持快捷登陆功能：

![image](https://user-images.githubusercontent.com/12554487/55044876-e3386e00-5076-11e9-90d7-ab28733a2236.gif)

注册链接：https://lastpass.com/f?80466051

注意：快捷键 cmd shift L 和 IDEA 代码格式化冲突，可以改成 cmd shift 

chrome插件、mac、iOS都支持，高级版和基础版差距不是很大。

# 4. Reference

1. [mac-xcrun-error](http://elfxp.com/mac-xcrun-error/)
2. [macOS Sierra 来了，升级需知和 8 大新变化都在这里](http://sspai.com/35529)
3. [锋友分享：找回Sierra允许“任何来源” 的应用](http://www.feng.com/iPhone/news/2016-06-27/Feng-friends-sharing-find-Sierra-allows-the-application-of-any-source-_650342.shtml)
4. [Homebrew有比较快的源（mirror）吗](https://www.zhihu.com/question/31360766/answer/132082951)
5. [Mac 下禁止 Adobe Creative Cloud 开机启动的方法](https://amdyxu.com/mac-adobe-photoshop-creative-cloud-autostart/)
6. [EI Captain OS X10.11Beta7如何使用三指拖动应用窗口](https://bbs.feng.com/forum.php?mod=viewthread&tid=9809561&page=1&extra=#pid151071333)
7. [升级 macOS Mojave 后部分软件(如 VS Code)字体变虚 及应用白边解决办法](https://ijs.me/2018/09/26/macos-mojave-font/)
8. [在 macOS Mojave 中恢复暗色菜单栏](https://note.wuze.me/liu-shui/zai-macos-mojave-zhong-hui-fu-an-se-cai-dan-lan)
