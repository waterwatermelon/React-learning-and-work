## 基本信息
解析react-scripts包的源码 版本:4.0.3

## 项目结构
```
├── bin
│   └── react-scripts.js 入口脚本
├── config  配置文件
│   ├── env.js 
│   ├── getHttpsConfig.js
│   ├── jest
│   ├── modules.js
│   ├── paths.js
│   ├── pnpTs.js
│   ├── webpack.config.js webpack配置工厂
│   └── webpackDevServer.config.js webpack开发服务器配置
├── lib
│   └── react-app.d.ts
├── LICENSE
├── package.json
├── README.md
├── scripts 
│   ├── build.js 源代码构建脚本
│   ├── eject.js 
│   ├── init.js  create-react-app init命令调用的脚本
│   ├── start.js 启动项目脚本
│   ├── test.js
│   └── utils    工具函数封装
├── template JavaScript项目的模板
│   └── README.md
└── template-typescript TypeScript项目的模板
    └── README.md
```

## 执行流程
执行命令`react-scripts xx`时，调用`./bin/react-scripts.js`脚本。该脚本根据传入的第2个参数，调用`./scritps`目录下的对应脚本。

### eject

### build
1.设置环境变量`BABEL_ENV`、`NODE_ENV`为`production`
2.加载自定义环境变量
3.检查必要的入口文件（作为入口的index.html和js）

4.通过配置工厂生成配置
5.检查browserlist，如果没有配置则结束。如果存在，则进行下一步
6.计算上一次编译结果的文件和大小
7.清空编译目录的内容，将public目录的文件拷贝过来
8.构建：
8.1 传入配置，创建webpack编译器compiler
8.2 运行编译器compiler
8.3 编译失败，输出异常日志；编译成功，输出编译结果的信息
9.编译结束，调用回调函数
9.1 编译失败，输出异常日志，异常退出进程
9.2 编译成功，输出bundle等文件大小的编译结果

### start

1.设置环境变量`BABEL_ENV`、`NODE_ENV`为`development`
2.加载自定义的环境变量配置
3.检查必要的入口文件（index.html和js）
4.读取ip和port
5.检测是否配置了browserlist。如果最终没有browserlist，则退出。
6.查找可用端口：先确定默认端口是否可用，如果没有则顺延到下一个端口。
7.配置createCompiler的options并执行，返回一个compiler
8.载入代理配置，并配置代理服务
9.创建开发服务配置，具体的配置代码在`webpackDevServer.config.js`
10.运行开发服务器，返回一个devServer
11.启动开发服务器，如果是在交互式模式下清理控制台，再打开浏览器

### 配置工厂 - webpack.config.js

### 读取环境参数 env.js
项目中的环境配置文件：

```sh
# 按照如下顺序生效
.env 
.env.local 
.env.[NODE_ENV]
.env.[NODE_ENV].local
```
- getClientEnvironment(publicUrl): { raw, stringified }
1.按照优先级，读取上述文件的环境参数。并将他们挂载到`process.env`。
2.返回以`REACT_APP`前缀的key。

## 参考链接
[react-scripts流程及源码分析 - 掘金](https://juejin.cn/post/6844903951893004296)

源码： react-scripts-fork-v4
