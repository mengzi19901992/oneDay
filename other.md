## 1、npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？
1. npm 模块安装机制：
发出npm install命令
查询node_modules目录之中是否已经存在指定模块
npm 向 registry 查询模块压缩包的网址
下载压缩包，存放在根目录下的.npm目录里
解压压缩包到当前项目的node_modules目录
若存在，不再重新安装
若不存在
2. npm 实现原理
输入 npm install 命令并敲下回车后，会经历如下几个阶段（以 npm 5.5.1 为例）：

执行工程自身 preinstall

当前 npm 工程如果定义了 preinstall 钩子此时会被执行。

确定首层依赖模块

首先需要做的是确定工程中的首层依赖，也就是 dependencies 和 devDependencies 属性中直接指定的模块（假设此时没有添加 npm install 参数）。

工程本身是整棵依赖树的根节点，每个首层依赖模块都是根节点下面的一棵子树，npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。
3. 获取模块

获取模块是一个递归的过程，分为以下几步：

获取模块信息。在下载一个模块之前，首先要确定其版本，这是因为 package.json 中往往是 semantic version（semver，语义化版本）。此时如果版本描述文件（npm-shrinkwrap.json 或 package-lock.json）中有该模块信息直接拿即可，如果没有则从仓库获取。如 packaeg.json 中某个包的版本是 ^1.1.0，npm 就会去仓库中获取符合 1.x.x 形式的最新版本。
获取模块实体。上一步会获取到模块的压缩包地址（resolved 字段），npm 会用此地址检查本地缓存，缓存中有就直接拿，如果没有则从仓库下载。
查找该模块依赖，如果有依赖则回到第1步，如果没有则停止。
4. 模块扁平化（dedupe）

上一步获取到的是一棵完整的依赖树，其中可能包含大量重复模块。比如 A 模块依赖于 loadsh，B 模块同样依赖于 lodash。在 npm3 以前会严格按照依赖树的结构进行安装，因此会造成模块冗余。

从 npm3 开始默认加入了一个 dedupe 的过程。它会遍历所有节点，逐个将模块放在根节点下面，也就是 node-modules 的第一层。当发现有重复模块时，则将其丢弃。

这里需要对重复模块进行一个定义，它指的是模块名相同且 semver 兼容。每个 semver 都对应一段版本允许范围，如果两个模块的版本允许范围存在交集，那么就可以得到一个兼容版本，而不必版本号完全一致，这可以使更多冗余模块在 dedupe 过程中被去掉。

比如 node-modules 下 foo 模块依赖 lodash@^1.0.0，bar 模块依赖 lodash@^1.1.0，则 ^1.1.0 为兼容版本。

而当 foo 依赖 lodash@^2.0.0，bar 依赖 lodash@^1.1.0，则依据 semver 的规则，二者不存在兼容版本。会将一个版本放在 node_modules 中，另一个仍保留在依赖树里。

举个例子，假设一个依赖树原本是这样：

node_modules -- foo ---- lodash@version1

-- bar ---- lodash@version2

假设 version1 和 version2 是兼容版本，则经过 dedupe 会成为下面的形式：

node_modules -- foo

-- bar

-- lodash（保留的版本为兼容版本）

假设 version1 和 version2 为非兼容版本，则后面的版本保留在依赖树中：

node_modules -- foo -- lodash@version1

-- bar ---- lodash@version2
5. 安装模块

这一步将会更新工程中的 node_modules，并执行模块中的生命周期函数（按照 preinstall、install、postinstall 的顺序）。
6. 执行工程自身生命周期

当前 npm 工程如果定义了钩子此时会被执行（按照 install、postinstall、prepublish、prepare 的顺序）。

最后一步是生成或更新版本描述文件，npm install 过程完成。

## 2、定时器的执行顺序或机制？
因为js是单线程的，浏览器遇到setTimeout或者setInterval会先执行完当前的代码块，在此之前会把定时器推入浏览器的待执行事件队列里面，等到浏览器执行完当前代码之后会看一下事件队列里面有没有任务，有的话才执行定时器的代码。所以即使把定时器的时间设置为0还是会先执行当前的一些代码。

## 3、Doctype作用? 严格模式与混杂模式如何区分？它们有何意义?
Doctype声明于文档最前面，告诉浏览器以何种方式来渲染页面，这里有两种模式，严格模式和混杂模式。
* 严格模式的排版和 JS 运作模式是 以该浏览器支持的最高标准运行。
* 混杂模式，向后兼容，模拟老式浏览器，防止浏览器无法兼容页面。

## 4、fetch发送2次请求的原因
fetch发送post请求的时候，总是发送2次，第一次状态码是204，第二次才成功？

原因很简单，因为你用fetch的post请求的时候，导致fetch 第一次发送了一个Options请求，询问服务器是否支持修改的请求头，如果服务器支持，则在第二次中发送真正的请求。

## 5、img iframe script 来发送跨域请求有什么优缺点？
* iframe
优点：跨域完毕之后DOM操作和互相之间的JavaScript调用都是没有问题的

缺点：1.若结果要以URL参数传递，这就意味着在结果数据量很大的时候需要分割传递，巨烦。2.还有一个是iframe本身带来的，母页面和iframe本身的交互本身就有安全性限制。

* script
优点：可以直接返回json格式的数据，方便处理

缺点：只接受GET请求方式

* 图片ping
优点：可以访问任何url，一般用来进行点击追踪，做页面分析常用的方法

缺点：不能访问响应文本，只能监听是否响应


## 6、什么是Bom？有哪些常用的Bom属性？
Bom是浏览器对象

* location对象
location.href-- 返回或设置当前文档的URL
location.search -- 返回URL中的查询字符串部分。例如 http://www.dreamdu.com/dreamd... 返回包括(?)后面的内容?id=5&name=dreamdu
location.hash -- 返回URL#后面的内容，如果没有#，返回空 location.host -- 返回URL中的域名部分，例如www.dreamdu.com
location.hostname -- 返回URL中的主域名部分，例如dreamdu.com
location.pathname -- 返回URL的域名后的部分。例如 http://www.dreamdu.com/xhtml/ 返回/xhtml/
location.port -- 返回URL中的端口部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回8080
location.protocol -- 返回URL中的协议部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回(//)前面的内容http:
location.assign -- 设置当前文档的URL
location.replace() -- 设置当前文档的URL，并且在history对象的地址列表中移除这个URL location.replace(url);
location.reload() -- 重载当前页面

* history对象
history.go() -- 前进或后退指定的页面数history.go(num);
history.back() -- 后退一页
history.forward() -- 前进一页

* Navigator对象
navigator.userAgent -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)
navigator.cookieEnabled -- 返回浏览器是否支持(启用)cookie

## 7、Cookie、sessionStorage、localStorage的区别
共同点：都是保存在浏览器端，并且是同源的

Cookie：cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下,存储的大小很小只有4K左右。（key：可以在浏览器和服务器端来回传递，存储容量小，只有大约4K左右）
sessionStorage：仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持，localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。（key：本身就是一个回话过程，关闭浏览器后消失，session为一个回话，当页面不同即使是同一页面打开两次，也被视为同一次回话）
localStorage：localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。（key：同源窗口都会共享，并且不会失效，不管窗口或者浏览器关闭与否都会始终生效）

## 8、浏览器和 Node 事件循环的区别？
其中一个主要的区别在于浏览器的event loop 和nodejs的event loop 在处理异步事件的顺序是不同的,nodejs中有micro event;其中Promise属于micro event 该异步事件的处理顺序就和浏览器不同.nodejs V11.0以上 这两者之间的顺序就相同了.

## 9、说几条web前端优化策略
(1). 减少HTTP请求数

这条策略基本上所有前端人都知道，而且也是最重要最有效的。都说要减少HTTP请求，那请求多了到底会怎么样呢？首先，每个请求都是有成本的，既包 含时间成本也包含资源成本。一个完整的请求都需要经过DNS寻址、与服务器建立连接、发送数据、等待服务器响应、接收数据这样一个“漫长”而复杂的过程。时间成本就是用户需要看到或者“感受”到这个资源是必须要等待这个过程结束的，资源上由于每个请求都需要携带数据，因此每个请求都需要占用带宽。

另外，由于浏览器进行并发请求的请求数是有上限的，因此请求数多了以后，浏览器需要分批进行请求，因此会增加用户的等待时间，会给 用户造成站点速度慢这样一个印象，即使可能用户能看到的第一屏的资源都已经请求完了，但是浏览器的进度条会一直存在。减少HTTP请求数的主要途径包括：

(2). 从设计实现层面简化页面

如果你的页面像百度首页一样简单，那么接下来的规则基本上都用不着了。保持页面简洁、减少资源的使用时最直接的。如果不是这样，你的页面需要华丽的皮肤，则继续阅读下面的内容。

(3). 合理设置HTTP缓存

缓存的力量是强大的，恰当的缓存设置可以大大的减少HTTP请求。以有啊首页为例，当浏览器没有缓存的时候访问一共会发出78个请求，共600多K 数据（如图1.1），而当第二次访问即浏览器已缓存之后访问则仅有10个请求，共20多K数据（如图1.2）。（这里需要说明的是，如果直接F5刷新页面 的话效果是不一样的，这种情况下请求数还是一样，不过被缓存资源的请求服务器是304响应，只有Header没有Body，可以节省带宽）

怎样才算合理设置？原则很简单，能缓存越多越好，能缓存越久越好。例如，很少变化的图片资源可以直接通过HTTP Header中的Expires设置一个很长的过期头；变化不频繁而又可能会变的资源可以使用Last-Modifed来做请求验证。尽可能的让资源能够 在缓存中待得更久。

(4). 资源合并与压缩

如果可以的话，尽可能的将外部的脚本、样式进行合并，多个合为一个。另外，CSS、Javascript、Image都可以用相应的工具进行压缩，压缩后往往能省下不少空间。

(5). CSS Sprites

合并CSS图片，减少请求数的又一个好办法。

(6). Inline Images

使用data: URL scheme的方式将图片嵌入到页面或CSS中，如果不考虑资源管理上的问题的话，不失为一个好办法。如果是嵌入页面的话换来的是增大了页面的体积，而且无法利用浏览器缓存。使用在CSS中的图片则更为理想一些。

(7). Lazy Load Images

这条策略实际上并不一定能减少HTTP请求数，但是却能在某些条件下或者页面刚加载时减少HTTP请求数。对于图片而言，在页面刚加载的时候可以只 加载第一屏，当用户继续往后滚屏的时候才加载后续的图片。这样一来，假如用户只对第一屏的内容感兴趣时，那剩余的图片请求就都节省了。有啊首页曾经的做法 是在加载的时候把第一屏之后的图片地址缓存在Textarea标签中，待用户往下滚屏的时候才“惰性”加载。

## 10、你了解的浏览器的重绘和回流导致的性能问题
* 重绘（Repaint）和回流（Reflow）

重绘和回流是渲染步骤中的一小节，但是这两个步骤对于性能影响很大。

重绘是当节点需要更改外观而不会影响布局的，比如改变 color就叫称为重绘
回流是布局或者几何属性需要改变就称为回流。
回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列回流。

所以以下几个动作可能会导致性能问题：

改变 window 大小
改变字体
添加或删除样式
文字改变
定位或者浮动
盒模型
很多人不知道的是，重绘和回流其实和 Event loop 有关。

当 Event loop 执行完 Microtasks 后，会判断 document 是否需要更新。因为浏览器是 60Hz 的刷新率，每 16ms 才会更新一次。
然后判断是否有 resize或者 scroll，有的话会去触发事件，所以 resize和 scroll事件也是至少 16ms 才会触发一次，并且自带节流功能。
判断是否触发了 media query
更新动画并且发送事件
判断是否有全屏操作事件
执行 requestAnimationFrame回调
执行 IntersectionObserver回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
更新界面
以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 requestIdleCallback回调。

* 减少重绘和回流
使用 translate 替代 top
使用 visibility替换 display: none，因为前者只会引起重绘，后者会引发回流（改变了布局）
不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局
动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 requestAnimationFrame
CSS 选择符从右往左匹配查找，避免 DOM 深度过深
将频繁运行的动画变为图层，图层能够阻止该节点回流影响别的元素。比如对于 video标签，浏览器会自动将该节点变为图层。

## 11、简述一下前端事件流
HTML中与javascript交互是通过事件驱动来实现的，例如鼠标点击事件onclick、页面的滚动事件onscroll等等，可以向文档或者文档中的元素添加事件侦听器来预订事件。想要知道这些事件是在什么时候进行调用的，就需要了解一下“事件流”的概念。
什么是事件流：事件流描述的是从页面中接收事件的顺序,DOM2级事件流包括下面几个阶段。
事件捕获阶段
处于目标阶段
事件冒泡阶段
addEventListener：addEventListener是DOM2 级事件新增的指定事件处理程序的操作，这个方法接收3个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后这个布尔值参数如果是true，表示在捕获阶段调用事件处理程序；如果是false，表示在冒泡阶段调用事件处理程序。
IE只支持事件冒泡。

## 12、页面加载
* 加载一个资源的过程 / 从输入 url 到得到 html 的详细过程
浏览器根据 DNS 服务器解析域名并得到域名的 IP 地址
向这个 IP 服务器发送 http 请求
服务器收到、处理并返回 http 请求
浏览器得到返回内容
* 浏览器渲染页面的过程
根据 HTML 结构生成 DOM Tree (DOM 是文档对象模型)
根据 CSS 生成 CSSOM (CSSOM 是 CSS 对象模型) (css 文件一般放在 head 标签里，减少重绘次数)
将 DOM 和 CSSOM 整合形成 RenderTree
根据 RenderTree 开始渲染和展示
注意：(script 标签一般放在 body 末尾，不会阻塞 html 结构的生成，且脚本里可以获取到所有标签结构)，遇到 script 内联 js 代码时，会执行并阻塞渲染
* window.onload 和 DOMContentLoaded 的区别
window.onload(load 事件)：页面全部资源加载完才会执行，包括图片、视频等
DOMContentLoaded：DOM 渲染完即可执行，此时图片、视频等可能还没有加载完
注：DOMContentLoaded：jq 都是用这种方式来判断页面是否加载完

* 性能优化
多使用内存、缓存或者其他方法
减少 CPU 计算、减少网络(I/O操作，即输入输出)
静态资源的压缩合并、缓存
使用 CDN 让资源加载更快
使用 SSR 后端渲染，数据直接输出到 HTML 中
注：CDN => 网站开启 CDN 加速之后，会将网站内容缓存到 CDN 节点服务器上，这个时候如果有访问的话，就会直接从 CDN 节点服务器返回网站数据，不需要再从源站调取数据
*渲染优化
CSS 放前面，JS 放后面
懒加载 (图片懒加载、上拉加载)
减少 DOM 操作，多个操作尽量合并在一起执行
事件节流：如果持续触发事件，每隔一段时间，只执行一次事件
尽早执行操作(如 DOMContentLoaded)
DocumentFragment 不是真实 DOM 树的一部分，它的变化不会触发 DOM 树的（回流和重绘)，且不会导致性能等问题。
注：document.createDocumentFragment 方法可以创建 DocumentFragment 作为一种占位符，暂时存放那些依次插入文档的节点
DocumentFragment 节点插入文档树时，插入的不是 DocumentFragment 自身，而是它的所有子孙节点

* 优化
1.增加link标签，DNS预解析
<link rel="dns-prefetch" href="//x.alicdn.com">
DNS Prefetch 是一种DNS 预解析技术，当你浏览网页时，浏览器会在加载网页时对网页中的域名进行解析缓存，这样在你单击当前网页中的连接时就无需进行DNS 的解析，减少用户等待时间，提高用户体验。
我们DNS 解析的时候，需要用域名去DNS 解析匹配  IP  ，这个是需要时间的，如果加了  dns-perfetch  呢，浏览器会记住（缓存）这个解析，直接就请求过去了，不需要再走DNS 解析。就是这么简单。











事件冒泡和捕获:https://juejin.im/post/6844903834075021326
js作用域的理解:https://juejin.im/post/6844903584891420679
JavaScript执行机制 事件循环/微任务/宏任务:https://juejin.im/post/6844903638238756878
JavaScript原型、原型链和继承:https://zhuanlan.zhihu.com/p/35790971
Generator函数的语法:http://www.ruanyifeng.com/blog/2015/04/generator.html
从浏览器多进程到JS单线程:https://mp.weixin.qq.com/s/vIKDUrbuxVNQMi_g_fiwUA













