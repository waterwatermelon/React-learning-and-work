# React Native框架

> 当前版本：v0.71.0
新旧架构切换的版本？

## 重要术语介绍

### Javascript Core（JSC）

react-native在v0.70前使用的JavaScript引擎。

### Hermes

专门为 React Native 而优化的一个新式开源 JavaScript 引擎。

### Yoga

UI引擎，用于计算元素在屏幕上展示的位置。

### JSI

JavaScript interface

## react react-native之间的关系

### react

是一个UI渲染的JavaScript库。实现JSX写法，以xml格式定义UI结构。

实现了virtual dom 数据结构，使视图定义和具体渲染逻辑分离。比如说，浏览器使用`react-dom`来渲染，移动端APP使用`react-native`来渲染。

通过数据驱动渲染，还实现了著名的diff算法来比较，新旧数据对应视图的差异。

因此，react无法访问到一些低层的API。

### react native

rn接收react定义的virtual dom，调研桥接的API，转换成原生的UI控件，完成渲染。

## 新架构设计分析

> v0.71.0开始使用新架构

### Fabric

新的渲染系统，提升与宿主平台的可操作性。

名词解释：

- 宿主平台：react native嵌入的平台
- Fabric渲染器：存在于JavaScript层，调用C++代码暴露的接口。

新架构的受益：

- 类型安全：代码生成工具，使用JavaScript组件声明作为唯一事实源，生成C++结构体来持有props属性。
- 共享C++ core：
- 一致性：新的渲染系统是跨平台的
- 更快的启动速度：宿主平台的组件初始化，都是懒执行。
- JavaScript和宿主平台之间的数据序列更少：新的渲染系统使用JSI（JavaScript Interface）直接获取JavaScript数据。

### 渲染、提交与挂载流水线

### 视图拍平

视图拍平（View Flat)是react native渲染系统避免布局嵌套太深产生优化手段。

提升“只参与布局”类型的节点渲染性能，新的渲染系统会拍平或者合并这类节点。涉及到的属性有margin,padding,backgroundColor,opacity等等。

视图拍平是在渲染器对比阶段完成。

举例说明：

```jsx
<View> 
  <View style={{ margin: 12}}> 
    <View style={{ margin: 10 }}> 
    <Text> hello world</Text>
    </View>
  </View>
</View>
```

合并结果

```jsx
<NativeView style={{ margin: 22}}> 
  <NativeText>
    hello world
  </NativeText>
</NativeView> 
```

合并之后的原生UI节点数量变少了，但是界面视觉上没有差异。

### 线程模型

## 旧架构设计

|-|
|:-:|
|Javascript Code|
|Javascript VM(Javascript 引擎)|
|Android Bridge| IOS Bridge|
|Android API|IOS API|

- JavaScript层：处理用户事件、定义UI结构
- C++层：封装JavaScript引擎，用于运行JavaScript代码
- Java层：封装原生的UI渲染逻辑和底层功能调用
  - 核心jar包：react-native.jar

### Bridge

Bridge功能是JavaScript层和原生层的通信桥梁。许多原生模块的接口，通过Bridge的封装并注入到JavaScript引擎，供JavaScript调用。

模块介绍

### RN中的线程

- ui thread 负责UI渲染、用户行为的监听
- js thread 运行JavaScript引擎（JavaScript Core或Hermes），解析并JavaScript代码
- shadow thread
