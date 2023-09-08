import { LocalStorageConst } from '../constants/StorageConsts';
export function storeLanguage(language: string) {
    localStorage.setItem(LocalStorageConst.Language, language);
}
export function getLanguage() {
    return localStorage.getItem(LocalStorageConst.Language);
}
export function removeLanguage() {
    return localStorage.removeItem(LocalStorageConst.Language);
}

export function setViewReadContent(viewId:number,contentId:number) : number[] {
    let readContents = localStorage.getItem(`${viewId}_readContents`);
    let readContentsArray : number[] = []
    if(readContents)
    {
        readContentsArray = JSON.parse(readContents) as number[];
        if(!readContentsArray.includes(contentId))
        {
            readContentsArray.push(contentId);
            localStorage.setItem(`${viewId}_readContents`, JSON.stringify(readContentsArray));
        }
    }
    else
    {
        localStorage.setItem(`${viewId}_readContents`, JSON.stringify([contentId]));
        readContentsArray.push(contentId);
    }
    return readContentsArray;
}
export function getViewReadContents(viewId:number) {
    let readContents = localStorage.getItem(`${viewId}_readContents`);
    if(readContents)
    {
        return JSON.parse(readContents) as number[];
    }
    return [];
}
export function removeViewReadContent(viewId:number,contentId:number): number[] {
    let readContents = localStorage.getItem(`${viewId}_readContents`);
    let readContentsArray : number[] = []
    if(readContents)
    {
        readContentsArray = JSON.parse(readContents) as number[];
        if(readContentsArray.includes(contentId))
        {
            readContentsArray.splice(readContentsArray.indexOf(contentId),1);
            localStorage.setItem(`${viewId}_readContents`, JSON.stringify(readContentsArray));
        }
    }
    return readContentsArray
}
