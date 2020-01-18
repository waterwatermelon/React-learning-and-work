import React from 'react';
import Login from './Login';
import UserApp from './page//UserApp.js';
import AuthRoute from './AuthRoute';
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
      </Switch>
    </Router>
  );
}

export default App;
