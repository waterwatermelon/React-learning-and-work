# React-Router
保持UI与URL同步的一个React实现的库。
# 简介
## 最简单的使用案例
```jsx
import React from 'react';
import { render } from 'react-dom';
// 导入部分react router的组件
import { Router,Route,Link } from 'react-router';

const App = React.createClass({
    render(){
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to='/about'>About</Link></li>
                    <li><Link to='/inbox'>Inbox</Link></li>
                </ul>
            </div>
        )
    }
});

React.render((
    <Router>
        <Route path='/' component={App} >
            <Route path='about' component={About}/>
            <Route path='inbox' component={Inbox}/>
        </Route>
    </Router>
),document.body);
```
对于完整的URL /about，React-Router会搭建出<App><About/></App>

下列routes等价于上述jsx所声明的路由定义：
```js
const routes = {
    path:'/',
    component:App,
    childRoutes:[
        {
            {path:'about',component:About},
            {path:'inbox',component:Inbox},
        }
    ]
}
React.render((<Router routes={routes} />),document.body);
```

# 基础
## 路由配置
路由配置是一条指令，指导router如何匹配url以及匹配后如何执行代码。
```jsx
// ... some component
React.render((
    <Router>
        <Route path='/' component={App}>
            <Route path='about' component={About} />
            <Route path='inbox' component={Inbox}>
                <Route path='message/:id' component={Message} />
            </Route>
        </Route>
    </Router>
),document.body);
```
通过上面的配置，React-Router知道如何渲染如下url
| URL | 组件 |
|-|-|
| / | App|
| /about | App -> About|
| /inbox | App -> Inbox|
| /inbox/message/:id | App -> Inbox -> Message|

### 添加首页
匹配到的URL没有匹配到对应子路由时，可以添加默认路由
```jsx
React.render((
    <Router>
        <Route path='/' component={App}>
            <IndexRoute component={Dashboard} />
            <Route path='about' component={About} />
        </Route>
    </Router>
),document.body);
```
| URL | 组件 |
|-|-|
| / | App -> Dashboard|
### 兼容旧的url（重定向）
```jsx
import { Redirect } from 'react-router'

React.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard} />
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox}>
        <Route path='/message/:id' component={Message}/>       
        <Redirect from='message/:id' to='/message/:id'/>
      </Route>
    </Route>
  </Router>
), document.body)
```
点击url:/inbox/message/5，会自动跳转url为/message/5
### 进入和离开的hook
Route 可以定义onEnter和onLeave。
触发的时机：
onEnter 由最外层的父路由开始，到最下层的子路由结束
onLeave 由最下层的子路由开始，到最外层的父路由结束

## 路由匹配原理
1.嵌套关系
2.它的路径语法
3.它的优先级

###　嵌套关系
React-Router 深度优先 遍历路由配置，来确定当前url匹配的路由，从而渲染出对应的组件。

### 路由语法
路由路径是一个匹配URL的一个字符串模式。
- :paramName 匹配一段位于/ ? #之后的url。命中部分将被作为参数
- () 在它内部的内容被认为是可选
- *匹配任意字符串（非贪婪）
相对路径与绝对路径：
- 路由路径使用了相对路径，那么完成的路径由所有祖先节点的路由路径 与 自身的路由路径 拼接而成。
- 使用绝对路径作为路由路径，Router进行路由匹配时，会忽视路由配置的嵌套关系。

### 优先级
多条兄弟路由都能匹配当前url，Router会命中前一条路由。

## history库 - React-Router的基础设施
React-Router建立在history这个库的基础之上。  
history能够将浏览器URL解析成location对象，router根据location进行路由匹配。  
三种history：
- browserHistory 
- hashHistory
- createMemoryHistory
### browserHistory 
它会操作浏览器的url，同时服务端也会接受对应请求，需要在服务端做好对应处理。

### hashHistory
它使用URL中hash（#）部分去创建路由。
比如 example.com/#/some/path

### createMemoryHistory
不会在地址栏被操作或者读取。可以实现服务端渲染？

## 默认路由 IndexRoute
默认路由用于 渲染没有匹配到子路由，但是父路由需要渲染子组件的情况。

# 高级用法
## 动态路由
动态加载路由配置、动态加载组件

## 跳转前确认

## 服务端渲染

## 组件生命周期
路由组件的生命周期与React组件的生命周期相同。

不同URL下，Router如何渲染组件。
路由配置：
```jsx
<Route path="/" component={App}>
  <IndexRoute component={Home}/>
  <Route path="invoices/:invoiceId" component={Invoice}/>
  <Route path="accounts/:accountId" component={Account}/>
</Route>
```
### 路由切换时，组件生命周期的变化情况
1.打开 '/'页面 App -> Home
|组件|生命周期|
|-|-|
|App|componentDidMount|
|Home|componentDidMount|
|Invoice|N/A|
|Account|N/A|
2.从 '/'跳转到'/invoice/123' App -> Invoice
|组件|生命周期|
|-|-|
|App|componentWillReceiveProps,componentDidUpdate|
|Home|componentWillUnmount,(componentDidUnmount ?)|
|Invoice|componentDidMount|
|Account|N/A|
- App会从router接收新的props（chidren、params、location）
- Home不再被渲染，它将被移除
- Invoice 首次被挂载

3.从 '/invoice/123'跳转到'/invoice/456' App -> Invoice
|组件|生命周期|
|-|-|
|App|componentWillReceiveProps,componentDidUpdate|
|Home|N/A|
|Invoice|componentWillReceiveProps,componentDidUpdate|
- App 更新props
- Invoice 更新props

## 组件外部跳转
### 在组件内部实现页面跳转
```js
this.context.router
```
### 在组件外部实现页面跳转
```jsx
// router config
import { Router,browserHistory } from'react-router';
import routes from './app/routes';

render(<Router history={browserHistory} routes={routes} />),el);
```
```js
// other file like redux
import { browserHistory} from  'react-router';

browserHistory.push('/some/path');
```




# 总结
React Router提供了一些API和hook，但是大部分没有用上。目前，只用了简单的路由配置。