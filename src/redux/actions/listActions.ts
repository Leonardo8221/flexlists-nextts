import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { isSucc } from 'src/models/ApiResponse';
import { listViewService } from 'src/services/listView.service';
import { fieldService } from 'src/services/field.service';
import {listContentService} from 'src/services/listContent.service'
import {Sort,Query, FlatWhere} from 'src/models/SharedModels'
import { SearchType } from 'src/enums/SharedEnums';
// Define the actions

export const fetchFields = (viewId:number): ThunkAction<
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
        console.log(response.data);
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
