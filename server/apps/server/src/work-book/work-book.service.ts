import type { WordBookParams } from '@en/common/wordBook'
import { PrismaService } from '@libs/shard'
import { WordBookWhereInput } from '@libs/shard/generated/prisma/models'
import { Injectable } from '@nestjs/common'
import { getPaginationRange } from './../../../../libs/core'

@Injectable()
export class WorkBookService {
    constructor(private prismaService: PrismaService) {}

    async findAll(query: WordBookParams) {
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
