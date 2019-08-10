
# Redux 介绍
    Redux试图让state的变化可预测。
##　核心概念
    有一个核心的state存放应用的所有状态，当应用想要修改state的时候，需要像redux发起一个动作，即dispatch(action={type:'',playload})。redux根据action的type来调用具体的reducer函数来处理本次动作。redux怎么将state的变动告知视图层React Component呢？
## 三大原则
### 单一数据源
    整个应用的state被存放在一个单一的object tree中，并且该object tree只存放在单一的store中。
### State是只读
    唯一改变state的方法就是触发action。（action是一个描述已发生事件的对象。)该原则确保视图层和网络都不能直接修改state，只能表示某种修改意图。所有修改都被集中化处理。由于action的普通对象，因此，它们可以被打印、序列化、存储、后期调试时回放。
### 使用纯函数执行修改
    为了执行对应action对state的修改行为，需要编写reducer。（reducer只是纯函数）
## Redux 基础
## action
### action的定义
action是数据从应用传到store的有效荷载。它是store数据**唯一**来源。
### 用法
通过store.dispatch()将action传递给store。
### 数据格式
```js
{
    type:'ADD_TODO',
    text:'for example'
}
```
约定：1.action内部必须要有一个type字段。（type可定义成字符串常量）  
tip：在大型应用中，可将所有的action的type定义在一个模板文件
### action创建函数
```js
// 一个单纯返回action对象的函数
function addTodo(text){
    return {
        type:'ADD_TODO',
        text
    }
}
// 这种写法使得action创建函数便于移植和测试
```

## reducer
reducer指定应用状态的变化如何响应action，并发送到store。它是一个纯函数（纯函数定义：1.不依赖外部环境2.不产生副作用3.函数与外界只通过传递参数进行交互），接收旧的state以及action。返回新的state
```js
(previousState,action)=>newState
```
### 保持reducer的纯净
不在reducer中执行以下操作：
- 修改传入参数
- 执行有副作用（定义：可能产生不可预计的结果）的函数，如：调用api和路由跳转
- 调用非纯函数，如Date.now()、Math.random()
### 设计state结构
state有UI相关和非UI相关的数据，应该将二者分开。
### 拆分reducer、合并reducer
## Store
联系state、action、reducer的一个场所。具有以下职责：  
- 维持应用的state
- 提供getState()获取state 
- 提供dispatch(action)来更新state
- 通过subscribe(listener)注册监听器
- 通过subscribe(listener)返回的函数注销监听器
根据已有的reducer创建store
```js
import {createStore} from 'redux';
import todoApp from './reducers'
let store = createStore(todoApp)
// createStore接受第2参数作为state的初始值
let store = createStore(todoApp,window.STATE_FROM_SERVER)
```
### 发起action进行测试
## 数据流
严格的单向数据流是redux的**设计核心**。  
Redux应用中的数据的生命周期遵循下面4个步骤：
1、调用store.dispatch(action)
2、Redux store 调用reducer
3、根reducer将多个子reducer输出的state合成一个单一的state树
4、Redux store保存了根reducer返回的单一state树
