import React,{Component} from 'react';
import {Button} from 'antd';
class Title extends Component{
    static defaultProps={
        title:''
    }
    
    render(){
        return (
            <h2 className="title">
                {this.props.title}
            </h2>
        )
    }
}
export default Title;