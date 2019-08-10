# React引入样式的几种方式
## 内联样式的写法
将css以属性的方式写在React组件中
```jsx
<div style={{fontSize='16px'}}>
    hello
</div>
```
## 内部样式对象
``` js
render(){
    let mystyle = {
        width:'200px',
        fontSize:'16px'
    }
    return (
        <div style={mystyle}>
            hello
        </div>  
    )
}
```
## 从外部导入CSS文件
```css
/* example.css */
.mystyle{
    width:200px;
    font-size:16px;
}
```

```js
import React from 'react';
//  写法1
import './example.css';
//  写法2 
require('./example.css');

render(){
    return (
        <div clasName='mystyle'>
            hello
        </div>  
    )
}
```
##  Method#1:多组件共享style对象
将多个样式对象封装到一个文件中，将所有样式style作为该文件的属性导出。
```js
// styles.js
const TodoComponent = {
  width: "300px",
  margin: "30px auto",
  backgroundColor: "#44014C",
  minHeight: "200px",
  boxSizing: "border-box"
}
const Header = {
  padding: "10px 20px",
  textAlign: "center",
  color: "white",
  fontSize: "22px"
}
const ErrorMessage = {
  color: "white",
  fontSize: "13px"
}
const styles = {
  TodoComponent: TodoComponent,
  Header: Header,
  ErrorMessage: ErrorMessage
}
module.exports = styles;
```
```js
import styles from './styles';
class ToDoApp extends React.Component {
  // ...
  render() {
    return (
      <div style={styles.TodoComponent}>
        <h2 style={styles.Header}>ToDo</h2>
        <div>
          <Input onChange={this.handleChange} />
          <p style = {styles.ErrorMessage}>{this.state.error}</p>
          <ToDoList value={this.state.display} />
        </div>
      </div>
    )
  }
}
```
## Method#2:Styled Components
    通过此方法，借助styled-components组件来编写一个可复用的具有样式的组件。
### 使用步骤

- step 1 安装
```bash
npm install --save styled-components
```
- step 2 使用
在需要使用的样式文件中引入。
```js
// 样式css styles.js
import styled from 'styled-components';
const TodoComponent=styled.div`
    background-color:#abcdef;
    font-size:16px;
`;
```
```js
// 组件js  
import styled from 'styled-components';

const TagComponent = styled.div`
  background-color: #44014C;
  width: 300px;
  min-height: 200px;
  margin: 30px auto;
  box-sizing: border-box;
`;

const Header = styled.h2`
  padding: 10px 20px;
  text-align: center;
  color: white;
  fontSize: 22px
`;

const ErrorMessage = styled.p`
  color: white;
  font-size: 13px;
`;

class ToDoApp extends React.Component {
  // ...
  render() {
    return (
      <TagComponent>
        <Header>ToDo</Header>
        <div>
          <Input onChange={this.handleChange} />
          <ErrorMessage>{this.state.error}</ErrorMessage>
          <ToDoList value={this.state.display} />
        </div>
      </TagComponent>
    )
  }
}
```
## Method#3：CSS Module
一个CSS模块就是一个CSS文件，在此CSS文件中，所有类名和动画名都被限制在当前文件中，有可能产生冲突。  
CSS模块能解决这个问题，CSS类只会在用到它们的组件上生效。一个CSS模块其实一个编译过的.css文件，编译结果是一个是对类名加版本号的css文件，另一个是将新类名和原始类名进行映射的js对象。
### 举例说明
```css
/* style.css */
.error-message{
    color:red;
    font-size:16px;
}
/* 编译结果 */
.error-message_keyname{
    color:red;
    font-size:16px;
}
```
```js
// 组件js
import styles from './styles.css'
class Message extends React.Component{
    render(){
        return (
            <p style={styles.error-message}>
                I am an error message.
            </p>
        )
    }
}
```
### 使用说明??
## 样式框架
- Ant-Design 企业级框架
