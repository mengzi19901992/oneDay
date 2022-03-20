## 1、什么是防抖和节流？有什么区别？如何实现？
防抖:触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间
n秒内高频触发，只执行最后一次
* 每次触发事件时都取消之前的延时调用方法
```javascript
function debounce(fn,time,immediate){
    let timeout = null;// 创建一个标记用来存放定时器的返回值
    return function(){
        let context = this;
        //immediate 首次立即执行
        if(immediate&&!timeout){
            fn.apply(context,arguments);
        }
        clearTimeout(timeout);// 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(()=>{// 然后又创建一个新的 setTimeout
            fn.apply(context,arguments);
        },time)
    }
}
```
节流:高频事件触发，但在每n秒内会执行一次，所以节流会稀释函数的执行频率
* 每次触发事件时都判断当前是否有等待执行的延时函数
```javascript
function throttle(fn,time){
    let canRun = true; // 通过闭包保存一个标记
    return function(){
        let context = this;
        if(!canRun) return;// 在函数开头判断标记是否为true，不为true则return
        canRun = false;// 立即设置为false
        setTimeout(()=>{
            fn.apply(context,arguments);
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
CommonJS 模块是 Node.js 专用的，与 ES6 模块不兼容。
语法上面，两者最明显的差异是，CommonJS 模块使用require()和module.exports，ES6 模块使用import和export
commonJS用同步的方式加载模块 var math = require('./math');

AMD规范采用异步方式加载模块，模块的加载不影响它后面语句的运行。
首先我们需要引入require.js文件

ES module import命令是编译阶段执行的，在代码运行之前。import命令会被 JavaScript 引擎静态分析，先于模块内的其他语句执行。
import MyModual from './myModual';
ES2020提案 引入import()函数，支持动态加载模块，import()返回一个 Promise 对象
```javascript
import(`./a.js`)
  .then(module => {
    
  })
  .catch(err => {
    
  });
```

什么是模块?
* 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
* 块的内部数据/实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信
一个模块的组成
* 数据--->内部的变量
* 操作数据的行为--->内部的函数
模块化
* 编码时是按照模块一个一个编码的, 整个项目就是一个模块化的项目

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

## 6、为什么虚拟dom会提高性能?
虚拟dom相当于在js和真实dom中间加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能。
具体实现步骤如下：
用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中
当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
把2所记录的差异应用到步骤1所构建的真正的DOM树上，视图就更新了。

## 7、变量的赋值可以分为三个阶段
创建变量，在内存中开辟空间
初始化变量，将变量初始化为undefined
真正赋值

* 关于let、var和function：
let的「创建」过程被提升了，但是初始化没有提升。
var的「创建」和「初始化」都被提升了。
function的「创建」「初始化」和「赋值」都被提升了。

## 8、下面代码中什么时候会输出1？
```javascript
var a = ?;
if(a == 1 && a == 2 && a == 3){
     conso.log(1);
}
```
因为==会进行隐式类型转换 所以我们重写toString方法就可以了
```javascript
var a = {
  i: 1,
  toString() {
    return a.i++;
  }
}
```

## 9、下面代码输出的结果是什么？
```javascript
var a = {n: 2};
var b = a;
a.x = a = {n: 2};

console.log(a.x)     
console.log(b.x)
//undefined {n:2}
```
首先，a和b同时引用了{n:2}对象，接着执行到a.x = a = {n：2}语句，尽管赋值是从右到左的没错，但是.的优先级比=要高，所以这里首先执行a.x，相当于为a（或者b）所指向的{n:2}对象新增了一个属性x，即此时对象将变为{n:2;x:undefined}。之后按正常情况，从右到左进行赋值，此时执行a ={n:2}的时候，a的引用改变，指向了新对象{n：2},而b依然指向的是旧对象。之后执行a.x = {n：2}的时候，并不会重新解析一遍a，而是沿用最初解析a.x时候的a，也即旧对象，故此时旧对象的x的值为{n：2}，旧对象为 {n:2;x:{n：2}}，它被b引用着。后面输出a.x的时候，又要解析a了，此时的a是指向新对象的a，而这个新对象是没有x属性的，故访问时输出undefined；而访问b.x的时候，将输出旧对象的x的值，即{n:2}。

## 10、下面代码的输出是什么?
```javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log("You are an adult!");
  } else if (data == { age: 18 }) {
    console.log("You are still an adult.");
  } else {
    console.log(`Hmm.. You don't have an age I guess`);
  }
}

checkAge({ age: 18 });//Hmm.. You don't have an age I guess
```
在比较相等性，原始类型通过它们的值进行比较，而对象通过它们的引用进行比较。JavaScript检查对象是否具有对内存中相同位置的引用。
我们作为参数传递的对象和我们用于检查相等性的对象在内存中位于不同位置，所以它们的引用是不同的。

## 11、下面代码的输出是什么?
```javascript
onst obj = { 1: "a", 2: "b", 3: "c" };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty("1");//true
obj.hasOwnProperty(1);//true
set.has("1");//false
set.has(1);//true
```
所有对象键（不包括Symbols）都会被存储为字符串，即使你没有给定字符串类型的键。这就是为什么obj.hasOwnProperty（'1'）也返回true。
上面的说法不适用于Set。在我们的Set中没有“1”：set.has（'1'）返回false。它有数字类型1，set.has（1）返回true。

## 12、下面代码的输出是什么?
这题考察的是对象的键名的转换。
对象的键名只能是字符串和 Symbol 类型。
其他类型的键名会被转换成字符串类型。
对象转字符串默认会调用 toString 方法。
```javascript
// example 1
var a={}, b='123', c=123;
a[b]='b';
// c 的键名会被转换成字符串'123'，这里会把 b 覆盖掉。
a[c]='c';  
// 输出 c
console.log(a[b]);

// example 2
var a={}, b=Symbol('123'), c=Symbol('123');  
// b 是 Symbol 类型，不需要转换。
a[b]='b';
// c 是 Symbol 类型，不需要转换。任何一个 Symbol 类型的值都是不相等的，所以不会覆盖掉 b。
a[c]='c';
// 输出 b
console.log(a[b]);

// example 3
var a={}, b={key:'123'}, c={key:'456'};  
// b 不是字符串也不是 Symbol 类型，需要转换成字符串。
// 对象类型会调用 toString 方法转换成字符串 [object Object]。
a[b]='b';
// c 不是字符串也不是 Symbol 类型，需要转换成字符串。
// 对象类型会调用 toString 方法转换成字符串 [object Object]。这里会把 b 覆盖掉。
a[c]='c';  
// 输出 c
console.log(a[b]);
```

## 13、ES Module和CommonJS的区别
1.使用区别
```javascript
// 1-1：ES Module
export let yyy = value2
export default {xxx, yyy}
import {xxx, yyy} from '模块名/模块相对路径'
// 1-2：CommonJS
exports.xxx = value
module.exports = value
var module = require('模块名/模块相对路径')
```
2.esm属于编译时加载，即静态加载。在编译阶段就能确定模块之间的依赖关系，以及输入和输出的变量。
com属于运行时加载，只有在代码运行时，才能确定这些东西。esm的好处可以做到 tree shaking。
3.esm可以加载模块的部分内容，com是加载模块的整个对象，再取到具体内容。但esm如果使用export default也是加载模块的整个对象的
4.esm输出的是值的引用，com输出的是值的拷贝。
5.esm属于编译时加载，无法做到运行时加载。有一个方案，使用import**函数**，完成运行时加载，也就是动态加载。
import函数和require都是运行时加载，区别在于import是异步加载【返回一个promise】，require是同步加载。

## 14、http 协议
HTTP/1.0：最早的http只是使用在一些较为简单的网页上和网络请求上，所以比较简单，每次请求都打开一个新的TCP链接，收到响应之后立即断开连接。
HTTP/1.1：
HTTP/1.1 引入了更多的缓存控制策略，如Entity tag，If-Unmodified-Since, If-Match, If-None-Match等
HTTP/1.1 允许范围请求，即在请求头中加入Range头部
HTTP/1.1 的请求消息和响应消息都必须包含Host头部，以区分同一个物理主机中的不同虚拟主机的域名
HTTP/1.1 默认开启持久连接，在一个TCP连接上可以传送多个HTTP请求和响应，减少了建立和关闭连接的消耗和延迟。
HTTP/2.0：
在 HTTP/2 中，有两个非常重要的概念，分别是帧（frame）和流（stream），理解这两个概念是理解下面多路复用的前提。 帧代表数据传输的最小的单位，每个帧都有序列标识表明该帧属于哪个流，流也就是多个帧组成的数据流，每个流表示一个请求。
区别：HTTP/2.0的协议解析采用二进制格式、多路复用、头部压缩、服务端推送
HTTP/3.0：
Google 基于 UDP 协议推出了一个的 QUIC 协议，并且使用在了 HTTP/3 上。
优点：避免包阻塞、快速重启会话

正向代理：客户为了从源服务器中取得内容，由客户端向代理服务器发出请求，并指定目标访问服务器，然后，代理服务器向源服务器转交需求，并将获得的内容返回给客户端。需要注意的是，在正向代理过程中隐藏了真实请求的客户端，即服务端不知道真实请求客户是谁。（科学上网）

反向代理：客户端向反向代理发出请求，反向代理服务器收到请求后判断请求走向何处，然后再将结果反馈给客户端。同样需要注意的是，在反向代理过程中，隐藏了内部服务器的信息，用户不需要知道是具体哪一台服务器提供的服务，只要知道反向代理服务器是谁就好了，我们甚至可以把反向代理服务器当做真正服务器看待。这种形式的代理通常被用作实现负载均衡，比如Nginx就是一种出色的反向代理服务器。

HTTPS和HTTP的区别主要如下：
* HTTPS协议需要到CA（证书颁发机构）申请证书。
* HTTP协议运行在TCP之上，所有传输的内容都是明文，HTTPS运行在SSL/TLS之上，SSL/TLS运行在TCP之上，所有传输的内容都经过加密的。
* HTTP和HTTPS使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
* http的连接很简单，是无状态的；HTTPS协议是由HTTP+SSL协议构建的可进行加密传输、身份认证的网络协议，可以有效的防止运营商劫持，解决了防劫持的一个大问题，比http协议安全。

## 15、WEB安全防范
XSS 攻击
XSS 攻击全称跨站脚本攻击，是利用html可以执行<script>alert(1)</script>的特性，想尽办法将脚本注入页面中的攻击手段。
XSS攻击有两种，一种是通过修改浏览器URL导致脚本被注入到页面，另一种是通过输入框将脚本代码注入数据库
前面一种会被chrome浏览器自动防御攻击（但最好还是手动也防御一下），后面一种则需要我们手动防御，推荐使用'xss'库的白名单过滤防御方法：
```javascript
const xss = require('xss')
let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
// -> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
```
CSRF 攻击
CSRF中文名为跨站请求伪造
假如掘金有个加关注的GET接口，id参数是关注人Id,那我只需要在我的一个页面里面写一个img标签,那么只要有已经登录掘金的用户打开我这个页面，就会自动关注我。就算是改为POST请求，也可以通过在页面使用form表单提交的方式自动关注。
CSRF攻击是源于Web的隐式身份验证机制！Web的身份验证机制虽然可以保证一个请求是来自于某个用户的浏览器，但却无法保证该请求是用户批准发送的。
防范 CSRF 攻击：
Get 请求不用于对数据进行修改
Cookie设置HTTP Only
接口设置禁止跨域
请求时附带验证信息，比如验证码或者 Token

## 16、什么是 DOM 和 BOM？
DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。

BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的方法和接口。BOM
的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）
对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 locati
on 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对
象的子对象。


## 17、简单介绍一下 V8 引擎的垃圾回收机制
v8 的垃圾回收机制基于分代回收机制，v8 引擎将内存分为了新生代和老生代。
新创建的对象或者只经历过一次的垃圾回收的对象被称为新生代。经历过多次垃圾回收的对象被称为老生代。

新生代被分为 From 和 To 两个空间，To 一般是闲置的。当 From 空间满了的时候会执行 Scavenge（清除） 算法进行垃圾回收。
这个算法分为三步：
（1）首先检查 From 空间的存活对象，如果对象存活则判断对象是否满足晋升到老生代的条件，如果满足条件则晋升到老生代。如果不满足条件则移动 To 空间。
（2）如果对象不存活，则释放对象的空间。
（3）最后将 From 空间和 To 空间角色进行交换。
老生代采用了标记清除法和标记压缩法。标记清除法首先会对内存中存活的对象进行标记，标记结束后清除掉那些没有标记的对象。由于标记清除后会造成很多的内存碎片，不便于后面的内存分配。所以了解决内存碎片的问题引入了标记压缩法。

标记清除：垃圾回收程序运行的时候，会标记内存中存储的所有变量。然后，它会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉。随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回它们的内存。

由于在进行垃圾回收的时候会暂停应用的逻辑，对于新生代方法由于内存小，每次停顿的时间不会太长，但对于老生代来说每次垃圾回收的时间长，停顿会造成很大的影响。 为了解决这个问题 V8 引入了增量标记的方法，将一次停顿进行的过程分为了多步，每次执行完一小步就让运行逻辑执行一会，就这样交替运行。

## 18、如何判断当前脚本运行在浏览器还是 node 环境中？
this === window ? 'browser' : 'node';
通过判断 Global 对象是否为 window，如果不为 window，当前脚本没有运行在浏览器中。


## 19、Unicode 和 UTF-8 之间的关系？
Unicode 是一种字符集合，现在可容纳 100 多万个字符。每个字符对应一个不同的 Unicode 编码，它只规定了符号的二进制代码，却没有规定这个二进制代码在计算机中如何编码传输。

UTF-8 是一种对 Unicode 的编码方式，它是一种变长的编码方式，可以用 1~4 个字节来表示一个字符。


## 20、原码、反码和补码的介绍
原码是计算机中对数字的二进制的定点表示方法，最高位表示符号位，其余位表示数值位。优点是易于分辨，缺点是不能够直接参与运算。

正数的反码和其原码一样；负数的反码，符号位为1，数值部分按原码取反。
如 [+7]原 = 00000111，[+7]反 = 00000111； [-7]原 = 10000111，[-7]反 = 11111000。

正数的补码和其原码一样；负数的补码为其反码加1。

例如 [+7]原 = 00000111，[+7]反 = 00000111，[+7]补 = 00000111；
[-7]原 = 10000111，[-7]反 = 11111000，[-7]补 = 11111001

之所以在计算机中使用补码来表示负数的原因是，这样可以将加法运算扩展到所有的数值计算上，因此在数字电路中我们只需要考虑加法器的设计就行了，而不用再为减法设置新的数字电路。


