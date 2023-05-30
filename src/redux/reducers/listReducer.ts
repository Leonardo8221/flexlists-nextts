// Define the initial state
const initialState = {
    currentList:undefined
  };
const listReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_CURRENT_LIST':
        return { ...state, currentList: action.payload };

      default:
        return state;
    }
  };
  export default listReducer