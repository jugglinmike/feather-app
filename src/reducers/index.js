import { combineReducers } from 'redux';
import count from './count';
import url from './url';

export default combineReducers({ count, url });
