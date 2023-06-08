import { NextApiRequest, NextApiResponse } from "next"
import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponseDummy";

const getFieldsEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
   
    res.json(new FlexlistsSuccess([
        {
          id: '1',
          name: 'ID',
          icon: 'task',
          type: 'id',
          viewFieldVisible: true,
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
          viewFieldVisible: true,
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
          viewFieldVisible: true,
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
          type: 'Avatar',
          viewFieldVisible: true,
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
          type: 'Choice',
          ordering: 5,
          required: true,
          detailsOnly:true,
          description:"",
          tableDefinitionId:1,
          config:{ values :[
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
          ]},
          viewFieldVisible: true
        },
        {
          id: '6',
          name: 'Phase',
          icon: 'phase',
          type: 'Choice',
          ordering: 6,
          required: true,
          detailsOnly:true,
          description:"",
          tableDefinitionId:1,
          config: { values: [
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
          ]},
          viewFieldVisible: true
        },
        {
          id: '7',
          name: 'Date',
          icon: 'date',
          type: 'date',
          viewFieldVisible: true,
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
          viewFieldVisible: true,
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
          viewFieldVisible: false,
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
          viewFieldVisible: false,
          ordering: 8,
          required: false,
          detailsOnly:true,
          description:"",
          tableDefinitionId:1
        }
      ]))
    res.statusCode = 200;
    return res;
}
export default getFieldsEndpoint