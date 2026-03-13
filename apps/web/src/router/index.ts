import { createRouter, createWebHistory } from 'vue-router'

import { homeRoutes } from './home'
import { workBookRoutes } from './workBook'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // 主页
        ...homeRoutes,
        // 词库
        ...workBookRoutes
    ]
})

export default router
