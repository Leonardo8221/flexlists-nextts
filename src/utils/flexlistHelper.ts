import { ViewField } from "src/models/ViewField";

export const getDataColumnId = (fieldId : number,columns:ViewField[]) : string =>
{
    var field = columns.find((x)=>x.id === fieldId);
    if(field && field.system && (field.name === 'id' || field.name === 'createdAt' || field.name === 'updatedAt'))
    {
        return field.name;
    }
    return `${fieldId}`;

}