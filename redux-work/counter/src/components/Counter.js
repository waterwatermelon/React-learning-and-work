import React,{Component} from 'react';
class Counter extends Component{
    constructor(){
        super();
        this.state={
            count:0
        }
    }
    handleIncrement=()=>{
        let count = this.state.count;
        count++;
        this.setState({
            count
        });
    }
    handleDecrement=()=>{
        let count = this.state.count;
        count--;
        this.setState({
            count
        });
    }
    render(){
        let {count,Increment} = this.props;
        return(
            <p>
                {count}
                {/* <button onClick={this.handleIncrement}>+</button> */}
                <button onClick={Increment}>+</button>
                <button onClick={this.handleDecrement}>-</button>
            </p>

        )
    }
}
export default Counter;