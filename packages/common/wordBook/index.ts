/** 词库 */
export interface IWordBook {
    /** 单词ID */
    id: string
    /** 单词 */
    word: string
    /** 音标 */
    phonetic?: string
    /** 定义 */
    definition?: string
    /** 翻译 */
    translation?: string
    /** 词性 */
    pos?: string
    /** 柯林斯 */
    collins?: string
    /** 牛津 */
    oxford?: string
    /** 标签 */
    tag?: string
    /** BNC 英国国家语料库 */
    bnc?: string
    /** FRQ 频率 */
    frq?: string
    /** 同义词 */
    exchange?: string
    /** 高考 */
    gk?: boolean
    /** 中考 */
    zk?: boolean
    /** GRE */
    gre?: boolean
    /** TOEFL */
    toefl?: boolean
    /** IELTS */
    ielts?: boolean
    /** 大学英语六级 */
    cet6?: boolean
    /** 大学英语四级 */
    cet4?: boolean
    /** 考研 */
    ky?: boolean
    /** 创建时间, ISO 日期字符串 */
    createdAt: string
    /** 更新时间, ISO 日期字符串 */
    updatedAt: string
}

/** 单词英语等级 */
export type WordBookLevel = Pick<
    IWordBook,
    'gk' | 'zk' | 'gre' | 'toefl' | 'ielts' | 'cet4' | 'cet6' | 'ky'
>

export interface WordBookLevelOption {
    /** 等级 */
    key: keyof WordBookLevel
    /** 等级对应的中文 */
    label: string
    /** 是否选中 */
    check: boolean
}

/** 词库查询条件 */
export type WordBookOption = {
    /** 索索关键字 */
    word?: string
} & PageListOption &
    WordBookLevel
