//1.手写new的执行过程
function Person(name){
    this.name = name;
}
var person = new Person('lala');
console.log(person);//{name: "lala"}
// 构造方法就是这个 Person 函数
console.log(person.__proto__.constructor === Person); // true
/**
 * new 的执行过程
 * 1.创建一个新对象
 * 2.原型链链接
 * 3.将构造函数的作用域赋值给新对象（将构造函数中的this绑定到新建的对象obj上）
 * 4.执行构造函数中的代码
 * 5.返回新对象
 */
function _new(){
    //1.创建一个新对象
    let target = {};
    //获取参数，第一个是构造函数
    const [constructor,...args] = [...arguments];
    //2.原型链链接
    target.__proto__ = constructor.prototype;
    //3.构造函数的作用域赋值给新对象
    //4.执行构造函数中的代码
    // constructor.apply(target,args);
    const result = constructor.apply(target, args);
    // 如果构造函数有返回值且返回值的类型是个引用类型，则返回返回值。否则返回创建的新对象
    if(result && (typeof result == 'object' || typeof result == 'function')){
        return result;
    }
    //5.返回新对象
    return target;
}

// function mynew(Func, ...args) {
//     // 1.创建一个新对象
//     const obj = {}
//     // 2.新对象原型指向构造函数原型对象
//     obj.__proto__ = Func.prototype
//     // 3.将构建函数的this指向新对象
//     let result = Func.apply(obj, args)
//     // 4.根据返回值判断
//     return result instanceof Object ? result : obj
// }

const p = _new(Person,'lala');
console.log(p instanceof Person);//true


//2.深度克隆
var obj = {
    info: {
        data: {
            name: 'ceshi'
        }
    },
    age: 26,
    fn: function(){
        console.log(222);
    }
}

function clone(origin){
    let cloneObj;
    if(typeof origin !=='object'){
        cloneObj = origin; 
    }else{
        cloneObj = Array.isArray(origin)?[]:{};
        for(let key in origin){
            //只针对对象自身的属性进行克隆，不对原型上的属性进行克隆
            if(origin.hasOwnProperty(key)){
                if(typeof origin[key] === 'object'){
                    cloneObj[key] = clone(origin[key])
                }else{
                    cloneObj[key] = origin[key];
                }
            }
        }
    }
    return cloneObj;
}

var cloneObj = clone(obj);
obj.info.data.name = 'lala';
obj.age = 25;
console.log(obj);
console.log(cloneObj);

//3.手写instanceof
/**
 * instanceof是通过原型链判断的，b instanceof B 沿着b的隐式原型链层层查找，查看是否有原型等于B.prototype
 * 如果一直找到b的原型链顶端 null，仍没有找到等于B.prototype的原型，则返回false，否则返回true
 */
//left 实例对象 right 类
function instance(left,right){
    let prototype = right.prototype;
    let proto = left.__proto__;
    while(true){
        if(proto===null){
            return false;
        }
        if(proto===prototype){
            return true;
        }
        proto = proto.__proto__;
    }
}
class Animal {
    constructor(){
        this.type = 'animal';
    }
}
class Animal2 {
    constructor(){
        this.type = 'animal2';
    }
}
let animal = new Animal();
console.log(instance(animal, Animal)); // true
console.log(instance(animal, Animal2)); // false


//4.ajax请求过程

//GET 请求
//1.获取XMLHttpRequest对象
var xhr = new XMLHttpRequest();
//2.初始化请求,第三个参数默认是true，也就是异步的
xhr.open('GET',url);
//3.发送请求,GET请求:发送的值为空，一般写上null，适配有些浏览器
xhr.send(null);
//4.监控请求状态，处理请求数据
xhr.onreadystatechange = function(){
    // readyState属性，这个属性可能的取值如下：
    // 0：未初始化，尚未调用open()方法
    // 1：启动。已经调用open()方法，但尚未调用send()方法
    // 2：发送：已经调用send()方法，但尚未收到响应
    // 3：接收。已经接收到部分响应数据。
    // 4：完成。已经接收到全部响应数据，而且已经可以在客户端使用了。
    if(xhr.readyState === 4){
        // status 响应状态码 
        // 200 成功
        if(xhr.status === 200){
            console.log(JSON.parse(xhr.responseText));
        }
    }
}
//POST
var stringData = {
    name:'aa',
    ageg:18
};
stringData = JSON.stringify(stringData);
var xhr = new XMLHttpRequest();
xhr.open('POST',url);
//POST请求,要模拟表单提交请求的话就将Content-type头部信息设置为application/x-www-form-urlencoded
xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhr.send(stringData);
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            console.log(JSON.parse(xhr.responseText));
        }
    }
}

//5、手写休眠
function sleep(time) {
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,time);
    })
}
async function fn(){
    await sleep(1000);
    console.log(11)
}
fn();

// 6、手写 call、apply 及 bind 函数
// call函数实现
// 原理就是把调用方法加到传入的上下文属性上，然后执行并返回结果
Function.prototype.myCall = function(context) {
    // 判断调用对象
    if (typeof this !== "function") {
      console.error("type error");
    }
    // 获取参数
    let args = [...arguments].slice(1),
      result = null;
    // 判断 context 是否传入，如果未传入则设置为 window
    context = context || window;
    // 将调用函数设为对象的方法
    context.fn = this;
    // 调用函数
    result = context.fn(...args);
    // 将属性删除
    delete context.fn;
    return result;
  };
// apply 函数实现
// apply 实现与call一样，区别是传入参数是数组
// 原理就是把调用方法加到传入的上下文属性上，然后执行并返回结果
Function.prototype.myApply = function(context) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
      throw new TypeError("Error");
    }
  
    let args = [...arguments].slice(1),
    result = null;

    // 判断 context 是否存在，如果未传入则为 window
    context = context || window;
  
    // 将函数设为对象的方法
    context.fn = this;
    // 调用方法
    result = context.fn(args);
    // 将属性删除
    delete context.fn;
  
    return result;
  };
// bind 函数实现
// bind实现就是使用apply方式，并且返回一个可执行函数
Function.prototype.myBind = function(context) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
      throw new TypeError("Error");
    }
  
    // 获取参数
    var args = [...arguments].slice(1),
      fn = this;
    return function Fn() {
      // 根据调用方式，传入不同绑定值
      return fn.apply(context,args.concat(...arguments));
    };
};


// 7、函数柯里化
const curry = function(fn){
    return function curriedFn(...args){
        if(args.length<fn.length){
            return function(){
                return curriedFn(...args.concat([...arguments]));
            }
        }
        return fn(...args);
    }
}
// es6 实现
function curry(fn) {
    return currys = (...args) => {
        return fn.length <= args.length ? fn(...args) : currys.bind(null,...args);
    }
}
























