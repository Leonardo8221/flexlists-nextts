import { NextApiRequest, NextApiResponse } from "next"
import { FlexlistsError,FlexlistsSuccess } from "src/models/ApiResponseDummy";

const getFieldsEndpoint = async (req: NextApiRequest, res: NextApiResponse) => {
   
    res.json(new FlexlistsSuccess([
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
      ]))
    res.statusCode = 200;
    return res;
}
export default getFieldsEndpoint