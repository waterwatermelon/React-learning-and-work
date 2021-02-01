## 开发


1 修改react默认运行端口

修改package.json的start命令：
```json
- "start": "rescripts start",
+ "start": "PORT=3001 rescripts start",
```

2 使用ts编写组件，能够得到组件属性智能填充和枚举类型的智能提示
安装React React-dom的类型定义文件：
```
npm i @types/react
npm i @types/react-dom

```
安装ts
```
npm i -S typescript
```
添加tsconfig.json配置文件


[TypeScript 在 React 中使用总结_s2096828的博客-CSDN博客_ts在react中的使用场景](https://bl og.csdn.net/s2096828/article/details/83744677)



## 编译
