export enum ApiCode {
    /** 成功 */
    OK = 200,
    /** 操作失败 */
    ERROR = 500,
    /** 参数异常 */
    BAD = 400,

    /** 数据不存在 */
    DATA_NOT_FOUND = 10001,
    /** 验证未接通过 */
    DATA_INVALID = 10002
}
