
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
│   ├── build.js 编译脚本
│   ├── eject.js 
│   ├── init.js
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

### start


### build
1.通过配置工厂生成配置
2.清空编译目录的内容，将public目录的文件拷贝过来
3.构建：
3.1 传入配置，创建webpack编译器compiler
3.2 运行编译器compiler
3.3 编译失败，输出异常日志；编译成功，输出编译结果的信息
4.编译结束，调用回调函数
4.1 编译失败，输出异常日志，异常退出进程
4.2 编译成功，输出bundle等文件大小的编译结果

### 配置工厂 - webpack.config.js

## 参考链接
[react-scripts流程及源码分析 - 掘金](https://juejin.cn/post/6844903951893004296)