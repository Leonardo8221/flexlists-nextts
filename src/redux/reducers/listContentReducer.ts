// Define the initial state
const initialState = {
    rows: [
    ]
  };
const listContentReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_ROWS':
        return { ...state, rows: action.payload };
      
      default:
        return state;
    }
  };
  export default listContentReducer