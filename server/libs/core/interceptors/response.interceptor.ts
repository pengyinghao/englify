import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Response } from 'express'
import { Observable, map } from 'rxjs'
import { ApiCode } from '../apiException/api.code'
import { NO_TRANSFORM } from '../decorators'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    constructor(private readonly reflector: Reflector) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const target = [context.getClass(), context.getHandler()]
        // 不需要处理数据格式，直接返回
        const noTransform = this.reflector.getAllAndOverride<boolean>(NO_TRANSFORM, target)
        if (noTransform) {
            return next.handle()
        }

        const requestType = context.getType()

        if (requestType === 'http') {
            const res: Response = context.switchToHttp().getResponse()
            return next.handle().pipe(
                map((data): ApiResponse => {
                    if (res.statusCode === HttpStatus.CREATED) res.status(HttpStatus.OK)
                    return {
                        code: ApiCode.OK,
                        data: data,
                        message: ''
                    }
                })
            )
        }
        return next.handle()
    }
}
