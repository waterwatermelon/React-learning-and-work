import React,{Component} from 'react';
import MainLayout from '../layout/MainLayout.jsx';
class Product extends Component{
    componentDidMount(){
        // console.log('this.props :', this.props);
        console.log('this.props.location :', this.props.location);
        console.log('this.props.match :', this.props.match);
    }
    render(){
        return (
            <MainLayout>
                <div>
                    商品详情
                </div>
                <div><button>立即购买</button></div>
            </MainLayout>
        );
    }
}

export default Product;