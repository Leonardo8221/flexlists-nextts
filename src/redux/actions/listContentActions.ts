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
      if(isSucc(response) && response.data && response.data.content && response.data.content.length>0)
      {
        dispatch(setRows(response.data.content));
      }       
    } catch (error) {
     console.log(error)
    }
  };
};

  
export const setRows = (rows: any) => ({
  type: 'SET_ROWS',
  payload: rows
});