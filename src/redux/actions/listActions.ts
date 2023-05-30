import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { isSucc } from 'src/models/ApiResponse';
import { listService } from 'src/services/list.service';

// Define the actions
export const getCurrentList = (listId:number): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      if(process.env.NEXT_PUBLIC_USE_DUMMY_DATA == "true")
      {
        dispatch(setList(getList(listId)));
      }
      else
      {
        const response = await listService.getList(listId)
        if(isSucc(response))
        {
          dispatch(setList(response.data));
        } 
      }
      
      
    } catch (error) {
     console.log('errr')
    }
  };
};
export const setList = (list: any) => ({
    type: 'SET_CURRENT_LIST',
    payload: list
  });


//TODO: USE this for dummy data, will remove when connect to real api
const getList = (listId:number) : any[] =>{
   return [
    {
      id: '1',
      name: 'test',
      description: 'this is test list',
      category: 'Content'
    }
  ]
}