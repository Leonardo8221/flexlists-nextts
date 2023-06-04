import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { isSucc } from 'src/models/ApiResponse';
import { listViewService } from 'src/services/listView.service';

// Define the actions
export const getCurrentView = (viewId:number): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await listViewService.getView(viewId)
        if(isSucc(response))
        {
          dispatch(setCurrentView(response.data));
      } 
    } catch (error) {
     console.log(error)
    }
  };
};
export const getViewUsers = (viewId:number): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
          dispatch(setViewUsers([
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
        ]))
        // const response = await listViewService.getU(viewId)
        // if(isSucc(response))
        // {
        //   dispatch(setViewUsers(response.data));
        // } 
    } catch (error) {
     console.log(error)
    }
  };
};
export const getViewUserGroups = (viewId:number): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
          dispatch(setViewUserGroups([
          {
            name: 'group1',
            avatar: '/assets/images/avatars/avatar_1.jpg'
          },
          {
            name: 'group2',
            avatar: '/assets/images/avatars/avatar_2.jpg'
          },
          {
            name: 'group3',
            avatar: '/assets/images/avatars/avatar_3.jpg'
          },
          {
            name: 'group4',
            avatar: '/assets/images/avatars/avatar_4.jpg'
          },
          {
            name: 'group5',
            avatar: '/assets/images/avatars/avatar_5.jpg'
          },
          {
            name: 'group6',
            avatar: '/assets/images/avatars/avatar_6.jpg'
          }
        ]))
        // const response = await listViewService.getU(viewId)
        // if(isSucc(response))
        // {
        //   dispatch(setViewUsers(response.data));
        // } 
    } catch (error) {
     console.log(error)
    }
  };
};
export const setCurrentView = (view: any) => ({
    type: 'SET_CURRENT_VIEW',
    payload: view
  });
export const setViewUsers = (users: any) => ({
    type: 'SET_VIEW_USERS',
    payload: users
  });
export const setViewUserGroups = (users: any) => ({
    type: 'SET_VIEW_USER_GROUPS',
    payload: users
  });
