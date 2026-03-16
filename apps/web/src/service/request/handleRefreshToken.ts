/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/core/constant'
import { fetchRefreshToken } from '@/service/apis/auth'
import { eventEmitter } from '@/utils/eventEmitter'
import { request } from './baseRequest'

let refreshing = false

const queue: { resolve: (val: any) => void; reject: (reason?: any) => void }[] = []

export const handleRefreshToken = async (error: any) => {
    if (!error.response || !error.response.config) {
        return Promise.reject(error)
    }
    const { config } = error.response

    if (refreshing) {
        return new Promise((resolve, reject) => {
            queue.push({
                resolve: (newToken: string) => {
                    Reflect.set(config.headers, 'authorization', `Bearer ${newToken}`)
                    resolve(request(config))
                },
                reject: (err: any) => {
                    reject(err)
                }
            })
        })
    }

    refreshing = true

    try {
        const currentRefreshToken = sessionStorage.getItem(REFRESH_TOKEN) || ''
        const { data, status } = await fetchRefreshToken(currentRefreshToken)

        if (status === 200 && data.code === 0) {
            const accessToken = data.data.access_token
            sessionStorage.setItem(ACCESS_TOKEN, accessToken || '')
            sessionStorage.setItem(REFRESH_TOKEN, data.data.refresh_token || '')

            queue.forEach((q) => q.resolve(accessToken))
            queue.length = 0

            Reflect.set(config.headers, 'authorization', `Bearer ${accessToken}`)
            return request(config)
        } else {
            throw new Error('Refresh token invalid')
        }
    } catch (e: any) {
        queue.forEach((q) => q.reject(e))
        queue.length = 0

        eventEmitter.emit('API:UN_AUTH', e)

        return Promise.reject(e)
    } finally {
        refreshing = false
    }
}
