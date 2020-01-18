import React from 'react';
import Login from './Login.jsx';
// import UserApp from './page//UserApp.js';
// import Main from './page/Main.jsx';
// import Order from './page/Order.jsx';
// import Cart from './page/Cart.jsx';
// import Center from './page/Center.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' component={Login} />
        <AuthRoute component={UserApp} />
        {/* <Route path='/user/main' component={Main} />
        <Route path='/user/order' component={Order} />
        <Route path='/user/cart' component={Cart} />
        <Route path='/user/center' component={Center} /> */}
      </Switch>
    </Router>
  );
}

export default App;
