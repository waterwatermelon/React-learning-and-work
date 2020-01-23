import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './redux/store';
// 模块加载 寻找路径的方式 ？
import { addNumber, testAsync } from './redux/actions/';
// import Empty from './public/Empty';

const dispatchResultOne = store.dispatch({ type:'ADD_NUMBER'});
const dispatchResultTwo = store.dispatch(testAsync());
console.log('dispatchResultOne :', dispatchResultOne);
console.log('dispatchResultTwo :', dispatchResultTwo);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
