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
 * 3.将构造函数的作用域赋值给新对象
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

const p = _new(Person,'lala');
console.log(p instanceof Person);//true









