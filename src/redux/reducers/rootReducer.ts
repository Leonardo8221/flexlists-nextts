import { combineReducers } from 'redux';
import messageReducer from './messageReducer';
import userReducer from './userReducer';
import viewReducer from './viewReducer';

const rootReducer = combineReducers({
  message:messageReducer,
  user:userReducer,
  view:viewReducer
});

export default rootReducer;