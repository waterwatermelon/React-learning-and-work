# React
用以构建用户视图的JavaScript库
## 声明式UI

## 组件化
创建维护自身状态的组件，并用这些组件构建更复杂的UI。
## 一次学习，随处编写
无论你使用的是什么技术栈，你都能随时引入React。你还可以用React-Native创建原生移动应用
## 前置知识
需要对HTML、JavaScript比较熟悉。至少需要熟悉JavaScript的函数、对象、数字，以及class的一些内容
## 入门教程
### 环境准备
#### 方式一 在浏览器中编写代码
#### 方式二 搭建本地开发环境
1.确保已安装了最新版本的Node.js  
2.跟着create-react-app的教程，创建一个新项目
```sh
create-react-app hello-world
```
3.从改写src中的文件开始你的创作
## React是什么？
```js
// 教学实例代码
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}
// 组件使用
<ShoppingList name="mark"/>
```
React有多种类型的组件？  
先从React.Component的子类讲起：
ShoppingList是一个React组件类型。一个组件会接受一些参数，我们这些参数叫做props，然后通过render方法返回需要展示的视图结构，实际上就是一个React元素，只是我们使用JSX语法将其轻量化。而每一个React元素都是一个JavaScript对象，我们可以将其保存在变量中或者作为参数传递。

## 为什么不变性在React中特别重要
```js
// 1.直接修改数据
let player = { score:1,name:"sue"}
player.score = 2;
// 2.用新数据替换旧数据
let player = { score:1,name:"sue"}
let newPlayer = { ...player, score:2}
player = newPlayer;
```

不直接修改数据的好处
- 简化复杂的功能：使复杂的特性更容易实现。如“时间旅行”
- 容易跟踪到数据改变。跟踪不可变数据的变化相对来说，容易一点。如果发现对象变成一个新对象，那么我们可以知道数据发生了改变。
- 确定在React中何时重新渲染。可以帮助我们在React中创建纯组件，以及帮助我们确定何时重新渲染组件

## 函数组件
如果你想写的组件只包含render函数，并且不包含state，那么使用*函数组件*会容易一点。我们可以定义函数，这个函数接受props作为参数，然后返回需要渲染的元素。
```js
class Square extends React.Component{
  render(){
    return(
      <button 
        className="square"
        onClick={props.onClick}
      >
      {props.value}
    </button>
    )
  }
}
// 函数组件，等同于上述class的写法
function Square(props){
  return(
    <button 
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  ) 
}
// 使用Square组件
<Square value={1} onClick={this.handleClick}>
```
