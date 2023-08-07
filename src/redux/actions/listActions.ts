import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { isSucc } from 'src/models/ApiResponse';
import { getCoreFields } from 'src/services/field.service';
// Define the actions

export const fetchFields = (viewId:number): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await getCoreFields(viewId)
      if(isSucc(response))
      {
        dispatch(setFields(response.data));
      } 
    } catch (error) {
     console.log(error)
    }
  };
};

export const setFields = (fields: any) => ({
    type: 'SET_FIELDS',
    payload: fields
});
