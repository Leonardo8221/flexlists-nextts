const initialState = {
  dateFormat: ''
};

const dateFormatReducer = (state = initialState, action: any) => {
    switch (action.type) { 
      case 'SET_DATE_FORMAT':
        return { ...state, dateFormat: action.payload };
      
      default:
        return state;
    }
  };
export default dateFormatReducer