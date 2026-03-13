import { NestFactory } from '@nestjs/core'
import { AiModule } from './ai.module'
import { Reflector } from '@nestjs/core'

import { ResponseInterceptor } from 'libs/core/interceptors/response.interceptor'
import { ApiExceptionFilter } from 'libs/core/filters/api.exception.filter'
import { AllExceptionsFilter } from 'libs/core/filters/all.exception.filter'
import { config } from '@en/config'

async function bootstrap() {
    const app = await NestFactory.create(AiModule)
    const reflector = app.get(Reflector)
    app.useGlobalInterceptors(new ResponseInterceptor(reflector))
    app.useGlobalFilters(new ApiExceptionFilter(), new AllExceptionsFilter())
    await app.listen(config.port.ai)
}
bootstrap()
