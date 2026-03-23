<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CountUp from 'vue-countup-v3'
gsap.registerPlugin(ScrollTrigger)

const stats = ref([
    { value: 0, suffix: '+', label: '累计学员', target: 10000000 },
    { value: 0, suffix: '+', label: '精品课程', target: 500 },
    { value: 0, suffix: '%', label: '学员满意度', target: 98 },
    { value: 0, suffix: '+', label: '学习时长(小时)', target: 5000000 }
])

const aboutInfos = [
    {
        icon: '🖼️',
        title: 'AI情境学习',
        content: '沉浸式场景模拟，让你在真实语境中自然习得英语，告别枯燥的死记硬背。'
    },
    {
        icon: '🧠',
        title: '智能对话练习',
        content: 'AI 实时纠错反馈，个性化对话训练，24小时随时练习口语表达。'
    },
    {
        icon: '🎤',
        title: '科学词汇记忆',
        content: '基于艾宾浩斯遗忘曲线，智能安排复习计划，让单词真正记住。'
    }
]

function initAnimation() {
    const elements = gsap.utils.toArray('.about-card') as HTMLDivElement[]
    elements.forEach((el, index) => {
        gsap.fromTo(
            el,
            { opacity: 0, y: 40, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                duration: 0.05,
                scale: 1,
                ease: 'power2.out',
                delay: index * 0.8,
                scrollTrigger: {
                    trigger: '.card-container',
                    start: 'top 70%'
                }
            }
        )
    })

    //文字过度
    gsap.fromTo(
        '.text-why',
        {
            opacity: 0,
            y: 60
        },
        {
            opacity: 1,
            y: 0
        }
    )
    gsap.fromTo(
        '.text-why-content',
        {
            opacity: 0,
            y: 60
        },
        {
            opacity: 1,
            y: 0
        }
    )
    //核心优势文字过度
    gsap.fromTo(
        '.text-core',
        {
            opacity: 0,
            y: 60
        },
        {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: '.text-core',
                start: 'top 70%'
            }
        }
    )
    gsap.fromTo(
        '.core-title',
        {
            opacity: 0,
            y: 60
        },
        {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: '.core-title',
                start: 'top 70%'
            }
        }
    )
    gsap.fromTo(
        '.core-content',
        {
            opacity: 0,
            y: 60
        },
        {
            opacity: 1,
            y: 0,
            scrollTrigger: {
                trigger: '.core-content',
                start: 'top 70%'
            }
        }
    )
}

onMounted(() => {
    initAnimation()
})
</script>

<template>
    <div class="mx-auto mt-6 px-4 pb-20 max-w-[1200px] w-full md:mt-10 sm:mt-8 lg:px-0">
        <!-- 背景区域 -->
        <div class="p-5 rounded-[20px] flex justify-between relative md:p-9 sm:p-7">
            <div
                class="rounded-[20px] inset-0 absolute from-gray-900 to-gray-900/70 via-gray-900 bg-linear-to-r"
            />
            <div class="p-2 relative z-8 md:p-8 sm:p-4">
                <span class="text-1xl text-white px-4 py-2 rounded-[100px] bg-primary-hover/20">
                    坚持5天打卡学习
                </span>
                <div class="text-l text-primary-hover font-bold pt-6 text-xl sm:text-2xl sm:pt-8">
                    通过跟AI对话，提高你的英语水平
                </div>
                <div class="sm:text-1xl text-gray-300 font-bold pt-4 text-sm sm:pt-5">
                    超1000000学员的选择，提升您的英语能力
                </div>
                <div
                    class="pt-8 flex flex-col gap-3 items-stretch sm:pt-10 sm:flex-row sm:gap-2 sm:items-center"
                >
                    <a-button type="primary" shape="round" size="large" class="px-4 w-full sm:w-30">
                        立即学习
                    </a-button>
                    <a-button type="primary" shape="round" size="large" class="px-4 w-full sm:w-30">
                        查看课程
                    </a-button>
                </div>
            </div>
            <div class="p-8 hidden relative z-8 lg:block"></div>
        </div>

        <!-- 描述区域 -->
        <div class="p-6 text-center rounded-[20px] md:p-10 sm:p-8">
            <div class="text-why text-gray-800 font-bold text-xl sm:text-2xl">为什么选择我们?</div>
            <div class="text-why-content sm:text-1xl text-gray-600 font-bold mt-4 text-sm">
                我们经过科学的验证，AI学习英语的效果比传统学习方式更好，更高效。
            </div>
        </div>

        <!-- 数据统计区域 -->
        <div
            class="mt-10 py-8 gap-y-8 grid grid-cols-2 lg:mt-16 lg:py-12 lg:flex lg:items-center lg:justify-between"
        >
            <template v-for="(item, index) in stats" :key="item.label">
                <div class="text-center lg:flex-1">
                    <div class="flex gap-1 items-baseline justify-center">
                        <span class="stat-number text-3xl text-gray-800 font-bold sm:text-4xl">
                            <CountUp :end-val="item.target"></CountUp>
                            <!-- {{ item.value }} -->
                        </span>
                        <span class="text-primary-hover font-bold text-xl sm:text-2xl">
                            {{ item.suffix }}
                        </span>
                    </div>
                    <div class="text-gray-500 mt-2">{{ item.label }}</div>
                </div>
                <div
                    v-if="index < stats.length - 1"
                    class="bg-gray-200 h-16 w-px hidden lg:block"
                />
            </template>
        </div>

        <!-- 核心优势区域 -->
        <div class="mb-6 py-6 text-center relative sm:py-8">
            <!-- 装饰性光晕背景 -->
            <div
                class="rounded-full bg-emerald-200/30 h-64 w-64 left-1/2 top-1/2 absolute blur-3xl -translate-x-1/2 -translate-y-1/2"
            />
            <div class="relative z-10">
                <span
                    class="text-core text-emerald-600 font-medium mb-4 px-4 py-1.5 rounded-full bg-emerald-100 inline-block text-sm"
                >
                    ✨ 核心优势
                </span>
                <div
                    class="core-title text-2xl text-transparent font-bold from-gray-800 to-emerald-500 via-emerald-700 bg-linear-to-r bg-clip-text sm:text-3xl"
                >
                    重新定义英语学习方式
                </div>
                <div
                    class="core-content text-gray-500 leading-relaxed mx-auto mt-4 max-w-3xl text-sm"
                >
                    融合前沿 AI 技术与语言学研究，打造沉浸式学习体验，让每一分钟的学习都更有价值
                </div>
            </div>
        </div>

        <!-- 特性卡片区域 -->
        <div
            class="cards-container gap-4 grid grid-cols-1 lg:gap-6 sm:gap-5 lg:grid-cols-3 sm:grid-cols-2"
            style="perspective: 1000px"
        >
            <div
                v-for="(item, index) in aboutInfos"
                :key="item.title"
                class="about-card group p-6 border-gray-200 rounded-[24px] cursor-pointer transition-all duration-500 relative overflow-hidden bg-white border lg:p-8 sm:p-7 hover:border-emerald-300 hover:shadow-emerald-500/10 hover:shadow-xl hover:-translate-y-2"
                :style="{ animationDelay: `${index * 100}ms` }"
            >
                <!-- 装饰性背景图案 -->
                <div
                    class="rounded-full bg-emerald-100 h-32 w-32 transition-all duration-700 absolute blur-2xl group-hover:bg-emerald-200 group-hover:scale-150 -right-8 -top-8"
                />
                <div class="rounded-full bg-emerald-50 h-24 w-24 absolute -bottom-4 -left-4" />

                <!-- 图标区域 -->
                <div
                    class="text-3xl mb-6 rounded-2xl bg-emerald-100 flex h-16 w-16 transition-all duration-300 items-center justify-center relative z-10 group-hover:bg-emerald-200 group-hover:scale-110"
                >
                    {{ item.icon }}
                </div>
                <!-- 内容区域 -->
                <div class="relative z-10">
                    <div class="text-gray-800 font-bold mb-3 text-xl">{{ item.title }}</div>
                    <div class="text-gray-500 leading-relaxed text-sm">{{ item.content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
