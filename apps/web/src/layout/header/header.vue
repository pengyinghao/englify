<script setup lang="ts">
import { Icon } from '@/components'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navItems = [
    { path: '/', icon: 'mdi:home', label: '主页' },
    { path: '/smart/chat', icon: 'mdi:robot', label: 'AI' },
    { path: '/wordBook', icon: 'mdi:book-open-page-variant', label: '词库' },
    { path: '/courses', icon: 'mdi:school', label: '课程' },
    { path: '/setting', icon: 'mdi:cog', label: '设置' }
] as const

function handleMenuClick(item: (typeof navItems)[number]) {
    router.push(item.path)
    isMobileMenuOpen.value = false
}
</script>

<template>
    <header
        class="border-b border-slate-200/50 bg-white/90 shadow-sm top-0 sticky z-50 backdrop-blur-md"
    >
        <div class="mx-auto px-4 max-w-7xl lg:px-8 sm:px-6">
            <div class="flex h-16 items-center justify-between">
                <!-- Logo -->
                <div class="flex gap-4 items-center">
                    <div
                        class="to-green-600 text-white font-bold rounded-2xl flex h-12 w-12 cursor-pointer shadow-lg transition-shadow duration-200 items-center justify-center from-emerald-500 bg-gradient-to-br text-xl hover:shadow-xl"
                    >
                        E
                    </div>
                    <div class="hidden sm:block">
                        <h1
                            class="to-green-600 text-transparent font-bold from-emerald-600 bg-gradient-to-r bg-clip-text text-xl"
                        >
                            Englify
                        </h1>
                        <p class="text-xs text-slate-500 -mt-1">学习英语，改变未来</p>
                    </div>
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden items-center space-x-2 md:flex">
                    <a
                        v-for="item in navItems"
                        :key="item.path"
                        @click="handleMenuClick(item)"
                        class="group text-slate-600 px-4 py-2 rounded-xl flex gap-2 cursor-pointer transition-all duration-200 items-center relative hover:text-emerald-600 hover:bg-emerald-50"
                        :class="{ 'bg-emerald-50 text-emerald-600!': route.path === item.path }"
                    >
                        <Icon
                            :name="item.icon"
                            size="18"
                            class="transition-transform duration-200 group-hover:scale-110"
                            :class="{ 'scale-110': route.path === item.path }"
                        />
                        <span class="font-medium text-sm">{{ item.label }}</span>
                        <div
                            class="to-green-600 h-0.5 w-0 transform transition-all duration-200 bottom-0 left-1/2 absolute from-emerald-500 bg-gradient-to-r group-hover:w-full -translate-x-1/2"
                            :class="{ 'w-full': route.path === item.path }"
                        ></div>
                    </a>
                </nav>

                <!-- Right Side -->
                <div class="flex gap-4 items-center">
                    <!-- Stats -->
                    <div class="gap-3 hidden items-center lg:flex">
                        <div
                            class="to-orange-50 text-amber-700 px-4 py-2 border-amber-200/50 rounded-xl flex gap-2 items-center from-amber-50 bg-gradient-to-r border"
                        >
                            <Icon name="mdi:weather-sunny" size="16" />
                            <span class="font-semibold text-sm">{{ 0 }}</span>
                        </div>
                        <div
                            class="to-green-50 text-emerald-700 px-4 py-2 border-emerald-200/50 rounded-xl flex gap-2 items-center from-emerald-50 bg-gradient-to-r border"
                        >
                            <Icon name="mdi:star" size="16" />
                            <span class="font-semibold text-sm">{{ 0 }}</span>
                        </div>
                    </div>

                    <!-- User Info -->
                    <div class="pl-4 border-l border-slate-200/50 flex gap-3 items-center">
                        <div class="relative">
                            <img
                                class="rounded-xl h-10 w-10 cursor-pointer ring-2 ring-emerald-200 transition-all duration-200 hover:ring-emerald-300"
                                src="https://gips3.baidu.com/it/u=3493347002,3356558679&fm=3074&app=3074&f=PNG?w=2048&h=2048"
                                alt="User avatar"
                            />
                            <div
                                class="to-green-600 border-2 rounded-full h-4 w-4 absolute from-emerald-500 bg-gradient-to-r border-white -bottom-1 -right-1"
                            ></div>
                        </div>
                        <div class="hidden sm:block">
                            <div class="text-slate-700 font-semibold text-sm">未登录</div>
                            <div class="text-xs text-slate-500">点击登录</div>
                        </div>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button
                        @click="toggleMobileMenu"
                        class="text-slate-600 p-2 rounded-xl transition-all duration-200 hover:text-emerald-600 hover:bg-emerald-50 md:hidden"
                    >
                        <Icon :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'" size="24" />
                    </button>
                </div>
            </div>

            <!-- Mobile Navigation -->
            <div
                v-if="isMobileMenuOpen"
                class="animate-in slide-in-from-top-2 border-t border-slate-200/50 bg-white/95 duration-200 backdrop-blur-md md:hidden"
            >
                <nav class="px-4 py-4 space-y-2">
                    <a
                        v-for="item in navItems"
                        :key="item.path"
                        @click="handleMenuClick(item)"
                        class="text-slate-600 px-4 py-3 rounded-xl flex gap-3 cursor-pointer transition-all duration-200 items-center hover:text-emerald-600 hover:bg-emerald-50"
                    >
                        <Icon :name="item.icon" size="20" />
                        <span class="font-medium text-sm">{{ item.label }}</span>
                    </a>
                </nav>
                <div class="px-4 py-4 border-t border-slate-200/50">
                    <div class="mb-4 flex gap-4 items-center justify-center">
                        <div
                            class="to-orange-50 text-amber-700 px-4 py-2 border-amber-200/50 rounded-xl flex gap-2 items-center from-amber-50 bg-gradient-to-r border"
                        >
                            <Icon name="mdi:weather-sunny" size="16" />
                            <span class="font-semibold text-sm">{{ 0 }}</span>
                        </div>
                        <div
                            class="to-green-50 text-emerald-700 px-4 py-2 border-emerald-200/50 rounded-xl flex gap-2 items-center from-emerald-50 bg-gradient-to-r border"
                        >
                            <Icon name="mdi:star" size="16" />
                            <span class="font-semibold text-sm">{{ 0 }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
@keyframes slide-in-from-top-2 {
    from {
        opacity: 0;
        transform: translateY(-8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-in {
    animation: slide-in-from-top-2 0.2s ease-out;
}
</style>
