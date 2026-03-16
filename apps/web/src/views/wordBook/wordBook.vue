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
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Hero Section (compact) -->
            <div class="text-center mb-8">
                <div
                    class="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-2xl px-5 py-3 shadow md:shadow-lg border border-white/20 mx-auto max-w-3xl"
                >
                    <div
                        class="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow"
                    >
                        <Icon name="mdi:book-open-page-variant" size="20" class="text-white" />
                    </div>
                    <div class="text-left">
                        <h1 class="text-2xl font-semibold text-slate-900">词库列表</h1>
                        <p class="text-xs text-slate-600 mt-0.5">探索丰富的英语词汇世界</p>
                    </div>
                </div>
                <p class="text-slate-600 text-xs max-w-2xl mx-auto mt-3">
                    词典来源：牛津、柯林斯、BNC、FRQ、高考、中考、GRE、TOEFL、IELTS、大学英语六级、大学英语四级、考研
                </p>
            </div>
            <!-- Search & Filter Section -->
            <div
                class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/30 p-8 mb-8"
            >
                <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <!-- Search Section -->
                    <div class="lg:col-span-2">
                        <div class="space-y-6">
                            <div>
                                <label class="block text-sm font-semibold text-slate-700 mb-3">
                                    <Icon name="mdi:magnify" size="16" class="inline mr-2" />
                                    搜索单词
                                </label>
                                <div class="flex gap-3">
                                    <a-input
                                        v-model:value="queryOption.word"
                                        placeholder="输入要查找的单词..."
                                        class="flex-1 h-12 rounded-xl border-2 border-slate-200 focus:border-emerald-400 transition-colors"
                                        @keyup.enter="handleSearch"
                                    />
                                    <a-button
                                        type="primary"
                                        @click="handleSearch"
                                        class="h-12 px-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                                    >
                                        <Icon name="mdi:magnify" size="18" class="mr-2" />
                                        搜索
                                    </a-button>
                                </div>
                            </div>

                            <!-- Level Filter -->
                            <div>
                                <div class="flex items-center justify-between mb-4">
                                    <label class="text-sm font-semibold text-slate-700">
                                        <Icon
                                            name="mdi:filter-variant"
                                            size="16"
                                            class="inline mr-2"
                                        />
                                        按级别筛选
                                    </label>
                                    <a-button
                                        size="small"
                                        type="text"
                                        @click="handleClearLevelFilter"
                                        class="text-emerald-600 hover:text-emerald-700 font-medium"
                                    >
                                        <Icon name="mdi:refresh" size="14" class="mr-1" />
                                        清除筛选
                                    </a-button>
                                </div>

                                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <a-checkbox
                                        v-for="option in levelOptions"
                                        :key="option.key"
                                        v-model:checked="queryOption[option.key]"
                                        class="group"
                                    >
                                        <span
                                            class="group-hover:text-emerald-600 transition-colors"
                                            >{{ option.label }}</span
                                        >
                                    </a-checkbox>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Active Filters & Stats -->
                    <div class="lg:col-span-2 space-y-6">
                        <!-- Active Filters -->
                        <div
                            class="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100"
                        >
                            <div class="flex items-center gap-2 mb-4">
                                <Icon name="mdi:filter-check" size="18" class="text-emerald-600" />
                                <span class="font-semibold text-slate-700">当前筛选</span>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <span
                                    v-for="option in activeLevelInfos"
                                    :key="option.key"
                                    class="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-sm font-medium text-white shadow-md"
                                >
                                    <Icon name="mdi:check" size="14" />
                                    {{ option.label }}
                                </span>
                                <span
                                    v-if="activeLevelInfos.length === 0"
                                    class="text-sm text-slate-500 italic flex items-center gap-1"
                                >
                                    <Icon name="mdi:filter-off" size="14" />
                                    暂无筛选条件
                                </span>
                            </div>
                        </div>
                        <!-- Stats -->
                        <div class="bg-white/80 rounded-2xl p-6 shadow-sm border border-slate-200">
                            <div class="grid grid-cols-2 gap-4 text-center">
                                <div>
                                    <div class="text-2xl font-bold text-emerald-600">
                                        {{ total }}
                                    </div>
                                    <div class="text-sm text-slate-600">总单词数</div>
                                </div>
                                <div>
                                    <div class="text-2xl font-bold text-teal-600">
                                        {{ activeLevelInfos.length }}
                                    </div>
                                    <div class="text-sm text-slate-600">筛选条件</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Section -->
            <a-spin :spinning="loading" class="min-h-[400px]">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <template v-if="wordBookInfos.length">
                        <a-card
                            v-for="item in wordBookInfos"
                            :key="item.id"
                            hoverable
                            class="group bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden"
                            :body-style="{ padding: '0' }"
                        >
                            <div class="p-6">
                                <!-- Header -->
                                <div class="flex items-start justify-between gap-3 mb-4">
                                    <div class="flex-1 min-w-0">
                                        <h3
                                            class="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors truncate"
                                        >
                                            {{ item.word }}
                                        </h3>
                                        <p
                                            class="text-sm text-slate-500 mt-1 flex items-center gap-1 m-0"
                                        >
                                            <Icon name="mdi:volume-high" size="14" />
                                            {{ item.phonetic }}
                                        </p>
                                    </div>
                                    <a-button
                                        type="text"
                                        class="text-slate-400 hover:text-emerald-600 p-2 rounded-xl hover:bg-emerald-50 transition-all duration-200"
                                        @click="playAudio(item.word)"
                                    >
                                        <Icon name="mdi:play-circle" size="20" />
                                    </a-button>
                                </div>

                                <!-- Content -->
                                <div class="space-y-3">
                                    <p class="text-sm text-slate-700 leading-relaxed line-clamp-2">
                                        {{ item.definition }}
                                    </p>
                                    <div
                                        v-html="item.translation"
                                        class="text-sm text-slate-600 leading-relaxed line-clamp-2 bg-slate-50 rounded-lg p-3"
                                    />
                                </div>

                                <!-- Tags -->
                                <div class="flex flex-wrap gap-2 mt-4">
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
                                class="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            />
                        </a-card>
                    </template>

                    <template v-else>
                        <div class="col-span-full">
                            <div
                                class="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-300 p-16 text-center shadow-lg"
                            >
                                <div
                                    class="w-20 h-20 bg-gradient-to-br from-slate-400 to-slate-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
                                >
                                    <Icon name="mdi:book-search" size="32" class="text-white" />
                                </div>
                                <h3 class="text-xl font-semibold text-slate-700 mb-2">
                                    未找到匹配单词
                                </h3>
                                <p class="text-slate-500 max-w-md mx-auto">
                                    尝试调整搜索关键词或筛选条件，也许能找到更多精彩内容
                                </p>
                            </div>
                        </div>
                    </template>
                </div>

                <!-- Pagination -->
                <div
                    class="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                    <div
                        class="text-sm text-slate-600 flex items-center gap-2 bg-white/60 rounded-xl px-4 py-2"
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
                        class="bg-white/60 rounded-xl px-4 py-2"
                    />
                </div>
            </a-spin>
        </div>
    </div>
</template>
