// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Window {}

/** 设置某些字段 只读 */
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/** 分页返回结果 */
type ResponseList<T> = {
    list: T
    total: number
    /** 额外的参数 */
    [key: string]: any
}

/** 后端返回响应体 */
type ApiResponse<T = any> = {
    /** 业务响应码 */
    code: number
    /** 返回的数据 */
    data: T
    /** 错误消息 */
    message: string
}

/** 请求分页信息 */
type PageListOption = {
    /** 页码 */
    page: number
    /** 每页条数 */
    pageSize: number
}
