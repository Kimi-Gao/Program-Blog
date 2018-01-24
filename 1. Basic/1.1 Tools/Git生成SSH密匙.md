> https://github.com/muwenzi/Program-Blog/issues/5

## 生成SSH密匙

> ssh-keygen -t rsa -C "xxx@gmail.com"  //填写email地址，然后一直“回车”ok

密匙存在 ~/.ssh/id_rsa.pub文件，在Github的账号`Edit Profile`里面`SSH and GPG keys`新建SSH复制该文件里面的密匙即可
## 测试连接是否成功

> ssh -T git@github.com

**注意：**不要在root权限下测试连接，否则会报“Permission denied (publickey).”
