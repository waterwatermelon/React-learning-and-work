import React,{Component} from 'react';
import Todo from '../components/Todo'
class TodoList extends Component{
    render(){
        // let todoList = ['reading books','coding','exercise'];
        let todos = this.props.todos;
        return (
            <ul>
               {todos.map((item,idx)=>{
                   return <Todo todo={item} key={idx}/>;
               })}
            </ul>
        );

    }
}
export default TodoList;