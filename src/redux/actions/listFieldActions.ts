import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { fieldService } from 'src/services/field.service';
import { RootState } from '../store';
import { isSucc } from 'src/models/ApiResponse';

// Define the actions
export const fetchColumns = (viewId:number): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await fieldService.getFields(viewId)
      if(isSucc(response))
      {
        dispatch(setColumns(response.data));
      } 
    } catch (error) {
     console.log(error)
    }
  };
};

export const setColumns = (columns: any) => ({
    type: 'SET_COLUMNS',
    payload: columns
  });

export const setFilters = (filters: any) => ({
  type: 'SET_FILTERS',
  payload: filters
});

export const setSorts = (sorts: any) => ({
  type: 'SET_SORTS',
  payload: sorts
});
