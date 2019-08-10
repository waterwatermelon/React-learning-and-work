import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions'
class AddTodo extends Component {
    state = {
        title: ''
    }
    handleInputChange = (e) => {
        let title = e.target.value;
        this.setState({
            title
        })
    }
    handleInputClick = () => {
        let { dispatch } = this.props;
        let { title } = this.state;
        dispatch(addTodo({title,completed:false}));
        this.setState({
            title:''
        })
    }
    render() {
        let { title } = this.state;
        return (
            <div>
                <input value={title} onChange={this.handleInputChange} />
                <button onClick={this.handleInputClick}>add</button>
            </div>
        );
    }
}

// connect()(YourComponent) 会将dispatch注入到组件的props
export default connect()(AddTodo);
