import { combineReducers } from 'redux';
import counter from './counter';
import address from './address';
import fetch from './fetch';

export default combineReducers({ fetch,address,counter});
