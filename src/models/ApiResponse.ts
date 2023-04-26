export class ApiResponse<T> implements BaseApiResponse
{
    public result?:T;
    public code : number;
    public message : string;
    constructor( result: T) {
        this.result = result;
        this.code = 0;
        this.message = 'Success';
    }
}
export class BaseApiResponse {
    code: number|0;
    message: string|'success';
    constructor(code : number,message:string)
    {
        this.code = code;
        this.message = message;
    }
}
