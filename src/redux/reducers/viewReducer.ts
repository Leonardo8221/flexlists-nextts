// Define the initial state
const initialState = {
  currentView:undefined
};
const viewReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_CURRENT_VIEW':
        return { ...state, currentView: action.payload };

      default:
        return state;
    }
  };
  export default viewReducer