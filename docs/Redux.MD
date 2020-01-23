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

从编写初始状态作为开始，开始编写reducer。reducer中需要根据action的type,执行不同的操作，并返回新的state。
### 拆分reducer、合并reducer
拆分reducer：根据业务逻辑，将reducer按照数据领域进行拆分。
```js
function rootReducer(state=initialState,action){
    switch (action.type) {
        case ADD_TODO:
            return todoReducer(state.todos,action);
            break;
        case ADD_USER:
            return userReducer(state.user,action);
            break;
        default:
            break;
    }
}
function todoReducer(state,action){
    switch (action.type) {
        case ADD_TODO:
            ...
            break;
        default:
            break;
    }
}


function userReducer(state,action){
    switch (action.type) {
        case ADD_USER:
            ...
            break;
        default:
            break;
    }
}
```
合并reducer：将子reducer合并到同一个reducer中,可以借助redux的combineReducer接口。

```js
function rootReducer(state = initialState,action){
    return {
        todos:todoReducer(state.todos,action),
        user:userReducer(state.user,action),
    }
}
// 使用redux提供的api combineReducer
// 将根reducer拆分成不同子reducer，用于处理state树的不同分支
const rootReducer = combineReducer({
    user:userReducer,
    todo:todoReducer,
});
```
```js
// combineReducer和普通合并reducer的写法对应关系
// a是state树中的a属性值，aReducer表示处理a的reducer，它接受第一个参数是a，不是完整的state
const rootReducer = combineReducer({
    a:aReducer,
    b:processB,
    key:keyReducer
}); 

export default function rootReducer(state,aciton) {
    return {
        a:aReducer(state.a,action),
        b:processB(state.b,aciton),
    };
}

```

## Store
联系state、action、reducer的一个场所。具有以下职责：  
- 维持应用的state
- 提供getState()获取state 
- 提供dispatch(action)来更新state
- 通过subscribe(listener)注册监听器
- 通过subscribe(listener)返回的函数注销监听器

根据已有的reducer创建store
```js
import { createStore } from 'redux';
import todoApp from './reducers'
let store = createStore(todoApp)
// createStore接受第2个参数作为state的初始值
let store = createStore(todoApp,window.STATE_FROM_SERVER)
```
### 发起action 进行测试
redux定义了处理的各类action的一系列的reducer，由于reducer都是纯函数，我们可以在没有UI的情况测试reducer的逻辑是否正常。

## 数据流
严格的单向数据流是redux的**设计核心**。  
Redux应用中的数据的生命周期遵循下面4个步骤：
1、调用store.dispatch(action)
2、Redux store 调用reducer
3、根reducer将多个子reducer输出的state合成一个单一的state树
4、Redux store保存了根reducer返回的单一state树

## 搭配React开发
### 安装react-redux
```sh
npm install --save react-redux
```
### 容器组件和UI组件
react-redux是基于容器组件和UI组件分离 的开发思想。

> 不必手写容器组件，可以借助react-redux的connect函数来生成

先编写展示组件，因为他们纯粹展示数据。无须考虑如何与redux交互。

然后编写容器组件，通过redux的connect函数来实现
```js

connect(mapStateToProps,mapDispatchToProps)(Todo)
```
connect的参数：
- mapStateToProps 把我们所需的state，从store中注入组件的props同名属性
- mapDispatchToProps 往组件的props注入分发某个动作的函数


### 传入store
借用react-redux的Provider组件，在根组件将store注入。所有容器组件都可以访问到store。

# 高级
## 异步action(redux-thunk)的使用方法
### action
以一个网络请求为例，涉及2个时间点：
- 发起请求: 
- 接受响应: 

### 设计state结构
```js
const state = {
    post:{
        // 请求 缓存相关
        isFetchting:false,
        isExpired:false
    }
}
```

### 编写同步reducer
```js
// redux/reducer/post.js
const initialState = {
    isFetchting:false,
}
export default function (state=initialState,action){
    switch (action) {
        case 'REQUEST_FETCH':

            return { isFetchting:true,...state};
        case 'RECEVE_FETCH':

            return { isFetchting:false,...state};
        default:
            break;
    }
}
```
设计*请求发起*和*接受响应*时对应的同步reducer
### 编写执行异步操作的action
```js
// redux/acitons/index.js
export function addAddressAysnc(data){
    // redux-thunk 接受这个回调，并传入dispatch。运行我们在一个异步操作过程再次触发dispatch
    return function (dispatch) {
        dispatch({type:'REQUEST_FECTH'});
        return fetch('./data.json').then(response => response.json);
    }
}
```
这个特殊action借助promise把一些异步操作封装在一个事务中，同时返回处理结果。
### 异步action调用
```js
// index.js
import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { addAddressAysnc } from './redux/actions/index.js';
const store = createStore(reducers,applyMiddleware(thunkMiddleware));
store.dispatch(addAddressAysnc()).then( json => console.log('json :', json););
```
1.引入redux-thunk
2.在生成store时，应用中间件thunkMiddleware
3.通过store.dispatch()调用刚才编写的特殊action，来验证`使用redux-thunk`是否成功


### 连接到UI
使用react-redux提供的mapDispatch函数。

## 异步数据流

## Middleware
Q:使用redux-thunk与不使用的区别？
A:
