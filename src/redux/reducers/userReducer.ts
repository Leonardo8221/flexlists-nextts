import { createStore, applyMiddleware } from 'redux';
// Define the initial state
const initialState = {
  userProfile:undefined
};
// Define the reducer
const userReducer = (state = initialState, action: any) => {
    switch (action.type) { 
      case 'SET_USER_PROFILE':
        return { ...state, userProfile: action.payload };
      
      default:
        return state;
    }
  };
export default userReducer