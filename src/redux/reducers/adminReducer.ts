// Define the initial state
const initialState = {
    searchTypes:[]
  };
  const adminReducer = (state = initialState, action: any) => {
      switch (action.type) {
        case 'SET_SEARCH_TYPES':
          return { ...state, searchTypes: action.payload }
        default:
          return state;
      }
    };
    export default adminReducer