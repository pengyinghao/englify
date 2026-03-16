import { requestGet } from '@/service/request'
import type { AxiosResponse } from 'axios'

/** 用户登录相应实体 */
export interface UserLoginResponse {
    /** 当前token */
    access_token: string
    /** 刷新token */
    refresh_token: string
}

/** 刷新token */
export const fetchRefreshToken = (token: string) => {
    return requestGet<AxiosResponse<ApiResponse<UserLoginResponse>>>(`/system/user/refresh?refresh_token=${token}`, {
        handleData: false
    })
}
