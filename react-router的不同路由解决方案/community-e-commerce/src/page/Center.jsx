import React,{Component} from 'react';
import MainLayout from '../layout/MainLayout.jsx';
import { Link } from 'react-router-dom';
class Center extends Component{

    render(){
        return (
            <MainLayout>
                user center 
                <ul>
                    <li><Link to="/user/address/list">我的地址</Link></li>
                    <li><Link to="/user/coupon/list">我的卡券</Link></li>
                    <li><Link to="/user/family/list">我的家人</Link></li>
                </ul>
            </MainLayout>
        );
    }
}

export default Center;