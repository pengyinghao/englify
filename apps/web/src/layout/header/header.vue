<script setup lang="ts">
import { Icon } from '@/components'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>
<template>
    <header class=":uno: flex-center h-20 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div class=":uno: w-[1200px] mx-auto flex-y-center justify-between">
            <div
                class=":uno: text-2xl font-bold bg-indigo-700 text-white rounded-[10px] px-2 py-1 w-10 flex-center h-10"
            >
                E
            </div>
            <div class=":uno: text-2xl font-bold">Englify</div>
            <div
                @click="router.push('/')"
                class=":uno: flex-y-center gap-2 cursor-pointer rounded-[10px] px-2 py-1 text-gray-500"
            >
                <Icon name="ep:home-filled"></Icon>
                <span>主页</span>
            </div>
            <div
                @click="router.push('/smart/chat')"
                class=":uno: flex-y-center gap-2 cursor-pointer text-gray-500"
            >
                <Icon name="ep:magic-stick"></Icon>
                <span>AI</span>
            </div>
            <div
                @click="router.push('/wordBook')"
                class=":uno: flex-y-center gap-2 cursor-pointer text-gray-500"
            >
                <Icon name="ep:notebook"></Icon>
                <span>词库</span>
            </div>
            <div
                @click="router.push('/courses')"
                class=":uno: flex-y-center gap-2 cursor-pointer text-gray-500"
            >
                <Icon name="ep:reading"></Icon>
                <span>课程</span>
            </div>
            <div
                @click="router.push('/setting')"
                class=":uno: flex-y-center gap-2 cursor-pointer text-gray-500"
            >
                <Icon name="ep:setting"></Icon>
                <span>设置</span>
            </div>
            <div class=":uno: flex-y-center gap-2 bg-blue-200 text-blue-700 rounded-full px-2 py-1">
                <Icon name="ep:sunny"></Icon>
                <span class=":uno: font-bold text-sm">{{ 0 }}</span>
            </div>
            <div
                class=":uno: flex-y-center gap-2 bg-amber-200 text-amber-700 rounded-full px-2 py-1"
            >
                <Icon name="ep:star"></Icon>
                <span class=":uno: font-bold text-sm">{{ 0 }}</span>
            </div>
            <div class=":uno: flex-y-center gap-2 border-l cursor-pointer border-gray-200 pl-4">
                <img
                    class=":uno: w-10 h-10 rounded-full ml-2 mr-2"
                    src="https://gips3.baidu.com/it/u=3493347002,3356558679&fm=3074&app=3074&f=PNG?w=2048&h=2048"
                />
                <span class=":uno: text-sm font-bold">{{ '未登录' }}</span>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped></style>
