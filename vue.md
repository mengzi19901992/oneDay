## 1、vue与react的区别？
* 数据流向的不同。react从诞生开始就推崇单向数据流，而Vue是双向数据流
* 数据变化的实现原理不同。react使用的是不可变数据，而Vue使用的是可变的数据
* 组件化通信的不同。react中我们通过使用回调函数来进行通信的，而Vue中子组件向父组件传递消息有两种方式：事件和回调函数
* diff算法不同。react主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。Vue 使用双向指针，边对比，边更新DOM

## 2、路由hash 模式实现
https://juejin.cn/post/6844903695365177352
核心通过监听url中的hash来进行路由跳转
```javascript
// 定义 Router
class Router {
    constructor () {
        this.routes = {}; // 存放路由path及callback
        this.currentUrl = '';
        
        // 监听路由change调用相对应的路由回调
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }
    
    route(path, callback){
        this.routes[path] = callback;
    }
    
    push(path) {
        this.routes[path] && this.routes[path]()
    }
}

// 使用 router
window.miniRouter = new Router();
miniRouter.route('/', () => console.log('page1'))
miniRouter.route('/page2', () => console.log('page2'))

miniRouter.push('/') // page1
miniRouter.push('/page2') // page2
```

## 3、路由history 模式实现
history 模式核心借用 HTML5 history api，api 提供了丰富的 router 相关属性
先了解一个几个相关的api:
history.pushState 浏览器历史纪录添加记录
history.replaceState修改浏览器历史纪录中当前纪录
history.popState 当 history 发生变化时触发
```javascript
// 定义 Router
class Router {
    constructor () {
        this.routes = {};
        this.listerPopState()
    }
    
    init(path) {
        history.replaceState({path: path}, null, path);
        this.routes[path] && this.routes[path]();
    }
    
    route(path, callback){
        this.routes[path] = callback;
    }
    
    push(path) {
        history.pushState({path: path}, null, path);
        this.routes[path] && this.routes[path]();
    }
    
    listerPopState () {
        window.addEventListener('popstate' , e => {
            const path = e.state && e.state.path;
            this.routers[path] && this.routers[path]()
        })
    }
}

// 使用 Router

window.miniRouter = new Router();
miniRouter.route('/', ()=> console.log('page1'))
miniRouter.route('/page2', ()=> console.log('page2'))

// 跳转
miniRouter.push('/page2')  // page2
```

## 4、双向绑定
单向绑定：Model绑定到View，当我们用JavaScript代码更新Model时，View就会自动更新
双向绑定：在单向绑定的基础上，用户更新了View，Model的数据也自动被更新了，这种情况就是双向绑定
* 双向绑定的原理
数据层（Model）：应用的数据及业务逻辑
视图层（View）：应用的展示效果，各类UI组件
业务逻辑层（ViewModel）：框架封装的核心，它负责将数据与视图关联起来
ViewModel
它的主要职责就是：
数据变化后更新视图
视图变化后更新数据
它有两个主要部分组成：
监听器（Observer）：对所有数据的属性进行监听
解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数
* 双向绑定实现
1.new Vue()首先执行初始化，对data执行响应化处理，这个过程发生Observe中
2.同时对模板执行编译，找到其中动态绑定的数据，从data中获取并初始化视图，这个过程发生在Compile中
3.同时定义⼀个更新函数和Watcher，将来对应数据变化时Watcher会调用更新函数
4.由于data的某个key在⼀个视图中可能出现多次，所以每个key都需要⼀个管家Dep来管理多个Watcher
5.将来data中数据⼀旦发生变化，会首先找到对应的Dep，通知所有Watcher执行更新函数
流程图如下
![](./img/ViewModel.png) 

## 5、new Vue()的data可以是函数或者对象，组件data只能是函数
根实例对象data可以是对象也可以是函数（根实例是单例），不会产生数据污染情况。
组件实例对象data必须为函数，目的是为了防止多个组件实例对象之间共用一个data，产生数据污染。采用函数的形式，initData时会将其作为工厂函数都会返回全新data对象。

## 6、Vue中给对象添加新属性界面不刷新?
vue2是用过Object.defineProperty实现数据响应式，但是我们为obj添加新属性的时候，却无法触发事件属性的拦截。
解决方案：
Vue.set() ：Vue.set( target, propertyName/index, value )
Object.assign()：创建一个新的对象，合并原对象和混入对象的属性this.someObject = Object.assign({},this.someObject,{newProperty1:1,newProperty2:2 ...})
$forcecUpdated()：迫使Vue 实例重新渲染，仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件
* vue3是用过proxy实现数据响应式的，直接动态添加新属性仍可以实现数据响应式

## 7、Vue中的$nextTick怎么理解?
定义：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
我们可以理解成，Vue 在更新 DOM 时是异步执行的。当数据发生变化，Vue将开启一个异步更新队列，视图需要等队列中所有数据变化完成之后，再统一进行更新。
原理：
把回调函数放入callbacks等待执行
将执行函数放到微任务或者宏任务中
事件循环到了微任务或者宏任务，执行函数依次执行callbacks中的回调

## 8、列表组件中写 key，其作用是什么？
key是给每一个vnode的唯一id，也是diff的一种优化策略，可以根据key，更准确， 更快的找到对应的vnode节点。

## 9、剖析Vue原理&实现双向绑定MVVM
https://segmentfault.com/a/1190000006599500
VueJS 则使用 ES5 提供的 Object.defineProperty() 方法，监控对数据的操作，从而可以自动触发数据同步。
vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。




















