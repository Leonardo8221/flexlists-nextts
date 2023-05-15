import { combineReducers } from 'redux';
import fieldDefinitionReducer from './fieldDefinitionReducer';
import messageReducer from './messageReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  fieldDefinition: fieldDefinitionReducer,
  message:messageReducer,
  user:userReducer
});

export default rootReducer;