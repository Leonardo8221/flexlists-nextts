export function isErr(x: any): x is FlexlistsError {
    return typeof x === 'object' && x != null && x.message !== 'Success'
}

export function isSucc(x: any): x is FlexlistsSuccess {
    return typeof x === 'object' && x != null && x.message === 'Success'
}

export type FlexlistsError = {
     ERR : boolean
     message: string
     code: number
     data: any
     trace: string
}

export type FlexlistsSuccess<T = any> =  {
    SUCC : boolean,
    message: string 
    data: T | undefined
}