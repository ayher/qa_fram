import axios from 'axios';
import actions from './index';
import configs from '../../common/config';
import Qs from 'qs';
import {getTokenHeader, formToJson} from './common/setHead';

const {
    // 获取用户基本信息
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAILURE,
    // 更新用户基本信息
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAILURE,
    // 用户修改密码
    UPDATE_USER_PASSWORD_SUCCESS,
    UPDATE_USER_PASSWORD_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;

/**
 * 更新用户信息
 */
export function updateUserInfo(query = '') {
    return async (dispatch) => {
        try {
            let headers = Object.assign(getTokenHeader({}), {'Content-Type': 'application/json'})
            const postdata = (JSON.stringify(formToJson(query)));
            const data = (await axios.put(`${baseUrl}/v1/user/updateUserInfo?`, postdata,
                {headers})).data;
            dispatch({
                type: UPDATE_USER_INFO_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_USER_INFO_FAILURE,
                error: new Error('修改用户基本信息失败, 请稍后再试！')
            });
        }
    }
}

/**
 * 获取用户形式
 */
export function getUserInfo(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/user/getUserInfo?${Qs.stringify(query)}`,
                {headers}
            )).data;
            dispatch({
                type: GET_USER_INFO_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_USER_INFO_FAILURE,
                error: new Error('用户基本信息获取失败, 请稍后再试！')
            });
        }
    };
}

/**
 * 修改密码
 */
export function updateUserPassword(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.put(`${baseUrl}/v1/user/updateUserPwd?${Qs.stringify(query)}`, null, {headers})).data;
            dispatch({
                type: UPDATE_USER_PASSWORD_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_USER_PASSWORD_FAILURE,
                error: new Error('用户基本信息获取失败, 请稍后再试！')
            });
        }
    };
}