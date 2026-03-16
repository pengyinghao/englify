import { requestGet } from '../../request'

import type { IWordBook, WordBookOption } from '@en/common/wordBook'

/** 获取词库分页列表 */
export function fetchWordBookInfos(option: WordBookOption) {
    return requestGet<ResponseList<IWordBook[]>>('/work-book', {
        params: option
    })
}
