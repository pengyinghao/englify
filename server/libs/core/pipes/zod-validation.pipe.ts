import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import type { ZodType } from 'zod'

@Injectable()
export class ZodValidationPipe<TOutput = unknown> implements PipeTransform {
    constructor(private readonly schema: ZodType<TOutput>) {}

    transform(value: unknown): TOutput {
        const result = this.schema.safeParse(value)

        if (!result.success) {
            throw new BadRequestException({
                message: 'Validation failed',
                errors: result.error.issues.map((issue) => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }))
            })
        }

        return result.data
    }
}
