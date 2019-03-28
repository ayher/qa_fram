/**
 * 时间戳转时间
 * @param timeStamp  时间戳，单位是毫秒
 * @return {string}
 * @constructor
 */
export function TimeStampToTime(timeStamp) {
    return new Date(parseInt(timeStamp)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}
