import { PrismaService } from '@libs/shared'
import { Injectable } from '@nestjs/common'
import type { WordBookQuery } from './dto/word-book.query.schema'
import { toWordBookFindManyArgs } from './dto/word-book.query.schema'

@Injectable()
export class WorkBookService {
    constructor(private prismaService: PrismaService) {}

    async findAll(query: WordBookQuery) {
        const findManyArgs = toWordBookFindManyArgs(query)

        const [total, list] = await Promise.all([
            this.prismaService.wordBook.count({ where: findManyArgs.where }),
            this.prismaService.wordBook.findMany(findManyArgs)
        ])

        return {
            list,
            total
        }
    }
}
