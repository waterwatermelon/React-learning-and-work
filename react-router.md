# react-router 4 笔记
## Router
    Router是一个容器，用于包裹Route。一个Route即为一个url，Route里面会包裹一个组件。当在浏览器里面输入url，就会跳转到相应的Route
    并显示相关组件。
    ？？？url嵌套
    ？？？ route的匹配算法
```javascript
// 一个Router里面包含多个Route
<Router>
    {/*此处需要包裹一个div，因为Router要求只有一个子组件。*/}
    <div>
        <Route path='' component={}/>
        <Route />
        <Route />
    </div>
</Router>
```
## Router和History的种类
- HashRouter、HashHistory
- BroswerRouter、BroswerHistory
- MemoryRouter、createMemeryHistory
HashHistory与BroswerHistory的区别：url不同。
- 使用hashHistory,浏览器的url是这样的：/#/user/liuna?_k=adseis
- 使用BrowserHistory,浏览器的url是这样的：/user/liuna
- 推荐使用BroswerHistory
## 控制浏览器url的方式
### 标签控制
通过<Switch/><Link/><Redirect/>这三个标签控制

```js
// ？？？未知
<Switch>
    <Route/>
    <Route/>
    <Route/>
</Switch>
// 直接跳转到该url
<Link to={targetUrl} {...rest}/>
// 重定向将使用新url去覆盖旧url。
<Redirect to={targetURL}{...rest}/>
```
### JS控制
JS通过控制history对象（HTML5开放的浏览器API），来改变浏览器的url。
```js
// 1.将新的url压入浏览记录
this.props.history.push(targetUrl);
// 2.用新的url替换当前的url
this.props.history.replace(targetUrl);
```
### history对象的属性与方法
- length:number 浏览历史中的条目数
- action:string 路由跳转到当前页面执行的动作，比如push,pop,replace
- location:object 表示当前访问地址的信息，包含如下字段
  - pathname:string URL路径
  - search:string URL中的查询字符串
  - hash:string URL中的hash片段
  - state:
- push(path[,state])
- replace(path[,state])
- go(n)将history堆栈的指针往前移n次
- goBack()
- goForward()
- block(prompt)
## Route 的使用介绍
- exact 表示精确匹配
## Link和NavLink
    二者差不多，但是NavLink提供的API更多而已。可作用类似于HTML中a标签。

### Link的用法
```js
// 1.to接受字符串
<Link to={'/courses'}></Link>
// 2.to接受对象
<Link to={{
    pathname:'/courses',
    search:'?name=anna',
    hash:'#the-hash',
    state:{myState:true}
}}></Link>
```
### NavLink的用法
    它可为当前选中的路由设置类名、样式以及回调函数。
```js
<NavLink exact to={targetURL} activeClassName={your-custome-class-name}/>
```
### match 
是在使用Router之后，被放入到？的this.props中的属性。  
它包含的属性如下：
- isExact:boolean
- params:object url中匹配动态路由的部分
- path:string 匹配到的路由规则
- url:string  请求的url
### Switch
用来包裹路由Route，它里面不能放置其他元素，用来显示一个路由。

## 基础用法
### 路由配置
### 路由匹配原则
- 路由嵌套关系
- 路径语法
- 优先级
#### 路由嵌套关系
React-Router使用路由嵌套的概念，让开发者定义view的嵌套。首先深度遍历路由配置，找寻匹配url的路由，然后渲染对应组件。如果没找到匹配的路由，就不渲染页面。
```js
//？？Router如何处理path属性为空的路由
<Route component={NotFound}/>
```
#### 路由路径 即Route的path属性
path属性的值是匹配一个或者一部分url的字符串模式。
- :paramName 匹配url中位于/、?或者#后面的内容，命中的部分将被作为参数
- () 括号内部的内容会被看做可选内容
- × 匹配任意字符，直到遇到下一个字符或者整个url结尾，splat函数
```js
<Route path='/hello/:name' component={A}/> 
// 匹配/hello/sue和/hello/chieo
<Route path='/hello(/:name)' component={B}/>
// 匹配/hello,/hello/sue和/hello/chieo
<Route path='/hello/*.*' component={C}/>
// 匹配/hello/file.jpg、/hello/path/to/file.txt
```
- 相对路径，路由匹配时，完整的路径由它的全部祖先节点的路径和自身路径进行拼合。
- 绝对路径，直接取path的值与url进行匹配。
#### 优先级

### history
React-Router是建立在history基础之上。
#### browserHistory
browserHistory需要服务器配合
服务器：对所有get请求不进行处理，只渲染index.html。
### 默认路由IndexRoute
在没有匹配到子元素的时候，充当首页的路由。
### IndexLink
(尚未使用)
## 高级用法
### 动态路由
React-Router中的路径匹配以及组件加载都是异步完成的。
### 跳转前确认
React Router 提供一个 routerWillLeave 生命周期钩子函数，以拦截页面跳转行为或是对用户做出提示。分为2种：
- return false 取消跳转
- return 提示信息给用户
### 服务端渲染
### 组件的生命周期
在v4中路由组价的生命周期有如下对应关系  
|组件生命周期 | 路由钩子函数 |
|componentDidMount | onEnter |
|componentDidUpdate | onUpdate |
|componentWillUnmount | onLeave|
