//1.手写new
function _new(){
    let target = {};
    const [constructor,...args] = [...arguments];
    target.__proto__ = constructor.prototype;
    const result = constructor.apply(target,args);
    if(result&&(typeof result == 'object'|| typeof result == 'function')){
        return result;
    }
    return target;
}
function mynew(Func,...args){
    const obj = {};
    obj.__proto__ = Func.prototype;
    let result = Func.apply(obj,args);
    return result instanceof Object ? result : obj;
}
//2.深度克隆
function clone(origin){
    let cloneObj;
    if(typeof origin !== 'object'){
        cloneObj = origin;
    }else{
        cloneObj = Array.isArray(origin)?[]:{};
        for(let key in origin){
            if(origin.hasOwnProperty(key)){
                if(typeof origin[key] === 'object'){
                    cloneObj[key] = clone(origin[key]);
                }else{
                    cloneObj[key] = origin[key];
                }
            }
        }
    }
    return cloneObj;
}

//3.instanceof
function instance(left,right){
    let prototype = right.prototype;
    let proto = left.__proto__;
    while(true){
        if(proto === null){
            return false;
        }
        if(proto === prototype){
            return true;
        }
        proto = proto.__proto__;
    }
}

//4.ajax 请求
//get
var xhr = new XMLHttpRequest();
xhr.open('GET',url);
xhr.send(null);
xhr.onreadystatechange = function(){
    if(xhr.readyState===4){
        if(xhr.status===200){
            console.log(xhr.responseText);
        }
    }
}
//post
var stringData = {
    name:'aa',
    age:18
}
stringData = JSON.stringify(stringData);
var xhr = new XMLHttpRequest();
xhr.open('POST',url);
xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xhr.send(stringData);
xhr.onreadystatechange = function(){
    if(xhr.readyState === 4){
        if(xhr.status === 200){
            console.log(xhr.responseText);
        }
    }
}




//防抖
function debounce(fn,time){
    let timer =null;
    return function () {
        clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(this,arguments);
        },time)
    }
}
//节流，n秒执行一次，每次执行前判断是否执行中
function throttle(fn,time) {
    let onOf = false;//变量标记是否执行中
    return function () {
        if(!onOf){
            onOf = true;
            setTimeout(()=>{
                fn.apply(this,arguments);
                onOf = false
            },time);
        }
    }
}