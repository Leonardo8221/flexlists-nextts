// Define the initial state
const initialState = {
    columns: [
    ],
    filters: [
    ],
    sorts: [
      {
        column: 'phase',
        content: 'Last - First'
      },
      {
        column: 'task_name',
        content: 'A - Z'
      }
    ]
  };
const listFieldReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_COLUMNS':
        return { ...state, columns: action.payload };
  
      case 'SET_FILTERS':
        return { ...state, filters: action.payload };
  
      case 'SET_SORTS':
        return { ...state, sorts: action.payload };
      
      default:
        return state;
    }
  };
  export default listFieldReducer