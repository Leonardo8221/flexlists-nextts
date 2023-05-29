// Typescript misery: 
const ERR = Symbol('ERR')
const SUCC = Symbol('SUCC')
const PASS = Symbol('PASS')
const KEY = Symbol('KEY')

export function isErr(x: unknown): x is FlexlistsError {
    return typeof x === 'object' && x != null && ERR in x
}

export function isSucc(x: unknown): x is FlexlistsSuccess {
    return typeof x === 'object' && x != null && SUCC in x
}

export class FlexlistsError {
    public [ERR] = true
    public message: string
    public code: number
    public data: any
    public trace: string

    constructor(message: string, code: number, data?: any, stackTrace?: string) {
        this.message = message
        this.code = code
        this.data = data
        if (stackTrace) {
            this.trace = stackTrace
        } else {
            let trace = this.getTrace()!.split('\n')
            trace.shift()
            trace.shift()
            this.trace = trace.join('\n')
        }
    }

    private getTrace() {
        // get the stacktrace to this point
        return new Error().stack;
    }
}

export class FlexlistsSuccess<T = any> {
    public [SUCC] = true
    public message: string = 'Success'
    public data: T | undefined

    constructor({ message, data }: { message?: string, data?: T | undefined } = {}) {
        if (message) {
            this.message = message
        }
        this.data = data
    }
}