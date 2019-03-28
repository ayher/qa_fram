import axios from 'axios';
import actions from './index';
import configs from '../../common/config';
import Qs from 'qs';

const {
    // 获取验证码
    GET_CAPTCHA_SUCCESS,
    GET_CAPTCHA_FAILURE,
    // 登录
    PUT_LOGIN_SUCCESS,
    PUT_LOGIN_FAILURE,
    //第三方登录
    PUT_OTHERLOGIN_SUCCESS,
    PUT_OTHERLOGIN_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;

/**
 * 获取验证码
 * @param query 请求的参数
 * @returns {dispatch}
 */
export function getCaptcha(query = '') {
    return async (dispatch) => {
        try {
            const data = (await axios.get(`${baseUrl}/v1/util/getCaptcha`)).data;
            dispatch({
                type: GET_CAPTCHA_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_CAPTCHA_FAILURE,
                error: new Error('获取验证码失败, 请稍后再试!')
            });
        }
    }
}

/**
 * 用户登录接口
 * @param query from表单保存了用户填写的登录信息
 * @returns {dispatch}
 */
export function login(query = '') {
    return async (dispatch) => {
        try {
            const data = (await axios.post(`${baseUrl}/v1/user/passwordLogin`, Qs.stringify(query))).data;
            dispatch({
                type: PUT_LOGIN_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: PUT_LOGIN_FAILURE,
                error: new Error('登录失败, 请稍后再试!')
            });
        }
    }
}

export function otherLogin(query = '') {
    return async (dispatch) => {
        try {
            const data = (await axios.post(`${baseUrl}/v1/user/thirdPartyLogin?${Qs.stringify(query)}`)).data;
            dispatch({
                type: PUT_OTHERLOGIN_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: PUT_OTHERLOGIN_FAILURE,
                error: new Error('第三方登录失败, 请稍后再试')
            });
        }
    }
}