import Layout from '@/layout/index.vue'
import Home from '@/views/home/home.vue'

export const homeRoutes = [
    {
        path: '/',
        component: Layout,
        children: [{ path: '/', component: Home }]
    }
]
