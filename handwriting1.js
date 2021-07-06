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



