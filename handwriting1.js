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