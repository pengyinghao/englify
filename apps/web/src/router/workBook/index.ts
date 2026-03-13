import layout from '@/layout/index.vue'

export const workBookRoutes = [
    {
        path: '/wordBook',
        component: layout,
        children: [{ path: '/wordBook', component: () => import('@/views/wordBook/wordBook.vue') }]
    }
]
