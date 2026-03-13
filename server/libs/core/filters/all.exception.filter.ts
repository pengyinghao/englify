import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger
} from '@nestjs/common'
import { Response } from 'express'
import { ApiResponse } from '../utils/api.response'

/** 全局异常过滤器 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name)

    private getExceptionMessage(exception: unknown): string {
        if (exception instanceof Error && typeof exception.message === 'string') {
            return exception.message
        }
        try {
            return typeof exception === 'string' ? exception : JSON.stringify(exception)
        } catch {
            return 'Internal server error'
        }
    }

    private getExceptionStack(exception: unknown): string | undefined {
        if (exception instanceof Error && typeof exception.stack === 'string') {
            return exception.stack
        }
        return undefined
    }

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response: Response = ctx.getResponse()

        if (exception instanceof HttpException) {
            return
        }

        if (response.headersSent) {
            return
        }

        // 其他异常统一按 500 返回
        const status = HttpStatus.INTERNAL_SERVER_ERROR
        const message = this.getExceptionMessage(exception)
        const stack = this.getExceptionStack(exception)
        this.logger.error(stack ?? message)

        const body: ApiResponse = {
            code: status,
            message,
            data: null
        }

        response.status(status).json(body)
    }
}
