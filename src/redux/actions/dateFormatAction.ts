import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';

export const getDateFormat = (): ThunkAction<
void,
RootState,
null,
any
> => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const locale = window.navigator.language;
      const date = new Date();
      const formatter = new Intl.DateTimeFormat(locale);
      const formattedDate = formatter.format(date);
      const format = formattedDate.replace(date.getFullYear().toString(), 'YYYY').replace((date.getMonth() + 1).toString(), 'MM').replace(date.getDate().toString(), 'DD');
      console.log(locale, format, date, formattedDate, date.toLocaleTimeString(), 'locale, format')

      dispatch(setDateFormat(format));
    } catch (error) {
     console.log(error);
    }
  };
};

export const setDateFormat = (dateFormat: string) => ({
  type: 'SET_DATE_FORMAT',
  payload: dateFormat
});