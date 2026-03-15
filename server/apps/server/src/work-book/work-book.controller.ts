import type { WordBookParams } from '@en/common/wordBook'
import { Controller, Get, Query } from '@nestjs/common'
import { WorkBookService } from './work-book.service'

@Controller('work-book')
export class WorkBookController {
    constructor(private readonly workBookService: WorkBookService) {}

    @Get()
    findAll(@Query() query: WordBookParams) {
        return this.workBookService.findAll(query)
    }
}
