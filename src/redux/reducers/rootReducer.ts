import { combineReducers } from 'redux';
import messageReducer from './messageReducer';
import userReducer from './userReducer';
import viewReducer from './viewReducer';
import listReducer from './listReducer';

const rootReducer = combineReducers({
  message:messageReducer,
  user:userReducer,
  view:viewReducer,
  list:listReducer
});

export default rootReducer;