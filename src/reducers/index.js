import { combineReducers } from 'redux';
import baseUrl from './baseUrl';
import auth from './auth';
import invests from './invests';

export default combineReducers({
  baseUrl,
  auth,
  invests,
});
