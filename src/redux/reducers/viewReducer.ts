// Define the initial state
const initialState = {
  currentView:undefined,
  users: [],
  userGroups:[]
};
const viewReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_CURRENT_VIEW':
        return { ...state, currentView: action.payload };
      case 'SET_VIEW_USERS':
          return { ...state, users: action.payload };
      case 'SET_VIEW_USER_GROUPS':
        return { ...state, userGroups: action.payload };
      default:
        return state;
    }
  };
  export default viewReducer