import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';
import {BrowserRouter,Route,Switch} from 'react-router-dom'; 
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <BrowserRouter >
        <Switch>  
            <Route exact path="/" component={Login}/>
            <Route  path="/login" component={Login}/>
            <Route  path="/index" component={App} />
        </Switch>
    </BrowserRouter>,
     document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
