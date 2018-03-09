> https://github.com/muwenzi/Program-Blog/issues/24
``` javascript
var html = '';

for (var i = 0; i < data.len; i++) {
    html += '<div>' + data[i] + '</div>';
}

$('#content').html(html);
```
