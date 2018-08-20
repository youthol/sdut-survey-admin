import { combineReducers } from 'redux';
import baseUrl from './baseUrl';
import auth from './auth';

export default combineReducers({
  baseUrl,
  auth
});
