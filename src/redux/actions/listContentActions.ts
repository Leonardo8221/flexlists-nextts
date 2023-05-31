import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import {listContentService} from 'src/services/listContent.service'
import { isSucc } from 'src/models/ApiResponse';
// Define the actions
export const fetchRows = (): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await listContentService.getContents(1,1,1,[]);
      if(isSucc(response))
      {
        dispatch(setRows(response.data));
      }       
    } catch (error) {
     console.log('errr')
    }
  };
};

  
export const setRows = (rows: any) => ({
  type: 'SET_ROWS',
  payload: rows
});