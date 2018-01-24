## The Six JavaScript Error Types

The JavaScript 1.5 specification defines six primary error types, as follows:

**EvalError**: Raised when the eval() functions is used in an incorrect manner.

**RangeError**: Raised when a numeric variable exceeds its allowed range.

**ReferenceError**: Raised when an invalid reference is used.

**SyntaxError**: Raised when a syntax error occurs while parsing JavaScript code.

**TypeError**: Raised when the type of a variable is not as expected.

**strong text URIError**: Raised when the encodeURI() or decodeURI() functions are used in an incorrect manner.
## Example

Consider the following code:

``` javascript
function foo(){
 var d=1234;
 console.log(d.substring(1,2));     
}
foo();
```

This will have following output:

```
Exception: TypeError: d.substring is not a function This is because we have used the 
wrong type (number) for a given operation(substring which expects a string).
The TypeError object represents an error when a value is not of the expected type.
```

``` javascript
function foo(){
 var d=1234;
 console.log(c);
}
foo();
```

This will have following output:

```
Exception: ReferenceError: c is not defined This is because the reference for the 
variable 'c' does not exist in either local or global scope and we are still trying to
use it. A ReferenceError exception is thrown when a non-existent variable is accessed.
```

A `ReferenceError` occurs when you try to use a variable that doesn't exist at all.

A `TypeError occurs` when the variable exists, but the operation you're trying to perform is not appropriate for the type of value it contains. In the case where the detailed message says "is not defined", this can occur if you have a variable whose value is the special undefined value, and you try to access a property of it.

**参考资料**
- [Difference TypeError and ReferenceError](http://stackoverflow.com/questions/12589391/difference-typeerror-and-referenceerror)
- [如何修复那些奇怪的 JavaScript 错误](http://bubkoo.com/2015/01/25/Strange-JavaScript-Errors-and-How-to-Fix-Them/)
- [ECMASCRIPT中的REFERENCEERROR和TYPEERROR](http://hao.jser.com/archive/27/)
