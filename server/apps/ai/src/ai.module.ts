import { Module } from '@nestjs/common'
import { ChatModule } from './chat/chat.module'

@Module({
    imports: [AiModule, ChatModule],
    controllers: [],
    providers: []
})
export class AiModule {}
