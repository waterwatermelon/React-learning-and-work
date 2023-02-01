# 指南

环境：
- dumi v2
- nodejs 14+
使用`create-dumi`创建dumi项目，有三种模板：
- Static Site 静态站点
- React Library 包含组件库代码
- Theme Package dumi主题包项目

## 项目结构
```
├── docs               # 组件库文档目录
│   ├── index.md       # 组件库文档首页
│   ├── guide          # 组件库其他文档路由表（示意）
│   │   ├── index.md
│   │   └── help.md
├── src                # 组件库源码目录
│   ├── Button         # 单个组件
│   │   ├── index.tsx  # 组件源码
│   │   ├── index.less # 组件样式
│   │   └── index.md   # 组件文档
│   └── index.ts       # 组件库入口文件
├── .dumirc.ts         # dumi 配置文件
└── .fatherrc.ts       # father-build 的配置文件，用于组件库打包
```
静态站点项目不包含源码，可以忽略`src`目录。

## 页面渲染配置

通过FrontMatter属性，修改页面渲染配置。

### tdk配置 （title,description,keywords三元素）

```markdown
---
title: 组件库首页 # 配置页面标题,同时生成 <title> 标签
description: 描述 
keywords: [关键词] # 生成meta元素
---
```


### 首页配置
参考`./docs/index.md`文档

### 锚点目录配置

```markdown
---
toc: content
---
```

### demo分栏配置

```
---
demo:
  cols: 2
---
```

## 写组件的Demo

### 编写方式
#### 代码块 
在markdown语法块中编写完整的Demo代码。
#### 外部Demo
使用code标签引用外部Demo文件`<code src="/path/to/complex-demo.tsx"></code>`。

### 控制demo渲染
通过在源代码添加FrontMatter可以控制Demo的渲染，比如背景颜色、边距大小等属性。


## markdown增强

### Badge
dumi内置了Badge，可以在markdown内容旁边添加标签。