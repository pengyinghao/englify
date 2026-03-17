<script setup lang="ts">
import zhCn from 'antdv-next/locale/zh_CN'
import { Search } from './components'
</script>

<template>
    <a-config-provider
        :locale="zhCn"
        :theme="{
            token: {
                colorPrimary: '#18a058'
            }
        }"
    >
        <a-app>
            <Search></Search>
            <RouterView></RouterView>
        </a-app>
    </a-config-provider>
</template>

<style scoped></style>
