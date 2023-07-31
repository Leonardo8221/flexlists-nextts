import { all } from "axios";

export function getFileExtension(fileName: string): string {
    const parts = fileName.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 1];
    }
    return '';
}
export function isFileExtensionAllowed(fileName:string, allowedExtensions: string[]): boolean {
    if(allowedExtensions.length === 0 || (allowedExtensions.length === 1 && allowedExtensions[0] === '*/*'))
    {
        return true;
    }
    return allowedExtensions.includes(getFileExtension(fileName));
}