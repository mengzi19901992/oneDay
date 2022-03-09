https://juejin.cn/post/6844903998537859086
## 1、了解Webpack相关
* 什么是webpack
Webpack是一个模块打包器(bundler)。
在Webpack看来, 前端的所有资源文件(js/css/img/less/json...)都会作为模块处理
它将根据模块的依赖关系进行静态分析，生成对应的静态资源
* 理解Loader
Webpack 本身只能加载JS模块，如果要加载其他类型的文件(模块)，就需要使用对应的loader 进行转换/加载
Loader 本身也是运行在 node.js 环境中的 JavaScript 模块
它本身是一个函数，接受源文件作为参数，返回转换的结果
loader 一般以 xxx-loader 的方式命名，xxx 代表了这个 loader 要做的转换功能，比如 json-loader。
* 配置文件(默认)
webpack.config.js : 是一个node模块，返回一个 json 格式的配置信息对象
* 插件
插件件可以完成一些loader不能完成的功能。
插件的使用一般是在 webpack 的配置信息 plugins 选项中指定。
Webpack 本身内置了一些常用的插件，还可以通过 npm 安装第三方插件
* 创建webpack.config.js
```javascript
module.exports = {
  entry: "./entry.js",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader"}  //所有css文件声明使用css-loader和style-loader加载器
    ]
  }
};
```

### 2.1 手写webpack loader
loader从本质上来说其实就是一个node模块。相当于一台榨汁机(loader)将相关类型的文件代码(code)给它，根据我们设置的规则，经过它的一系列加工后还给我们加工好的果汁(code)。
loader编写原则
● 单一原则: 每个 Loader 只做一件事；
● 链式调用: Webpack 会按顺序链式调用每个 Loader；
● 统一原则: 遵循 Webpack 制定的设计规则和结构，输入与输出均为字符串，各个 Loader 完全独立，即插即用；
在日常开发环境中，为了方便调试我们往往会加入许多console打印。但是我们不希望在生产环境中存在打印的值。那么这里我们自己实现一个loader去除代码中的console
知识点普及之AST。AST通俗的来说，假设我们有一个文件a.js,我们对a.js里面的1000行进行一些操作处理,比如为所有的await 增加try catch,以及其他操作，但是a.js里面的代码本质上来说就是一堆字符串。那我们怎么办呢，那就是转换为带标记信息的对象(抽象语法树)我们方便进行增删改查。这个带标记的对象(抽象语法树)就是AST。
npm i -D @babel/parser @babel/traverse @babel/generator @babel/types
● @babel/parser 将源代码解析成 AST
● @babel/traverse 对AST节点进行递归遍历，生成一个便于操作、转换的path对象
● @babel/generator 将AST解码生成js代码
● @babel/types通过该模块对具体的AST节点进行进行增、删、改、查
新建drop-console.js
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')
module.exports=function(source){
  const ast = parser.parse(source,{ sourceType: 'module'})
  traverse(ast,{
    CallExpression(path){ 
      if(t.isMemberExpression(path.node.callee) && t.isIdentifier(path.node.callee.object, {name: "console"})){
        path.remove()
      }
    }
  })
  const output = generator(ast, {}, source);
  return output.code
}
如何使用
const path = require('path')
module.exports = {
  mode:'development',
  entry:path.resolve(__dirname,'index.js'),
  output:{
    filename:'[name].[contenthash].js',
    path:path.resolve(__dirname,'dist')
  },
  module:{
    rules:[{
      test:/\.js$/,
      use:path.resolve(__dirname,'drop-console.js')
      }
    ]
  }
}
实际上在webpack4中已经集成了去除console功能，在minimizer中可配置 去除console
附上官网 如何编写一个loader 
### 2.2 手写webpack plugin
在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过Webpack提供的API改变输出结果。那么它与loader的区别是什么呢？上面我们也提到了loader的单一原则,loader只能一件事，比如说less-loader,只能解析less文件，plugin则是针对整个流程执行广泛的任务。
一个基本的plugin插件结构如下
class firstPlugin {
  constructor (options) {
    console.log('firstPlugin options', options)
  }
  apply (compiler) {
    compiler.plugin('done', compilation => {
      console.log('firstPlugin')
    ))
  }
}
module.exports = firstPlugin
compiler 、compilation是什么？
● compiler 对象包含了Webpack 环境所有的的配置信息。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。
● compilation对象包含了当前的模块资源、编译生成资源、变化的文件等。当运行webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。
compiler和 compilation的区别在于
● compiler代表了整个webpack从启动到关闭的生命周期，而compilation 只是代表了一次新的编译过程
● compiler和compilation暴露出许多钩子，我们可以根据实际需求的场景进行自定义处理
compiler钩子文档
compilation钩子文档
下面我们手动开发一个简单的需求,在生成打包文件之前自动生成一个关于打包出文件的大小信息
新建一个webpack-firstPlugin.js
class firstPlugin{
  constructor(options){
    this.options = options
  }
  apply(compiler){
    compiler.plugin('emit',(compilation,callback)=>{
      let str = ''
      for (let filename in compilation.assets){
        str += `文件:${filename}  大小${compilation.assets[filename]['size']()}\n`
      }
      // 通过compilation.assets可以获取打包后静态资源信息，同样也可以写入资源
      compilation.assets['fileSize.md'] = {
        source:function(){
          return str
        },
        size:function(){
          return str.length
        }
      }
      callback()
    })
  }
}
module.exports = firstPlugin
如何使用
const path = require('path')
const firstPlugin = require('webpack-firstPlugin.js')
module.exports = {
    // 省略其他代码
    plugins:[
        new firstPlugin()
    ]
}
执行 npm run build即可看到在dist文件夹中生成了一个包含打包文件信息的fileSize.md







