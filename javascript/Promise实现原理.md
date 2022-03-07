4、Promise实现原理
Promise 规范有很多，如 Promise/A，Promise/B，Promise/D 以及 Promise/A 的升级版 Promise/A+，有兴趣的可以去了解下，最终 ES6 中采用了 Promise/A+ 规范。
构造函数
从构造函数开始，我们一步步实现符合 Promsie A+ 规范的 Promise。大概描述下，Promise构造函数需要做什么事情。
1. 初始化 Promise 状态（pending）
2. 初始化 then(..) 注册回调处理数组（then 方法可被同一个 promise 调用多次）
3. 立即执行传入的 fn 函数，传入Promise 内部 resolve、reject 函数
4. ...

const PENDING = 'pending'
const FULFILLED = 'resolve'
const REJECT = 'reject'

function Promise(executor) {
  let _this = this;
  _this.status = PENDING; // Promise当前的状态
  _this.data = undefined;  // Promise的值
  _this.onResolvedCallback = []; // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  _this.onRejectedCallback = []; // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

  _this.resolve = function(val) {
    // TODO
  }

  _this.reject =function(reason) {
    // TODO
  }

  try { // 考虑到执行executor的过程中有可能出错，所以我们用try/catch块给包起来，并且在出错后以catch到的值reject掉这个Promise
    executor(resolve, reject); // 执行executor
  } catch(e) {
    reject(e);
  }
}
上面的代码基本实现了Promise构造函数的主体，我们给executor函数传了两个参数：resolve和reject，这两个参数目前还没有定义,所以我们需要在构造函数里定义resolve和reject这两个函数：
	_this.resolve = function (val) {
    setTimeout(() => {
      if (_this.status === PENDING) {
        _this.status = FULFILLED
        _this.value = val
        _this.onRejectedCallbacks.forEach(cb=>cb(val))
      }
    }, 0);
    
  }
  
 _this.reject = function (error) {
    setTimeout(() => {
      if (_this.status === PENDING) {
        _this.status = REJECT
        _this.value = error
        _this.onRejectedCallbacks.forEach(cb => cb(error))
      }
    }, 0);
  }
resolve和reject的基本逻辑就是在判断状态为pending之后把状态改为相应的值，并把对应的value和reason存在self的value属性上面，之后执行相应的回调函数。

then方法
Promise A+提到规范专注于提供通用的 then 方法。用来注册在这个Promise状态确定后的回调，很明显，then方法需要写在原型链上。then 方法可以被同一个 promise 调用多次，每次返回新 promise 对象 。then 方法接受两个参数onResolved、onRejected（可选）。在 promise 被 resolve 或 reject 后，所有 onResolved 或 onRejected 函数须按照其注册顺序依次回调，且调用次数不超过一次。

根据上述，then 函数执行流程大致为：
1. 实例化空 promise 对象用来返回（保持then链式调用）
2. 构造 then(..) 注册回调处理函数结构体
3. 判断当前 promise 状态，pending 状态存储延迟处理对象 ，非pending状态执行 onResolved 或 onRejected 回调
4. ...

// then方法接收两个参数，onResolved，onRejected，分别为Promise成功或失败后的回调
Promise.prototype.then = function (onResolved,onRejected) {
  let _this = this;
  let promise2;
  
	// 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  onResolved = typeof onResolved === 'function' ? onResolved : v=>v;
  onRejected = typeof onRejected === 'function' ? onRejected : e=> {throw e};

  //Promise总共有三种可能的状态，我们分三个if块来处理，在里面分别都返回一个new Promise
  if (this.status === FULFILLED) {
    // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
    // 因为考虑到有可能throw，所以我们将其包在try/catch块里
    return  new Promise(function(resolve,reject){
      try {
        let x = onResolved(_this.value);
        if(x instanceof Promise) { // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
          x.then(resolve,reject);
        }
        resolve(x); // 否则，以它的返回值做为promise2的结果
      } catch (error) {
        reject(error); // 如果出错，以捕获到的错误做为promise2的结果
      }
    })
  }
  // 此处与前一个if块的逻辑几乎相同，区别在于所调用的是onRejected函数
  if (this.status === REJECT) {
    return  new Promise(function (resolve, reject) {
      try {
        var x = onRejected(_this.vlue);
        if(x instanceof Promise) {
          x.then(resolve,reject);
        }
      } catch (error) {
        reject(x);
      }
    })
  }
  if (this.status === PENDING) {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
	  // 只能等到Promise的状态确定后，才能确实如何处理。
  	// 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise(此处即this/self)的回调数组里
	  // 逻辑本身跟第一个if块内的几乎一致
    return new Promise(function (resolve, reject) {
      _this.onResolvedCallbacks.push(function(value){
        try {
          let x = onResolved(_this.value);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          }
          resolve(x);
        } catch (error) {
          reject(error);
        }
      })
      _this.onRejectedCallbacks.push(function(value){
        try {
          var x = onRejected(_this.vlue)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (error) {
          reject(x)
        }
      })
    })
  }
}


all方法
Promise.all 接收一个 Promise 实例的数组，在所有这些 Promise 的实例都 fulfilled 后，按照 Promise 实例的顺序返回相应结果的数组。
Promise.prototype.all = function(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be array'));
    }
    let nums = promises.length;
    let resolvedCounter = 0;
    let result = [];
    for (let i = 0; i < nums; i++) {
      Promise.resolve(promises[i]).then((value)=>{
        result[i] = value;
        resolvedCounter++;
        if (resolvedCounter === nums) return resolve(result);
      },(reason)=>{
        return reject(reason);
      });
    }
  });
}
race方法
Promise.race 也接收一个 Promise 实例的数组，与 Promise.all不同的是，所以返回的结果是这些 Promise 实例中最先 fulfilled 的。
Promise.prototype.race = function(promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be array'));
    }
    for (let i = 0; i < promises.length; i++) {
      Promsie.resove(promises[i]).then(resolve, reject);
    }
  })
}
