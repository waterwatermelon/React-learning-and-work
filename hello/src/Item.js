import React,{Component} from 'react';

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
        </div>  
        )
    }
}

export default Item;