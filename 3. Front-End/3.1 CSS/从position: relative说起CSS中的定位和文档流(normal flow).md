最近有人问我，`position: relative`在不在文档流中，按照文档流的在我脑海中的二维平面的定义，我认为是不属于文档流中，后来仔细查阅W3C的官方文档发现其实并非如此，要想彻底地搞清楚这个问题，需要深入了解一下概念：

- normal flow 文档流
- CSS3 box 盒模型
- formatting context 格式化上下文
- stacking context 层叠上下文

> 注：本文不再对CSS基础的概念进行介绍，有关盒模型和浮动定位问题请查阅其他相关文章

## Normal Flow 文档流/普通流
文档流在W3C中叫做**normal flow**，不知道为啥中文翻译成文档流，在W3C的[CSS Positioned Layout Module Level 3](https://www.w3.org/TR/css-position-3/)的规范中对**normal flow**的定义如下：
>Boxes in the normal flow belong to a formatting context, which may be block or inline, but not both simultaneously. See the CSS Basic Box Model module [CSS3BOX](https://www.w3.org/TR/css3-box/) for further details about [normal flow](https://www.w3.org/TR/CSS2/visuren.html#normal-flow).

简而言之就是说，文档流和盒子有关，在文档流中的盒子属于一个格式化的上下文，可以是块级或行内的盒子，但不能同时存在。

在文档流中，元素按照其在 HTML 中的先后位置至上而下布局，在这个过程中，行内元素水平排列，直到当行被占满然后换行，块级元素则会被渲染为完整的一个新行， 除非另外指定，否则所有元素默认都是文档流定位，也可以说，文档流中元素的位置由该元素在 HTML 文档中的位置决定。

另外在浮动布局中，元素首先按照文档流的位置出现，然后根据浮动的方向尽可能的向左边或右边偏移，其效果与印刷排版中的文本环绕相似。

## CSS3 Box 盒模型

最基础的盒模型部分就不说了，主要说说和normal flow有关的地方

The **flow** (a.k.a. ___normal flow___) of a given ___flow root___ is a set of boxes. A box belongs to the flow if:
1. The used value of its `display` is `block`, `list-item`, `table` or `<template>`.
2. The used value of its `float` is `none`.
3. The used value of its `position` is `static` or `relative`.
4. It is either a child of the flow root or a child of a box that belong to the flow.


总而言之，文档流是盒子的一个集合，以上四种情况下盒子都还处于文档流当中。

在W3C的 `Positioning schemes` 中对文档流有详细的定义：

> In CSS, a box may be laid out according to three positioning schemes:
> 1. Normal flow
>    In CSS, [normal flow](https://www.w3.org/TR/css-position-3/#normal-flow) includes [block formatting](https://www.w3.org/TR/CSS2/visuren.html#block-formatting) of block-level boxes, [inline formatting](https://www.w3.org/TR/CSS2/visuren.html#inline-formatting) of inline-level boxes, and [relative](https://www.w3.org/TR/CSS21/visuren.html#x34) and [sticky](https://www.w3.org/TR/css-position-3/#sticky-position) positioning of block-level and inline-level boxes.
> 2. Floats
>    In the [float](https://www.w3.org/TR/css-position-3/#float) model, a box is first laid out according to the [normal flow](https://www.w3.org/TR/css-position-3/#normal-flow), then taken out of the flow and positioned, typically to the left or right. Content may flow along the side of a [float](https://www.w3.org/TR/css-position-3/#float).
> 3. Absolute positioning
>    In the absolute positioning model, a box is removed from the normal flow entirely (it has no impact on later siblings) and assigned a position with respect to a [containing block](https://www.w3.org/TR/css-position-3/#containing-block).

> An element is called *out-of-flow* if it is [floated](https://www.w3.org/TR/css-position-3/#float), absolutely positioned, or is the root element. An element is called *in-flow* if it is not out-of-flow. The *flow of an element* A is the set consisting of A and all in-flow elements whose nearest out-of-flow ancestor is A.

如果该元素是 [floated](https://www.w3.org/TR/css-position-3/#float), absolutely fixed 才会脱离文档流

##  Formatting Context 格式化上下文

Formatting Context 是页面中的一块渲染区域，在这个区域内拥有它自己的**渲染规则**，决定了**子元素**如何定位，及**元素之间**如何相互作用。

不同的 Formatting Context 有不同的渲染规则，常见的有

- `BFC` (Block Formatting Contextext)
- `IFC` (Inline Formatting Context)
- `GFC` (Grid Formatting Context) CSS 3 新增
- `FFC` (Flex Formatting Context) CSS 3 新增

与 Formatting Context 息息相关的是 Box，每个 HTML 元素作为 Box 被 CSS 渲染。不同的类型的 Box 有不同的行为，CSS 中有两种 Box：Block 和 Inline。

**BFC** 就是只有 Block-level Box 参与的 Formatting Context。它是一个独立的渲染区域，它规定了内部的 Block-level Box 如何布局，并且与这个区域外部毫不相干。关于BFC的内容在此不再展开描述。

## Stacking Context 层叠上下文

层叠上下文是HTML元素的**三维**概念，这些HTML元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的z轴上延伸，HTML元素依据其自身属性按照优先级顺序占用层叠上下文的空间。

<p align="center"><img width="250"src="https://user-images.githubusercontent.com/12554487/28297697-ecb3c92c-6ba1-11e7-91a2-a9ee66c2e494.png"></p>

在这个例子中[增加 z-index](https://developer.mozilla.org/en-US/docs/CSS/Understanding_z-index/Adding_z-index) , 某些 DIV 的渲染顺序是由 z-index 的值影响的。这是因为这些 DIV 具有 使他们形成一个**层叠上下文**的特殊属性。

文档中的层叠上下文由满足以下任意一个条件的元素形成：

- 根元素 (HTML),
- z-index 值不为 "auto"的 绝对/相对定位，
- 一个 z-index 值不为 "auto"的 flex 项目 (flex item)，即：父元素 display: flex|inline-flex，
- [`opacity`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/opacity) 属性值小于 1 的元素（参考 [the specification for opacity](http://www.w3.org/TR/css3-color/#transparency)），
- [`transform`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) 属性值不为 "none"的元素，
- [`mix-blend-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/mix-blend-mode) 属性值不为 "normal"的元素，
- [`filter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)值不为“none”的元素，
- [`perspective`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)值不为“none”的元素，
- [`isolation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/isolation) 属性被设置为 "isolate"的元素，
- `position: fixed`
- 在 [`will-change`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/will-change) 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值（参考 [这篇文章](http://dev.opera.com/articles/css-will-change-property/)）
- [`-webkit-overflow-scrolling`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/-webkit-overflow-scrolling) 属性被设置 "touch"的元素

在层叠上下文中，其子元素同样也按照上面解释的规则进行层叠。 特别值得一提的是，其子元素的 z-index 值只在父级层叠上下文中有意义。子级层叠上下文被自动视为父级层叠上下文的一个独立单元。

总结:

- 给一个 HTML 元素定位和 z-index 赋值创建一个层叠上下文，（opacity 值不为 1 的也是相同）。
- 层叠上下文可以包含在其他层叠上下文中，并且一起创建一个有层级的层叠上下文。
- 每个层叠上下文完全独立于它的兄弟元素：当处理层叠时只考虑子元素。
- 每个层叠上下文是自包含的：当元素的内容发生层叠后，整个该元素将会 在父层叠上下文中 按顺序进行层叠。

<p align="center"><img width="450"src="https://user-images.githubusercontent.com/12554487/28297790-549190f6-6ba2-11e7-8e0f-2a7639066f22.png"></p>

不是只有`z-index`才会产生stack context, 只不过z-index是比较常见的会产生stack context的方法。

本文对一些CSS的一些基础但十分重要，可能并不是经常接触的概念，进行一个梳理，不妥地方欢迎指教。

**小测试**

下面哪个属性不会让 div 脱离文档流（normal flow）？ 
A. position: absolute;
B. position: fixed;
C. position: relative;
D. float: left;
链接：https://www.nowcoder.com/questionTerminal/49871ba5931345d390b64678c2eba91b
来源：牛客网

**Reference**
1. [CSS basic box model - W3C Working Draft 9 August 2007](https://www.w3.org/TR/css3-box/)
2. [The stacking context MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context)
1. [详说 Block Formatting Contexts (块级格式化上下文)](http://kayosite.com/block-formatting-contexts-in-detail.html)
1. [CSS Positioned Layout Module Level 3](https://www.w3.org/TR/css-position-3/)