import layout from '@/layout/index.vue'

export const settingRoutes = [
    {
        path: '/setting',
        component: layout,
        children: [{ path: '/setting', component: () => import('@/views/setting/setting.vue') }]
    }
]
