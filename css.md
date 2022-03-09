## 1、分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景
* 结构：
display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击
visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击 
opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击
* 继承：
display: none：是非继承属性，子孙节点消失是由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。
* 性能：
displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大 
visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容 
opacity: 0 ：修改元素会造成重绘，性能消耗较少

## 2、清除浮动的方式有哪些?比较好的是哪一种?
常用的一般为三种.clearfix, clear:both,overflow:hidden;
比较好是 .clearfix,伪元素万金油版本,后两者有局限性.
```css
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}
```
clear:both:若是用在同一个容器内相邻元素上,那是贼好的,有时候在容器外就有些问题了, 比如相邻容器的包裹层元素塌陷
overflow:hidden:这种若是用在同个容器内,可以形成 BFC避免浮动造成的元素塌陷

## 3、link与@import的区别
link是 HTML 方式， @import是 CSS 方式
link最大限度支持并行下载，@import过多嵌套导致串行下载，出现FOUC（无样式内容闪烁）
link可以通过rel="alternate stylesheet"指定候选样式
浏览器对link支持早于@import，可以使用@import对老浏览器隐藏样式
@import必须在样式规则之前，可以在 css 文件中引用其他文件
总体来说：link 优于@import

## 4、CSS盒子模型的理解
对一个文档进行布局（layout）的时候，浏览器的渲染引擎会根据CSS基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）
一个盒子由四个部分组成：content、padding、border、margin
```css
box-sizing: content-box|border-box|inherit:
```
content-box 默认值，元素的 width/height 不包含padding，border，与标准盒子模型表现一致
border-box 元素的 width/height 包含 padding，border，与怪异盒子模型表现一致
inherit 指定 box-sizing 属性的值，应该从父元素继承

## 5、BFC的理解
BFC（Block Formatting Context），即块级格式化上下文，它是页面中的一块渲染区域。BFC目的是形成一个相对于外界完全独立的空间，让内部的子元素不会影响到外部的元素

* 渲染规则:
内部的盒子会在垂直方向上一个接一个的放置
对于同一个BFC的俩个相邻的盒子的margin会发生重叠，与方向无关。
每个元素的左外边距与包含块的左边界相接触（从左到右），即使浮动元素也是如此
BFC的区域不会与float的元素区域重叠
计算BFC的高度时，浮动子元素也参与计算
BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
* 触发BFC的条件包含不限于:
根元素，即HTML元素
浮动元素：float值为left、right
overflow值不为 visible，为 auto、scroll、hidden
display的值为inline-block、inltable-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
position的值为absolute或fixed


## 6、css3新增特性
* word-wrap：
语法：word-wrap: normal|break-word
normal：使用浏览器默认的换行
break-word：允许在单词内换行
* text-overflow
text-overflow设置或检索当当前行超过指定容器的边界时如何显示，属性有两个值选择：
clip：修剪文本
ellipsis：显示省略符号来代表被修剪的文本
* transition 过渡
transition属性可以被指定为一个或多个CSS属性的过渡效果，多个属性之间用逗号进行分隔，必须规定两项内容：过度效果、持续时间
语法如下：
```javascript 
transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)
```
分开写各个属性
```css
transition-property: width; 
transition-duration: 1s;
transition-timing-function: linear;
transition-delay: 2s;
```
* transform 转换
transform属性允许你旋转，缩放，倾斜或平移给定元素
transform-origin：转换元素的位置（围绕那个点进行转换），默认值为(x,y,z):(50%,50%,0)
使用方式：
transform: translate(120px, 50%)：位移
transform: scale(2, 0.5)：缩放
transform: rotate(0.5turn)：旋转
transform: skew(30deg, 20deg)：倾斜
* 渐变
linear-gradient：线性渐变
background-image: linear-gradient(direction, color-stop1, color-stop2, ...);
radial-gradient：径向渐变
radial-gradient(0deg, red, green);
* animation 动画
简写
animation: name 0.3s;
@keyframes name{}
animation也有很多的属性:
animation-name：动画名称
animation-duration：动画持续时间
animation-timing-function：动画时间函数
animation-delay：动画延迟时间
animation-iteration-count：动画执行次数，可以设置为一个整数，也可以设置为infinite，意思是无限循环
animation-direction：动画执行方向
animation-paly-state：动画播放状态
animation-fill-mode：动画填充模式

## 7、文本溢出省略
单行文本溢出
```css
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
```
多行文本溢出
```css
text-overflow: ellipsis;
line-clamp: 2;
overflow: hidden;
```

## 8、css画三角形
```css
.border {
    width: 0;
    height: 0;
    border-style:solid;
    border-width: 0 50px 50px;
    border-color: transparent transparent #d9534f;
    position: relative;
}
/* 伪类实现 */
.border:after{
    content: '';
    border-style:solid;
    border-width: 0 40px 40px;
    border-color: transparent transparent #96ceb4;
    position: absolute;
    top: 0;
    left: 0;
}
```

## 9、Chrome支持小于12px 的文字方案
```css
.span{
    display: inline-block;
    font-size: 12px;
    zoom: 0.8;
}
.span2{
    display: inline-block;
    font-size: 12px;
    transform:scale(0.8);
}
```
Zoom 非标属性，有兼容问题，缩放会改变了元素占据的空间大小，触发重排
transform:scale() 大部分现代浏览器支持，并且对英文、数字、中文也能够生效，缩放不会改变了元素占据的空间大小，页面布局不会发生变化
scale属性只对可以定义宽高的元素生效（span需设置display: inline-block;）

* 解决1px的线不展示问题
```css
div{
    height: 2px;
    background: #EDEDED;
    transform: scaleY(0.5);
}
```

## 9.BFC
BFC(Block Formatting Context)块级格式化上下文，是用于布局块级盒子的一块渲染区域。
BFC是Web页面 CSS 视觉渲染的一部分，用于决定块盒子的布局及浮动相互影响范围的一个区域。
触发
1. 根元素，即HTML标签
2. 浮动元素：float值为left、right
3. overflow值不为 visible，为 auto、scroll、hidden
4. display值为 inline-block、table-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
5. 定位元素：position值为 absolute、fixed






