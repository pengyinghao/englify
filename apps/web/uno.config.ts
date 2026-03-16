import transformerCompileClass from '@unocss/transformer-compile-class'
import { defineConfig, presetAttributify, presetWind4, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetAntd } from '@antdv-next/unocss'
export default defineConfig({
    presets: [
        presetWind4(),
        presetAttributify(),
        presetAntd({
            prefix: 'a',
            antPrefix: 'ant'
        })
    ],
    transformers: [transformerDirectives(), transformerVariantGroup(), transformerCompileClass()],
    shortcuts: {
        'wh-full': 'w-full h-full',
        'flex-y-center': 'flex items-center',
        'flex-center': 'flex justify-center items-center',
        'transition-base': 'transition-all duration-300 ease-in-out'
    },
    theme: {
        colors: {
            primary: {}
        }
    },
    rules: [
        [/^plr-(.*)$/, ([, p]) => ({ 'padding-left': p, 'padding-right': p })],
        [/^ptb-(.*)$/, ([, p]) => ({ 'padding-top': p, 'padding-bottom': p })]
    ]
})
