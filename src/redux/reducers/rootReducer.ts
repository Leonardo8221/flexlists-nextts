import { combineReducers } from 'redux';
import listFieldReducer from './listFieldReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';
import listContentReducer from './listContentReducer';

const rootReducer = combineReducers({
  fieldDefinition: listFieldReducer,
  listContent:listContentReducer,
  message:messageReducer,
  user:userReducer,

});

export default rootReducer;