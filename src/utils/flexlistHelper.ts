import { ChoiceModel } from "src/models/ChoiceModel";
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
export const getChoiceField = (fieldDataId:string,column:any) : {label:string,font:string,color:{bg:string,fill:string}} =>
{
    let color = { bg: "#333", fill: "white" };
    let font = "inherit";
    let choiceLabel: string = "";
    let choiceValue: ChoiceModel = column.config?.values?.find(
        (x: any) => x.id === fieldDataId
    );
    if (choiceValue) {
        choiceLabel = choiceValue.label;
        color = choiceValue.color ?? { bg: 'white', fill: 'black' };
        font = choiceValue.font;
    }
    return {label:choiceLabel,font:font,color:color};
}