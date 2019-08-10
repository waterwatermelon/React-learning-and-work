import React,{Component} from 'react'; 
import Item from './Item';

class List extends Component{

    render(){
        const list = this.props.list;
        return(
             
            <div>
                {list.map((item,i)=>{
                    return <Item data = {item} key={i}></Item>
                })}
            </div>
        )
    }
}
export default List;