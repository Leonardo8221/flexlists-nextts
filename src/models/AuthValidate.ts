export type AuthValidate = {
    isUserValidated: boolean;
    isKeyValidated: boolean;
    user?: { userId: number, userName: string,firstName:string,lastName:string };
};