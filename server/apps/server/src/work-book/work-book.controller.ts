import { Controller, Get, Query, UsePipes } from '@nestjs/common'

import { ZodValidationPipe } from '@libs/core/pipes/zod-validation.pipe'
import type { WordBookQuery } from './dto/word-book.query.schema'
import { WordBookQueryZodSchema } from './dto/word-book.query.schema'
import { WorkBookService } from './work-book.service'

@Controller('work-book')
export class WorkBookController {
    constructor(private readonly workBookService: WorkBookService) {}

    @Get()
    @UsePipes(new ZodValidationPipe(WordBookQueryZodSchema))
    findAll(@Query() query: WordBookQuery) {
        return this.workBookService.findAll(query)
    }
}
