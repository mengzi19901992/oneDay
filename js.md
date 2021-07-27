## 1、JS有几种数据类型,其中基本数据类型有哪些?
* 七种数据类型
Boolean
Null
Undefined
Number
String
Symbol (ECMAScript 6 新定义)
Object
(ES6之前)其中5种为基本类型:string,number,boolean,null,undefined,
ES6出来的Symbol也是原始数据类型 ，表示独一无二的值
Object为引用类型(范围挺大),也包括数组、函数。

## 2、Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？
promise构造函数是同步执行的，then方法是异步执行的
Promise new的时候会立即执行里面的代码 then是微任务 会在本次任务执行完的时候执行 setTimeout是宏任务 会在下次任务执行的时候执行
```javascript
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})

promise.then(() => {
  console.log(3)
})

console.log(4)
//1,2,4,3
```
## 3、JS的四种设计模式
* 工厂模式 
简单的工厂模式可以理解为解决多个相似的问题;
```javascript
function CreatePerson(name,age,sex) {
    var obj = new Object();
    obj.name = name;
    obj.age = age;
    obj.sex = sex;
    obj.sayName = function(){
        return this.name;
    }
    return obj;
}
var p1 = new CreatePerson("longen",'28','男');
var p2 = new CreatePerson("tugenhua",'27','女');
console.log(p1.name); // longen
console.log(p1.age);  // 28
console.log(p1.sex);  // 男
console.log(p1.sayName()); // longen

console.log(p2.name);  // tugenhua
console.log(p2.age);   // 27
console.log(p2.sex);   // 女
console.log(p2.sayName()); // tugenhua  
```
* 单例模式
只能被实例化(构造函数给实例添加属性与方法)一次
```javascript
// 单体模式
var Singleton = function(name){
    this.name = name;
};
Singleton.prototype.getName = function(){
    return this.name;
}
// 获取实例对象
var getInstance = (function() {
    var instance = null;
    return function(name) {
        if(!instance) {//相当于一个一次性阀门,只能实例化一次
            instance = new Singleton(name);
        }
        return instance;
    }
})();
// 测试单体模式的实例,所以a===b
var a = getInstance("aa");
var b = getInstance("bb");  
```
* 沙箱模式
将一些函数放到自执行函数里面,但要用闭包暴露接口,用变量接收暴露的接口,再调用里面的值,否则无法使用里面的值
```javascript
let sandboxModel=(function(){
    function sayName(){};
    function sayAge(){};
    return{
        sayName:sayName,
        sayAge:sayAge
    }
})()
```
* 发布者订阅模式
例如我们关注了某一个公众号,然后他对应的有新的消息就会给你推送,代码实现逻辑是用数组存贮订阅者, 发布者回调函数里面通知的方式是遍历订阅者数组,并将发布者内容传入订阅者数组
```javascript
//发布者与订阅模式
var shoeObj = {}; // 定义发布者
shoeObj.list = []; // 缓存列表 存放订阅者回调函数

// 增加订阅者
shoeObj.listen = function(fn) {
    shoeObj.list.push(fn); // 订阅消息添加到缓存列表
}

// 发布消息
shoeObj.trigger = function() {
    for (var i = 0, fn; fn = this.list[i++];) {
        fn.apply(this, arguments);//第一个参数只是改变fn的this,
    }
}
// 小红订阅如下消息
shoeObj.listen(function(color, size) {
    console.log("颜色是：" + color);
    console.log("尺码是：" + size);
});

// 小花订阅如下消息
shoeObj.listen(function(color, size) {
    console.log("再次打印颜色是：" + color);
    console.log("再次打印尺码是：" + size);
});
shoeObj.trigger("红色", 40);
shoeObj.trigger("黑色", 42);  
```

## 4、列举出集中创建实例的方法
* 1.字面量
```javascript
let obj={'name':'张三'}
```
* 2.Object构造函数创建
```javascript
let Obj=new Object()
Obj.name='张三'
```
* 3.使用工厂模式创建对象
```javascript
function createPerson(name){
 var o = new Object();
 o.name = name;
 };
 return o; 
}
var person1 = createPerson('张三');
```
* 4.使用构造函数创建对象
```javascript
function Person(name){
 this.name = name;
}
var person1 = new Person('张三');
```

## 5、简述一下原型 / 构造函数 / 实例
* 原型(prototype): 一个简单的对象，用于实现对象的 属性继承。可以简单的理解成对象的爹。在 Firefox 和 Chrome 中，每个JavaScript对象中都包含一个__proto__(非标准)的属性指向它爹(该对象的原型)，可obj.__proto__进行访问。
* 构造函数: 可以通过new来 新建一个对象的函数。
* 实例: 通过构造函数和new创建出来的对象，便是实例。实例通过__proto__指向原型，通过constructor指向构造函数。
这里来举个栗子，以Object为例
__proto__隐式原型
prototype显示原型
```javascript
//实例.__proto__ === 原型
//原型(实例).constructor === 构造函数
//构造函数.prototype === 原型
const o = new Object();
o.__proto__=== Object.prototype;//true
Object.prototype.constructor === Object;//true
o.constructor === Object;//true
```
得出如下结论：
* 构造函数的prototype(Object.prototype)与实例的__proto__(o.__proto__)都指向原型
* 实例的constructor(o.constructor)与原型的constructor(Object.prototype.constructor)都指向构造函数

Function 既是构造函数又是实例【通过调用 Function 这个构造函数生成的】，由 Function 生成的实例对象隐式原型指向相应的构造函数的显示原型
但 Function.__proto__ 或 Function.prototype 是对象，对象就必然最终由 Object 生成，所以 fnObj.__proto__ === Object.prototype
```javascript 
Function.__proto__ === Function.prototype; //true
Function.__proto__.__proto__ === Object.prototype;//true
Function.prototype.__proto__ === Object.prototype;//true
```
## 5.1、原型，原型链总结
__proto__作为不同对象之间的桥梁，用来指向创建它的构造函数的原型对象的
![](./img/prototype1.png) 
1、每个对象的__proto__都是指向它的构造函数的原型对象prototype的
```javascript
person.__proto__ === Person.prototype
```
2、构造函数是一个函数对象，是通过 Function构造器产生的
```javascript
Person.__proto__ === Function.prototype
```
3、原型对象本身是一个普通对象，而普通对象的构造函数都是Object
```javascript
Person.prototype.__proto__ === Object.prototype
```
4、所有的构造器都是函数对象，函数对象都是 Function构造产生的
```javascript
Object.__proto__ === Function.prototype
```
5、Object的原型对象也有__proto__属性指向null，null是原型链的顶端
```javascript
Object.prototype.__proto__ === null
```
总结：
* 一切对象都是继承自Object对象，Object 对象直接继承根源对象null
* 一切的函数对象（包括 Object 对象），都是继承自 Function 对象
* Object 对象直接继承自 Function 对象
* Function对象的__proto__会指向自己的原型对象，最终还是继承自Object对象
![](./img/prototype2.png) 

## 6、简述一下JS继承，并举例
在 JS 中，继承通常指的便是 原型链继承，也就是通过指定原型，并可以通过原型链继承原型上的属性或者方法。
* 最优化: 组合继承
```javascript
function clone (parent, child) {
    // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
}
function Parent() {
    this.name = 'parent6';
    this.play = [1, 2, 3];
}
Parent6.prototype.getName = function () {
    return this.name;
}
function Child() {
    Parent.call(this);
    this.friends = 'child5';
}
clone(Parent, Child);
```
* 使用 ES6 的语法糖 class / extends

## 7、函数柯里化
函数柯里化指的是将能够接收多个参数的函数转化为接收单一参数的函数，并且返回接收余下参数且返回结果的新函数的技术。
函数柯里化的主要作用和特点就是参数复用、提前返回和延迟执行。
在一个函数中，首先填充几个参数，然后再返回一个新的函数的技术，称为函数的柯里化。通常可用于在不侵入函数的前提下，为函数**预置通用参数**，供多次重复调用。
```javascript
const add = function add(x) {
    return function (y) {
        return x + y
    }
}
const add1 = add(1)
add1(2) === 3
add1(20) === 21
```

## 8、箭头函数的特点
```javascript
function a() {
    return () => {
        return () => {
            console.log(this)
        }
    }
}
console.log(a()()())//window
```
箭头函数其实是没有 this的，这个函数中的 this只取决于他外面的第一个不是箭头函数的函数的 this。在这个例子中，因为调用 a符合前面代码中的第一个情况，所以 this是 window。并且 this一旦绑定了上下文，就不会被任何代码改变。


## 9、浏览器与Node的事件循环(Event Loop)有何区别?
浏览器和 Node 环境下，microtask 任务队列的执行时机不同

Node 端，microtask 在事件循环的各个阶段之间执行
浏览器端，microtask 在事件循环的 macrotask 执行完之后执行

## 10、什么是闭包，应用场景？
一个函数和对其周围状态的引用捆绑在一起，这样的组合就是闭包。闭包让你可以在一个内层函数中访问到其外层函数的作用域。
使用场景：1、创建私有变量，2、延长变量的生命周期

## 11、Javascript中的作用域
作用域，即变量（变量作用域又称上下文）和函数能被访问的区域或集合。作用域决定了代码区块中变量和其他资源的可见性。
作用域分为：
* 全局作用域
* 函数作用域
* 块级作用域
JavaScript 遵循的是词法作用域:词法作用域，又叫静态作用域，变量被创建时就确定好了，而非执行阶段确定的
```javascript
var a = 2;
function foo(){
    console.log(a)
}
function bar(){
    var a = 3;
    foo();
}
bar()//2
//由于JavaScript遵循词法作用域，相同层级的 foo 和 bar 就没有办法访问到彼此块作用域中的变量，所以输出2
```
作用域链:当在Javascript中使用一个变量的时候，首先Javascript引擎会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域

## 12、this对象的理解
在绝大多数情况下，函数的调用方式决定了 this 的值（运行时绑定），this 关键字是函数运行时自动生成的一个内部对象，只能在函数内部使用，总指向调用它的对象。
箭头函数：箭头函语法，让我们在代码书写时就能确定 this 的指向（编译时绑定）。




