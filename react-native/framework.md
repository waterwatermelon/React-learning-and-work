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

### 宿主平台

react native嵌入的平台。比如安卓、IOS。

## 新架构设计分析

> v0.71.0开始使用新架构

### Fabric

新的渲染系统，提升与宿主平台的可操作性。

新架构的收益：

- 类型安全：代码生成工具，使用JavaScript组件声明作为唯一事实源，生成C++结构体来持有props属性。
- 共享C++ core：
- 一致性：新的渲染系统是跨平台的
- 更快的启动速度：宿主平台的组件初始化，都是懒执行。
- JavaScript和宿主平台之间的数据序列更少：新的渲染系统使用JSI（JavaScript Interface）直接获取JavaScript数据。

### 渲染、提交与挂载（渲染流水线）

#### 初始渲染

以下面这个组件为例：

```jsx

function MyComponent() {
  return (<View> 
    <Text>hello world</Text>
  </View>);
}
```

`MyComponent`是React元素。在渲染过程中，React会将React组件简化？为宿主组件。

渲染（render) -> 提交(committed) -> 挂载(mount)

1 渲染阶段

渲染阶段是生成视图对应的虚拟数据结构，一般称作React影子树。

渲染器会为每一个React元素创建React影子节点。创建完React影子树，渲染器会触发一次React元素树的提交。

2 提交阶段

提交阶段完成2项工作： 布局计算 + 树的提升。

- 布局计算：计算每个React影子节点的位置和大小（x,y,width,height），布局计算是由yoga引擎实现。

- 树的提升：从新的影子节点变成要挂载的下一棵树（next tree)。

3 挂载阶段

挂载阶段就是将要挂载的下一棵树，以像素形式渲染在屏幕中。执行时间是UI线程的下一个tick（tick是CPU时间的最小单位）。

挂载阶段会完成3项工作：树对比 + 树提升 + 视图挂载。

- 树对比：对比已经渲染的树（previously render tree）和将要挂载的树之间的差异。对比结果将生成一系列视图变更的原子操作，比如createView、updateView、removeView等。

- 树提升：从要挂载的下一棵树到已渲染的树。

- 视图挂载：执行视图变更的原子操作。

#### React 状态更新

1 渲染阶段
生成新的React影子树。只复制新属性、新样式或者新子元素的React元素，任何没有因状态更新发生变动的React元素都不会被复制而成为共享节点。

2 提交阶段

- 布局计算：一种特殊情况就是：如果共享元素的父元素布局发生改变，可能导致共享元素的布局发生改变。因此，需要此共享节点会被复制出新的节点。其余情况与初始渲染一致。  

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

渲染器使用了三个不同线程：

- UI线程：唯一可以操作宿主视图的线程。
- JavaScript线程：执行react渲染阶段的线程。
- 后台线程：专门用于布局的线程。


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
