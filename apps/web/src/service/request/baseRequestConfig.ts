import type { CreateAxiosDefaults } from 'axios'
import { merge } from 'lodash-es'
import type { requestConfig } from './types'

export const baseRequestConfig = (config?: CreateAxiosDefaults) => {
    const retryConfig: requestConfig = {
        handleData: true,
        handleMessage: true,
        global: false
    }
    return merge(retryConfig, config)
}
