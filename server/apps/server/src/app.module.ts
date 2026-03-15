import { Module } from '@nestjs/common'
import { ShardModule } from 'libs/shared/src'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { WorkBookModule } from './work-book/work-book.module';

@Module({
    imports: [UserModule, ShardModule, WorkBookModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
