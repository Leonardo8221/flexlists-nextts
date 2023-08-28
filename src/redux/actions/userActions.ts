import { UserProfile } from "src/models/UserProfile";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { isSucc } from 'src/models/ApiResponse';
import { getUserContacts } from "src/services/account.service";
import { User } from "src/models/SharedModels";
export const fetchUserContacts = (): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await getUserContacts()
      if(isSucc(response))
      {
        dispatch(setUserContacts(response.data));
      } 
    } catch (error) {
     console.log(error)
    }
  };
};
export const setUserProfile = (userProfile: UserProfile|undefined) => ({
    type: 'SET_USER_PROFILE',
    payload: userProfile
  });
  export const setUserContacts = (userContacts: User[]) => ({
    type: 'SET_USER_CONTACTS',
    payload: userContacts
  });