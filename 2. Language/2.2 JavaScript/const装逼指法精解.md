使用ES2015的let和const时候，一般会这样使用：
```javascript
// 定义常量
const REG_GET_INPUT = /^\d{1,3}$/;

// 定义配置项
let config = {
  isDev : false,
  pubDir: './admin/'
};

// 引入 gulp
let gulp    = require('gulp');

// 引入gulp相关插件
let concat  = require('gulp-concat');
let uglify  = require('gulp-uglify');
let cssnano = require('gulp-cssnano');
```
很多人看完概念之后，第一印象都是：“const 是表示不可变的值，而 let 则是用来替换原来的 var 的。”

所以就会出现上面代码中的样子；一段代码中出现大量的 let，只有部分常量用 const 去做定义，这样的使用方式是错误的。

### 你可能不知道的事

const 的定义是不可重新赋值的值，与不可变的值(immutable value)不同；const 定义的 Object，在定义之后仍可以修改其属性。

所以其实他的使用场景很广，包括常量、配置项以及引用的组件、定义的 “大部分” 中间变量等，都应该以const做定义。反之就 let 而言，他的使用场景应该是相对较少的，我们只会在 loop(for，while 循环)及少量必须重定义的变量上用到他。

>猜想：就执行效率而言，const 由于不可以重新赋值的特性，所以可以做更多语法静态分析方面的优化，从而有更高的执行效率。

所以上面代码中，所有使用 let 的部分，其实都应该是用 const 的。

**参考资料**
- [ES6 你可能不知道的事 - 基础篇](http://taobaofed.org/blog/2016/07/22/es6-basics/)