# Navigators
## Bottom Tabs
需要安装`@react-navigation/bottom-tabs`

### Tab.Navigator
props概览：
- id 
- initialRouteName
- screenOptions
- backBehavior
- detachInactiveScreens
- sceneContainerStyle
- tabBar 自定义导航栏组件

options可用于设置Tab.Navigator的screenOptions或者Tab.Screen的option，参数列举如下：
- title
- tabBarLabel
- tabBarShowLabel
- tabBarLabelPosition
- tabBarLabelStyle
- tabBarIcon
- tabBarIconStyle
- tabBarButton


# API
## route prop   
每个screen的component都会从props中接收route属性。

- key 屏幕的key
- name 屏幕的name
- path?:string 屏幕的路径
- params?:object 跳转时候定义的参数

## navigation prop   
每个screen的component都会从props中接收navigation属性。

API概览：
- navigate
- goBack
- reset
- setParams
- dispatch
- setOptions
- isFocused
- addListener

特定导航器类型提供的API：
1.stack 导航
- replace
- push
- pop
- popToTop
2.tab导航
- jumpTo
3.抽屉导航
- jumpTo
- openDrawer
- closeDrawer
- togglerDrawer

### 常用API
1 navigate(name, params) 跳转到新页面

2 goBack() 返回上一个页面

3 reset(state) 替换导航当前状态

4 setParams(params) 更新当前页面的params，效果等同react.useState

5 setOptions(options) 修改当前屏幕的options

### 事件
focus事件

### 高级API
1 dispatch(action) 触发一个动作 

2 canGoBack() 能否返回上一级页面

3 getParent() 获取父级导航

4 getState() 获取导航状态

## 动作列表
### 普通动作
概览：
一个动作对象包含以下属性：
- type:string 动作类型
- payload:object 动作的额外信息
- source?:string 源路由的key
- target?:string 

#### 常用动作
**1 navigate**
**2 reset**
**3 goBack**
**4 setParams**
