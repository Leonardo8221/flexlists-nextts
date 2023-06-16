// Define the initial state
const initialState = {
    searchTypes:[],
    isLoading:false
  };
  const adminReducer = (state = initialState, action: any) => {
      switch (action.type) {
        case 'SET_SEARCH_TYPES':
          return { ...state, searchTypes: action.payload }
        case 'SET_LOADING':
          return { ...state, isLoading: action.payload }
        default:
          return state;
      }
    };
    export default adminReducer