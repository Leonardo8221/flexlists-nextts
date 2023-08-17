// Define the initial state
const initialState = {
  currentView: undefined,
  users: [],
  viewGroups: [],
  columns: [
  ],
  // page:undefined,
  // limit:undefined,
  // filters: [
  // ],
  // sorts: [
  // ],
  rows: [
  ],
  count: 0,
  availableFieldUiTypes: [],
  message: {},
  viewTemplate:{},
  defaultPreset:{}
};
const viewReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_CURRENT_VIEW':
      return { ...state, currentView: action.payload };
    case 'SET_VIEW_USERS':
      return { ...state, users: action.payload };
    case 'SET_VIEW_GROUPS':
      return { ...state, viewGroups: action.payload };
    case 'SET_COLUMNS':
      return { ...state, columns: action.payload };
    // case 'SET_FILTERS':
    //   return { ...state, filters: action.payload };
    // case 'SET_SORTS':
    //   return { ...state, sorts: action.payload };
    case 'SET_ROWS':
      return { ...state, rows: action.payload };
    // case 'SET_PAGE':
    //   return { ...state, page: action.payload };
    // case 'SET_LIMIT':
    //   return { ...state, limit: action.payload };
    case 'SET_COUNT':
      return { ...state, count: action.payload };
    case 'SET_AVAILABLE_FIELD_UI_TYPES':
      return { ...state, availableFieldUiTypes: action.payload };
    case 'SET_MESSAGE':
      //console.log('message', action.payload, state)
      return { ...state, message: action.payload }
    case 'SET_VIEW_TEMPLATE':
      return { ...state, viewTemplate: action.payload }
    case 'SET_DEFAULT_PRESET':
      return { ...state, defaultPreset: action.payload }
    default:
      return state;
  }
};
export default viewReducer