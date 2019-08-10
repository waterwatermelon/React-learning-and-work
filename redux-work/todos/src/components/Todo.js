import React, { Component } from 'react';
import {connect} from 'react-redux';
import { toggleTodo } from '../actions';
class Todo extends Component {
    state = {
        completed:false
    }
    handleToggleComplete=()=>{
        // let completed = this.state.completed;
        // completed = !completed;
        // this.setState({
        //     completed
        // });
        console.log('handleToggle');
        let {dispatch} = this.props;
        let {title} = this.props.todo;
        dispatch(toggleTodo(title));
    }
    render() {
        let title = this.props.todo.title;
        let completed = this.props.todo.completed;
        return (
            <li style={completed ?{ textDecoration:'line-through'}:{}}
            onClick={this.handleToggleComplete}>
                {title}
            </li>
        );
    }
}
export default connect()(Todo);