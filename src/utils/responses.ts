import dotenv from 'dotenv'
dotenv.config()


export enum Errors {
    NotAUser = 400,
    InvalidCredentials = 401,
    ListNotFound = 404,
    InvalidViewId = 405,
    UnknownType = 406,
    InvalidListId = 407,
    NotFound = 408,
    NotReachable = 409,
    UnacceptedTermsAndConditions = 410,
    InvalidPassword = 411,
    InvalidKey = 412,

    NotImplemented = 501,
    CreateError = 502,
    UserAlreadyMigrated = 503,
    InvalidInput = 504,
    UpdateError = 505,
    QueryError = 506,
    AlreadyHasAccess = 507,
    UserExists = 508,
    UserAlreadyActivated = 509,
    AlreadyMigrated = 510,
    ReservedUserName = 511,
    UserNotActivated = 512,
    NameAlreadyExists = 513,
    UserNameAlreadyExists = 514,
    UserEmailAlreadyExists = 515,
    UnknownMigrationError = 516,
    MigrationInProgress = 517,
    ReloadMigration = 518,
    SignInOrRegister = 519,

    DeprecatedFunction = 998,
    UnknownError = 999
}

import * as Sentry from "@sentry/nextjs";

export function isErr(x: any): x is FlexlistsError {
    return typeof x === 'object' && x != null && !(x as any).isSuccess
}

export function isSucc(x: any): x is FlexlistsSuccess {
    return typeof x === 'object' && x != null && (x as any).isSuccess
}

export class FlexlistsError {
    //public [ERR] = true
    public isSuccess = false
    public message: string
    public code: number
    public data: any
    public trace: string

    constructor(message: string, code: number, data?: any, stackTrace?: string, logLevel: 'Fatal' | 'Log' | 'Error' | 'Warning' | 'Info' | 'Debug' = 'Log') {
        this.message = message
        this.code = code
        this.data = data

        this.trace = ''
        if (stackTrace) {
            this.trace = stackTrace
        }
        // just in case as most actual errors miss the trace for some )(*@#*)$%)*@(% reason
        let trace = this.getTrace()!.split('\n')
        trace.shift()
        trace.shift()
        this.trace += '\n\n' + trace.join('\n')

        if (process.env.SENTRY_DSN && process.env.SENTRY_DSN.length > 0) {
            Sentry.captureMessage(`${message} - ${code}\n\n${this.trace}`, logLevel as Sentry.SeverityLevel)
            this.trace = ''
        } else {
            console.log(`${logLevel}: ${message} - ${code}\n\n${this.trace}`)
        }
    }

    private getTrace() {
        // get the stacktrace to this point
        return new Error().stack;
    }
}

export class FlexlistsSuccess<T = any> {
    //public [SUCC] = true
    public isSuccess = true
    public message: string = 'Success'
    public data: T | undefined

    constructor(data?: T, message?: string) {
        //constructor({ message, data }: { message?: string, data?: T | undefined } = {}) {
        if (message) {
            this.message = message
        }
        this.data = data
    }
}