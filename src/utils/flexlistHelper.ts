import {
  ExportType,
  FieldType,
  FieldUiTypeEnum,
  ImportType,
  ViewType,
} from "src/enums/SharedEnums";
import { ChoiceModel } from "src/models/ChoiceModel";
import { ViewField } from "src/models/ViewField";
import { convertToInteger } from "./convertUtils";
import { filter } from "lodash";
import { getContent } from "src/services/listContent.service";
import { isSucc } from "./responses";
import { FieldValidatorEnum, ModelValidatorEnum, frontendValidate, isFrontendError } from "./validatorHelper";

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
          defaultValue = column.config?.values?column.config?.values[0]?.label:'';
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
export const isValidFieldValue = async(fieldType: FieldUiTypeEnum,value:any,required:boolean): Promise<boolean> => {
  let isValid :boolean = true;
  let _errors: { [key: string]: string|boolean } = {}
  let _setErrors = (e: { [key: string]: string|boolean }) => { 
    _errors = e
  } 
  switch (fieldType) {
    case FieldUiTypeEnum.Integer:
      await frontendValidate(ModelValidatorEnum.GenericTypes,FieldValidatorEnum.integer,value,_errors,_setErrors,required)
      if(isFrontendError(FieldValidatorEnum.integer,_errors)) 
      {
        isValid = false;
      }
      break;
    case FieldUiTypeEnum.Boolean:
      isValid = !required|| (required && value !== null && value !== undefined);
      break;
    case FieldUiTypeEnum.Decimal:
    case FieldUiTypeEnum.Float:
    case FieldUiTypeEnum.Double:
    case FieldUiTypeEnum.Money:
    case FieldUiTypeEnum.Percentage:
      isValid = !required|| (required && value !== null && value !== undefined);
      break;
    default:
      isValid = !required|| (required && value && value !== null && value !== undefined);
      break;
  }
  return isValid;
}
export const getDataColumnId = (fieldId: number, columns: ViewField[]): string => {
  const field = columns.find((x) => x.id === fieldId);

  if (field && field.system && (field.name === 'id' || field.name === 'createdAt' || field.name === 'updatedAt')) {
    return field.name;
  }

  return `${fieldId}`;
}
export const getColumn = (column_id: any,columns:any[]) : ViewField|undefined => {

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
  if (!id || id === ""||id === null) {
    return "";
  }
  return `${process.env.NEXT_PUBLIC_FLEXLIST_API_URL}/api/file/downloadFile?id=${id}`;
};
export const getAvatarUrl = (avartarUrl?: string): string => {
  if (!avartarUrl || avartarUrl === ""||avartarUrl === null) {
    return "/assets/images/avatars/avatar_2.jpg";
  }
  return downloadFileUrl(avartarUrl);
};
export const getExportFileExtension = (exportFile: ExportType): string => {
  switch (exportFile) {
    case ExportType.CSV:
      return "csv";
    case ExportType.JSON:
      return "json";
    case ExportType.RSS:
      return "rss";
    case ExportType.XML:
      return "xml";
    case ExportType.YML:
      return "yml";
    case ExportType.XLSX:
      return "xlsx";
    case ExportType.HTML:
      return "html";
  }
  return "csv";
};
export const getExportMimeType = (exportFile: ExportType): string => {
  switch (exportFile) {
    case ExportType.CSV:
      return "text/csv";
    case ExportType.JSON:
      return "application/json";
    case ExportType.RSS:
      return "application/rss+xml";
    case ExportType.XML:
      return "application/xml";
    case ExportType.YML:
      return "application/x-yaml";
    case ExportType.XLSX:
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    case ExportType.HTML:
      return "text/html";
  }
  return "application/json";
};

export const getImportFileExtension = (importFile: ImportType): string => {
  switch (importFile) {
    case ImportType.CSV:
      return "csv";
    case ImportType.JSON:
      return "json";
    case ImportType.XML:
      return "xml";
    case ImportType.YML:
      return "yml";
    case ImportType.XLSX:
      return "xlsx";
  }
  return "csv";
};
export const validateViewConfig = (
  viewType: ViewType,
  config: any,
  setError: (message: string) => void
): boolean => {
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
      if (!config.imageId || config.imageId === 0) {
        setError("Image field required");
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
export async function getRowContent(
  viewId: number,
  router: any,
  rows: any[]
): Promise<any> {
  if (router?.query?.contentId && rows.length > 0) {
    let currentRow = rows.find(
      (row) => row.id === parseInt(router.query.contentId as string)
    );
    if (!currentRow) {
      let currentRowResponse = await getContent(
        viewId,
        parseInt(router.query.contentId as string)
      );
      if (isSucc(currentRowResponse) && currentRowResponse.data) {
        currentRow = Object.fromEntries(currentRowResponse.data);
        return currentRow;
      }
    }
    return currentRow;
  }
  return undefined;
}
export function getDefaultFieldIcon(fieldType: FieldUiTypeEnum): string {
  let icon: string = "";
  switch (fieldType) {
    case FieldUiTypeEnum.Choice:
      icon = "Choice";
      break;
    case FieldUiTypeEnum.Boolean:
      icon = "Boolean";
      break;
    case FieldUiTypeEnum.Color:
      icon = "Color";
      break;
    case FieldUiTypeEnum.Date:
      icon = "Date";
      break;
    case FieldUiTypeEnum.DateTime:
      icon = "Date-Time";
      break;
    case FieldUiTypeEnum.Decimal:
      icon = "Decimal";
      break;
    case FieldUiTypeEnum.Document:
      icon = "Document";
      break;
    case FieldUiTypeEnum.Double:
      icon = "";
      break;
    case FieldUiTypeEnum.Float:
      icon = "Float";
      break;
    case FieldUiTypeEnum.HTML:
      icon = "HTML";
      break;
    case FieldUiTypeEnum.Image:
      icon = "Image";
      break;
    case FieldUiTypeEnum.Integer:
      icon = "Integer";
      break;
    case FieldUiTypeEnum.LongText:
      icon = "Long-Text";
      break;
    case FieldUiTypeEnum.Markdown:
      icon = "Markdown";
      break;
    case FieldUiTypeEnum.Money:
      icon = "Price";
      break;
    case FieldUiTypeEnum.Percentage:
      icon = "";
      break;
    case FieldUiTypeEnum.Text:
      icon = "Text";
      break;
    case FieldUiTypeEnum.Time:
      icon = "Time";
      break;
    case FieldUiTypeEnum.Video:
      icon = "Video";
      break;
    case FieldUiTypeEnum.User:
      icon = "User";
      break;
    default:
      break;
  }
  return icon;
}
export function getFieldIcons(): string[] {
  return [
    "Text",
    "Long-Text",
    "HTML",
    "Markdown",
    "Integer",
    "Float",
    "Decimal",
    "Choice",
    "Boolean",
    "Color",
    "Date",
    "Time",
    "Date-Time",
    "Image",
    "Video",
    "Document",
    "Price",
    "User",
    "Down",
    "Close",
    "Importance",
    "Phase",
    "Plus",
  ];
}

export const enabledViewCards = (views: any[]) => {
  const enabledViews = process.env.NEXT_PUBLIC_FLEXLIST_VIEWS ? process.env.NEXT_PUBLIC_FLEXLIST_VIEWS.split(',') : [];

  return views.filter((view: any) => enabledViews.includes(view.type.toLowerCase()) || view.type === 'List');
};