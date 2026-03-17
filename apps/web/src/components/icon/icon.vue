<script lang="ts" setup>
import { Icon as Iconify } from '@iconify/vue'
import type { IconProps } from './iconProps'

const { size = 16 } = defineProps<IconProps>()

const emits = defineEmits(['click'])

const handleClick = (e: MouseEvent) => {
    emits('click', e)
}
</script>

<template>
    <div class="c-icon flex-y-center">
        <iconify
            :icon="name"
            :width="size"
            :height="size"
            :color="color"
            v-bind="$attrs"
            @click="handleClick"
        ></iconify>
        <div v-if="$slots.default" class="ml-5px">
            <slot></slot>
        </div>
    </div>
</template>
