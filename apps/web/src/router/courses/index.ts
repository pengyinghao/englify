import layout from '@/layout/index.vue'

export const coursesRoutes = [
    {
        path: '/courses',
        component: layout,
        children: [{ path: '/courses', component: () => import('@/views/courses/courses.vue') }]
    }
]
