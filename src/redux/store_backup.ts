import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Define the initial state
const initialState = {
  columns: [
    {
      name: 'id',
      label: 'ID',
      icon: 'task',
      type: 'id',
      visible: true
    },
    {
      name: 'task_name',
      label: 'Task Name',
      icon: 'task',
      type: 'other_text_field',
      visible: true
    },
    {
      name: 'description',
      label: 'Description',
      icon: 'task',
      type: 'textarea',
      visible: true
    },
    {
      name: 'user',
      label: 'User',
      icon: 'user',
      type: 'avatar',
      visible: true
    },
    {
      name: 'importance',
      label: 'Importance',
      icon: 'importance',
      type: 'choice',
      choices: [
        {
          label: "Very important",
          color: {
            bg: '#FFB7B7',
            fill: '#333'
          }
        },
        {
          label: "Standard",
          color: {
            bg: '#FFEBB7',
            fill: '#333'
          }
        }
      ],
      visible: true
    },
    {
      name: 'phase',
      label: 'Phase',
      icon: 'phase',
      type: 'choice',
      choices: [
        {
          label: "Done",
          color: {
            bg: '#B7FFBA',
            fill: '#333'
          }
        },
        {
          label: "In progress",
          color: {
            bg: '#FFEBB7',
            fill: '#333'
          }
        },
        {
          label: "Testing",
          color: {
            bg: '#FFEBB7',
            fill: '#333'
          }
        }
      ],
      visible: true
    },
    {
      name: 'date',
      label: 'Date',
      icon: 'date',
      type: 'date',
      visible: true
    },
    {
      name: 'price',
      label: 'Price',
      icon: 'price',
      type: 'floating',
      visible: true
    }
  ],
  rows: [
    {
      id: 1,
      task_name: 'Task1',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Done',
      date: '03/20/2023 08:30:00',
      price: '12',
      location: {
        lat: 49.84120,
        lng: 24.02975
      },
      mapVisible: false
    },
    {
      id: 2,
      task_name: 'Task2',
      description: 'Lorem ipsum dolor sit amet consectetur. Tempus aliquam tortor ullamcorper vestibulum sit. Ac velit lectus quis non tortor scelerisque in velit.',
      user: 'Smith',
      importance: 'Standard',
      phase: 'In progress',
      date: '03/22/2023 10:45:00',
      price: '99',
      location: {
        lat: 49.62120,
        lng: 24.12975
      },
      mapVisible: false
    },
    {
      id: 3,
      task_name: 'Task3',
      description: 'test',
      user: 'Smith',
      importance: 'Standard',
      phase: 'In progress',
      date: '03/24/2023 09:15:00',
      price: '99',
      location: {
        lat: 49.53120,
        lng: 24.32975
      },
      mapVisible: false
    },
    {
      id: 4,
      task_name: 'Task4',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Done',
      date: '03/24/2023 09:30:00',
      price: '12',
      location: {
        lat: 49.44120,
        lng: 24.43975
      },
      mapVisible: false
    },
    {
      id: 5,
      task_name: 'Task5',
      description: 'test',
      user: 'Smith',
      importance: 'Standard',
      phase: 'In progress',
      date: '03/24/2023 09:00:00',
      price: '99',
      location: {
        lat: 49.54120,
        lng: 24.34975
      },
      mapVisible: false
    },
    {
      id: 6,
      task_name: 'Task6',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Testing',
      date: '03/24/2023 09:45:00',
      price: '12',
      location: {
        lat: 49.65120,
        lng: 24.21975
      },
      mapVisible: false
    },
    {
      id: 7,
      task_name: 'Task7',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Done',
      date: '03/27/2023 08:30:00',
      price: '12',
      location: {
        lat: 49.75120,
        lng: 24.32975
      },
      mapVisible: false
    },
    {
      id: 8,
      task_name: 'Task8',
      description: 'Lorem ipsum dolor sit amet consectetur. Tempus aliquam tortor ullamcorper vestibulum sit. Ac velit lectus quis non tortor scelerisque in velit.',
      user: 'Smith',
      importance: 'Standard',
      phase: 'In progress',
      date: '03/29/2023 10:45:00',
      price: '99',
      location: {
        lat: 49.95120,
        lng: 24.13975
      },
      mapVisible: false
    },
    {
      id: 9,
      task_name: 'Task9',
      description: 'test',
      user: 'Smith',
      importance: 'Standard',
      phase: 'In progress',
      date: '03/29/2023 09:15:00',
      price: '99',
      location: {
        lat: 49.15120,
        lng: 24.94975
      },
      mapVisible: false
    },
    {
      id: 10,
      task_name: 'Task10',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Done',
      date: '03/29/2023 09:30:00',
      price: '12',
      location: {
        lat: 49.25120,
        lng: 24.85975
      },
      mapVisible: false
    },
    {
      id: 11,
      task_name: 'Task11',
      description: 'test',
      user: 'Smith',
      importance: 'Standard',
      phase: 'In progress',
      date: '03/28/2023 09:00:00',
      price: '99',
      location: {
        lat: 49.36120,
        lng: 24.72975
      },
      mapVisible: false
    },
    {
      id: 12,
      task_name: 'Task12',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Done',
      date: '03/28/2023 09:45:00',
      price: '12',
      location: {
        lat: 49.46120,
        lng: 24.61975
      },
      mapVisible: false
    },
    {
      id: 13,
      task_name: 'Task14',
      description: 'test',
      user: 'Smith',
      importance: 'Standard',
      phase: 'In progress',
      date: '03/30/2023 09:00:00',
      price: '99',
      location: {
        lat: 49.56120,
        lng: 24.53975
      },
      mapVisible: false
    },
    {
      id: 14,
      task_name: 'Task14',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Done',
      date: '03/30/2023 09:45:00',
      price: '12',
      location: {
        lat: 49.66120,
        lng: 24.44975
      },
      mapVisible: false
    },
    {
      id: 15,
      task_name: 'Task1',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Done',
      date: '03/20/2023 08:30:00',
      price: '12',
      location: {
        lat: 49.76120,
        lng: 24.35975
      },
      mapVisible: false
    },
    {
      id: 16,
      task_name: 'Task2',
      description: 'Lorem ipsum dolor sit amet consectetur. Tempus aliquam tortor ullamcorper vestibulum sit. Ac velit lectus quis non tortor scelerisque in velit.',
      user: 'Smith',
      importance: 'Standard',
      phase: 'In progress',
      date: '03/22/2023 10:45:00',
      price: '99',
      location: {
        lat: 49.86120,
        lng: 24.26975
      },
      mapVisible: false
    },
    {
      id: 17,
      task_name: 'Task3',
      description: 'test',
      user: 'Smith',
      importance: 'Standard',
      phase: 'In progress',
      date: '03/24/2023 09:15:00',
      price: '99',
      location: {
        lat: 49.96120,
        lng: 24.17975
      },
      mapVisible: false
    },
    {
      id: 18,
      task_name: 'Task4',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Done',
      date: '03/24/2023 09:30:00',
      price: '12',
      location: {
        lat: 49.07120,
        lng: 24.92975
      },
      mapVisible: false
    },
    {
      id: 19,
      task_name: 'Task5',
      description: 'test',
      user: 'Smith',
      importance: 'Standard',
      phase: 'In progress',
      date: '03/24/2023 09:00:00',
      price: '99',
      location: {
        lat: 49.17120,
        lng: 24.93975
      },
      mapVisible: false
    },
    {
      id: 20,
      task_name: 'Task6',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Testing',
      date: '03/24/2023 09:45:00',
      price: '12',
      location: {
        lat: 49.27120,
        lng: 24.84975
      },
      mapVisible: false
    },
    {
      id: 21,
      task_name: 'Task7',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Done',
      date: '03/27/2023 08:30:00',
      price: '12',
      location: {
        lat: 49.37120,
        lng: 24.75975
      },
      mapVisible: false
    },
    {
      id: 22,
      task_name: 'Task5',
      description: 'test',
      user: 'Smith',
      importance: 'Standard',
      phase: 'In progress',
      date: '03/24/2023 09:00:00',
      price: '99',
      location: {
        lat: 49.47120,
        lng: 24.66975
      },
      mapVisible: false
    },
    {
      id: 23,
      task_name: 'Task6',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Testing',
      date: '03/24/2023 09:45:00',
      price: '12',
      location: {
        lat: 49.57120,
        lng: 24.57975
      },
      mapVisible: false
    },
    {
      id: 24,
      task_name: 'Task7',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Done',
      date: '03/27/2023 08:30:00',
      price: '12',
      location: {
        lat: 49.67120,
        lng: 24.48975
      },
      mapVisible: false
    },
    {
      id: 25,
      task_name: 'Task6',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Testing',
      date: '03/24/2023 09:45:00',
      price: '12',
      location: {
        lat: 49.78120,
        lng: 24.39975
      },
      mapVisible: false
    },
    {
      id: 26,
      task_name: 'Task7',
      description: 'test',
      user: 'John',
      importance: 'Very important',
      phase: 'Done',
      date: '03/27/2023 08:30:00',
      price: '12',
      location: {
        lat: 49.87120,
        lng: 24.29975
      },
      mapVisible: false
    }
  ],
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
  ],
  messages: [
    {
      id: 1,
      content: 'Lorem ipsum dolor sit amet consectetur. Tempus aliquam tortor ullamcorper vestibulum sit. Ac velit lectus quis non tortor scelerisque in velit.',
      user: 'Nina Doe',
      avatar: '/assets/images/avatars/avatar_1.jpg',
      time: '03/27/2023 08:00:00',
      over: false
    },
    {
      id: 2,
      content: 'Lorem ipsum dolor sit amet consectetur. Tempus aliquam tortor ullamcorper vestibulum sit. Ac velit lectus quis non tortor scelerisque in velit.',
      user: 'Nina Doe',
      avatar: '/assets/images/avatars/avatar_1.jpg',
      time: '03/27/2023 08:00:00',
      over: false
    },
    {
      id: 3,
      content: 'Lorem ipsum dolor sit amet consectetur. Tempus aliquam tortor ullamcorper vestibulum sit. Ac velit lectus quis non tortor scelerisque in velit.',
      user: 'me',
      avatar: '/assets/images/avatars/avatar_1.jpg',
      time: '03/27/2023 08:00:00',
      over: false
    }
  ],
  filters: [
    {
      column: 'phase',
      operator: 'is',
      operand: 'In progress',
      condition: 'and'
    },
    {
      column: 'price',
      operator: 'is bigger than',
      operand: 0,
      condition: 'and'
    }
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

// Define the actions
export const setColumns = (columns: any) => ({
  type: 'SET_COLUMNS',
  payload: columns
});

export const setRows = (rows: any) => ({
  type: 'SET_ROWS',
  payload: rows
});

export const setUsers = (users: any) => ({
  type: 'SET_USERS',
  payload: users
});

export const setMessages = (messages: any) => ({
  type: 'SET_MESSAGES',
  payload: messages
});

export const setFilters = (filters: any) => ({
  type: 'SET_FILTERS',
  payload: filters
});

export const setSorts = (sorts: any) => ({
  type: 'SET_SORTS',
  payload: sorts
});

// Define the reducer
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_COLUMNS':
      return { ...state, columns: action.payload };

    case 'SET_ROWS':
      return { ...state, rows: action.payload };

    case 'SET_USERS':
      return { ...state, users: action.payload };

    case 'SET_MESSAGES':
      return { ...state, messages: action.payload };
    
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };

    case 'SET_SORTS':
      return { ...state, sorts: action.payload };
    
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
