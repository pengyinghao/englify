import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaService {
    print() {
        return 'print'
    }
}
