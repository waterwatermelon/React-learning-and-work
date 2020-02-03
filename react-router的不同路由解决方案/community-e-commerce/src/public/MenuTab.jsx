import React from 'react';
import {
    Link
} from 'react-router-dom';

/**
 * 菜单tab 固定在底部
 * @returns
 */
function MenuTab(props) {
  return (
    <div style={{ position:'fixed',bottom:0,left:0,right:0,display:'flex',height:props.height,background:'#bef'}}>
        <div style={{ flexGrow:1,textAlign:'center' }}><Link to='/user/main'>首页</Link></div>
        <div style={{ flexGrow:1,textAlign:'center' }}><Link to='/user/order/list'>订单</Link></div>
        <div style={{ flexGrow:1,textAlign:'center' }}><Link to='/user/cart'>购物车</Link></div>
        <div style={{ flexGrow:1,textAlign:'center' }}><Link to='/user/center'>我的</Link></div>
    </div>
  );
}

export default MenuTab;
