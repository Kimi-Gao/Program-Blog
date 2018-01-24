> https://github.com/muwenzi/Program-Blog/issues/25

## 介绍

JSON格式（JavaScript Object Notation的缩写）是一种用于`数据交换`的文本格式，2001年由[Douglas Crockford](https://github.com/douglascrockford/JSON-js)提出，目的是取代繁琐笨重的XML格式。
相比XML格式，JSON格式有两个显著的优点：
- 书写简单，一目了然；
- 符合JavaScript原生语法，可以由解释引擎直接处理，不用另外添加解析代码。

所以，JSON迅速被接受，已经成为各大网站交换数据的标准格式，并被写入`ES5`，成为标准的一部分。
JSON文档只能包含一个值。

**JSON对值的类型和格式**

> 1.复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
> 
> 2.简单类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
> 
> 3.字符串必须使用双引号表示，不能使用单引号。
> 
> 4.对象的键名必须放在双引号里面。
> 
> 5.数组或对象最后一个成员的后面，不能加逗号。

以下是合格的JSON值。

``` json
["one", "two", "three"]

{ "one": 1, "two": 2, "three": 3 }

{"names": ["张三", "李四"] }

[ { "name": "张三"}, {"name": "李四"} ]
```

以下是不合格的JSON值。

``` json
{ name: "张三", 'age': 32 }  // 属性名必须使用双引号

[32, 64, 128, 0xFFF] // 不能使用十六进制值

{ "name": "张三", "age": undefined } // 不能使用undefined

{ "name": "张三",
  "birthday": new Date('Fri, 26 Aug 2011 07:13:10 GMT'),
  "getName": function() {
      return this.name;
  }
} // 不能使用函数和日期对象
```

需要注意的是，空数组和空对象都是合格的JSON值，null本身也是一个合格的JSON值。

ES5新增了JSON对象，用来处理JSON格式数据。它有两个方法：`JSON.stringify()`和`JSON.parse()`。
## JSON.stringify()

JSON.stringify方法用于将一个值转为字符串。

```javascript
JSON.stringify('abc') // ""abc""
JSON.stringify(1) // "1"
JSON.stringify(false) // "false"
JSON.stringify([]) // "[]"
JSON.stringify({}) // "{}"

JSON.stringify([1, "false", false])
// '[1,"false",false]'

JSON.stringify({ name: "张三" })
// '{"name":"张三"}'
```

上面代码将各种类型的值，转成JSON字符串。需要注意的是，对于原始类型的字符串，转换结果会带双引号，即字符串abc会被转成`"abc"`，这是因为将来还原的时候，双引号可以让JavaScript引擎知道，abc是一个字符串，而不是一个变量名。

如果原始对象中，有一个成员的值是undefined、函数或XML对象，这个成员会被省略。如果数组的成员是undefined、函数或XML对象，则这些值被转成`null`。

```javascript
JSON.stringify({
  f: function(){},
  a: [ function(){}, undefined ]
});
// "{"a": [null,null]}"
```

上面代码中，原始对象的f属性是一个函数，JSON.stringify方法返回的字符串会将这个属性省略。而a属性是一个数组，成员分别为函数和undefined，它们都被转成了null。

正则对象会被转成空对象。
```javascript
JSON.stringify(/foo/) // "{}"
```
JSON.stringify方法会忽略对象的不可遍历属性。

```javascript
var obj = {};
Object.defineProperties(obj, {
  'foo': {
    value: 1,
    enumerable: true
  },
  'bar': {
    value: 2,
    enumerable: false
  }
});

JSON.stringify(obj); // {"foo":1}
```

上面代码中，bar是obj对象的不可遍历属性，JSON.stringify方法会忽略这个属性。

**第二个参数**
JSON.stringify方法还可以接受一个数组，作为第二个参数，指定需要转成字符串的属性。

```javascript
var obj = {
  'prop1': 'value1',
  'prop2': 'value2',
  'prop3': 'value3'
};

var selectedProperties = ['prop1', 'prop2'];

JSON.stringify(obj, selectedProperties)
// "{"prop1":"value1","prop2":"value2"}"
```

上面代码中，JSON.stringify方法的第二个参数指定，只转`prop1`和`prop2`两个属性。

这个类似“白名单”的数组，只对对象的属性有效，对数组无效。

```javascript
JSON.stringify(['a', 'b'], ['0'])
// "["a","b"]"

JSON.stringify({0: 'a', 1: 'b'}, ['0'])
// "{"0":"a"}"
```

上面代码中，第二个参数指定JSON格式只转0号属性，实际上对数组是无效的，只对对象有效。

第二个参数还可以是一个函数，用来更改JSON.stringify的默认行为。

```javascript
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{"a": 2,"b": 4}'
```

上面代码中的f函数，接受两个参数，分别是被转换的对象的键名和键值。如果键值是数值，就将它乘以2，否则就原样返回。

注意，这个处理函数是递归处理所有的键。

```javascript
var o = {a: {b: 1}};

function f(key, value) {
  console.log("["+ key +"]:" + value);
  return value;
}

JSON.stringify(o, f)
// []:[object Object]
// [a]:[object Object]
// [b]:1
// '{"a":{"b":1}}'

```

上面代码中，对象o一共会被f函数处理三次。第一次键名为空，键值是整个对象o；第二次键名为a，键值是{b: 1}；第三次键名为b，键值为1。

递归处理中，每一次处理的对象，都是前一次返回的值。

```javascript
var o = {a: 1};

function f(key, value) {
  if (typeof value === 'object') {
    return {b: 2};
  }
  return value * 2;
}

JSON.stringify(o,f)
// "{"b": 4}"
```
上面代码中，f函数修改了对象o，接着JSON.stringify方法就递归处理修改后的对象o。

如果处理函数返回undefined或没有返回值，则该属性会被忽略。

```javascript
function f(key, value) {
  if (typeof(value) === "string") {
    return undefined;
  }
  return value;
}

JSON.stringify({ a: "abc", b: 123 }, f)
// '{"b": 123}'
```
上面代码中，a属性经过处理后，返回undefined，于是该属性被忽略了。

**toJSON 方法**

如果JSON.stringify的参数对象有自定义的toJSON方法，那么JSON.stringify会使用这个方法的返回值作为参数，而忽略原对象的其他属性。
```javascript
var user = {
  firstName: '三',
  lastName: '张',

  get fullName(){
    return this.lastName + this.firstName;
  }
};

JSON.stringify(user)
// "{"firstName":"三","lastName":"张","fullName":"三张"}"
```

上面代码是JSON.stringify方法处理一个正常的对象。

现在，为这个对象加上toJSON方法。

```javascript
var user = {
  firstName: '三',
  lastName: '张',

  get fullName(){
    return this.lastName + this.firstName;
  },

  toJSON: function () {
    var data = {
      firstName: this.firstName,
      lastName: this.lastName
    };
    return data;
  }
};

JSON.stringify(user)
// "{"firstName":"三","lastName":"张"}"
```

上面代码中，JSON.stringify发现参数对象有toJSON方法，就直接使用这个方法的返回值作为参数，而忽略原对象的其他参数。

Date对象就有一个自己的toJSON方法。

```javascript
var date = new Date('2015-01-01');
date.toJSON() // "2015-01-01T00:00:00.000Z"
JSON.stringify(date) // ""2015-01-01T00:00:00.000Z""
```
上面代码中，JSON.stringify一旦发现处理的是data对象实例，就会自动调用这个实例对象的toJSON方法，将该方法的返回值作为参数。

toJSON方法的一个应用是，将正则对象自动转为字符串。因为JSON.stringify默认不能转换正则对象，但是设置了toJSON方法以后，就可以转换正则对象了。

```javascript
var obj = {
  reg: /foo/
};

// 不设置 toJSON 方法时
JSON.stringify(obj) // "{"reg":{}}"

// 设置 toJSON 方法时
RegExp.prototype.toJSON = RegExp.prototype.toString;
JSON.stringify(/foo/) // ""/foo/""
```
上面代码在正则对象的原型上面部署了toJSON方法，将其指向toString方法，因此遇到转换成JSON时，正则对象就先调用toJSON方法转为字符串，然后再被JSON.stingify方法处理。

## JSON.parse()

JSON.parse方法用于将JSON字符串转化成对象。

```javascript
var o = JSON.parse('{"name": "张三"}');
o.name // 张三
```

如果传入的字符串不是有效的JSON格式，JSON.parse方法将报错。

```javascript
JSON.parse("'String'") // illegal single quotes
// SyntaxError: Unexpected token ILLEGAL
```

上面代码中，双引号字符串中是一个单引号字符串，因为单引号字符串不符合JSON格式，所以报错。

为了处理解析错误，可以将JSON.parse方法放在try...catch代码块中。

JSON.parse方法可以接受一个处理函数，用法与JSON.stringify方法类似。

```javascript
function f(key, value) {
  if (key === ''){
    return value;
  }
  if (key === 'a') {
    return value + 10;
  }
}

var o = JSON.parse('{"a":1,"b":2}', f);
o.a // 11
o.b // undefined
```

**参考资料**
- [JSON对象 by 阮一峰](http://javascript.ruanyifeng.com/stdlib/json.html)