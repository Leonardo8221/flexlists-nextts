// Define the initial state
const initialState = {
    message: {}
};
const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return { ...state, message: action.payload }
        default:
            return state;
    }
};
export default authReducer