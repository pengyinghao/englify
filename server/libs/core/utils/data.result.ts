import { ApiCode } from '../apiException/api.code'

export class DataResult<T = any> {
    readonly code: ApiCode
    readonly message?: string
    readonly data?: T

    constructor(params: { code?: ApiCode; message?: string; data?: T } = {}) {
        const { code = ApiCode.OK, message, data } = params

        this.code = code
        this.message = message
        this.data = data
    }

    get success(): boolean {
        return this.code === ApiCode.OK
    }

    static ok(): DataResult<undefined>
    static ok<T>(data: T): DataResult<T>
    static ok<T>(data: T, message: string): DataResult<T>
    static ok<T>(data?: T, message?: string): DataResult<T | undefined> {
        return new DataResult({
            code: ApiCode.OK,
            data,
            message
        })
    }

    static fail(message?: string): DataResult<undefined>
    static fail<T>(message: string, code: ApiCode, data?: T): DataResult<T>
    static fail<T>(
        message = '操作失败',
        code: ApiCode = ApiCode.ERROR,
        data?: T
    ): DataResult<T | undefined> {
        return new DataResult({
            code,
            message,
            data
        })
    }
}
