POST和PUT的区别容易被简单地误认为“POST表示创建资源，PUT表示更新资源”

而实际上，二者均可用于**创建**资源，更为本质的差别是在**幂等性**方面。在HTTP规范中对POST和PUT是这样定义的：

>The POST method is used to request that the origin server accept the entity enclosed in the request as a new subordinate of the resource identified by the Request-URI in the Request-Line ...... If a resource has been created on the origin server, the response SHOULD be 201 (Created) and contain an entity which describes the status of the request and refers to the new resource, and a Location header.

>The PUT method requests that the enclosed entity be stored under the supplied Request-URI. If the Request-URI refers to an already existing resource, the enclosed entity SHOULD be considered as a modified version of the one residing on the origin server. If the Request-URI does not point to an existing resource, and that URI is capable of being defined as a new resource by the requesting user agent, the origin server can create the resource with that URI.

POST所对应的URI并非创建的资源本身，而是资源的接收者。比如：`POST http://www.forum.com/articles`的语义是在`http://www.forum.com/articles`下创建一篇帖子，HTTP响应中应包含帖子的创建状态以及帖子的URI。两次相同的POST请求会在服务器端创建两份资源，它们具有不同的URI；所以，POST方法不具备幂等性。而PUT所对应的URI是要创建或更新的资源本身。比如：`PUT http://www.forum/articles/4231`的语义是创建或更新ID为4231的帖子。对同一URI进行多次PUT的副作用和一次PUT是相同的；

因此，PUT方法具有幂等性。

但是HTTP/1.1的PUT方法自身不带验证机制，任何人都可以上传文件，存在安全问题，因此一般Web网站不使用该方法。若配合Web应用程序的验证机制，或架构用采用REST标准的，就可能会开放使用PUT方法。

**参考资料**
1. [HTTP的幂等性](http://www.cnblogs.com/weidagang2046/archive/2011/06/04/idempotence.html)
1. [图解HTTP【日】上野宣（人民邮电出版社）](https://www.amazon.cn/%E5%9B%BE%E4%B9%A6/dp/B00JTQK1L4/ref=sr_1_1?ie=UTF8&qid=1488470286&sr=8-1&keywords=%E5%9B%BE%E8%A7%A3HTTP)