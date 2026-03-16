import { createRouter, createWebHistory } from 'vue-router'

import { coursesRoutes } from './courses'
import { homeRoutes } from './home'
import { settingRoutes } from './setting'
import { smartRoutes } from './smart'
import { workBookRoutes } from './workBook'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // 主页
        ...homeRoutes,
        // 词库
        ...workBookRoutes,
        // 课程
        ...coursesRoutes,
        // ai
        ...smartRoutes,
        // 设置
        ...settingRoutes
    ]
})

export default router
