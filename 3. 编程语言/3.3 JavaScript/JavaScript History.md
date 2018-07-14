本文的主要目的是探讨一下Javascript到底是如何设计出来的，当初设计的初衷和目的是啥，了解这些也许能让我们对JS的原因有更加深刻的认识，其次介绍JS的发展历程以及展望一下未来JS的发展趋势。

## 从上古时代说起
要理解Javascript的设计思想，必须从它的诞生说起。

1994年，[网景公司（Netscape）](https://zh.wikipedia.org/wiki/%E7%B6%B2%E6%99%AF)成立（于2003年被收购），并发布了Navigator浏览器0.9版。这是历史上第一个比较成熟的网络浏览器，轰动一时。但是，这个版本的浏览器只能用来浏览，不具备与访问者互动的能力。比如，如果网页上有一栏"用户名"要求填写，浏览器就无法判断访问者是否真的填写了，只有让服务器端判断。如果没有填写，服务器端就返回错误，要求用户重新填写，这太浪费时间和服务器资源了。

![image](https://cloud.githubusercontent.com/assets/12554487/19936778/c1c3fec0-a159-11e6-8595-1a20d9c5039a.png)

此时的网景公司急需一种网页脚本语言，使得浏览器可以与网页互动。

网页脚本语言到底是什么语言？网景公司当时有两个选择：一个是采用现有的语言，比如Perl、Python、Tcl、Scheme等等，允许它们直接嵌入网页；另一个是发明一种全新的语言。

这两个选择各有利弊。
```
第一个选择，有利于充分利用现有代码和程序员资源，推广起来比较容易；
第二个选择，有利于开发出完全适用的语言，实现起来比较容易。
```
到底采用哪一个选择，网景公司内部争执不下，管理层一时难以下定决心。

## Java干爹的诞生
就在这时，发生了另外一件大事：1995年Sun公司将Oak语言改名为Java，正式向市场推出。

Sun公司大肆宣传，许诺这种语言可以"**一次编写，到处运行**"（Write Once, Run Anywhere），它看上去很可能成为未来的主宰。插播一下：阿里的[weex](http://alibaba.github.io/weex/)框架也号称“Write Once Run Everywhere”，微笑脸；)，其实更认同[react](https://facebook.github.io/react/)的战略思想“Learn Once, Write Anywhere”。

网景公司动了心，决定与Sun公司结成联盟。它不仅允许Java程序以applet（小程序）的形式，直接在浏览器中运行；甚至还考虑直接将Java作为脚本语言嵌入网页，只是因为这样会使HTML网页过于复杂，后来才不得不放弃，哈哈感觉Java此时就像一个大胖子（· ·）浏览器容不下他，被嫌弃了 :unamused:。

总之，当时的形势就是，网景公司的整个管理层，都是Java语言的信徒，Sun公司完全介入网页脚本语言的决策。因此，Javascript后来就是网景和Sun两家公司一起携手推向市场的，**这种语言被命名为"Java+script"并不是偶然的**。


## JS之父：Brendan Eich

此时，34岁的系统程序员[Brendan Eich](http://brendaneich.com/)登场了。1995年4月，网景公司录用了他。

![image](https://cloud.githubusercontent.com/assets/12554487/19936816/df55b046-a159-11e6-939d-c936e94b9cc3.png)

Brendan Eich的主要方向和兴趣是函数式编程，网景公司招聘他的目的，是研究将`Scheme`语言作为网页脚本语言的可能性。Brendan Eich本人也是这样想的，以为进入新公司后，会主要与Scheme语言打交道。工程师负责开发这种新语言。他觉得，没必要设计得很复杂，这种语言只要能够完成一些简单操作就够了，比如判断用户有没有填写表单。

仅仅一个月之后，1995年5月，网景公司做出决策，**未来的网页脚本语言必须"看上去与Java足够相似"，但是比Java简单，使得非专业的网页作者也能很快上手**。这个决策实际上将Perl、Python、Tcl、Scheme等非面向对象编程的语言都排除在外了。

Brendan Eich被指定为这种"简化版Java语言"的设计师。

## 最初的设计思想
但是，他对Java一点兴趣也没有。为了应付公司安排的任务，他只用**10天**时间就把Javascript设计出来了。

由于设计时间太短，语言的一些细节考虑得不够严谨，导致后来很长一段时间，Javascript写出来的程序混乱不堪。如果Brendan Eich预见到，未来这种语言会成为互联网第一大语言，全世界有几百万学习者，他会不会多花一点时间呢？

总的来说，他的设计思路是这样的：

```
　　（1）借鉴C语言的基本语法；
　　（2）借鉴Java语言的数据类型和内存管理；
　　（3）借鉴Scheme语言，将函数提升到"第一等公民"（first class）的地位；
　　（4）借鉴Self语言，使用基于原型（prototype）的继承机制。
```
所以，**Javascript语言实际上是两种语言风格的混合产物----（简化的）函数式编程+（简化的）面向对象编程**。这是由Brendan Eich（函数式编程）与网景公司（面向对象编程）共同决定的。

## 如今作者的评价
多年以后，Brendan Eich还是看不起Java。他说：

>"Java（对Javascript）的影响，主要是把数据分成基本类型（primitive）和对象类型（object）两种，比如字符串和字符串对象，以及引入了Y2K问题。这真是不幸啊。"

把基本数据类型包装成对象，这样做是否可取，这里暂且不论。Y2K问题则是直接与Java有关。根据设想，Date.getYear()返回的应该是年份的最后两位：

```javascript
　　var date1 = new Date(1999,0,1);
　　var year1 = date1.getYear();
　　alert(year1); // 99
```

但是实际上，对于2000年，它返回的是100！

```javascript
　　var date2 = new Date(2000,0,1);
　　var year2 = date2.getYear();
　　alert(year2); // 100
```

如果用这个函数生成年份，某些网页可能出现"19100"这样的结果。这个问题完全来源于Java，因为Javascript的日期类直接采用了java.util.Date函数库。Brendan Eich显然很不满意这个结果，这导致后来不得不添加了一个返回四位数年份的Date.getFullYear()函数。
如果不是公司的决策，Brendan Eich绝不可能把Java作为Javascript设计的原型。作为设计者，他一点也不喜欢自己的这个作品：

>"与其说我爱Javascript，不如说我恨它。它是C语言和Self语言一夜情的产物。十八世纪英国文学家约翰逊博士说得好：'它的优秀之处并非原创，它的原创之处并不优秀。'（the part that is good is not original, and the part that is original is not good.）"

## 一路坎坷地发展
Since JavaScript conception on 1995, it has been evolving slowly. New additions happened every few years. ECMAScript came to be in 1997 to guide the path of JavaScript. It has been releasing versions such as ES3, ES5, ES6 and so on.

![image](https://cloud.githubusercontent.com/assets/12554487/19838301/23c51a00-9f07-11e6-9204-ee79db0b048f.png)

As you can see, there are gaps of 10 and 6 years between the ES3, ES5, and ES6. The new model is to make small incremental changes every year. Instead of doing massive changes at once like happened with ES6.

未完待续...

**参考资料**
- [Overview of JavaScript ES6 features (a.k.a ECMAScript 6 and ES2015+)](http://adrianmejia.com/blog/2016/10/19/Overview-of-JavaScript-ES6-features-a-k-a-ECMAScript-6-and-ES2015/)
- [Javascript诞生记](http://www.ruanyifeng.com/blog/2011/06/birth_of_javascript.html)
- [Javascript继承机制的设计思想](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)
