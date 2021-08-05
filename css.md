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

