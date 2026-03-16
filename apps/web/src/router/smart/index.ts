import layout from '@/layout/index.vue'

export const smartRoutes = [
    {
        path: '/smart/chat',
        component: layout,
        children: [{ path: '/smart/chat', component: () => import('@/views/smart/chat/chat.vue') }]
    }
]
