import { getPaginationRange } from '@libs/core'
import type { Prisma } from '@libs/shared/generated/prisma/client'
import { WordBookFindManyZodSchema } from '@libs/shared/generated/zod/schemas'
import { z } from 'zod'

const queryBoolean = z.preprocess((value) => {
    if (value === 'true') return true
    if (value === 'false') return false
    return value
}, z.boolean())

export const WordBookQueryZodSchema = z
    .object({
        word: z.string().trim().min(1).optional(),
        page: z.coerce.number().int().min(1).default(1),
        pageSize: z.coerce.number().int().min(1).max(100).default(12),
        gk: queryBoolean.optional(),
        zk: queryBoolean.optional(),
        gre: queryBoolean.optional(),
        toefl: queryBoolean.optional(),
        ielts: queryBoolean.optional(),
        cet6: queryBoolean.optional(),
        cet4: queryBoolean.optional(),
        ky: queryBoolean.optional()
    })
    .strict()

export type WordBookQuery = z.infer<typeof WordBookQueryZodSchema>

export function toWordBookFindManyArgs(query: WordBookQuery): Prisma.WordBookFindManyArgs {
    const { page, pageSize, word, ...flags } = query

    return WordBookFindManyZodSchema.parse({
        where: {
            ...(word ? { word: { contains: word } } : {}),
            ...flags
        },
        ...getPaginationRange(page, pageSize),
        orderBy: {
            frq: 'desc'
        }
    })
}
