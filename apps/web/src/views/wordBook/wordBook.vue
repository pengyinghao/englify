<script setup lang="ts">
import { Icon } from '@/components'
import { useAudio } from '@/composables/useAudio'
import { fetchWordBookInfos } from '@/service/apis/wordBook'
import type { IWordBook, WordBookOption } from '@en/common/wordBook'
import { computed, onMounted, reactive, ref } from 'vue'

const { playAudio } = useAudio({})

const total = ref(0)
const wordBookInfos = ref<IWordBook[]>([])
const loading = ref(false)

const queryOption = reactive<WordBookOption>({
    page: 1,
    pageSize: 12,
    word: undefined,
    gk: false,
    zk: false,
    gre: false,
    toefl: false,
    ielts: false,
    cet6: false,
    cet4: false,
    ky: false
})

const levelOptions = computed(() =>
    [
        { key: 'zk' as const, label: '中考' },
        { key: 'gk' as const, label: '高考' },
        { key: 'cet4' as const, label: '四级' },
        { key: 'cet6' as const, label: '六级' },
        { key: 'ky' as const, label: '考研' },
        { key: 'gre' as const, label: 'GRE' },
        { key: 'toefl' as const, label: 'TOEFL' },
        { key: 'ielts' as const, label: 'IELTS' }
    ].map((option) => ({
        ...option,
        check: queryOption[option.key]
    }))
)

async function getWordBookInfos() {
    loading.value = true

    const { page, pageSize, word, ...rest } = queryOption

    const otherParams = Object.fromEntries(
        Object.entries(rest).filter(([, value]) => value !== false)
    )

    const res = await fetchWordBookInfos({
        page,
        pageSize,
        word,
        ...otherParams
    })

    total.value = res.total
    wordBookInfos.value = res.list
    loading.value = false
}

const activeLevelInfos = computed(() => levelOptions.value.filter((option) => option.check))

/** 清除按钮单击事件 */
function handleClearLevelFilter() {
    levelOptions.value.forEach((option) => {
        queryOption[option.key] = false
    })
}

function handleSearch() {
    queryOption.page = 1
    getWordBookInfos()
}

function handlePageChange(page: number, pageSize: number) {
    queryOption.page = page
    queryOption.pageSize = pageSize
    getWordBookInfos()
}

onMounted(() => {
    getWordBookInfos()
})
</script>

<template>
    <div class="via-blue-50 min-h-screen from-slate-50 to-emerald-50 bg-gradient-to-br">
        <div class="mx-auto px-4 py-8 max-w-7xl lg:px-8 sm:px-6">
            <!-- Hero Section (compact) -->
            <div class="mb-8 text-center">
                <div
                    class="mx-auto px-5 py-3 border-white/20 rounded-2xl bg-white/80 inline-flex gap-3 max-w-3xl items-center backdrop-blur-sm border shadow md:shadow-lg"
                >
                    <div
                        class="rounded-xl flex h-10 w-10 items-center justify-center from-emerald-500 to-teal-600 bg-gradient-to-br shadow"
                    >
                        <Icon name="mdi:book-open-page-variant" size="20" class="text-white" />
                    </div>
                    <div class="text-left">
                        <h1 class="text-2xl text-slate-900 font-semibold">词库列表</h1>
                        <p class="text-xs text-slate-600 mt-0.5">探索丰富的英语词汇世界</p>
                    </div>
                </div>
                <p class="text-xs text-slate-600 mx-auto mt-3 max-w-2xl">
                    词典来源：牛津、柯林斯、BNC、FRQ、高考、中考、GRE、TOEFL、IELTS、大学英语六级、大学英语四级、考研
                </p>
            </div>
            <!-- Search & Filter Section -->
            <div
                class="mb-8 p-8 border-white/30 rounded-3xl bg-white/70 shadow-xl backdrop-blur-sm border"
            >
                <div class="gap-8 grid grid-cols-1 lg:grid-cols-4">
                    <!-- Search Section -->
                    <div class="lg:col-span-2">
                        <div class="space-y-6">
                            <div>
                                <label class="text-slate-700 font-semibold mb-3 block text-sm">
                                    <Icon name="mdi:magnify" size="16" class="mr-2 inline" />
                                    搜索单词
                                </label>
                                <div class="flex gap-3">
                                    <a-input
                                        v-model:value="queryOption.word"
                                        placeholder="输入要查找的单词..."
                                        class="border-2 border-slate-200 rounded-xl flex-1 h-12 transition-colors focus:border-emerald-400"
                                        @keyup.enter="handleSearch"
                                    />
                                    <a-button
                                        type="primary"
                                        @click="handleSearch"
                                        class="px-8 border-0 rounded-xl h-12 shadow-lg transition-all duration-200 from-emerald-500 to-teal-600 bg-gradient-to-r hover:shadow-xl"
                                    >
                                        <Icon name="mdi:magnify" size="18" class="mr-2" />
                                        搜索
                                    </a-button>
                                </div>
                            </div>

                            <!-- Level Filter -->
                            <div>
                                <div class="mb-4 flex items-center justify-between">
                                    <label class="text-slate-700 font-semibold text-sm">
                                        <Icon
                                            name="mdi:filter-variant"
                                            size="16"
                                            class="mr-2 inline"
                                        />
                                        按级别筛选
                                    </label>
                                    <a-button
                                        size="small"
                                        type="text"
                                        @click="handleClearLevelFilter"
                                        class="text-emerald-600 font-medium hover:text-emerald-700"
                                    >
                                        <Icon name="mdi:refresh" size="14" class="mr-1" />
                                        清除筛选
                                    </a-button>
                                </div>

                                <div class="gap-3 grid grid-cols-2 sm:grid-cols-4">
                                    <a-checkbox
                                        v-for="option in levelOptions"
                                        :key="option.key"
                                        v-model:checked="queryOption[option.key]"
                                        class="group"
                                    >
                                        <span
                                            class="transition-colors group-hover:text-emerald-600"
                                            >{{ option.label }}</span
                                        >
                                    </a-checkbox>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Active Filters & Stats -->
                    <div class="space-y-6 lg:col-span-2">
                        <!-- Active Filters -->
                        <div
                            class="p-6 border-emerald-100 rounded-2xl from-emerald-50 to-teal-50 bg-gradient-to-r border"
                        >
                            <div class="mb-4 flex gap-2 items-center">
                                <Icon name="mdi:filter-check" size="18" class="text-emerald-600" />
                                <span class="text-slate-700 font-semibold">当前筛选</span>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <span
                                    v-for="option in activeLevelInfos"
                                    :key="option.key"
                                    class="text-white font-medium px-4 py-2 rounded-full inline-flex gap-1 shadow-md items-center from-emerald-500 to-teal-600 bg-gradient-to-r text-sm"
                                >
                                    <Icon name="mdi:check" size="14" />
                                    {{ option.label }}
                                </span>
                                <span
                                    v-if="activeLevelInfos.length === 0"
                                    class="text-slate-500 flex gap-1 italic items-center text-sm"
                                >
                                    <Icon name="mdi:filter-off" size="14" />
                                    暂无筛选条件
                                </span>
                            </div>
                        </div>
                        <!-- Stats -->
                        <div class="p-6 border-slate-200 rounded-2xl bg-white/80 shadow-sm border">
                            <div class="text-center gap-4 grid grid-cols-2">
                                <div>
                                    <div class="text-2xl text-emerald-600 font-bold">
                                        {{ total }}
                                    </div>
                                    <div class="text-slate-600 text-sm">总单词数</div>
                                </div>
                                <div>
                                    <div class="text-2xl text-teal-600 font-bold">
                                        {{ activeLevelInfos.length }}
                                    </div>
                                    <div class="text-slate-600 text-sm">筛选条件</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Section -->
            <a-spin :spinning="loading" class="min-h-[400px]">
                <div class="gap-6 grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 xl:grid-cols-4">
                    <template v-if="wordBookInfos.length">
                        <a-card
                            v-for="item in wordBookInfos"
                            :key="item.id"
                            hoverable
                            class="group border-0 rounded-2xl bg-white/80 shadow-lg transition-all duration-300 overflow-hidden backdrop-blur-sm hover:shadow-2xl"
                            :body-style="{ padding: '0' }"
                        >
                            <div class="p-6">
                                <!-- Header -->
                                <div class="mb-4 flex gap-3 items-start justify-between">
                                    <div class="flex-1 min-w-0">
                                        <h3
                                            class="text-slate-900 font-bold truncate transition-colors text-xl group-hover:text-emerald-600"
                                        >
                                            {{ item.word }}
                                        </h3>
                                        <p
                                            class="text-slate-500 m-0 mt-1 flex gap-1 items-center text-sm"
                                        >
                                            <Icon name="mdi:volume-high" size="14" />
                                            {{ item.phonetic }}
                                        </p>
                                    </div>
                                    <a-button
                                        type="text"
                                        class="text-slate-400 p-2 rounded-xl transition-all duration-200 hover:text-emerald-600 hover:bg-emerald-50"
                                        @click="playAudio(item.word)"
                                    >
                                        <Icon name="mdi:play-circle" size="20" />
                                    </a-button>
                                </div>

                                <!-- Content -->
                                <div class="space-y-3">
                                    <p class="text-slate-700 leading-relaxed line-clamp-2 text-sm">
                                        {{ item.definition }}
                                    </p>
                                    <div
                                        v-html="item.translation"
                                        class="text-slate-600 leading-relaxed p-3 bg-slate-50 line-clamp-2 text-sm rounded-lg"
                                    />
                                </div>

                                <!-- Tags -->
                                <div class="mt-4 flex flex-wrap gap-2">
                                    <a-tag
                                        v-if="item.gk"
                                        color="#1d4ed8"
                                        class="text-xs font-medium"
                                    >
                                        高考
                                    </a-tag>
                                    <a-tag
                                        v-if="item.zk"
                                        color="#047857"
                                        class="text-xs font-medium"
                                    >
                                        中考
                                    </a-tag>
                                    <a-tag
                                        v-if="item.gre"
                                        color="#6d28d9"
                                        class="text-xs font-medium"
                                    >
                                        GRE
                                    </a-tag>
                                    <a-tag
                                        v-if="item.toefl"
                                        color="#ea580c"
                                        class="text-xs font-medium"
                                    >
                                        TOEFL
                                    </a-tag>
                                    <a-tag
                                        v-if="item.ielts"
                                        color="#0284c7"
                                        class="text-xs font-medium"
                                    >
                                        IELTS
                                    </a-tag>
                                    <a-tag
                                        v-if="item.cet6"
                                        color="#dc2626"
                                        class="text-xs font-medium"
                                    >
                                        六级
                                    </a-tag>
                                    <a-tag
                                        v-if="item.cet4"
                                        color="#db2777"
                                        class="text-xs font-medium"
                                    >
                                        四级
                                    </a-tag>
                                    <a-tag
                                        v-if="item.ky"
                                        color="#f97316"
                                        class="text-xs font-medium"
                                    >
                                        考研
                                    </a-tag>
                                </div>
                            </div>

                            <!-- Hover Effect Overlay -->
                            <div
                                class="opacity-0 pointer-events-none transition-opacity duration-300 inset-0 absolute from-emerald-500/5 to-teal-500/5 bg-gradient-to-r group-hover:opacity-100"
                            />
                        </a-card>
                    </template>

                    <template v-else>
                        <div class="col-span-full">
                            <div
                                class="p-16 text-center border-2 border-slate-300 rounded-3xl border-dashed bg-white/80 shadow-lg backdrop-blur-sm"
                            >
                                <div
                                    class="mx-auto mb-6 rounded-2xl flex h-20 w-20 items-center justify-center from-slate-400 to-slate-500 bg-gradient-to-br"
                                >
                                    <Icon name="mdi:book-search" size="32" class="text-white" />
                                </div>
                                <h3 class="text-slate-700 font-semibold mb-2 text-xl">
                                    未找到匹配单词
                                </h3>
                                <p class="text-slate-500 mx-auto max-w-md">
                                    尝试调整搜索关键词或筛选条件，也许能找到更多精彩内容
                                </p>
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Pagination -->
                <div
                    class="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
                >
                    <div
                        class="text-slate-600 px-4 py-2 rounded-xl bg-white/60 flex gap-2 items-center text-sm"
                    >
                        <Icon name="mdi:counter" size="16" />
                        共 {{ total }} 条结果
                    </div>
                    <a-pagination
                        :total="total"
                        :current="queryOption.page"
                        :page-size="queryOption.pageSize"
                        :pageSizeOptions="[12, 20, 40, 80, 100]"
                        show-size-changer
                        show-quick-jumper
                        @change="handlePageChange"
                        class="px-4 py-2 rounded-xl bg-white/60"
                    />
                </div>
            </a-spin>
        </div>
    </div>
</template>
