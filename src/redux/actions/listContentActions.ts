import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import {listContentService} from 'src/frontendServices/listContent.service'
// Define the actions
export const fetchRows = (): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await listContentService.getListContents(1);
      if(response && response.code == 0)
      {
        console.log(response.result);
        dispatch(setRows(response.result));
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