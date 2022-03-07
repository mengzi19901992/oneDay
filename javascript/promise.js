const PENDING = 'pending';
const RESOLVE = 'resolve';
const REJECT = 'reject';
function Promise1 (fn) {
    let self = this;
    self.status = PENDING; // promise的当前状态
    self.data = undefined; // promise的值
    self.onResolveCallback = [];
    self.onRejectCallback = [];

    function resolve (value) {
        if(self.status === PENDING){
            self.status = RESOLVE;
            self.data = value;
            self.onResolveCallback.forEach((cb) => cb(value));
        }
    }

    function reject (e){
        if(self.status === PENDING){
            self.status = REJECT;
            self.data = e;
            self.onRejectCallback.forEach((cb) => {cb(e)});
        }
    }

    try{
        fn(resolve,reject);
    } catch(e){
        reject(e)
    }
}

Promise1.prototype.then = function(onResolve,onReject){
    let self = this;
    // Promise总共有三种可能的状态，我们分三个if块来处理，在里面分别都返回一个new Promise
    if(self.status === RESOLVE){
        return new Promise1(function(resolve,reject){
            try {
                let x = onResolve(self.data);
                if(x instanceof Promise1) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
                    x.then(resolve,reject);
                }
                resolve(x);// 否则，以它的返回值做为promise2的结果
            }catch(e) {
                reject(e);
            }
        })
    }
    if(self.status === REJECT){
        return new Promise1(function(resolve,reject){
            try {
                let x = onReject(self.data);
                if(x instanceof Promise1){
                    x.then(resolve,reject);
                }
            }catch(e){
                reject(x);
            }
        })
    }
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
	// 只能等到Promise的状态确定后，才能确实如何处理。
    if(self.status === PENDING){
        return new Promise1(function(resolve,reject){
            self.onResolveCallback.push(function(){
                try {
                    let x = onResolve(self.data);
                    if(x instanceof Promise1) {
                        x.then(resolve,reject);
                    }
                    resolve(x);
                }catch(e) {
                    reject(e);
                }
            })
            self.onRejectCallback.push(function(){
                try {
                    let x = onReject(self.data);
                    if(x instanceof Promise1) {
                        x.then(resolve,reject);
                    }
                }catch(e) {
                    reject(e);
                }
            })
        })
    }
}

let p = new Promise1(function(resolve,reject){
    setTimeout(function(){
        resolve(2)
    },1000)
}).then(function(val){
    console.log(val);
    return val
}).then(function(val){
    console.log(val);
})





function Promise2(fn) {
    let self = this;
    self.status = PENDING;
    self.data = undefined;
    self.onResolveCallback = [];
    self.onRejectCallback = [];

    function resolve(val){
        if(self.status === PENDING){
            self.status = RESOLVE;
            self.data = val;
            self.onResolveCallback.forEach((cb) => {cb(self.data)});
        }
    }

    function reject(e){
        if(self.status === PENDING){
            self.status = REJECT;
            self.data = e;
            self.onRejectCallback.forEach((cb)=>{cb(self.data)});
        }
    }

    try {
        fn(resolve,reject);
    }catch{
        reject(this.data);
    }
}

Promise2.prototype.then = function(onResolve,onReject){
    let self = this;
    if(self.status === PENDING){
        return new Promise2(function(resolve,reject){
            self.onResolveCallback.push(function(){
                try{
                    let x = onResolve(self.data);
                    if(x instanceof Promise2){
                        x.then(resolve,reject);
                    }
                    resolve(x);
                }catch(e){
                    reject(e)
                }
            })
            self.onRejectCallback.push(function(resolve,reject){
                try{
                    let x = onReject(self.data);
                    if(x instanceof Promise2){
                        x.then(resolve,reject);
                    }
                    resolve(x);
                }catch(e){
                    reject(x)
                }
            })
        })
    }
    if(self.status === RESOLVE){
        return new Promise2(function(resolve,reject){
            try{
                let x = onResolve(self.data);
                if(x instanceof Promise2){
                    x.then(resolve,reject);
                }
                resolve(x);
            }catch(e){
                reject(x)
            }
        })
    }
    if(self.status === REJECT){
        return new Promise2(function(resolve,reject){
            try{
                let x = onReject(self.data);
                if(x instanceof Promise2){
                    x.then(resolve,reject);
                }
                resolve(x);
            }catch(e){
                reject(x);
            }
        })
    }
}

function fn (val){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            console.log(val)
            resolve(val)
        },1000)
    })
}
fn(1).then(()=>{
    return fn(2)
}).then(()=>{
    return fn(3)
})