> https://github.com/muwenzi/Program-Blog/issues/19

手动挖坑TODO
## Math.round()

四舍五入（临界点向右即大数入）

``` javascript
// 返回-20
x = Math.round(-20.5)

// 返回-21
x = Math.round(-20.51)

// 返回21
x = Math.round(20.5)    

// 返回20
x = Math.round(20.49)   
```

> -.5向右靠，其他正常理解
## Math.trunc()

除去小数部分`ES6新增`

``` javascript
// 返回-20
x = Math.trunc(-20.5)

// 返回-20
x = Math.trunc(-20.51)
```

**参考**
- [Math对象（阮一峰）](http://javascript.ruanyifeng.com/stdlib/math.html)
- [Math.round()四舍五入疑惑](https://cnodejs.org/topic/57c7f8006f7069ce262d04cd)
