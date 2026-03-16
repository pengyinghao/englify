import mitt from 'mitt'

interface EventName {
    /** 未授权 */
    'API:UN_AUTH': ApiResponse<unknown>
    /** 后端返回的请求错误或者参数错误 */
    'API:ERROR': ApiResponse<unknown>
    /** 刷新页面 */
    REFRESH_PAGE: void
}

type EventNames = {
    [K in keyof EventName]: EventName[K]
}

export const eventEmitter = mitt<EventNames>()
