import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import store, { RootState } from '../store';
import { isErr, isSucc } from 'src/models/ApiResponse';
import { listViewService } from 'src/services/listView.service';
import { fieldService } from 'src/services/field.service';
import { listContentService } from 'src/services/listContent.service'
import { FieldUIType } from 'src/models/SharedModels'
import { adminService } from 'src/services/admin.service';
import { hasPermission } from 'src/utils/permissionHelper';
import { cloneDeep } from 'lodash';
import { getViewReadContents, removeViewReadContent, setViewReadContent } from 'src/utils/localStorage';
import { setFlashMessage } from './authAction';
// Define the actions
export const getAvailableFieldUiTypes = (): ThunkAction<
  void,
  RootState,
  null,
  any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      var state = store.getState();
      if (state.view.availableFieldUiTypes.length == 0) {
        const response = await adminService.getAvailableFieldUiTypes()
        if (isSucc(response) && response.data) {
          dispatch(setAvailableFieldUiTypes(response.data.sort((a: FieldUIType, b: FieldUIType) => {

            if (a.group < b.group) {
              return -1;
            }
            if (a.group > b.group) {
              return 1;
            }
            return 0;
          })
            .sort((a: FieldUIType, b: FieldUIType) => {
              if (a.group == "Text" || b.group == 'Text') {
                return -1
              }
              return 0;
            })
          ));
        }
      }


    } catch (error) {
      console.log(error)
    }
  };
};

export const getCurrentView = (viewId: number): ThunkAction<
  void,
  RootState,
  null,
  any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await listViewService.getView(viewId);
      if (isSucc(response)) {
        dispatch(setCurrentView(response.data));
        let viewData = cloneDeep(response.data)
        dispatch(setDefaultPreset({
           name:'Default',
           order:viewData.order,
           conditions:viewData.conditions,
           query:viewData.query,
           page:viewData.page,
           limit:viewData.limit
        }))
        let readContents = getViewReadContents(viewId);
        if(readContents.length > 0)
        {
          dispatch(setReadContents(readContents));
        }
      }
    } catch (error) {
      console.log(error)
    }
  };
};
export const fetchColumns = (viewId: number): ThunkAction<
  void,
  RootState,
  null,
  any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await fieldService.getFields(viewId)
      if (isSucc(response)) {
        dispatch(setColumns(response.data));
      }
    } catch (error) {
      console.log(error)
    }
  };
};
export const fetchRows = (): ThunkAction<
  void,
  RootState,
  null,
  any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      var state = store.getState();
      const response = await listContentService.searchContents(
        state.view.currentView.id,
        state.view.currentView.page,
        state.view.currentView.limit,
        state.view.currentView.order,
        state.view.currentView.query,
        state.view.currentView.conditions,
        true,
        state.view.currentView.parentViewId,
        state.view.currentView.parentFieldId,
        state.view.currentView.parentContentId);
      if (isSucc(response) && response.data && response.data.content) {
        var contents: any[] = []
        for (const row of response.data.content) {
          contents.push(Object.fromEntries(row))
        }
        dispatch(setRows(contents));
        dispatch(setCount(response.data.count));
      }
      else {
        if(isErr(response))
        {
          dispatch(setFlashMessage({message:response.message,type:'error'}));
        }
        // dispatch(setRows([]));
        // dispatch(setCount(0));
        dispatch(setFlashMessage({message: response.message, type:'error'}));
      }
    } catch (error) {
      console.log(error)
    }
  };
};
export const fetchRowsByPage = (page?: number, limit?: number, query?: string): ThunkAction<
  void,
  RootState,
  null,
  any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      var state = store.getState();
      const response = await listContentService.searchContents(
        state.view.currentView.id,
        page,
        limit,
        state.view.currentView.order,
        state.view.currentView.query,
        state.view.currentView.conditions,
        true,
        state.view.currentView.parentViewId,
        state.view.currentView.parentFieldId,
        state.view.currentView.parentContentId);
      if (isSucc(response) && response.data && response.data.content) {
        var contents: any[] = []
        for (const row of response.data.content) {
          contents.push(Object.fromEntries(row))
        }
        dispatch(setRows(contents));
        dispatch(setCount(response.data.count));
      }
      else {
        // dispatch(setRows([]));
        // dispatch(setCount(0));
        dispatch(setFlashMessage({message: response.message, type:'error'}));
      }
    } catch (error) {
      console.log(error)
    }
  };
};

export const setAvailableFieldUiTypes = (values: any) => ({
  type: 'SET_AVAILABLE_FIELD_UI_TYPES',
  payload: values
})

export const setRows = (rows: any) => ({
  type: 'SET_ROWS',
  payload: rows
});
export const setColumns = (columns: any) => ({
  type: 'SET_COLUMNS',
  payload: columns
});

// export const setFilters = (filters: any) => ({
//   type: 'SET_FILTERS',
//   payload: filters
// });

// export const setSorts = (sorts: any) => ({
//   type: 'SET_SORTS',
//   payload: sorts
// });

export const setCount = (count: any) => ({
  type: 'SET_COUNT',
  payload: count
});

export const getViewUsers = (viewId: number): ThunkAction<
  void,
  RootState,
  null,
  any
> => {
  return async (dispatch: Dispatch<any>) => {
    // var state = store.getState();
    // if (hasPermission(state.view.currentView.role, 'All')) {
      try {
        var response = await listViewService.getViewUsers(viewId);
        if (isSucc(response)) {
          dispatch(setViewUsers(response.data))
        }

      } catch (error) {
        console.log(error)
      }
    // }
  };
};
export const getViewUserGroups = (viewId: number): ThunkAction<
  void,
  RootState,
  null,
  any
> => {
  return async (dispatch: Dispatch<any>) => {
    var state = store.getState();
    if (hasPermission(state.view.currentView.role, 'All')) {
      try {


        var respone = await listViewService.getViewGroups(viewId)
        if (isSucc(respone) && respone.data) {
          dispatch(setViewGroups(respone.data))
        } else {
          //console.log('getViewGroups', respone)
        }
      }
      catch (error) {
        console.log('getViewGroups', error)
      }
    }
  };
};
export const setReadContent = (viewId: number,contentId:number): ThunkAction<
  void,
  RootState,
  null,
  any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      let readContents = setViewReadContent(viewId,contentId)
      dispatch(setReadContents(readContents));
    } catch (error) {
      console.log(error)
    }
  };
};
export const removeReadContent = (viewId: number,contentId:number): ThunkAction<
  void,
  RootState,
  null,
  any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      let readContents = removeViewReadContent(viewId,contentId)
      dispatch(setReadContents(readContents));
    } catch (error) {
      console.log(error)
    }
  };
};
export const setCurrentView = (view: any) => ({
  type: 'SET_CURRENT_VIEW',
  payload: view
});
export const setViewUsers = (users: any) => ({
  type: 'SET_VIEW_USERS',
  payload: users
});
export const setViewGroups = (groups: any) => ({
  type: 'SET_VIEW_GROUPS',
  payload: groups
});
export const setMessage = (message: any) => ({
  type: 'SET_MESSAGE',
  payload: message
});
export const setViewTemplate = (viewTemplate: any) => ({
  type: 'SET_VIEW_TEMPLATE',
  payload: viewTemplate
});
export const setDefaultPreset = (defaultPreset: any) => ({
  type: 'SET_DEFAULT_PRESET',
  payload: defaultPreset
});
export const setReadContents = (readContents: number[]) => ({
  type: 'SET_READ_CONTENTS',
  payload: readContents
});
export const setCurrentListViews = (views: any[]) => ({
  type: 'SET_CURRENT_LIST_VIEWS',
  payload: views
});