import { FlexlistsError, FlexlistsSuccess } from "../models/ApiResponse";
import axios from "../utils/axios";

export const authService = {
    login,
    register,
    verifyToken,
    logout,
    verifySignup,
    resendSignupEmail
};
async function login(userName: string, password: string): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/login', { userName, password })
    return response.data;
};
async function register(firstName: string, lastName: string, userName: string, email: string, phoneNumber: string, password: string): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/register', { firstName, lastName, userName, email, password, phoneNumber })
    return response.data;
};
async function verifyToken(): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/verifyToken')
    return response.data;
};
async function logout(): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/logout')
    return response.data;
};
async function verifySignup(token: string, email: string): Promise<FlexlistsError | FlexlistsSuccess<any>> {
    var response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/verifySignup?token=' + token + '&email=' + email)
    return response.data;
};
async function resendSignupEmail(email: string): Promise<FlexlistsError | FlexlistsSuccess<any>> {

    const response = await axios.post<FlexlistsError | FlexlistsSuccess<any>>('/api/auth/resendSignupEmail?email=' + email)
    return response.data;

}