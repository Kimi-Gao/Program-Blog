Web使用一种名为HTTP( HyperText Transfer Protocol, 超文本传输协议)的协议作为规范，完成从Client到Server等一系列运作流程。而协议是指规则的约定。可以说，Web是建立在HTTP协议上通信的。

![image](https://cloud.githubusercontent.com/assets/12554487/19430008/174bffdc-9485-11e6-9961-4abfd6902be3.png)

了解协议之前，先来了解一下HTTP诞生的背景了解当初制定的初衷，这样有助于更好地理解HTTP协议。
## HTTP的诞生

1989年3月（那时候木有出生= =），互联网还只属于少数人。在这一互联网的黎明期，HTTP诞生了。

CERN（欧洲核子研究组织）的Tim博士提出了一种能让远隔两地的研究者们共享知识的设想，为了实现从一台计算机上获取并显示存放在多台计算机里的文件、数据、图片和其他类型的文件而诞生HTTP协议。因为在当时其他诸多已经诞生的协议解决不了这个问题。例如：Telnet、SMTP、POP3、IAMP4、FTP等。所以HTTP协议应运而生。

最初的理念是：借助多文档之间的相互关联形成的超文本（HyperText），连成可相互参阅的WWW。

现在已提出3项WWW构建技术：
- 把SGML（标准通用标记语言）作为页面的文本标记语言HTML（超文本标记语言）
- 作为文档传递协议的HTTP
- 指定文档所在地址的URL（统一资源定位符）
## HTTP的版本

HTTP 协议到现在为止总共经历了 4 个版本的演化
### HTTP/0.9

HTTP 是基于 TCP/IP 协议的**应用层协议**。它不涉及数据包（packet）传输，主要规定了客户端和服务器之间的**通信格式**，默认使用80端口。第一个HTTP协议的版本是HTTP 0.9，它的组成极其简单，因为它只允许客户端发送GET这一种请求，它不包含协议头，每个请求只有一句话，例如：        

``` http
GET /index.html
```

上面命令表示，TCP 连接（connection）建立后，客户端向服务器请求（request）网页index.html。
协议规定，服务器只能回应HTML格式的字符串，不能回应别的格式。

``` html
<html>
  <body>Hello World</body>
</html>
```

服务器发送完毕，就关闭TCP连接。

由于没有协议头，造成了 HTTP 0.9 协议只支持一种内容，即纯文本。不过网页仍然支持用 HTML 语言格式化，同时无法插入图片。所以 HTTP 0.9 能够支持的应用实在太有限了。一次 HTTP 0.9 的传输首先要建立一个由客户端到 Web 服务器的 TCP 连接，由客户端发起一个请求，然后由 Web 服务器返回页面内容，然后连接会关闭。如果请求的页面不存在，也不会返回任何错误码。

HTTP 0.9作为HTTP协议的第一个成熟版本。此版本功能非常薄弱。

```
1）请求只有一行

2）没有HTTP头部信息和错误代码信息

3）只能接收一种类型的数据：纯文本

4）只有一种方法：GET
```
### HTTP/1.0

随着互联网的发展，HTTP 0.9已经不能满足互联网发展的需求。因此HTTP 1.0就这样诞生了。HTTP 1.0的最大改变是引入了`POST`方法，使得**客户端通过HTML表单向服务器发送数据**成为可能。从而实现了**客户端和服务器端的数据交互**。这是WEB应用程序的一个基础，从此客户端与Web服务器之间不再只能单向地获取数据，而可以实现交互，因此CGI（Common Gate Interface，通用网关接口）开始流行起来，Web上开始出现留言板、论坛等丰富的应用。

另一个巨大的改变是引入了**HTTP头**，使得HTTP协议不仅能返回错误代码，并且借助于MIME技术能够传输更为丰富的文件类型，不再局限于纯文本。还可以是图片、动画等其他文件格式。通过HTTP协议头可以支持各种媒体类型。从此Web上不再仅仅是纯文本的页面，比如图像通过 <img> 的HTML标记开始出现。

除此之外，还支持长连接（但默认还是使用短连接），即一次TCP连接，可以实现多次通讯。HTTP 1.0默认是传输一次数据后就关闭连接。缓存机制，以及身份认证等。

请求和回应的格式也发生了变化

**请求格式**
下面是一个1.0版的HTTP请求的例子。

``` http
GET / HTTP/1.0
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5)
Accept: */*
```

可以看到，这个格式与0.9版有很大变化。第一行是请求命令，必须在尾部添加协议版本（`HTTP/1.0`）。后面就是多行头信息，描述客户端的情况。

**回应格式**
服务器的回应如下。

``` http
HTTP/1.0 200 OK 
Content-Type: text/plain
Content-Length: 137582
Expires: Thu, 05 Dec 1997 16:00:00 GMT
Last-Modified: Wed, 5 August 1996 15:55:28 GMT
Server: Apache 0.84

<html>
  <body>Hello World</body>
</html>
```

回应的格式是`"头信息 + 一个空行（\r\n） + 数据"`。其中，第一行是`"协议版本 + 状态码（status code） + 状态描述"`。

**Content-Type 字段**
关于字符的编码，1.0版规定，头信息必须是 ASCII 码，后面的数据可以是任何格式。因此，服务器回应的时候，必须告诉客户端，数据是什么格式，这就是Content-Type字段的作用。

下面是一些常见的Content-Type字段的值。

``` http
text/plain
text/html
text/css
image/jpeg
image/png
image/svg+xml
audio/mp4
video/mp4
application/javascript
application/pdf
application/zip
application/atom+xml
```

这些数据类型总称为MIME type，每个值包括一级类型和二级类型，之间用斜杠分隔。
除了预定义的类型，厂商也可以自定义类型。

`MIME type`还可以在尾部使用分号，添加参数。

``` http
Content-Type: text/html; charset=utf-8
```

上面的类型表明，发送的是网页，而且编码是UTF-8。
客户端请求的时候，可以使用`Accept`字段声明自己可以接受哪些数据格式。

``` http
Accept: */*
```

上面代码中，客户端声明自己可以接受任何格式的数据。
MIME type不仅用在HTTP协议，还可以用在其他地方，比如HTML网页。

``` html
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!-- 等同于 -->
<meta charset="utf-8" /> 
```

**Content-Encoding 字段**
由于发送的数据可以是任何格式，因此可以把数据压缩后再发送。Content-Encoding字段说明数据的压缩方法。

``` http
Content-Encoding: gzip
Content-Encoding: compress
Content-Encoding: deflate
```

客户端在请求时，用Accept-Encoding字段说明自己可以接受哪些压缩方法。

``` http
Accept-Encoding: gzip, deflate
```

**缺点**
HTTP/1.0 版的主要缺点是，每个TCP连接只能发送一个请求。发送数据完毕，连接就关闭，如果还要请求其他资源，就必须再新建一个连接。
TCP连接的新建成本很高，因为需要客户端和服务器三次握手，并且开始时发送速率较慢（slow start）。所以，HTTP 1.0版本的性能比较差。随着网页加载的外部资源越来越多，这个问题就愈发突出了。
为了解决这个问题，有些浏览器在请求时，用了一个非标准的Connection字段。

``` http
Connection: keep-alive
```

这个字段要求服务器不要关闭TCP连接，以便其他请求复用。服务器同样回应这个字段。

``` http
Connection: keep-alive
```

一个可以复用的TCP连接就建立了，直到客户端或服务器主动关闭连接。但是，这不是标准字段，不同实现的行为可能不一致，因此不是根本的解决办法。

HTTP 1.0 是一个成熟的 HTTP 协议，现在很多浏览器和Web服务器都强制要求HTTP协议版本至少是1.0

```
1）引入了POST方法，实现了Client和Server的双向交互

2）每次通信都必须包括头信息（HTTP header）描述一些元数据，
  使得互联网不仅可以传输文字，还能传输图像、视频、二进制文件。

3）新增功能还包括状态码（status code）、多字符集支持、多部分发送（multi-part type）、
  权限（authorization）、缓存（cache）、内容编码（content encoding）等。

4）支持长连接（但默认还是使用短连接）

```
### HTTP 1.1

2000年5月，HTTP 1.1诞生。HTTP 1.1并不像HTTP 1.0对HTTP 0.9那样的革命性。但是对HTTP 1.0做了很多功能性的增强。

        1）增加了Host头。

           使得GET后面只需使用相对路径

           使得一台主机可以使用多个域名

        2）引入了Range头

           使得客户端通过HTTP下载时只下载内容的一部分，使得多线程下载成为可能

它就是目前使用最广泛的协议版本。这个版本的HTTP协议已经稳定了，跟HTTP 1.0相比，它新增了很多引人注目的新特性，比如Host协议头，一个HTTP请求的头中可以包含一句例如：

``` http
Host: muwenzi.com
```

从此一个Web服务器可以支持挂载多个域名了，无需每个域名都使用独立IP，每个网站可以使用虚拟主机

另一个HTTP 1.1的新特性是支持部分内容请求/响应，这意味着当客户端请求的数据量很大时，可以分多次发起请求，每次请求只要求获取整块数据的一部分。Web服务器也可以分多次响应，每次只返回整块数据的一部分，这使得流媒体得以实现。

从HTTP 1.1开始，客户端默认与Web 服务器建立长连接，这种连接适合Web上数据量较大的丰富应用，使得资源消耗更少

HTTP 1.1 相对于 HTTP 1.0 的主要区别体现在：
1. 缓存处理
2. 带宽优化及网络连接的使用
3. 错误通知的管理
4. 消息在网络中的发送
5. 互联网地址的维护
6. 安全性及完整性
### HTTP 2

于2015年5月作为互联网标准正式发布 HTTP 2（原名 HTTP 2.0）

HTTP/2的目标包括异步连接复用，头压缩和请求反馈管线化并保留与HTTP 1.1的完全语义兼容

Facebook对各方案进行了评价并最终推荐了 SPDY 协议

知道了 HTTP 是何物以及简单的历史，那么在现实中如何使用呢。想象下万维网是一个复杂的网状物，像下图：
![image](https://cloud.githubusercontent.com/assets/12554487/19423460/191c61da-9453-11e6-9ade-950e1efb2a18.png)
它如此巨大，包含着海量的资源，为了从中找到一个资源，我们必须给每一个资源一个唯一的标识，所以我们有了统一资源标识符；除了得到资源，我们可能会需要删除资源，提交资源等等操作，所以我们有了 HTTP 方法；为了让交流的双方知道对方的状态以及更充分的交流，所有有了首部（head）和状态码。当然还有其他的规定。所有规定构成了 HTTP 的轮廓，并且使 HTTP 能够在现实中可靠顺利的使用。

**参考资料**

1. [HTTP 协议简介](http://techlog.cn/article/list/10182870)
1. [HTTP 协议介绍](http://blog.qiji.tech/archives/1506)
1. [HTTP 协议入门 by 阮一峰](http://www.ruanyifeng.com/blog/2016/08/http.html)
