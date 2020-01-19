import React,{Component} from 'react';
class AddressDetail extends Component{

    render(){
        return (
            <div>
                <form>
                    <p>省份：</p>
                    <p>街道：</p>
                    <p>选择社区：</p>
                    <p><button>保存</button></p>
                </form>
            </div>
        );
    }
}

export default AddressDetail;