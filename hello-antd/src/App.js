import React, { Component } from 'react';
import './App.less';
import Main from './Main';
import Test from './Test';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
class App extends Component {

  render() {
    return (
      <Router >
        <Switch >
          <Route path='/' component={Test}/>
          <Route path='/test' extra component={Main}/>
        </Switch>
      </Router>
      // <Login/>
    );
  }
}

export default App;
