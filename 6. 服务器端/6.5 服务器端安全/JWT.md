生成 access_token 的时候生成一个 refresh_token, refresh_token 过期时间长于 access_token。

客户端用 refresh_token 请求 access_token。

服务器端刷新原 access_token 的过期时间再返回。

[关于 JWT 到底比 session 强在哪些地方？](https://cnodejs.org/topic/5b568ec12860af042a217822)
