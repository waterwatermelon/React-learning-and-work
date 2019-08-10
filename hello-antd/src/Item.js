import React,{Component} from 'react';
import {Button} from 'antd';
import './Item.css';
class Item extends Component {

    render() {
        return (
        <div className="item">
            <div className="dp item-l">
                <img className="item-img" src={this.props.data.image} alt="" />
            </div>
            <div className="dp item-r">
                <p className="item-name">{this.props.data.name}</p>
                <p className="item-info">{this.props.data.info}</p>
            </div>
            <Button>编辑</Button>
           <div className='item-del'>X</div>
        </div>  
        )
    }
}

export default Item;