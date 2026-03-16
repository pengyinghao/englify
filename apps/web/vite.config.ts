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
            port: config.port.web,
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    changeOrigin: true
                }
            }
        },
        css: {
            devSourcemap: true
        },
        build: {
            outDir: 'dist',
            rollupOptions: {
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return id.toString().split('node_modules/')[1].replace('.pnpm/', '').split('/')[0]
                        }
                    }
                }
            }
        }
    }
})
