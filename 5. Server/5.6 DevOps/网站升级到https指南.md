> https://github.com/muwenzi/Program-Blog/issues/126

## Q&A

### 为什么要使用https?

- https可以有效避免无良运营商的DNS劫持，可以显著提升网站逼格。
- 使用https已经是大势所趋，人心所向，iOS甚至强制要求开发者使用https。
- Chrome 70 之后当用户输入数据时，HTTP 站点将显示一个红色的“不安全”警告。

### 为什么要使用`Let's Encrypt V2`?

- 对于个人开发者而言，https证书太贵，一般都好几千一年。
- `Let's Encrypt V2`免费开源无疑是一个不错的选择。
- 相比于`亚洲诚信`，它支持多域名通配符。

生成证书可以直接借助 https://freessl.org/ 来生成证书，方便快捷，当然你也可以使用[certbot](https://github.com/certbot/certbot) (Let’s Encrypt项目的自动化工具) 来生成证书。

## 获取证书

### 1.填写域名

打开网站 https://freessl.org/ 填写自己的域名，你将看到下图。这里我们填入 `*.muwenzi.com,muwenzi.com`, 同时在下方勾选 `Let's Encrypt V2`, 然后点击"**创建免费的SSL证书**"按钮即可。

![image](https://user-images.githubusercontent.com/12554487/40354695-0bf6e336-5de7-11e8-8d54-be405bda32e9.png)

> :warning: 中间逗号不要有空格

### 2.填写邮箱，选择证书类型，验证类型和CSR生成方式

- 填写自己的邮箱
- 证书品牌只能选择 `Let's Encrypt`
- 证书类型选择 `ECC`。这里主要是选择数字签名的算法，对于普通用户使用默认的 `ECC` 即可。如果需要根据自己的具体情境来选择，一般有以下选择依据：

>(1) RSA签名算法适合于：Verify操作频度高，而Sign操作频度低的应用场景。比如，分布式系统中基于capability的访问控制就是这样的一种场景。
>
>(2) ECDSA签名算法适合于：Sign和Verify操作频度相当的应用场景。比如，点对点的安全信道建立。

- 验证类型使用 `DNS` 的方式。

>其实验证类型用来确定你是否是这个域名的所有者，确认的方式有两种：
>
>1.DNS。  CA(Certificate Authority 数字证书认证机构)将通过查询 DNS 的 TXT 记录来确定您对该域名的所有权，因此需要在域名管理平台将生成的 TXT 记录名与记录值添加到该域名下。
>
>2.文件。CA 将通过访问特定 URL 地址来验证您是否有改域名的所有权。因此，您需要下载给顶的验证文件，并上传到您的服务器。

- CSR生成选择 `浏览器生成`。一般的浏览器都支持 `Web Cryptography`，直接使用默认的 `浏览器生成` 最方便。

填好之后点击**点击生成**按钮，如下图所示：

![image](https://user-images.githubusercontent.com/12554487/40354847-7962622e-5de7-11e8-82bc-3a043ec76a75.png)

### 3.进行DNS验证

- 3.1 在第2步中点击按钮后，会弹出下图内容：

![image](https://user-images.githubusercontent.com/12554487/40373860-68213246-5e1a-11e8-9587-af8562555f13.png)

- 3.2 这时只需要去域名解析控制台添加一条TXT的解析记录即可。我的域名在阿里云，因此解析详情如下图所示：

![image](https://user-images.githubusercontent.com/12554487/40374337-6e793b6a-5e1b-11e8-80c0-45203926aa9d.png)

完成解析后，点击3.1中的**点击验证**按钮

### 4.下载证书

在点击第3步的按钮后，会弹出证书文件下载的按钮，此时点击**下载证书**即可获得证书文件 `full_chain.pem` 和私钥文件 `private.key`。

![image](https://user-images.githubusercontent.com/12554487/40374951-d9c312c8-5e1c-11e8-8ca8-3f3edfeadff0.jpg)

## 配置nginx

查看nginx的配置路径：

```sh
nginx -t # CentOS一般在/etc/nginx/nginx.conf
```

以 `blog` 二级域名为例，nginx的配置如下：

```sh
server {
    # 监听443端口
    listen 443 ssl;
    # 域名，如果有多个空格隔开
    server_name blog.muwenzi.com;

    # 启用ssl
    ssl on;
    # 证书文件的放置路径。证书文件即通过上文《获取证书》的方式获得。
    ssl_certificate /data/security/letsencrypt/full_chain.pem;
    # 私钥文件的放置路径。
    ssl_certificate_key /data/security/letsencrypt/private.key;

    # 服务运行在端口8802
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-NginX-Proxy true;
        proxy_pass http://127.0.0.1:8802/;
        proxy_redirect off;
    }
}

# 对于通过http来访问的请求，我们默认让其跳转到https. 这样保持了http访问的兼容性。
server {
    listen      80;
    server_name    blog.muwenzi.com;
    return 301 https://$server_name$request_uri;
}
```

修改了配置文件后记得：

```sh
service nginx restart
```

其他二级域名类似进行配置即可。

## 验证

打开网页`https://blog.muwenzi.com`，即可看到地址栏中绿色的小锁，证明https已经成功开启。即时你输入`http://blog.muwenzi.com`也会自动转跳到https下的，如此便保证了兼容性。

## 维护

`Let's Encrypt V2` 证书的有效期只有三个月，过期后可以免费重新生成证书，这就需要我们每隔一段时间就去更新一下证书，好在`https://freessl.org/`可以帮我们管理证书，注册登录之后在**证书列表**中可以进行`重新生成证书`的操作(当证书到期距离**少于30天**时才会看到该按钮)。

也可以添加一个crond脚本即可(好像每天生成证书有次数限制,一般也用不着如此频繁的操作)。

首先下载安装 certbot (Let’s Encrypt项目的自动化工具):

```sh
yum -y install certbot
```

检查安装是否成功:

```sh
certbot --help
```

如果安装过程中遇到python的问题，解决办法请参考：https://blog.haohtml.com/archives/17491

将下行添加到 `/etc/crontab` 文件里,并设定每三个月自动更新一次(脚本不确定是否正确)或者按月份写几个，每三个月为一个周期。

```sh
0 0 1 */2 * certbot renew
```

或者使用静默升级,每月1号5点

```sh
00 05 01 * * /usr/bin/certbot renew --quiet && apachectl restart
```

命令执行过程会检查证书的到期日期，如果证书还未到期会提示你的证书尚未到期，输出如下：

```sh
Saving debug log to /var/log/letsencrypt/letsencrypt.log
-------------------------------------------------------------------------------
Processing /etc/letsencrypt/renewal/yourdomain.com.conf
-------------------------------------------------------------------------------
Cert not yet due for renewal
The following certs are not due for renewal yet:
  /etc/letsencrypt/live/yourdomain.com/fullchain.pem (skipped)
No renewals were attempted.
```

> :warning: 如果你创建了多个域名的证书，这里也只显示基本域名的信息，但证书更新会对证书包含的所有域名有效。
>
> :warning: 为确保证书永不过期，需要增加一个cron的定期执行任务，由于更新证书脚本首先会检查证书的到期日期，并且仅当证书距离**少于30天**时才会执行更新，因此可以安全的创建每周甚至每天运行的cron任务。

## 参考资料

1. [快速使用Let's Encrypt开启个人网站的https](https://blog.eyeblue.cn/home/article/9f580b3f-5679-4a9d-be6f-4d9f0dd417af)
1. [使用Let's Encrypt 给网站加 HTTPS](https://blog.haohtml.com/archives/17422)
1. [Chrome 将不再标记 HTTPS 页面为安全站点](https://www.oschina.net/news/96200/chrome-will-stop-tag-https-site-secure)
