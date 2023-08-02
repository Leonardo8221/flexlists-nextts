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

export const SentryMeta = {
    sentryInitialized: false
}

export type LogLevel = 'Fatal' | 'Log' | 'Error' | 'Warning' | 'Info' | 'Debug'

const LogLevelErrorMappings: { [key: string]: string } = {
    NotAUser: 'Info',
    InvalidCredentials: 'Info',
    ListNotFound: 'Info',
    InvalidViewId: 'Info',
    UnknownType: "Info",
    InvalidListId: 'Info',
    NotFound: 'Info',
    NotReachable: 'Fatal',
    UnacceptedTermsAndConditions: 'Info',
    InvalidPassword: 'Info',
    InvalidKey: 'Info',

    NotImplemented: 'Fatal',
    CreateError: 'Fatal',
    UserAlreadyMigrated: 'Info',
    InvalidInput: 'Info',
    UpdateError: 'Fatal',
    QueryError: 'Erorr',
    AlreadyHasAccess: 'Info',
    UserExists: 'Info',
    UserAlreadyActivated: 'Info',
    AlreadyMigrated: 'Info',
    ReservedUserName: 'Info',
    UserNotActivated: 'Info',
    NameAlreadyExists: 'Info',
    UserNameAlreadyExists: 'Info',
    UserEmailAlreadyExists: 'Info',
    UnknownMigrationError: 'Error',
    MigrationInProgress: 'Info',
    ReloadMigration: 'Info',
    SignInOrRegister: 'Info',

    DeprecatedFunction: 'Error',
    UnknownError: 'Fatal'
}

const StatusCodeErrroMappings: { [key: string]: number } = {
    NotAUser: 401,
    InvalidCredentials: 401,
    ListNotFound: 404,
    InvalidViewId: 404,
    UnknownType: 400,
    InvalidListId: 404,
    NotFound: 404,
    NotReachable: 503,
    UnacceptedTermsAndConditions: 400,
    InvalidPassword: 400,
    InvalidKey: 401,

    NotImplemented: 500,
    CreateError: 500,
    UserAlreadyMigrated: 503,
    InvalidInput: 504,
    UpdateError: 500,
    QueryError: 503,
    AlreadyHasAccess: 400,
    UserExists: 400,
    UserAlreadyActivated: 400,
    AlreadyMigrated: 400,
    ReservedUserName: 400,
    UserNotActivated: 400,
    NameAlreadyExists: 400,
    UserNameAlreadyExists: 400,
    UserEmailAlreadyExists: 400,
    UnknownMigrationError: 500,
    MigrationInProgress: 400,
    ReloadMigration: 400,
    SignInOrRegister: 400,

    DeprecatedFunction: 500,
    UnknownError: 500
}

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
    public httpStatus: number = 500
    public logLevel: LogLevel = 'Log'

    constructor(message: string, code: number, data?: any, stackTrace?: string, logLevel?: LogLevel) {
        this.message = message
        this.code = code
        this.data = data
        const err = Errors[code]
        this.logLevel = logLevel ?? LogLevelErrorMappings[err] as LogLevel
        this.httpStatus = StatusCodeErrroMappings[err]

        this.trace = ''
        if (stackTrace) {
            this.trace = stackTrace
        }
        // just in case as most actual errors miss the trace for some )(*@#*)$%)*@(% reason
        let trace = this.getTrace()!.split('\n')
        trace.shift()
        trace.shift()
        this.trace += '\n\n' + trace.join('\n')

        if (SentryMeta.sentryInitialized) {
            Sentry.captureMessage(`${message} - ${code}\n\n${this.trace}`, "error",)
            this.trace = ''
        } else {
            console.log(`ERROR: ${message} - ${code}\n\n${this.trace}`)
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