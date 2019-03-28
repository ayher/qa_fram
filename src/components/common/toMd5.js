var md5 = require('md5');

/**
 * md5加密
 * @param password 加密的密码
 * @returns 加密后的密码
 */
export function toMd5(password) {
    password = md5(password);
    return password;
};