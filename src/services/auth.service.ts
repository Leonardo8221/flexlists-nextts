import { FlexlistsError, FlexlistsSuccess } from "../models/ApiResponse";
import axios from "../utils/axios";

export const authService = {
    login,
    register,
    verifyToken,
    logout,
    verifySignup,
    resendSignupEmail,
    loginExisting,
    registerExisting
};
export async function login(userName: string, password: string): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/login', { userName, password })
    return response.data;
};
export async function loginExisting(userName: string, password: string): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/loginExisting', { userName, password })
    return response.data;
};
export async function register(firstName: string, lastName: string, userName: string, email: string, phoneNumber: string, password: string, acceptTermsAndConditions: boolean): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/register', { firstName, lastName, userName, email, password, phoneNumber, acceptTermsAndConditions })
    return response.data;
};
export async function registerExisting(userName: string, password: string, acceptTermsAndConditions: boolean, firstName: string, lastName: string, email: string, phoneNumber: string): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/registerExisting', { userName, password, acceptTermsAndConditions, firstName, lastName, email, phoneNumber })
    return response.data;
};
export async function verifyToken(): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/verifyToken')
    return response.data;
};
export async function logout(): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/logout')
    return response.data;
};
export async function verifySignup(token: string, email: string): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/verifySignup?token=' + token + '&email=' + email)
    return response.data;
};
export async function resendSignupEmail(email: string): Promise<FlexlistsError | FlexlistsSuccess<any>> {

    const response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/resendSignupEmail?email=' + email)
    return response.data;

}
export async function validateAccessKey(key: string): Promise<FlexlistsError | FlexlistsSuccess<{ viewId: number }>> {
    var response = await axios.get<FlexlistsError | FlexlistsSuccess<{ viewId: number }>>('/api/auth/validateAccessKey' + `?key=${key}`)
    return response.data;
};

export async function getMigrationProgress(key: string): Promise<FlexlistsError | FlexlistsSuccess<{ id: number, userName: string, firstName: string, lastName: string, legacyUser: boolean, wasMigrated: boolean }>> {
    var response = await axios.get<FlexlistsError | FlexlistsSuccess<{ id: number, userName: string, firstName: string, lastName: string, legacyUser: boolean, wasMigrated: boolean }>>('/api/migrate/getMigrationProgress')
    return response.data;
};