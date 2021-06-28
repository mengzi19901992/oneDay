## 1、什么是防抖和节流？有什么区别？如何实现？
防抖:触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
* 每次触发事件时都取消之前的延时调用方法
```javascript
function debounce(fn,time){
    let timeout = null;// 创建一个标记用来存放定时器的返回值
    return function(){
        clearTimeout(timeout);// 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(()=>{// 然后又创建一个新的 setTimeout
            fn.apply(this,arguments);
        },time)
    }
}
```
节流:高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率
* 每次触发事件时都判断当前是否有等待执行的延时函数
```javascript
function throttle(fn,time){
    let canRun = true; // 通过闭包保存一个标记
    return function(){
        if(!canRun) return;// 在函数开头判断标记是否为true，不为true则return
        canRun = false;// 立即设置为false
        setTimeout(()=>{
            fn.apply(this,arguments);
            canRun = true;// 最后在setTimeout执行完毕后再把标记设置为true
        },time)
    }
}
```

## 2、get请求传参长度的误区、get和post请求在缓存方面的区别
实际上HTTP 协议从未规定 GET/POST 的请求长度限制是多少。对get请求参数的限制是来源与浏览器或web服务器，浏览器或web服务器限制了url的长度。

* 为了明确这个概念，我们必须再次强调下面几点:
HTTP 协议 未规定 GET 和POST的长度限制
GET的最大长度显示是因为 浏览器和 web服务器限制了 URI的长度
不同的浏览器和WEB服务器，限制的最大长度不一样
要支持IE，则最大长度为2083byte，若只支持Chrome，则最大长度 8182byte
* 补充补充一个get和post在缓存方面的区别：
get请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存。
post不同，post做的一般是修改和删除的工作，所以必须与数据库交互，所以不能使用缓存。因此get请求适合于请求缓存。

## 3、模块化发展历程
可从IIFE、AMD、CMD、CommonJS、UMD、webpack(require.ensure)、ES Module、<script type="module"> 这几个角度考虑。
模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。
* IIFE：使用自执行函数来编写模块化，特点：在一个单独的函数作用域中执行代码，避免变量冲突。
```javascript
(function(){
  return {
    data:[]
  }
})()
```
* AMD：使用requireJS 来编写模块化，特点：依赖必须提前声明好。
```javascript
define('./index.js',function(code){
    // code 就是index.js 返回的内容
})
```
* CMD：使用seaJS 来编写模块化，特点：支持动态引入依赖文件。
```javascript
define(function(require, exports, module) {  
  var indexCode = require('./index.js');
})
```
* CommonJS：nodejs 中自带的模块化。
```javascript
var fs = require('fs');
```
* UMD：兼容AMD，CommonJS 模块化语法。
* webpack(require.ensure)：webpack 2.x 版本中的代码分割。
* ES Modules：ES6 引入的模块化，支持import 来引入另一个 js 。
```javascript
import a from 'a';
```

## 4、['1','2','3'].map(parseInt) 输出什么,为什么？
输出：[1, NaN, NaN]
首先让我们回顾一下，map函数的第一个参数callback：
var new_array = arr.map(function callback(currentValue[, index[, array]]) { // Return element for new_array }[, thisArg])这个callback一共可以接收三个参数，其中第一个参数代表当前被处理的元素，而第二个参数代表该元素的索引。

而parseInt则是用来解析字符串的，使字符串成为指定基数的整数。parseInt(string, radix)接收两个参数，第一个表示被处理的值（字符串），第二个表示为解析时的基数。
了解这两个函数后，我们可以模拟一下运行情况
* parseInt('1', 0) //radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1
* parseInt('2', 1) //基数为1（1进制）表示的数中，最大值小于2，所以无法解析，返回NaN
* parseInt('3', 2) //基数为2（2进制）表示的数中，最大值小于3，所以无法解析，返回NaN
map函数返回的是一个数组，所以最后结果为[1, NaN, NaN]

## 5、http和https的区别？
http传输的数据都是未加密的，也就是明文的，网景公司设置了SSL协议来对http协议传输的数据进行加密处理，简单来说https协议是由http和ssl协议构建的可进行加密传输和身份认证的网络协议，比http协议的安全性更高。主要的区别如下：

* Https协议需要ca证书，费用较高。
* http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
* 使用不同的链接方式，端口也不同，一般而言，http协议的端口为80，https的端口为443
* http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。





