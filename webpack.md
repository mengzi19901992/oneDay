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









