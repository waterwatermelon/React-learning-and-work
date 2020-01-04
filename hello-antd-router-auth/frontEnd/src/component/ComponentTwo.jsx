import React, { Component } from 'react';
class componentTwo extends Component{
    componentDidMount() {
        console.log('component two fire [didMount]');
    }
    componentDidUpdate(){
        console.log('component two fire [didUpdate]');
    }
    render(){
        return(
            <div>
                组件二
            </div>
        )
    }
}

export default componentTwo;