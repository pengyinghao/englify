import { HttpException, HttpStatus } from '@nestjs/common'

export class ApiException extends HttpException {
    private msg: string
    private code: number
    private data?: unknown

    /**
     * 自定义错误码处理
     * @param msg 错误消息
     * @param code 错误码
     * @param statusCode http 错误码，默认200
     */
    constructor(msg: string, code: number, statusCode: HttpStatus = HttpStatus.OK, data?: unknown) {
        super(msg, statusCode)

        this.msg = msg
        this.code = code
        this.data = data
    }

    getErrorCode(): number {
        return this.code
    }

    getErrorMsg(): string {
        return this.msg
    }

    getErrorData(): unknown {
        return this.data
    }
}
