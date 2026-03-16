import { eventEmitter } from '@/utils/eventEmitter'
import { message } from 'antdv-next'
import { handleRefreshToken } from './handleRefreshToken'
import { ERROR_STATUS, responseMap } from './types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleResponseError = async (error: any) => {
    if (error.code === 'ERR_CANCELED') {
        return Promise.reject(error.message)
    }

    const { config } = error.response

    // 刷新token
    if (error.response.status === responseMap.unauthorized && !config.url.includes('/user/refresh')) {
        return handleRefreshToken(error)
    }

    // 刷新token遇到 token过期 ，重新登录
    if (
        (error.response.status === responseMap.unauthorized && config.url.includes('/user/refresh')) ||
        error.response.data.code === responseMap.sessionExpired
    ) {
        return eventEmitter.emit('API:UN_AUTH', error.response.data)
    }

    if (error.response.status !== 200) {
        const errMsg =
            error.response.data.message ||
            ERROR_STATUS[error.response.status as keyof typeof ERROR_STATUS] ||
            '服务器错误'
        message.error(errMsg)
        return Promise.reject(error.response.data)
    }

    return error.response
}
