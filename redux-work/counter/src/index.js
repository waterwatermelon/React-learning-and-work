import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Counter from './components/Counter';

import {createStore} from 'redux';
import reducer from './reducers/counter'
const store = createStore(reducer);
const rEl =  document.getElementById('root');
const render =()=> ReactDOM.render(
    <Counter count={store.getState()} 
    Increment={()=>store.dispatch({type:'INCREMENT'})}/>,
    rEl);

render();
store.subscribe(render);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
