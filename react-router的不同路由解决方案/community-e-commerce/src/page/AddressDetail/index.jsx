import React,{Component} from 'react';
import { connect } from 'react-redux';
import { addAddressAsync } from '../../redux/actions/';
class AddressDetail extends Component{
    
    constructor(){
        super();
        this.handleSaveAddress = this.handleSaveAddress.bind(this);
    }
    handleSaveAddress(){
        const address = {
            id:3,
            community:'十里江湾',
            receiver:'沫沫',
            phone:'13700009999',
            detail:'福建省 泉州市 石狮市 风里街道仁里社区 134号',
            isSelf:true,
            isDefault:false,
        }; 
       
    }
    render(){
        return (
            <div>
                <form>
                    {/* <p>省份：</p>
                    <p>街道：</p>
                    <p>选择社区：</p> */}
                    <p><button onClick={this.handleSaveAddress}>保存</button></p>
                </form>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(null,mapDispatchToProps)(AddressDetail);