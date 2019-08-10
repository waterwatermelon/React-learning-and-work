import React,{Component} from 'react';
import {Button} from 'antd';
class Title extends Component{
    static defaultProps={
        title:''
    }
    // componentDidMount(){
    //     //undefined
    //     console.log('history',this.props.history);
    // }
    render(){
        return (
            <h2 className="title">
                {this.props.title}
            </h2>
        )
    }
}
export default Title;