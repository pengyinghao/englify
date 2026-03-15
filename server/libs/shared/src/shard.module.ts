import { Global, Module } from '@nestjs/common'
import { ShardService } from './shard.service'
import { PrismaModule } from './prisma/prisma.module'

@Global()
@Module({
    providers: [ShardService],
    exports: [ShardService, PrismaModule],
    imports: [PrismaModule]
})
export class ShardModule {}
