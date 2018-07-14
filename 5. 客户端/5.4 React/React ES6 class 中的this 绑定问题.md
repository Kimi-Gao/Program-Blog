## 问题背景

最近用ES6装逼写React Class的时候遇到绑定的函数this undefined问题，先上一段代码：

``` javascript
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }
    render() {
        return (
            <div className="create-box">
                <input
                    type="text"
                    placeholder="press enter to save"
                    onKeyDown={this._onKeyDown}
                    onChange={this._onChange}
                    value={this.state.value}/>
            </div>
        );
    }
    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this.save();
        } 
    }
    _onChange(event) {
        this.state.value = event.target.value;
        this.setState({value: event.target.value});
    }
    save() {
        if (!this.state.value) 
            return;
        this.props.add(this.state.value);
        this.setState({value: ''});
    }
}
```

执行`_onChange`的时候`this`是`undefined`，后来查阅相关资料发现事件函数需要手动去绑定`this`。而ES5的写法就不需要考虑这个问题，this会自动绑定：

``` javascript
// Autobinding, brought to you by React.createClass
var PostInfo = React.createClass({
  handleOptionsButtonClick: function(e) {
    // Here, 'this' refers to the component instance.
    this.setState({showOptionsModal: true});
  },
});
```
## 解决方法一

``` javascript
onKeyDown={this._onKeyDown.bind(this)}
onChange={this._onChange.bind(this)}
```

在每个函数后面手动去`bind(this)`
另外，如果没有在DOM上直接绑定的话，需要在构造函数中绑定：

``` javascript
// Manually bind, wherever you need to
class PostInfo extends React.Component {
  constructor(props) {
    super(props);
    // Manually bind this method to the component instance...
    this.handleOptionsButtonClick = this.handleOptionsButtonClick.bind(this);
  }
  handleOptionsButtonClick(e) {
    // ...to ensure that 'this' refers to the component instance here.
    this.setState({showOptionsModal: true});
  }
}
```
## 解决方法二

Combining two ES6+ features – arrow functions and property initializers

``` javascript
_onKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE) {
         this.save();
    } 
}
_onChange = (event)  => {
     this.state.value = event.target.value;
     this.setState({value: event.target.value});
}
```

这是babel官方推荐的写法，认为它很**breeze**，我个人认为使得class不是那么美观，有点强迫症。
## 解决方法三

引入第三方库，使用decorator ES2017特性

``` shell
npm install babel-plugin-transform-decorators-legacy
npm install autobind-decorator
```

还需要配置`.babelrc`和`webpack.config.js`使其支持decorator ES2017特性

``` json
{
    "plugins": ["transform-decorators-legacy"]
}
```

```
{
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
        presets: ['es2015', 'react'],
        plugins: ["transform-decorators-legacy"]
    }
}
```

然后才可以使用

``` javascript
import autobind from 'autobind-decorator';

@autobind
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }
    render() {
        return (
            <div className="create-box">
                <input
                    type="text"
                    placeholder="press enter to save"
                    onKeyDown={this._onKeyDown}
                    onChange={this._onChange}
                    value={this.state.value}/>
            </div>
        );
    }
    _onKeyDown(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this.save();
        } 
    }
    _onChange(event) {
        this.state.value = event.target.value;
        this.setState({value: event.target.value});
    }
    save() {
        if (!this.state.value) 
            return;
        this.props.add(this.state.value);
        this.setState({value: ''});
    }
}
```

这种方法相对比较复杂，当项目中使用到decorator的特性的时候倒是可以使用的，`autobind-decorator`这个库本身代码也是很短，大约100行这样。

**参考资料**
- [Why this.setState is undefined in React ES6 class?](https://github.com/goatslacker/alt/issues/283)
- [React on ES6+](http://babeljs.io/blog/2015/06/07/react-on-es6-plus)
- [babel-plugin-transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)
- [autobind decorator](https://github.com/andreypopp/autobind-decorator)
- [babel 编译后 this 变成了 undefined](https://my.oschina.net/tearlight/blog/688449)

**更多阅读**
- [从 React 绑定 this，看 JS 语言发展和框架设计](https://zhuanlan.zhihu.com/p/27713910)