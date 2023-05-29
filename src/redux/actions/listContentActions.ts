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
      if(process.env.NEXT_PUBLIC_USE_DUMMY_DATA == "true")
      {
        dispatch(setRows(getListContents()))
      }
      else
      {
        const response = await listContentService.getContents(1,1,1,[]);
        if(isSucc(response))
        {
          dispatch(setRows(response.data));
        } 
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
//TODO: USE this for dummy data, will remove when connect to real api
const getListContents = () : any[] =>{
   return [
    {
      "1": 1,
      "2": 'Task1',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Done',
      "7": '03/20/2023 08:30:00',
      "8": '12',
      "9": {
        lat: 49.84120,
        lng: 24.02975
      },
      "10": false
    },
    {
      "1": 2,
      "2": 'Task2',
      "3": 'Lorem ipsum dolor sit amet consectetur. Tempus aliquam tortor ullamcorper vestibulum sit. Ac velit lectus quis non tortor scelerisque in velit.',
      "4": 'Smith',
      "5": 'Standard',
      "6": 'In progress',
      "7": '03/22/2023 10:45:00',
      "8": '99',
      "9": {
        lat: 49.62120,
        lng: 24.12975
      },
      "10": false
    },
    {
      "1": 3,
      "2": 'Task3',
      "3": 'test',
      "4": 'Smith',
      "5": 'Standard',
      "6": 'In progress',
      "7": '03/24/2023 09:15:00',
      "8": '99',
      "9": {
        lat: 49.53120,
        lng: 24.32975
      },
      "10": false
    },
    {
      "1": 4,
      "2": 'Task4',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Done',
      "7": '03/24/2023 09:30:00',
      "8": '12',
      "9": {
        lat: 49.44120,
        lng: 24.43975
      },
      "10": false
    },
    {
      "1": 5,
      "2": 'Task5',
      "3": 'test',
      "4": 'Smith',
      "5": 'Standard',
      "6": 'In progress',
      "7": '03/24/2023 09:00:00',
      "8": '99',
      "9": {
        lat: 49.54120,
        lng: 24.34975
      },
      "10": false
    },
    {
      "1": 6,
      "2": 'Task6',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Testing',
      "7": '03/24/2023 09:45:00',
      "8": '12',
      "9": {
        lat: 49.65120,
        lng: 24.21975
      },
      "10": false
    },
    {
      "1": 7,
      "2": 'Task7',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Done',
      "7": '03/27/2023 08:30:00',
      "8": '12',
      "9": {
        lat: 49.75120,
        lng: 24.32975
      },
      "10": false
    },
    {
      "1": 8,
      "2": 'Task8',
      "3": 'Lorem ipsum dolor sit amet consectetur. Tempus aliquam tortor ullamcorper vestibulum sit. Ac velit lectus quis non tortor scelerisque in velit.',
      "4": 'Smith',
      "5": 'Standard',
      "6": 'In progress',
      "7": '03/29/2023 10:45:00',
      "8": '99',
      "9": {
        lat: 49.95120,
        lng: 24.13975
      },
      "10": false
    },
    {
      "1": 9,
      "2": 'Task9',
      "3": 'test',
      "4": 'Smith',
      "5": 'Standard',
      "6": 'In progress',
      "7": '03/29/2023 09:15:00',
      "8": '99',
      "9": {
        lat: 49.15120,
        lng: 24.94975
      },
      "10": false
    },
    {
      "1": 10,
      "2": 'Task10',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Done',
      "7": '03/29/2023 09:30:00',
      "8": '12',
      "9": {
        lat: 49.25120,
        lng: 24.85975
      },
      "10": false
    },
    {
      "1": 11,
      "2": 'Task11',
      "3": 'test',
      "4": 'Smith',
      "5": 'Standard',
      "6": 'In progress',
      "7": '03/28/2023 09:00:00',
      "8": '99',
      "9": {
        lat: 49.36120,
        lng: 24.72975
      },
      "10": false
    },
    {
      "1": 12,
      "2": 'Task12',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Done',
      "7": '03/28/2023 09:45:00',
      "8": '12',
      "9": {
        lat: 49.46120,
        lng: 24.61975
      },
      "10": false
    },
    {
      "1": 13,
      "2": 'Task14',
      "3": 'test',
      "4": 'Smith',
      "5": 'Standard',
      "6": 'In progress',
      "7": '03/30/2023 09:00:00',
      "8": '99',
      "9": {
        lat: 49.56120,
        lng: 24.53975
      },
      "10": false
    },
    {
      "1": 14,
      "2": 'Task14',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Done',
      "7": '03/30/2023 09:45:00',
      "8": '12',
      "9": {
        lat: 49.66120,
        lng: 24.44975
      },
      "10": false
    },
    {
      "1": 15,
      "2": 'Task1',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Done',
      "7": '03/20/2023 08:30:00',
      "8": '12',
      "9": {
        lat: 49.76120,
        lng: 24.35975
      },
      "10": false
    },
    {
      "1": 16,
      "2": 'Task2',
      "3": 'Lorem ipsum dolor sit amet consectetur. Tempus aliquam tortor ullamcorper vestibulum sit. Ac velit lectus quis non tortor scelerisque in velit.',
      "4": 'Smith',
      "5": 'Standard',
      "6": 'In progress',
      "7": '03/22/2023 10:45:00',
      "8": '99',
      "9": {
        lat: 49.86120,
        lng: 24.26975
      },
      "10": false
    },
    {
      "1": 17,
      "2": 'Task3',
      "3": 'test',
      "4": 'Smith',
      "5": 'Standard',
      "6": 'In progress',
      "7": '03/24/2023 09:15:00',
      "8": '99',
      "9": {
        lat: 49.96120,
        lng: 24.17975
      },
      "10": false
    },
    {
      "1": 18,
      "2": 'Task4',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Done',
      "7": '03/24/2023 09:30:00',
      "8": '12',
      "9": {
        lat: 49.07120,
        lng: 24.92975
      },
      "10": false
    },
    {
      "1": 19,
      "2": 'Task5',
      "3": 'test',
      "4": 'Smith',
      "5": 'Standard',
      "6": 'In progress',
      "7": '03/24/2023 09:00:00',
      "8": '99',
      "9": {
        lat: 49.17120,
        lng: 24.93975
      },
      "10": false
    },
    {
      "1": 20,
      "2": 'Task6',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Testing',
      "7": '03/24/2023 09:45:00',
      "8": '12',
      "9": {
        lat: 49.27120,
        lng: 24.84975
      },
      "10": false
    },
    {
      "1": 21,
      "2": 'Task7',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Done',
      "7": '03/27/2023 08:30:00',
      "8": '12',
      "9": {
        lat: 49.37120,
        lng: 24.75975
      },
      "10": false
    },
    {
      "1": 22,
      "2": 'Task5',
      "3": 'test',
      "4": 'Smith',
      "5": 'Standard',
      "6": 'In progress',
      "7": '03/24/2023 09:00:00',
      "8": '99',
      "9": {
        lat: 49.47120,
        lng: 24.66975
      },
      "10": false
    },
    {
      "1": 23,
      "2": 'Task6',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Testing',
      "7": '03/24/2023 09:45:00',
      "8": '12',
      "9": {
        lat: 49.57120,
        lng: 24.57975
      },
      "10": false
    },
    {
      "1": 24,
      "2": 'Task7',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Done',
      "7": '03/27/2023 08:30:00',
      "8": '12',
      "9": {
        lat: 49.67120,
        lng: 24.48975
      },
      "10": false
    },
    {
      "1": 25,
      "2": 'Task6',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Testing',
      "7": '03/24/2023 09:45:00',
      "8": '12',
      "9": {
        lat: 49.78120,
        lng: 24.39975
      },
      "10": false
    },
    {
      "1": 26,
      "2": 'Task7',
      "3": 'test',
      "4": 'John',
      "5": 'Very important',
      "6": 'Done',
      "7": '03/27/2023 08:30:00',
      "8": '12',
      "9": {
        lat: 49.87120,
        lng: 24.29975
      },
      "10": false
    }
  ]
}