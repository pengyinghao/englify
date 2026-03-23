<script lang="ts" setup>
import { fetchWordBookInfos } from '@/service/apis/wordBook'
import { copyText } from '@/utils'
import { SearchOutlined } from '@antdv-next/icons'
import type { IWordBook } from '@en/common/wordBook'
import type { InputRef } from 'antdv-next'
import hotkeys from 'hotkeys-js'

const visible = ref(false)
const inputRef = useTemplateRef<InputRef>('inputRef')

let timer: ReturnType<typeof setTimeout> | null = null
const searchValue = customRef((track, trigger) => {
    let value: string = ''
    return {
        get() {
            track()
            return value
        },
        set(newValue: string) {
            value = newValue
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                getWordBookInfos()
                trigger()
            }, 500)
        }
    }
})

const wordBookInfos = ref<IWordBook[]>([])
async function getWordBookInfos() {
    const res = await fetchWordBookInfos({ page: 1, pageSize: 20, word: searchValue.value })
    wordBookInfos.value = res.list
}
getWordBookInfos()

/** 复制内容 */
function handleCopyWord(word: string) {
    copyText(word)
}

hotkeys('ctrl+f, command+f', (handler) => {
    handler.preventDefault()
    visible.value = true
    inputRef.value?.focus()
})

function handleClose() {
    visible.value = false
    searchValue.value = ''
}
</script>
<template>
    <a-modal
        v-model:open="visible"
        :footer="null"
        :closable="false"
        width="600"
        style="--ant-modal-content-padding: 0"
        @cancel="handleClose"
    >
        <div class="px-3 py-4">
            <a-input v-model:value="searchValue" ref="inputRef" placeholder="搜索" type="text">
                <template #prefix>
                    <SearchOutlined></SearchOutlined>
                </template>
            </a-input>
        </div>
        <div
            v-if="wordBookInfos.length > 0"
            class="mx-auto overscroll-none border-t border-gray-200 max-h-[500px] overflow-y-auto"
        >
            <div
                @click="handleCopyWord(item.word)"
                v-for="item in wordBookInfos"
                :key="item.id"
                class="text-gray-800 p-4 cursor-pointer shadow-sm bg-white hover:bg-emerald-50 hover:shadow-md"
            >
                <div class="text-emerald-600 font-semibold mb-1 text-sm">{{ item.word }}</div>
                <div
                    v-html="item.translation"
                    class="text-gray-700 mb-1 overflow-hidden line-clamp-2 text-sm"
                />
            </div>
        </div>
    </a-modal>
</template>
