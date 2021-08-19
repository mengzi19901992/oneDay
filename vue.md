## 1、vue与react的区别？
* 数据流向的不同。react从诞生开始就推崇单向数据流，而Vue是双向数据流
* 数据变化的实现原理不同。react使用的是不可变数据，而Vue使用的是可变的数据
* 组件化通信的不同。react中我们通过使用回调函数来进行通信的，而Vue中子组件向父组件传递消息有两种方式：事件和回调函数
* diff算法不同。react主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。Vue 使用双向指针，边对比，边更新DOM

## 2、路由hash 模式实现
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
































