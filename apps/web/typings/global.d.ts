// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Window {}

/** 设置某些字段 只读 */
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
