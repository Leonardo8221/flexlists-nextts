// Define the initial state
const initialState = {
  currentView:undefined,
  users: [],
  userGroups:[],
  columns: [
  ],
  page:undefined,
  limit:undefined,
  filters: [
  ],
  sorts: [
  ],
  rows: [
  ],
  count:0
};
const viewReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'SET_CURRENT_VIEW':
        return { ...state, currentView: action.payload };
      case 'SET_VIEW_USERS':
          return { ...state, users: action.payload };
      case 'SET_VIEW_USER_GROUPS':
        return { ...state, userGroups: action.payload };
      case 'SET_COLUMNS':
        return { ...state, columns: action.payload };
      case 'SET_FILTERS':
        return { ...state, filters: action.payload };
      case 'SET_SORTS':
        return { ...state, sorts: action.payload };
      case 'SET_ROWS':
        return { ...state, rows: action.payload };
      case 'SET_PAGE':
        return { ...state, page: action.payload };
      case 'SET_LIMIT':
        return { ...state, limit: action.payload };
      case 'SET_COUNT':
        return { ...state, count: action.payload };
      default:
        return state;
    }
  };
  export default viewReducer