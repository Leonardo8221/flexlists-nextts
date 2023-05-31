export class FlexlistsError {
    public isSuccess : boolean
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
        this.isSuccess = false
    }

    private getTrace() {
        // get the stacktrace to this point
        return new Error().stack;
    }
}

export class FlexlistsSuccess<T = any> {
    public isSuccess :boolean
    public message: string 
    public data: T | undefined

    constructor(data?: T, message?: string) {
        if (message) {
            this.message = message
        }
        else
        {
           this.message = 'Success'
        }
        this.isSuccess = true
        this.data = data
    }
}