import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger
} from '@nestjs/common'
import { Response } from 'express'
import { ApiException } from '../apiException/api.exception'
import { ApiResponse } from '../utils/api.response'

@Catch(HttpException)
export class ApiExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(ApiExceptionFilter.name)

    private extractMessage(exception: HttpException): string {
        const response = exception.getResponse()
        if (typeof response === 'string') return response
        if (response && typeof response === 'object' && 'message' in response) {
            const msg = (response as { message?: string | string[] }).message
            if (Array.isArray(msg)) return msg.join('; ')
            if (typeof msg === 'string') return msg
        }
        return exception.message || 'error'
    }

    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response: Response = ctx.getResponse()
        const status = exception.getStatus?.() ?? HttpStatus.INTERNAL_SERVER_ERROR
        const message = this.extractMessage(exception)

        if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(exception.stack ?? message)
        }

        if (response.headersSent) return

        const code = exception instanceof ApiException ? exception.getErrorCode() : status
        const msg = exception instanceof ApiException ? exception.getErrorMsg() : message
        const data = exception instanceof ApiException ? (exception.getErrorData() ?? null) : null
        const body: ApiResponse = {
            code,
            message: msg,
            data
        }

        response.status(status).json(body)
    }
}
