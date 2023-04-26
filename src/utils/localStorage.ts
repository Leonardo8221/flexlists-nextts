import { LocalStorageConst } from '../constants/StorageConsts';
export function storeToken(token: string) {
    localStorage.setItem(LocalStorageConst.Token, token);
}
export function getToken() {
    return localStorage.getItem(LocalStorageConst.Token);
}
export function removeToken() {
    return localStorage.removeItem(LocalStorageConst.Token);
}