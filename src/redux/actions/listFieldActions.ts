import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { fieldDefinitionService } from 'src/frontendServices/fieldDefinition.service';
import { RootState } from '../store';

// Define the actions
export const fetchColumns = (): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await fieldDefinitionService.getAllFieldDefinition(1);
      if(response && response.code == 0)
      {
        dispatch(setColumns(response.result));
      } 
    } catch (error) {
     console.log('errr')
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