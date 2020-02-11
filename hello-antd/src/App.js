import React, { Component } from 'react';
import './App.css';
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
          <Route path='/test' component={Test}/>
          <Route path='/' extra component={Main}/>
        </Switch>
      </Router>
      // <Login/>
    );
  }
}

export default App;
