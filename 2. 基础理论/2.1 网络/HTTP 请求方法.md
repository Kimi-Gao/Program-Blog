> https://github.com/muwenzi/Program-Blog/issues/88

<!-- TOC -->

- [1. HTTP Method 概览](#1-http-method-概览)
- [2. 基础概念](#2-基础概念)
  - [2.1. 名词术语](#21-名词术语)
  - [2.2. 安全性](#22-安全性)
  - [2.3. 幂等性](#23-幂等性)
  - [2.4. 可缓存](#24-可缓存)
- [3. 九种方法](#3-九种方法)
  - [3.1. GET : 获取资源](#31-get--获取资源)
  - [3.2. HEAD : 获取报文首部](#32-head--获取报文首部)
  - [3.3. OPTIONS : 询问支持的方法](#33-options--询问支持的方法)
  - [3.4. PUT : 幂等传输 body](#34-put--幂等传输-body)
  - [3.5. DELETE : 删除资源](#35-delete--删除资源)
  - [3.6. POST : 非幂等传输 body](#36-post--非幂等传输-body)
  - [3.7. PATCH : 非幂等传输部分 body](#37-patch--非幂等传输部分-body)
  - [3.8. CONNECT : 隧道代理](#38-connect--隧道代理)
  - [3.9. TRACE : 追踪路径](#39-trace--追踪路径)
- [4. 参考资料](#4-参考资料)

<!-- /TOC -->

# 1. HTTP Method 概览

| ID  | Methods | 请求body            | 响应body           | 安全性              | 幂等性              | 可缓存              | HTML表单            |
| :-- | :--     | :--                | :--                | :--                | :--                | :--                | :--                |
| 1   | GET     | :no_entry_sign:    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| 2   | HEAD    | :no_entry_sign:    | :no_entry_sign:    | :white_check_mark: | :white_check_mark: | :white_check_mark: | :no_entry_sign:    |
| 3   | OPTIONS | :no_entry_sign:    | :no_entry_sign:    | :white_check_mark: | :white_check_mark: | :no_entry_sign:    | :no_entry_sign:    |
| 4   | PUT     | :white_check_mark: | :no_entry_sign:    | :no_entry_sign:    | :white_check_mark: | :no_entry_sign:    | :no_entry_sign:    |
| 5   | DELETE  | :white_check_mark: | :white_check_mark: | :no_entry_sign:    | :white_check_mark: | :no_entry_sign:    | :no_entry_sign:    |
| 6   | POST    | :white_check_mark: | :white_check_mark: | :no_entry_sign:    | :no_entry_sign:    | :white_check_mark: | :white_check_mark: |
| 7   | PATCH   | :white_check_mark: | :no_entry_sign:    | :no_entry_sign:    | :no_entry_sign:    | :no_entry_sign:    | :no_entry_sign:    |
| 8   | CONNECT | :white_check_mark: | :no_entry_sign:    | :no_entry_sign:    | :no_entry_sign:    | :no_entry_sign:    | :no_entry_sign:    |
| 9   | TRACE   | :no_entry_sign:    | :no_entry_sign:    | :no_entry_sign:    | :white_check_mark: | :no_entry_sign:    | :no_entry_sign:    |

# 2. 基础概念

## 2.1. 名词术语

- Request：请求
- Response：响应
- Message：报文
- Body：报文主体
- Headers：报文首部/报文头域
- Request Headers：请求报文首部/请求首部/请求头域
- Response Headers：响应报文首部/响应首部/响应头域
- Safe：安全
- Idempotent：幂等
- Cacheable：可缓存

## 2.2. 安全性

安全方法是指不会修改服务器的数据的方法。也就是说，这是一个对服务器 **只读操作** 的方法。这些方法是安全的：`GET`，`HEAD` 和 `OPTIONS`。

就算方法具有只读的语义，服务器也能更改它自己的数据，比如：记录这次请求的日志或者数据分析。安不安全的定义是这个方法 **需不需要服务器修改数据**。

客户端不需要服务端修改数据，也就不会给给服务端造成不必要的负担。浏览器调用安全的方法不用考虑会给服务端造成什么危害，这样，服务端就能允许客户端预加载资源。网络爬虫也是依赖于安全的HTTP方法。

安全的方法并不意味着只是对服务端的静态文件的请求，服务端可以在请求的时候即时生成资源返回，只要生成资源的脚本保证是安全的即可：也就是说生成资源的时候没有额外的的影响。

安全的请求，不会改变服务端的状态（数据）：

```text
GET /pageX.html HTTP/1.1
```

非安全的强求方式，可能会引起服务端状态的改变：

```text
POST /pageX.html HTTP/1.1
```

一个幂等（idempotent）但是不安全的方法：

```text
DELETE /idX/delete HTTP/1.1
```

## 2.3. 幂等性

幂等性是指同样的请求被执行一次与连续执行多次的效果是一样的，服务器的状态也是一样的。换句话说就是，幂等方法不应该具有副作用（统计用途除外）。在正确实现的条件下，`GET`，`HEAD`，`PUT` 和 `DELETE` 等方法都是幂等的，而 `POST` 方法不是。

> 所有的 Safe 方法也都是幂等的。

幂等性只与后端服务器的实际状态有关，而每一次请求接收到的状态码不一定相同。例如，第一次调用 `DELETE` 方法有可能返回 200，但是后续的请求可能会返回 404。`DELETE` 的言外之意是，开发者不应该使用 `DELETE` 方法实现具有删除最后条目功能的 RESTful API。

> 服务器不一定会确保请求方法的幂等性，有些应用可能会错误地打破幂等性约束。

`GET /pageX HTTP/1.1` 是幂等的。连续调用多次，客户端接收到的结果都是一样的：

```text
GET /pageX HTTP/1.1
GET /pageX HTTP/1.1
GET /pageX HTTP/1.1
GET /pageX HTTP/1.1
```

`POST /add_row HTTP/1.1` 不是幂等的。如果调用多次，就会增加多行记录：

```text
POST /add_row HTTP/1.1
POST /add_row HTTP/1.1   -> Adds a 2nd row
POST /add_row HTTP/1.1   -> Adds a 3rd row
```

`DELETE /idX/delete HTTP/1.1` 是幂等的，即便是不同请求之间接收到的状态码不一样：

```text
DELETE /idX/delete HTTP/1.1   -> Returns 200 if idX exists
DELETE /idX/delete HTTP/1.1   -> Returns 404 as it just got deleted
DELETE /idX/delete HTTP/1.1   -> Returns 404
```

## 2.4. 可缓存

可缓存是指 **HTTP 响应** 可以被缓存，它被存储在浏览器缓存中以便后面相同的请求能快速响应。不是所有的响应都可以被缓存，可以被缓存的响应需满足以下条件：

- HTTP 方法本身是可缓存的：如 `GET` 或 `HEAD` 方法。`POST` 方法在某种条件下也可以被缓存，但这种方式极为罕见。其他方法，如： `PUT` 或 `DELETE` 都不可以被缓存，同样他们的处理結果也不可以。
- 应用程序是会缓存已知的响应状态码，并且被认为是可缓存的。这些可缓存的状态码如下：200, 203, 204, 206, 300, 301, 404, 405, 410, 414, 和 501。
- 响应报文中没有指定的首部，如 `Cache-Control`，它可以阻止缓存。

> :warning: 注意一些不缓存的请求到指定的 URI 可能会导致相同 URI 上以前缓存的响应失效。例如，`PUT` 到 pageX.html 将使相同 URI 下所有的 `GET` 或 `HEAD` 请求缓存失效。

如果方法和响应的状态码是可缓存的，那么响应也是可以缓存的：

```text
GET /pageX.html HTTP/1.1
(…) 

200 OK
(…)
```

`PUT` 请求不能被缓存。 此外，它还将导致所有方法为 `HEAD` 或 `GET` 相同的 URI 缓存数据无效 :

```text
PUT /pageX.html HTTP/1.1
(…)

200 OK
(…)
````

指定响应报文首部的 `Cache-Control` 属性可以阻止缓存：

```text
GET /pageX.html HTTP/1.1
(…)

200 OK
Cache-Control: no-cache
(…)
```

# 3. 九种方法

HTTP/1.1/2 共有 9 种方法，常见的一般是前 7 种。

## 3.1. GET : 获取资源

**定义**

GET 方法意思是获取被请求URI（Request-URI）指定的信息（以响应报文的格式）。如果请求URI涉及到一个数据生成过程，那么这个生成的数据应该被作为报文在响应中返回，但这并不是过程的资源文本，除非资源文本恰好是过程的输出（译注：URI指示的资源是动态生成的）。

**条件 GET**

如果 `Request Headers` 包含：

- If-Modified-Since
- If-Unmodified-Since
- If-Match
- If-None-Match
- If-Range

GET 的语义将变成 `条件（conditional） GET`。一个 `条件 GET` 方法会请求满足条件首部的资源。`条件 GET` 方法的目的是为了减少不必要的网络使用，通过利用缓存，从而不用多次请求或传输客户已经拥有的数据。

**部分 GET**

如果请求包含一个 Range 首部，那么 GET 方法就变成 `部分 GET` 方法。一个 `部分 GET` 会请求一部分资源。 `部分 GET` 方法的目的是为了减少不必要的网络使用，这通过允许获取部分资源，从而不需要传输客户端已经拥有的数据。

**可缓存**

GET 请求的响应是可缓存的。

## 3.2. HEAD : 获取报文首部

**定义**

`HEAD` 方法用来获取响应报文的首部，它和 `GET` 方法一致，除了服务器不能在响应里返回 body。`HEAD` 响应首部里的元信息应该和 `GET` 请求响应首部里的元信息一致。

**应用**

`HEAD` 方法的一个使用场景是在下载一个大文件前先获取其大小（`content-length`）再决定是否要下载, 以此可以节约带宽资源。还经常被用来测试超文本链接的有效性，可访问性，和最近的改变。

> :warning: 注意：HEAD 方法的 reponse 不应包含 body。即使包含了 body 也必须忽略掉。

**可缓存**

`HEAD` 请求的响应是可缓存的，因为 `Response Headers` 可被用于更新以前的那个资源的缓存的响应。

如果 `Response Headers` 出现一个新值指明了缓存的响应和当前源服务器上对应的资源不同（可能因为 `Content-Length`，`Content-MD5`，`ETag` 或 `Last-Modified` 值的改变），那么必须认为该缓存是过时的（stale）。

## 3.3. OPTIONS : 询问支持的方法

**定义**

`OPTIONS` 方法用于获取目的资源所支持的通信选项。客户端可以对特定的 URL 使用 `OPTIONS` 方法，也可以对整站（通过将 URL 设置为 “*”）使用该方法。

**检测服务器所支持的 HTTP 请求方法**


```sh
curl -X OPTIONS http://example.org -i
```

响应报文包含一个 Allow 首部字段，该字段的值表明了服务器支持的所有 HTTP 方法：

```text
HTTP/1.1 200 OK
Allow: OPTIONS, GET, HEAD, POST
Cache-Control: max-age=604800
Date: Thu, 13 Oct 2016 11:45:00 GMT
Expires: Thu, 20 Oct 2016 11:45:00 GMT
Server: EOS (lax004/2813)
x-ec-custom-error: 1
Content-Length: 0
```

**CORS 中的预检请求**

在 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) 中，可以使用 `OPTIONS` 方法发起一个预检请求，以检测实际请求是否可以被服务器所接受。

预检请求报文中的：

- `Access-Control-Request-Method` 首部字段告知服务器实际请求所使用的 HTTP 方法。
- `Access-Control-Request-Headers` 首部字段告知服务器实际请求所携带的自定义首部字段。

服务器基于从预检请求获得的信息来判断，是否接受接下来的实际请求。

```text
OPTIONS /resources/post-here/ HTTP/1.1 
Host: bar.other 
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8 
Accept-Language: en-us,en;q=0.5 
Accept-Encoding: gzip,deflate 
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7 
Connection: keep-alive 
Origin: http://foo.example 
Access-Control-Request-Method: POST 
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

服务器所返回的 `Access-Control-Allow-Methods` 首部字段将所有允许的请求方法告知客户端。该首部字段与 `Allow` 类似，但只能用于涉及到 CORS 的场景中。

```text
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT 
Server: Apache/2.0.61 (Unix) 
Access-Control-Allow-Origin: http://foo.example 
Access-Control-Allow-Methods: POST, GET, OPTIONS 
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type 
Access-Control-Max-Age: 86400 
Vary: Accept-Encoding, Origin 
Content-Encoding: gzip 
Content-Length: 0 
Keep-Alive: timeout=2, max=100 
Connection: Keep-Alive 
Content-Type: text/plain
```

## 3.4. PUT : 幂等传输 body

**定义**

`PUT` 方法用于新增或更新资源。

**与 POST 区别**

`POST` 和 `PUT` 的区别容易被简单地误认为“`POST`表示创建资源，`PUT`表示更新资源”。而实际上，二者均可用于 **创建** 资源，更为本质的差别是在 **幂等性** 方面。`PUT` 方法是幂等的：调用一次与连续调用多次是等价的（即没有副作用），而连续调用多次 `POST` 方法可能会有副作用，比如将一个订单重复提交多次。

`POST` 所对应的 `URI` 并非创建的资源本身，而是 **资源的接收者**。

比如：`POST http://www.forum.com/articles` 的语义是在 `http://www.forum.com/articles` 下创建一篇帖子，HTTP 响应中应包含帖子的创建状态以及帖子的 URI。两次相同的POST请求会在服务器端创建两份资源，它们具有不同的 URI。所以，POST方法不具备幂等性。

`PUT` 所对应的 URI 是要创建或更新的资源本身。比如：`PUT http://www.forum/articles/4231` 的语义是创建或更新 ID 为 4231 的帖子。对同一 URI 进行多次 PUT 的作用和一次 PUT 是相同的。因此，PUT方法具有幂等性。

但是 HTTP/1.1 的 `PUT` 方法自身 **不带验证机制**，任何人都可以上传文件，存在安全问题，因此一般 Web 网站不使用该方法。若配合 Web 应用程序的验证机制，或架构用采用REST标准的，就可能会开放使用PUT方法。

**示例**

请求

```text
PUT /new.html HTTP/1.1
Host: example.com
Content-type: text/html
Content-length: 16

<p>New File</p>
```

响应

如果目标资源不存在，并且PUT方法成功创建了一份，那么源头服务器必须返回`201 (Created)` 来通知客户端资源已创建。

```text
HTTP/1.1 201 Created
Content-Location: /new.html
```

如果目标资源已经存在，并且依照请求中封装的表现形式成功进行了更新，那么，源头服务器必须返回 `200 (OK)` 或者 `204 (No Content)` 来表示请求的成功完成。

```text
HTTP/1.1 204 No Content
Content-Location: /existing.html
```

## 3.5. DELETE : 删除资源

`DELETE` 方法用于删除指定的资源，且该方法应该是幂等的。

**请求**

```text
DELETE /file.html HTTP/1.1
```

**响应**

如果 `DELETE` 方法成功执行，那么可能会有以下几种状态码：

- 状态码 `202 (Accepted)` 表示请求的操作可能会成功执行，但是尚未开始执行。
- 状态码 `204 (No Content)` 表示操作已执行，但是无进一步的相关信息。
- 状态码 `200 (OK)` 表示操作已执行，并且响应中提供了相关状态的描述信息。

```text
HTTP/1.1 200 OK 
Date: Wed, 21 Oct 2015 07:28:00 GMT

<html>
  <body>
    <h1>File deleted.</h1> 
  </body>
</html>
```

## 3.6. POST : 非幂等传输 body

**定义**

`POST` 方法用来发送数据给服务器。 请求报文主体的类型由 `Content-Type` 首部指定。

**HTML 表单方式**

当 `POST` 请求是通过 HTML 表单发送, 并返回服务器的修改结果的时候, `Content-Type` 是通过在 `<form>` 元素中设置正确的 `enctype` 属性, 或是在 `<input>` 和 `<button>` 元素中设置 `formenctype` 属性来选择的:

- `application/x-www-form-urlencoded`

这是默认的类型，数据被编码成以 '&' 分隔的键-值对, 同时以 '=' 分隔键和值. 非字母或数字的字符会被 percent encoded: 这也就是为什么这种类型不支持二进制数据的原因 (应使用 `multipart/form-data` 代替)。

```text
POST / HTTP/1.1
Host: foo.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 13

say=Hi&to=Mom
````

- `multipart/form-data`

使用 `multipart/form-data` 作为 content type 的表单:

```text
POST /test.html HTTP/1.1 
Host: example.org 
Content-Type: multipart/form-data;boundary="boundary" 

--boundary 
Content-Disposition: form-data; name="field1" 

value1 
--boundary 
Content-Disposition: form-data; name="field2"; filename="example.txt" 

value2
```

<img width="1399" alt="wx20180730-110513 2x" src="https://user-images.githubusercontent.com/12554487/43375573-8e4ae2d8-93e8-11e8-9a25-6640340903e6.png">

- `text/plain`

**XHR 等方式**

当 `POST` 请求是通过除 HTML 表单之外的方式发送时, 例如使用 `XMLHttpRequest`, 那么请求主体可以是任何类型。

## 3.7. PATCH : 非幂等传输部分 body

`PATCH` 方法用于对资源进行部分修改。

`PUT` 方法已经被用来表示对资源进行整体覆盖， 而 `POST` 方法则没有对标准的补丁格式的提供支持。不同于 `PUT` 方法，而与 `POST` 方法类似，`PATCH` 方法是非幂等的，这就意味着连续多个的相同请求会产生不同的效果。

要判断一台服务器是否支持 `PATCH` 方法，那么就看它是否将其添加到了响应首部 `Allow` 或者 `Access-Control-Allow-Methods` （在跨域访问的场合，CORS）的方法列表中 。

另外一个支持 `PATCH` 方法的隐含迹象是 `Accept-Patch` 首部的出现，这个首部明确了服务器端可以接受的补丁文件的格式。

当你仅需更新资源的某一项，`PUT` 一个完整的资源就显得很累赘同时会消耗更多带宽。

```xml
PATCH /user/kimi HTTP/1.1
<user>
    <firstname>Kimi</firstname>
</user>
```

另请参见

- [RFC 5789 - HTTP PATCH](http://tools.ietf.org/html/rfc5789)

## 3.8. CONNECT : 隧道代理

`CONNECT` 方法可以开启一个客户端与所请求资源之间的双向沟通的通道。它可以用来创建隧道（tunnel）。

例如，`CONNECT` 可以用来访问采用了 `SSL (HTTPS)`  协议的站点。客户端要求代理服务器将 TCP 连接作为通往目的主机隧道。之后该服务器会代替客户端与目的主机建立连接。连接建立好之后，代理服务器会面向客户端发送或接收 TCP 消息流。

`CONNECT` 方法的作用就是把服务器作为跳板，让服务器代替用户去访问其它网页，之后把数据原原本本的返回给用户。这样用户就可以访问到一些只有服务器上才能访问到的网站了，这也就是 HTTP 代理。

`CONNECT` 方法是需要使用 TCP 直接去连接的，所以不适合在网页开发中使用，不过网页开发中也基本上用不到。

一些代理服务器在创建隧道时会要求进行身份验证。参见 `Proxy-Authorization` 首部。

```text
CONNECT server.example.com:80 HTTP/1.1
Host: server.example.com:80
Proxy-Authorization: basic aGVsbG86d29ybGQ=
```

下面这张图来自于《HTTP 权威指南》，可以参考一下：

![image](https://user-images.githubusercontent.com/12554487/43500641-24441a10-9584-11e8-9b34-580e49873449.png)

详情的解释可以参考以下两篇文章：

- [HTTP代理协议 HTTP/1.1的CONNECT方法](https://www.web-tinker.com/article/20055.html)
- [HTTP 代理原理及实现（一）](https://imququ.com/post/web-proxy.html)

## 3.9. TRACE : 追踪路径

`TRACE` 方法实现了向目标资源的沿路径的消息环回（loop-back）测试 ，提供了一种实用的 debug 机制。请求的接收方是源服务器或第一个代理或接收请求中零（0）Max-Forwards 值的网关。

这个方法简单返回客户端发送给服务器的所有信息，主要用于调试目的。这个方法最初被认为没有危害，被 [Jermiah Grossman 发现能被用于实施XST](http://www.cgisecurity.com/whitehat-mirror/WH-WhitePaper_XST_ebook.pdf)。

不需要此方法的时候，建议将其禁用。

# 4. 参考资料

1. [HTTP的幂等性，作者：Todd Wei](http://www.cnblogs.com/weidagang2046/archive/2011/06/04/idempotence.html)
1. [图解HTTP【日】上野宣（人民邮电出版社）](https://www.amazon.cn/%E5%9B%BE%E4%B9%A6/dp/B00JTQK1L4/ref=sr_1_1?ie=UTF8&qid=1488470286&sr=8-1&keywords=%E5%9B%BE%E8%A7%A3HTTP)
1. [MDN web docs：安全](https://developer.mozilla.org/zh-CN/docs/Glossary/Safe)
1. [MDN web docs：幂等](https://developer.mozilla.org/zh-CN/docs/Glossary/%E5%B9%82%E7%AD%89)
1. [MDN web docs：Cacheable](https://developer.mozilla.org/zh-CN/docs/Glossary/Cacheable)
1. [MDN web docs：POST](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST)
1. [MDN web docs：PUT](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/PUT)
1. [W3school：HTML `<form>` 标签的 method 属性](http://www.w3school.com.cn/tags/att_form_method.asp)
1. [HTTP Method详细解读，作者：马在路上](https://www.cnblogs.com/machao/p/5788425.html)
1. [HTTP代理协议 HTTP/1.1的CONNECT方法，作者：次碳酸钴](https://www.web-tinker.com/article/20055.html)
1. [HTTP 代理原理及实现（一），作者：Jerry Qu](https://imququ.com/post/web-proxy.html)