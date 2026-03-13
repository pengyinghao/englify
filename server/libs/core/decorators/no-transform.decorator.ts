import { SetMetadata } from '@nestjs/common'

export const NO_TRANSFORM = 'no-transform'
/** 数据不需要转换 为 默认格式 */
export const noTransform = () => SetMetadata(NO_TRANSFORM, true)
