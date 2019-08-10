import React,{Component} from 'react'; 
import Item from './Item';
import axios from 'axios';
import getResponse from './api/api';
class List extends Component{
    constructor(){
        super();
        this.state={
            list:[]
        }
    }
    
  
    render(){
        let list = this.props.list;
        // ||this.state.list;
        return(
             
            <div>
                {list.map((item,i)=>{
                    return <Item data = {item} key={i}/>
                })}
            </div>
        )
    }
}
export default List;