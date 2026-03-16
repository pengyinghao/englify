import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common'
import { WordBookQueryDto } from './dto/word-book.dto'
import { WorkBookService } from './work-book.service'

@Controller('work-book')
export class WorkBookController {
    constructor(private readonly workBookService: WorkBookService) {}

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    findAll(@Query() query: WordBookQueryDto) {
        return this.workBookService.findAll(query)
    }
}
