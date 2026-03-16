import { message } from 'antdv-next'
import { type AxiosResponse } from 'axios'
import { type requestConfig, responseMap } from './types'

export const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>) => {
    return new Promise<T>((resolve, reject) => {
        const { code, data } = response.data
        const responseMessage = response.data.message

        // 是否处理消息提示
        const handleMessage = (response.config as requestConfig).handleMessage

        if (code === responseMap.success) {
            if (response.config.method !== 'get' && handleMessage && responseMessage) {
                message.success(responseMessage)
            }
            resolve(data)
        } else {
            if (handleMessage) {
                message.error(responseMessage)
            }
            reject(response.data)
        }
    })
}
