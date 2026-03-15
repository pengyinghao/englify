/**
 * 获取查询数据 范围
 * @param pageNo 页码
 * @param pageSize 每页条数
 * @returns
 */
export function getPaginationRange(page: number, pageSize: number) {
    const safePage = Math.max(1, Math.floor(page))
    const safePageSize = Math.max(1, Math.floor(pageSize))

    const startIndex = (safePage - 1) * safePageSize

    return {
        skip: startIndex,
        take: Number(pageSize)
    }
}
