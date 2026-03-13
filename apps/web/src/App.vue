<script setup lang="ts">
import zhCn from 'antdv-next/locale/zh_CN'
</script>

<template>
    <a-config-provider :locale="zhCn">
        <RouterView></RouterView>
    </a-config-provider>
</template>

<style scoped></style>
