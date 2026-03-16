import { Transform } from 'class-transformer'
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class WordBookQueryDto {
    @IsOptional()
    @IsString()
    word?: string

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    page: number = 1

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    pageSize: number = 12

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    gk?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    zk?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    gre?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    toefl?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    ielts?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    cet6?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    cet4?: boolean

    @IsOptional()
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    ky?: boolean
}
