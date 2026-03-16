/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACCESS_TOKEN, BASE_URL, TIME_OUT } from '@/core/constant'
import type { InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { baseRequestConfig } from './baseRequestConfig'
import { handleResponse } from './handleResponse'
import { handleResponseError } from './handleResponseError'
import { type requestConfig } from './types'

const pendingPool = new Map<string, { controller: AbortController; global?: boolean }>()

const service = axios.create({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    method: 'GET'
})

/** 初始化请求拦截器 */
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem(ACCESS_TOKEN)

    if (token) {
        config.headers.authorization = `Bearer ${token}`
    }

    const url = config.url || ''
    if (pendingPool.has(url)) {
        pendingPool.get(url)?.controller.abort(`${url}请求重复`)
    }

    const controller = new AbortController()
    config.signal = controller.signal
    pendingPool.set(url, {
        controller,
        global: (config as requestConfig).global
    })
    return config
})

/** 初始化响应拦截器 */
service.interceptors.response.use(
    (response: any) => {
        pendingPool.delete(response.config.url)
        // 是否处理数据
        const handleData = (response.config as requestConfig).handleData
        if (!handleData) return response
        return handleResponse(response)
    },
    (error: any) => {
        if (!axios.isCancel(error) && error.code !== 'ERR_CANCELED') {
            pendingPool.delete(error.config?.url)
        }

        return handleResponseError(error)
    }
)

const request = <T>(opts: requestConfig) => {
    const mergedConfig = baseRequestConfig(opts)
    return service(mergedConfig) as Promise<T>
}

/** 清除所有pending状态的请求 */
const clearPendingPool = () => {
    if (!pendingPool.size) return

    const pendingUrlList = Array.from(pendingPool.keys())
    if (!pendingUrlList.length) return

    pendingUrlList.forEach((pendingUrl) => {
        // 如果不为全局的请求，则移出
        const task = pendingPool.get(pendingUrl)
        if (task && !task.global) {
            task.controller.abort()
            pendingPool.delete(pendingUrl)
        }
    })

    return pendingUrlList
}

/** 取消某一个请求 */
const clearPending = (url: string) => {
    if (pendingPool.has(url)) {
        pendingPool.get(url)?.controller.abort()
        pendingPool.delete(url)
    }
}

export { service as baseRequest, clearPending, clearPendingPool, request }
