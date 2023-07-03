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