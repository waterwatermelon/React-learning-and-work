import React,{Component} from 'react';
import MainLayout from '../../layout/MainLayout';
import { Link } from 'react-router-dom';

class Orders extends Component{

    render(){
        return (
            <MainLayout>
                <h2>
                    订单列表
                </h2>
                <Link to="/user/order/refund?orderId=2">要退款的订单</Link>
            </MainLayout>
        );
    }
}

export default Orders;