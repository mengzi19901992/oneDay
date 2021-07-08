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

## 6、简述一下JS继承，并举例
在 JS 中，继承通常指的便是 原型链继承，也就是通过指定原型，并可以通过原型链继承原型上的属性或者方法。
* 最优化: 圣杯模式
```javascript
var inherit = (function(Target , Origin){
    var F = function(){};
    return function(Target , Origin){
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.uber = Origin.prototype;//为了让我们知道Target真正继承自谁
        Target.prototype.constructor = Target;//把Target的构造函数指向归位
    }
})();
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


