import { AntdvNextResolver } from '@antdv-next/auto-import-resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

/** 自动按需引入组件 */
export function autoComponent() {
    return Components({
        resolvers: [AntdvNextResolver()],
        extensions: ['vue', 'vue-router'],
        dirs: [],
        dts: 'typings/auto-components.d.ts'
    })
}

/** 自动按需引入依赖 */
export function autoImport() {
    return AutoImport({
        dts: 'typings/auto-imports.d.ts',
        dirs: [],
        imports: ['vue', 'vue-router', 'vue-i18n']
    })
}
