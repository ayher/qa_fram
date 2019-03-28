import axios from 'axios';
import actions from './index';
import configs from '../../common/config';
import Qs from 'qs';
import {getTokenHeader} from './common/setHead';

const {
    GET_HOME_DATA_SUCCESS,
    GET_HOME_DATA_FAILURE,
    // 根据问题获取答案
    GET_QUESTION_ANSWER_SUCCESS,
    GET_QUESTION_ANSWER_FAILURE,
    // 获取常见问题
    GET_COMMON_QUESTION_SUCCESS,
    GET_COMMON_QUESTION_FAILURE,
    // 对问题就行评价
    PUT_QUESTION_APPRAISE_SUCCESS,
    PUT_QUESTION_APPRAISE_FAILURE,
    // 用户回答反馈问题
    PUT_QUESTION_ANSWER_SUCCESS,
    PUT_QUESTION_ANSWER_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;

/**
 * 获取首页的三个数据
 * @param query 请求所需要的参数
 * @returns {dispatch}
 */
export function getHomeDatas(query = '') {
    return async (dispatch) => {
        try {
            const data = (await axios.get(`${baseUrl}/v1/util/getIndexCount`)).data;
            dispatch({
                type: GET_HOME_DATA_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_HOME_DATA_FAILURE,
                error: new Error('首页数据获取失败, 请稍后再试!')
            });
        }
    }
}

/**
 * 根据问题获取答案
 * @param query 请求的参数
 * @returns {dispatch}
 */
export function getQuestionAnswer(query = '') {
    return async (dispatch) => {
        try {
            // 命名必须得用headers，用header就参数错误！！
            let headers = getTokenHeader({});
            let data = (await axios.get(`${baseUrl}/v1/ask?${Qs.stringify(query)}`,
                {headers}
            )).data;
            dispatch({
                type: GET_QUESTION_ANSWER_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({

                type: GET_QUESTION_ANSWER_FAILURE,
                error: new Error('答案获取失败, 请稍后再试!')
            });
        }
    };
}

/**
 * 获取常见问题
 * @param query
 * @returns {function(*)}
 */
export function getCommonQuestion(query = '') {
    return async (dispatch) => {
        try {
            const data = (await axios.get(`${baseUrl}/v1/repository/getCommonQuestionList?rows=4`)).data;
            dispatch({
                type: GET_COMMON_QUESTION_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_COMMON_QUESTION_FAILURE,
                error: new Error('获取常见问题失败, 请稍后再试!')
            })
        }
    }
}

/**
 * 用户对问题进行作业就行评价
 * @param query
 * @returns {function(*)}
 */
export function putQueationAppraise(query = '') {
    return async (dispatch) => {
        try {
            // let headers = getTokenHeader({});
            const data = (await axios.put(`${baseUrl}/v1/ask/feedback?${Qs.stringify(query)}`)).data;
            dispatch({
                type: PUT_QUESTION_APPRAISE_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: PUT_QUESTION_APPRAISE_FAILURE,
                error: new Error('评价反馈失败, 请稍后再试')
            });
        }
    };
}

/**
 * 用户自己填写回答问题
 * @param query
 * @returns {function(*)}
 */
export function putQuestionAnswer(query = '') {
    return async (dispatch) => {
        try {
            let headers = Object.assign(getTokenHeader({}), {'Content-Type': 'application/json'});
            let value = (JSON.stringify(query));
            let data = (await axios.post(`${baseUrl}/v1/userQuestion/user/saveQuestion`, value,
                {headers}
            )).data;
            dispatch({
                type: PUT_QUESTION_ANSWER_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: PUT_QUESTION_ANSWER_FAILURE,
                error: new Error('补充问题答案失败, 请稍后再试')
            });
        }
    };
}