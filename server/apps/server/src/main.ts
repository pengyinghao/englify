import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'

import { config } from '@en/config'
import { VersioningType } from '@nestjs/common'
import { AllExceptionsFilter } from 'libs/core/filters/all.exception.filter'
import { ApiExceptionFilter } from 'libs/core/filters/api.exception.filter'
import { ResponseInterceptor } from 'libs/core/interceptors/response.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    const reflector = app.get(Reflector)
    app.useGlobalInterceptors(new ResponseInterceptor(reflector))
    app.useGlobalFilters(new ApiExceptionFilter(), new AllExceptionsFilter())

    app.setGlobalPrefix('api')
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })

    await app.listen(config.port.server)
}
bootstrap()
