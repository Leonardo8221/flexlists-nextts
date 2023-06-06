import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import {listContentService} from 'src/services/listContent.service'
import { isSucc } from 'src/models/ApiResponse';
import {Sort,Query} from 'src/models/SharedModels'
import { SearchType } from 'src/enums/SharedEnums';
// Define the actions
export const fetchRows = (type:SearchType,viewId?:number,page?:number,limit?:number,order?:Sort[],query?:Query): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await listContentService.search(type,viewId,page,limit,order,query);
      if(!process.env.NEXT_PUBLIC_USE_DUMMY_DATA)
      {
        dispatch(setRows(response.data.contents));
      }
      if(isSucc(response) && response.data && response.data.length>0)
      {
        var contents : any[] = []
        for (const row of response.data) {
           contents.push(Object.fromEntries(row))
        }
        dispatch(setRows(contents));
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