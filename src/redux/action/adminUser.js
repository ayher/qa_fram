import axios from 'axios';
import actions from './index';
import configs from '../../common/config';
import Qs from 'qs';
import {getTokenHeader} from './common/setHead';

const {
    //获取用户列表信息
    GET_USERLIST_SUCCESS,
    GET_USERLIST_FAILURE,
    //添加用户
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
    //修改用户信息
    UPDATE_USERINFO_SUCCESS,
    UPDATE_USERINFO_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;

/**
 * 获取用户列表
 * @param query
 * @returns {function(*)}
 */
export function getUserList(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/user/admin/getUserList?${Qs.stringify(query)}`,
                {headers})).data;
            //const data = (await axios.get('./api/User.json')).data;
            dispatch({
                type: GET_USERLIST_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_USERLIST_FAILURE,
                error: new Error('用户信息获取失败, 请稍后再试')
            });
        }
    };
}

/**
 * 添加用户
 * @param query
 * @returns {function(*)}
 */
export function addUser(query = '') {
    return async (dispatch) => {
        try {
            //let headers = getTokenHeader({});
            let headers = Object.assign(getTokenHeader({}), {'Content-Type': 'application/json'});
            let value = (JSON.stringify(query));
            const data = (await axios.post(`${baseUrl}/v1/user/admin/addUser?`, value,
                {headers})).data;
            //const data = (await axios.get('./api/addUser.json')).data;
            dispatch({
                type: ADD_USER_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: ADD_USER_FAILURE,
                error: new Error('添加用户失败, 请稍后再试')
            });
        }
    }
}

/**
 * 管理员修改用户信息
 * @param query
 * @returns {function(*)}
 */
export function adminUpdateUserInfo(query = '') {
    return async (dispatch) => {
        try {
            let headers = Object.assign(getTokenHeader({}), {'Content-Type': 'application/json'});
            let value = (JSON.stringify(query));
            const data = (await axios.put(`${baseUrl}/v1/user/admin/updateUserInfo?`, value,
                {headers})).data;
            dispatch({
                type: UPDATE_USERINFO_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_USERINFO_FAILURE,
                error: new Error('修改用户信息失败, 请稍后再试')
            });
        }
    }
}