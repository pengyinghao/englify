<script setup lang="ts">
import { Icon } from '@/components'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
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
        class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/50 shadow-sm"
    >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <!-- Logo -->
                <div class="flex items-center gap-4">
                    <div
                        class="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer"
                    >
                        E
                    </div>
                    <div class="hidden sm:block">
                        <h1
                            class="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
                        >
                            Englify
                        </h1>
                        <p class="text-xs text-slate-500 -mt-1">学习英语，改变未来</p>
                    </div>
                </div>

                <!-- Desktop Navigation -->
                <nav class="hidden md:flex items-center space-x-2">
                    <a
                        v-for="item in navItems"
                        :key="item.path"
                        @click="handleMenuClick(item)"
                        class="group flex items-center gap-2 px-4 py-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 cursor-pointer relative"
                    >
                        <Icon
                            :name="item.icon"
                            size="18"
                            class="group-hover:scale-110 transition-transform duration-200"
                        />
                        <span class="text-sm font-medium">{{ item.label }}</span>
                        <div
                            class="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 group-hover:w-full transition-all duration-200"
                        ></div>
                    </a>
                </nav>

                <!-- Right Side -->
                <div class="flex items-center gap-4">
                    <!-- Stats -->
                    <div class="hidden lg:flex items-center gap-3">
                        <div
                            class="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 rounded-xl px-4 py-2 border border-amber-200/50"
                        >
                            <Icon name="mdi:weather-sunny" size="16" />
                            <span class="font-semibold text-sm">{{ 0 }}</span>
                        </div>
                        <div
                            class="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl px-4 py-2 border border-blue-200/50"
                        >
                            <Icon name="mdi:star" size="16" />
                            <span class="font-semibold text-sm">{{ 0 }}</span>
                        </div>
                    </div>

                    <!-- User Info -->
                    <div class="flex items-center gap-3 border-l border-slate-200/50 pl-4">
                        <div class="relative">
                            <img
                                class="w-10 h-10 rounded-xl ring-2 ring-emerald-200 hover:ring-emerald-300 transition-all duration-200 cursor-pointer"
                                src="https://gips3.baidu.com/it/u=3493347002,3356558679&fm=3074&app=3074&f=PNG?w=2048&h=2048"
                                alt="User avatar"
                            />
                            <div
                                class="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full border-2 border-white"
                            ></div>
                        </div>
                        <div class="hidden sm:block">
                            <div class="text-sm font-semibold text-slate-700">未登录</div>
                            <div class="text-xs text-slate-500">点击登录</div>
                        </div>
                    </div>

                    <!-- Mobile Menu Button -->
                    <button
                        @click="toggleMobileMenu"
                        class="md:hidden p-2 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
                    >
                        <Icon :name="isMobileMenuOpen ? 'mdi:close' : 'mdi:menu'" size="24" />
                    </button>
                </div>
            </div>

            <!-- Mobile Navigation -->
            <div
                v-if="isMobileMenuOpen"
                class="md:hidden border-t border-slate-200/50 bg-white/95 backdrop-blur-md animate-in slide-in-from-top-2 duration-200"
            >
                <nav class="px-4 py-4 space-y-2">
                    <a
                        v-for="item in navItems"
                        :key="item.path"
                        @click="handleMenuClick(item)"
                        class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
                    >
                        <Icon :name="item.icon" size="20" />
                        <span class="text-sm font-medium">{{ item.label }}</span>
                    </a>
                </nav>
                <div class="px-4 py-4 border-t border-slate-200/50">
                    <div class="flex items-center justify-center gap-4 mb-4">
                        <div
                            class="flex items-center gap-2 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 rounded-xl px-4 py-2 border border-amber-200/50"
                        >
                            <Icon name="mdi:weather-sunny" size="16" />
                            <span class="font-semibold text-sm">{{ 0 }}</span>
                        </div>
                        <div
                            class="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-xl px-4 py-2 border border-blue-200/50"
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
