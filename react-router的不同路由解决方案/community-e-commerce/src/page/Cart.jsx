import React,{Component} from 'react';
import MainLayout from '../layout/MainLayout.jsx';
import { Link } from 'react-router-dom';
class Cart extends Component{

    render(){
        return (
            <MainLayout>
                购物车
                <Link to="/user/order/pay">立即付款</Link>
            </MainLayout>
        );
    }
}

export default Cart;