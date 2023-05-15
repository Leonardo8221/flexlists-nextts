import { createStore, applyMiddleware } from 'redux';
// Define the initial state
const initialState = {
  users: [
    {
      name: 'user1',
      avatar: '/assets/images/avatars/avatar_1.jpg'
    },
    {
      name: 'user2',
      avatar: '/assets/images/avatars/avatar_2.jpg'
    },
    {
      name: 'user3',
      avatar: '/assets/images/avatars/avatar_3.jpg'
    },
    {
      name: 'user4',
      avatar: '/assets/images/avatars/avatar_4.jpg'
    },
    {
      name: 'user5',
      avatar: '/assets/images/avatars/avatar_5.jpg'
    },
    {
      name: 'user6',
      avatar: '/assets/images/avatars/avatar_6.jpg'
    },
    {
      name: 'user7',
      avatar: '/assets/images/avatars/avatar_7.jpg'
    },
    {
      name: 'user8',
      avatar: '/assets/images/avatars/avatar_8.jpg'
    },
    {
      name: 'user9',
      avatar: '/assets/images/avatars/avatar_9.jpg'
    }
  ]
};
// Define the reducer
const userReducer = (state = initialState, action: any) => {
    switch (action.type) { 
      case 'SET_USERS':
        return { ...state, users: action.payload };
      
      default:
        return state;
    }
  };
export default userReducer