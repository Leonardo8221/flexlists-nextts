import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import store, { RootState } from '../store';
import { isSucc } from 'src/models/ApiResponse';
import { fieldService } from 'src/services/field.service';
import { adminService } from 'src/services/admin.service';
// Define the actions

export const getSearchTypes = (): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
        var state = store.getState();
        if(state.admin.searchTypes.length==0)
        {
          const response = await adminService.getSearchTypes()
          if(isSucc(response) && response.data)
          {
            dispatch(setSearchTypes(response.data));
          } 
        }
        
    } catch (error) {
     console.log(error)
    }
  };
};

export const setSearchTypes = (searchTypes: any) => ({
    type: 'SET_SEARCH_TYPES',
    payload: searchTypes
});