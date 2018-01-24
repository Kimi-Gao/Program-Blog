> https://github.com/muwenzi/Program-Blog/issues/14

每次写代码一碰到判断假值，内心都是抓狂的！

![image](https://cloud.githubusercontent.com/assets/12554487/18162469/2d90f422-7069-11e6-91b1-f8ed13653f14.png)

在此好好总结一下
## 判断真假的场景
- if分支语句
- while循环语句
- for里的第二个语句
## JS中有 6 个值为“假”
1. **false**
2. **null**
3. **undefined**
4. **0**
5. **'' (空字符串)**
6. **NaN**

这里面 false 本身是布尔类型，其它 5 个则不是。

除了这 6 个外，其它均为“真” ，包括对象、数组、正则、函数等。注意 '0'、'null'、'false'、{}、[]也都是真值  。
## 假值之间的比较

虽然这六个值都为“假”，它们之间并非都相等

``` javascript
false == null      // false
false == undefined // false
false == 0         // true
false == ''        // true
false == NaN       // false

null == undefined  // true
null == 0          // false
null == '' )       // false
null == NaN        // false

undefined == 0     // false
undefined == ''    // false
undefined == NaN   // false

0 == ''            // true
0 == NaN           // false
```

对于“==”，以上得出下列结论
- false 除了和自身比较为 true 外，和 0，"" 比较也为 true
- null 只和 undefined 比较时为 true， 反过来 undefined 也仅和 null 比较为 true，没有第二个
- 0 除了和 false 比较为 true，还有空字符串 ''" 和空数组 []
- 空字符串 '' 除了和 false 比较为 true，还有一个数字 0

当然，对于这一切，查看下规范是最踏实的，ES里的ToBoolean阐述了所有情形
![image](https://cloud.githubusercontent.com/assets/12554487/18162049/13acec98-7067-11e6-93f5-8bcd4a2b414c.png)
