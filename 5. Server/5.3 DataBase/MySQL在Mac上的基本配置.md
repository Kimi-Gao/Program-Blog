## 安装

我比较习惯使用 Homebrew 安装 MySQL，当然官网的安装包也比较省事

```sh
$ brew update # 这是一个好习惯
$ brew install mysql
```

## 使用

启动 MySQL 服务，运行`mysql.server`
```sh
$ mysql.server start
```
关闭 MySQL，运行：
```sh
$ mysql.server stop
```
你可以了解更多 mysql.server 的命令，运行：
```sh
$ mysql.server --help
```
登录 MySQL, 运行:
```sh
$ mysql -uroot
```
Note: 默认情况下，MySQL 用户 `root` 没有密码，这对本地开发没有关系，但如果你希望修改密码，你可以运行:
```sh
$ mysqladmin -u root password 'new-password'
```

**参考资料**
- [Mac开发配置手册](https://aaaaaashu.gitbooks.io/mac-dev-setup/content/MySql/index.html)