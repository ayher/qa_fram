/**
 * 用于给请求头加token
 * @param header 为空
 * @returns {{} & any}
 */
export function getTokenHeader(header) {

    let _header = Object.assign({}, header);
    _header={Authorization:localStorage.Authorization};
    return _header;
}
/**
 * 用于form表单转json，方便数据请求
 * @param query 要转的表单
 * @returns {{}}
 */
export function formToJson(query) {
    const formData = new FormData(query);
    const objData = {};
    formData.forEach((value, key) => objData[key] = value);
    return objData;
}