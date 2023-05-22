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
      if(process.env.NEXT_PUBLIC_USE_DUMMY_DATA == "true")
      {
        dispatch(setColumns(getListFields()));
      }
      else
      {
        const response = await fieldDefinitionService.getAllFieldDefinition(1);
        if(response && response.code == 0)
        {
          dispatch(setColumns(response.result));
        } 
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
//TODO: USE this for dummy data, will remove when connect to real api
const getListFields = () : any[] =>{
   return [
    {
      id: '1',
      name: 'ID',
      icon: 'task',
      type: 'id',
      visible: true,
      ordering: 1,
      required: true,
      detailsOnly:true,
      description:"",
      tableDefinitionId:1
    },
    {
      id: '2',
      name: 'Task Name',
      icon: 'task',
      type: 'Text',
      visible: true,
      ordering: 2,
      required: true,
      detailsOnly:true,
      description:"",
      tableDefinitionId:1
    },
    {
      id: '3',
      name: 'Description',
      icon: 'task',
      type: 'textarea',
      visible: true,
      ordering: 3,
      required: true,
      detailsOnly:true,
      description:"",
      tableDefinitionId:1
    },
    {
      id: '4',
      name: 'User',
      icon: 'user',
      type: 'avatar',
      visible: true,
      ordering: 4,
      required: true,
      detailsOnly:true,
      description:"",
      tableDefinitionId:1
    },
    {
      id: '5',
      name: 'Importance',
      icon: 'importance',
      type: 'choice',
      ordering: 5,
      required: true,
      detailsOnly:true,
      description:"",
      tableDefinitionId:1,
      choices: [
        {
          name: "Very important",
          color: {
            bg: '#FFB7B7',
            fill: '#333'
          }
        },
        {
          name: "Standard",
          color: {
            bg: '#FFEBB7',
            fill: '#333'
          }
        }
      ],
      visible: true
    },
    {
      id: '6',
      name: 'Phase',
      icon: 'phase',
      type: 'choice',
      ordering: 6,
      required: true,
      detailsOnly:true,
      description:"",
      tableDefinitionId:1,
      choices: [
        {
          name: "Done",
          color: {
            bg: '#B7FFBA',
            fill: '#333'
          }
        },
        {
          name: "In progress",
          color: {
            bg: '#FFEBB7',
            fill: '#333'
          }
        },
        {
          name: "Testing",
          color: {
            bg: '#FFEBB7',
            fill: '#333'
          }
        }
      ],
      visible: true
    },
    {
      id: '7',
      name: 'Date',
      icon: 'date',
      type: 'date',
      visible: true,
      ordering: 7,
      required: true,
      detailsOnly:true,
      description:"",
      tableDefinitionId:1
    },
    {
      id: '8',
      name: 'Price',
      icon: 'price',
      type: 'floating',
      visible: true,
      ordering: 8,
      required: true,
      detailsOnly:true,
      description:"",
      tableDefinitionId:1
    },
    {
      id: '9',
      name: 'Location',
      icon: 'location',
      type: 'location',
      visible: false,
      ordering: 8,
      required: true,
      detailsOnly:true,
      description:"",
      tableDefinitionId:1
    },
    {
      id: '10',
      name: 'MapVisible',
      icon: 'map',
      type: 'boolean',
      visible: false,
      ordering: 8,
      required: false,
      detailsOnly:true,
      description:"",
      tableDefinitionId:1
    }
  ]
}