import { ExportType, ImportType } from "src/enums/SharedEnums";
import { ChoiceModel } from "src/models/ChoiceModel";
import { ViewField } from "src/models/ViewField";

export const getDataColumnId = (fieldId: number, columns: ViewField[]): string => {
    var field = columns.find((x) => x.id === fieldId);
    if (field && field.system && (field.name === 'id' || field.name === 'createdAt' || field.name === 'updatedAt')) {
        return field.name;
    }
    return `${fieldId}`;

}
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