import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { isSucc } from 'src/models/ApiResponse';
import { fieldService } from 'src/services/field.service';
// Define the actions

// export const fetchFields = (viewId: number): ThunkAction<
//     void,
//     RootState,
//     null,
//     any
// > => {
//     return async (dispatch: Dispatch<any>) => {
//         try {
//             const response = await fieldService.getFields(viewId)
//             if (isSucc(response)) {
//                 dispatch(setFields(response.data));
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     };
// };

export const setMessage = (message: any) => ({
    type: 'SET_MESSAGE',
    payload: message
});