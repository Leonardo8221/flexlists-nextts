import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { isSucc } from 'src/models/ApiResponse';
import { listService } from 'src/services/list.service';
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
      console.log('aaa')
      const response = await listViewService.getView(viewId)
      console.log(response.data)
        if(isSucc(response))
        {
          dispatch(setView(response.data));
      } 
    } catch (error) {
     console.log('errr')
    }
  };
};
export const setView = (view: any) => ({
    type: 'SET_CURRENT_VIEW',
    payload: view
  });
