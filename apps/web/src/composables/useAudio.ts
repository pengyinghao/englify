export interface Options {
    /** 语速0-1 */
    rate?: number
    /** 音量0-1 */
    volume?: number
    /** 音调0-2 */
    pitch?: number
    /** 语言 */
    lang?: string
}

let instance: SpeechSynthesisUtterance | null = null
const getInstance = (options: Options) => {
    if (!instance) {
        instance = new SpeechSynthesisUtterance()
        const { rate = 0.7, volume = 1, pitch = 1, lang = 'en-US' } = options
        instance.rate = rate
        instance.volume = volume
        instance.pitch = pitch
        instance.lang = lang
    }
    return instance
}

export const useAudio = (options: Options) => {
    const pronounce = getInstance(options)
    const playAudio = (word: string) => {
        speechSynthesis.cancel()

        /** 设置发音的单词 */
        pronounce.text = word
        /** 播放发音 */
        speechSynthesis.speak(pronounce)
    }
    return {
        playAudio
    }
}
