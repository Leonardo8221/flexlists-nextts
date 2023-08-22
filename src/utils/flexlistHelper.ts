import { ExportType, FieldType, FieldUiTypeEnum, ImportType, ViewType } from "src/enums/SharedEnums";
import { ChoiceModel } from "src/models/ChoiceModel";
import { ViewField } from "src/models/ViewField";
import { convertToInteger } from "./convertUtils";
import { filter } from "lodash";
import { getContent } from "src/services/listContent.service";
import { isSucc } from "./responses";

export const getDefaultValues = (columns: ViewField[]): any => {
    var defautValues: any = {};
    for (const column of filter(columns, (x) => !x.system)) {
      var defaultValue: any = "";
      let fielduiType = column.uiField;
      switch (fielduiType) {
        case FieldUiTypeEnum.Date:
        case FieldUiTypeEnum.DateTime:
        case FieldUiTypeEnum.Time:
        //   defaultValue = new Date().toISOString();
          break;
        case FieldUiTypeEnum.Choice:
          defaultValue = column.config?.values[0]?.label;
          break;
        case FieldUiTypeEnum.Boolean:
          defaultValue = false;
          break;
        case FieldUiTypeEnum.Color:
          defaultValue = "#000000";
        default:
          break;
      }
      defautValues[column.id] = defaultValue;
    }
    return defautValues;
}
export const getDataColumnId = (fieldId: number, columns: ViewField[]): string => {
    var field = columns.find((x) => x.id === fieldId);
    if (field && field.system && (field.name === 'id' || field.name === 'createdAt' || field.name === 'updatedAt')) {
        return field.name;
    }
    return `${fieldId}`;

}
export const getColumn = (column_id: any,columns:any[]) : any => {

    const column = columns.find(
      (item: any) =>
        item.id === convertToInteger(column_id) ||
        item.name === column_id
      // (!item.system && item.id === convertToInteger(column_id)) ||
      // (item.system &&
      //   (item.name === "createdAt" || item.name === "updatedAt") &&
      //   item.name === column_id)
    );
    return column;
  };
export const getChoiceField = (fieldDataId: string, column: any): { label: string, font: string, color: { bg: string, fill: string } } => {
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
    return { label: choiceLabel, font: font, color: color };
}
export const downloadFileUrl = (id: string) => {
    return `${process.env.NEXT_PUBLIC_FLEXLIST_API_URL}/api/contentManagement/downloadFile?id=${id}`;
};
export const getAvatarUrl = (avartarUrl?: string): string => {
    if (!avartarUrl || avartarUrl === '') {
        return '/assets/images/avatars/avatar_2.jpg';
    }
    return downloadFileUrl(avartarUrl);
}
export const getExportFileExtension = (exportFile: ExportType): string => {
    switch (exportFile) {
        case ExportType.CSV:
            return 'csv';
        case ExportType.JSON:
            return 'json';
        case ExportType.RSS:
            return 'rss';
        case ExportType.XML:
            return 'xml';
        case ExportType.YML:
            return 'yml';
        case ExportType.XLSX:
            return 'xlsx';
        case ExportType.HTML:
            return 'html';
    }
    return 'csv';
}
export const getExportMimeType = (exportFile: ExportType): string => {
    switch (exportFile) {
        case ExportType.CSV:
            return 'text/csv';
        case ExportType.JSON:
            return 'application/json';
        case ExportType.RSS:
            return 'application/rss+xml';
        case ExportType.XML:
            return 'application/xml';
        case ExportType.YML:
            return 'application/x-yaml';
        case ExportType.XLSX:
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        case ExportType.HTML:
            return 'text/html';
    }
    return 'application/json';
}

export const getImportFileExtension = (importFile: ImportType): string => {
    switch (importFile) {
        case ImportType.CSV:
            return 'csv';
        case ImportType.JSON:
            return 'json';
        case ImportType.XML:
            return 'xml';
        case ImportType.YML:
            return 'yml';
        case ImportType.XLSX:
            return 'xlsx';

    }
    return 'csv';
}
export const validateViewConfig = (viewType:ViewType,config:any,setError:(message:string)=>void): boolean => {
    let isValidConfig: boolean = true;
    switch (viewType) {
      case ViewType.Calendar:
        if (!config) {
          setError("Config invalid");
          isValidConfig = false;
        }
        if (!config.titleId || config.titleId === 0) {
          setError("Title field required");
          isValidConfig = false;
        }
        if (!config.beginDateTimeId || config.beginDateTimeId === 0) {
          setError("Begin Date field required");
          isValidConfig = false;
        }
        break;
      case ViewType.Gallery:
        if (!config) {
          setError("Config invalid");
          isValidConfig = false;
        }
        if (!config.avatarId || config.avatarId === 0) {
          setError("Avatar field required");
          isValidConfig = false;
        }
        if (!config.nameId || config.nameId === 0) {
          setError("Task Name field required");
          isValidConfig = false;
        }
        if (!config.importanceId || config.importanceId === 0) {
          setError("Importance field required");
          isValidConfig = false;
        }
        if (!config.descriptionId || config.descriptionId === 0) {
          setError("Task Description field required");
          isValidConfig = false;
        }
        break;
      case ViewType.KanBan:
        if (!config) {
          setError("Config invalid");
          isValidConfig = false;
        }
        if (!config.boardColumnId || config.boardColumnId === 0) {
          setError("Board field required");
          isValidConfig = false;
        }
        if (!config.orderColumnId || config.orderColumnId === 0) {
          setError("Order field required");
          isValidConfig = false;
        }
        if (!config.titleId || config.titleId === 0) {
          setError("Title field required");
          isValidConfig = false;
        }
        break;
      case ViewType.TimeLine:
        if (!config) {
          setError("Config invalid");
          isValidConfig = false;
        }
        if (!config.titleId || config.titleId === 0) {
          setError("Title field required");
          isValidConfig = false;
        }
        if (!config.colorId || config.colorId === 0) {
          setError("Color field required");
          isValidConfig = false;
        }
        if (!config.levelId || config.levelId === 0) {
          setError("Level field required");
          isValidConfig = false;
        }
        if (!config.fromId || config.fromId === 0) {
          setError("From field required");
          isValidConfig = false;
        }
        if (!config.toId || config.toId === 0) {
          setError("To field required");
          isValidConfig = false;
        }
        break;
      case ViewType.Gantt:
        if (!config) {
          setError("Config invalid");
          isValidConfig = false;
        }
        if (!config.titleId || config.titleId === 0) {
          setError("Title field required");
          isValidConfig = false;
        }
        if (!config.colorId || config.colorId === 0) {
          setError("Color field required");
          isValidConfig = false;
        }
        if (!config.levelId || config.levelId === 0) {
          setError("Level field required");
          isValidConfig = false;
        }
        if (!config.fromId || config.fromId === 0) {
          setError("From field required");
          isValidConfig = false;
        }
        if (!config.toId || config.toId === 0) {
          setError("To field required");
          isValidConfig = false;
        }
      default:
        break;
    }
    return isValidConfig;
  };
  export async function getRowContent(viewId:number,router:any,rows:any[]) : Promise<any> {
    if(router?.query?.contentId && rows.length>0)
    {
      let currentRow = rows.find((row) => row.id === parseInt(router.query.contentId as string));
      if(!currentRow)
      {
        let currentRowResponse = await getContent(viewId, parseInt(router.query.contentId as string));
        if(isSucc(currentRowResponse) && currentRowResponse.data)
        {
          currentRow = Object.fromEntries(currentRowResponse.data);
          return currentRow;
        }
      }
      return currentRow
      
    }
    return undefined;
  }