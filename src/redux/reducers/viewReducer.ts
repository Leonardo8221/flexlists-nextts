// Define the initial state
const initialState = {
  currentView:undefined,
  users: []
};
const viewReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_CURRENT_VIEW':
        return { ...state, currentView: action.payload };
      case 'SET_VIEW_USERS':
          return { ...state, users: action.payload };
      default:
        return state;
    }
  };
  export default viewReducer