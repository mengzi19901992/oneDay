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



