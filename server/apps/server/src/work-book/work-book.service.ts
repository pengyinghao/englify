import { PrismaService } from '@libs/shared'
import { WordBookWhereInput } from '@libs/shared/generated/prisma/models'
import { Injectable } from '@nestjs/common'
import { getPaginationRange } from './../../../../libs/core'
import { WordBookQueryDto } from './dto/word-book.dto'

@Injectable()
export class WorkBookService {
    constructor(private prismaService: PrismaService) {}

    async findAll(query: WordBookQueryDto) {
        const { page, pageSize, word, ...rest } = query
        const where: WordBookWhereInput = {
            word: word ? { contains: word } : undefined,
            ...rest
        }

        const [total, list] = await Promise.all([
            this.prismaService.wordBook.count({ where }),
            this.prismaService.wordBook.findMany({
                where,
                ...getPaginationRange(page, pageSize),
                orderBy: {
                    frq: 'desc'
                }
            })
        ])

        return {
            list,
            total
        }
    }
}
