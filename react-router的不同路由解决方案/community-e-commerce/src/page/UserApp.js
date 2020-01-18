import React from 'react';
import Main from './Main.jsx';
import Order from './Order.jsx';
import Cart from './Cart.jsx';
import Center from './Center.jsx';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/user/main' component={Main} />
        <Route path='/user/order' component={Order} />
        <Route path='/user/cart' component={Cart} />
        <Route path='/user/center' component={Center} />
      </Switch>
    </Router>
  );
}

export default App;
