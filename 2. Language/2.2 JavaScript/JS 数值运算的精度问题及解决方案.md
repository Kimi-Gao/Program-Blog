> https://github.com/muwenzi/Program-Blog/issues/16

JS 采用 IEEE-754 浮点数表示法，这是一种二进制表示法，由于精度原因 JS 不能表示所有的实数。它能展示的浮点数个数是有限的，比如它不能准确地表示三分之一的数值字面量。这也导致了它在浮点数的计算上存在误差，如 0.3-0.2 != 0.2-0.1，因为在计算的过程中，存在数据的溢出，丢失了精度。
![image](https://cloud.githubusercontent.com/assets/12554487/18319659/3faa6f2c-7559-11e6-82af-e8be0d250eaf.png)

// TODO
http://www.cnblogs.com/itjeff/p/3410504.html
http://ourjs.com/detail/54695381bc3f9b154e000046
http://yanhaijing.com/javascript/2014/03/14/what-every-javascript-developer-should-know-about-floating-points/
http://madscript.com/javascript/javscript-float-number-compute-problem/
http://www.programgo.com/article/96621712315/
[JavaScript 被忽视的细节](http://mp.weixin.qq.com/s?__biz=MzA5NTM2MTEzNw==&mid=2736710568&idx=1&sn=7775c4c8e01f4f1a1c20281b2c7724c1&scene=1&srcid=09083XIREXKjGHFdsRb5DECy#rd)
