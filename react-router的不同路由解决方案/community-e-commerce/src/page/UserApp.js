import React from 'react';
import Order from './Order/Order.jsx';
import Cart from './Cart.jsx';
import Center from './Center.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Main from './Main/Main.jsx';
import Product from './Product.jsx';
import Pay from './Pay/Pay.jsx';
import Coupon from './Coupon/Coupon.jsx';
import Address from './Address/AddressList.jsx';
import AddressDetail from './AddressDetail';
import NotFound from './NotFound.jsx';
import Refund from './Refund.jsx';
import Family from './Family/Family.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/user/main' component={Main} />
        <Route path='/user/product/detail/' component={Product} />
     
        <Route path='/user/order/list' component={Order} />
        <Route path='/user/order/refund' component={Refund} />
        <Route path='/user/order/pay' component={Pay} />
     
        <Route path='/user/cart' component={Cart} />
     
        <Route path='/user/center' component={Center} />
        <Route path='/user/coupon/list' component={Coupon} />
        <Route path='/user/address/list' component={Address} />
        <Route path='/user/address/detail' component={AddressDetail} />
        <Route path='/user/family/list' component={Family} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
