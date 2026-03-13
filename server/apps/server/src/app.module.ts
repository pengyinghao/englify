import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ShardModule } from '@libs/shard'

@Module({
    imports: [UserModule, ShardModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
