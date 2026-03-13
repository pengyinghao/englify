import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unocss from 'unocss/vite'
import { PluginOption } from 'vite'
import viteCompression from 'vite-plugin-compression'
import { autoComponent, autoImport } from './unplugin'
// import vueDevTools from 'vite-plugin-vue-devtools'

export function registerPlugins() {
    const plugins: PluginOption[] = [
        vue(),
        vueJsx(),
        // vueDevTools(),
        unocss(),
        viteCompression(),
        autoImport(),
        autoComponent()
    ]
    return plugins
}
