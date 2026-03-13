import { URL, fileURLToPath } from 'node:url'

import { config } from '@en/config'
import { defineConfig } from 'vite'
import { registerPlugins } from './build'

// https://vite.dev/config/
export default defineConfig(() => {
    return {
        plugins: registerPlugins(),
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            port: config.port.web
        }
    }
})
