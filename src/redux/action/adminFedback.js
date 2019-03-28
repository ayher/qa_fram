import axios from 'axios';
import actions from './index';
import configs from '../../common/config';
import Qs from 'qs';
import {getTokenHeader} from './common/setHead';

const {
    //获取已解决问题列表
    GET_SOLVEQUESTION_SUCCESS,
    GET_SOLVEQUESTION_FAILURE,
    //获取未解决问题列表
    GET_NOTSOLVEQUESTION_SUCCESS,
    GET_NOTSOLVEQUESTION_FAILURE,
    //保存管理员修改的问题信息
    PUT_ANSWER_SUCCESS,
    PUT_ANSWER_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;

/**
 * 获取已解决问题列表
 * @param query
 * @returns {function(*)}
 */
export function getSolveQuestion(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/userQuestion/admin/getSolvedQuestionList?${Qs.stringify(query)}`,
                {headers})).data;
            dispatch({
                type: GET_SOLVEQUESTION_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_SOLVEQUESTION_FAILURE,
                error: new Error('获取已解决问题失败！')
            });
        }
    }
}

/**
 * 获取未解决问题列表
 * @param query
 * @returns {function(*)}
 */
export function getNotsolveQuestion(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/userQuestion/admin/getNotSolvedQuestionList?${Qs.stringify(query)}`,
                {headers})).data;
            dispatch({
                type: GET_NOTSOLVEQUESTION_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_NOTSOLVEQUESTION_FAILURE,
                error: new Error('获取未解决问题失败！')
            });
        }
    }
}

/**
 * 将管理员修改的答案传输到后台
 * @param query
 * @returns {function(*)}
 */
export function putAnswer(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            headers['Content-Type'] = 'application/json';
            const postdata = (JSON.stringify(query));
            const data = (await axios.post(`${baseUrl}/v1/userAnswer/admin/saveAnswer`, postdata,
                {headers}
            )).data;
            dispatch({
                type: PUT_ANSWER_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: PUT_ANSWER_FAILURE,
                error: new Error('管理员补充问题答案失败, 请稍后再试')
            });
        }
    };
}
