import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { isSucc } from 'src/models/ApiResponse';
import { fieldService } from 'src/services/field.service';
// Define the actions

export const fetchFields = (viewId:number): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log('ccc'+viewId)
      const response = await fieldService.getFields(viewId)
      console.log(response)
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
