import axios from 'axios';
import actions from './index';
import configs from '../../common/config';
import Qs from 'qs';
import {getTokenHeader} from './common/setHead';

const {
    GET_USERSOLVEQUESTION_SUCCESS,
    GET_USERSOLVEQUESTION_FAILURE,
    GET_USERSOLVENOTQUESTION_SUCCESS,
    GET_USERSOLVENOTQUESTION_FAILURE,
    //提交用户满意情况
    PUT_SAVEQUESTION_SUCCESS,
    PUT_SAVEQUESTION_FAILURE,
    //用户修改已解决问题
    UPDATE_SOLVENOTQUESTION_SUCCESS,
    UPDATE_SOLVENOTQUESTION_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;

/**
 * 获取用户已解决的问题
 * @param query   //请求的数据
 * @return {Function}
 */
export function getUserSolveQ(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            // ?和$之间不能有回车
            const data = (await axios.get(`${baseUrl}/v1/userQuestion/user/getSolvedQuestionList?${Qs.stringify(query)}`, {headers})).data;
            dispatch({
                type: GET_USERSOLVEQUESTION_SUCCESS,
                data: data
            })
        }
        catch (error) {
            dispatch({
                type: GET_USERSOLVEQUESTION_FAILURE,
                error: new Error('获取用户已解决问题列表失败')
            })
        }
    }
}

/**
 * 获取用户未解决的问题
 * @param query
 * @return {Function}
 */
export function getUserSolveNotQ(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/userQuestion/user/getNotSolvedQuestionList?${Qs.stringify(query)}`, {headers})).data;
            dispatch({
                type: GET_USERSOLVENOTQUESTION_SUCCESS,
                data: data
            })
        }
        catch (error) {
            dispatch({
                type: GET_USERSOLVENOTQUESTION_FAILURE,
                error: new Error('获取用户未解决问题失败')
            })
        }
    }
}

/**
 * 获取用户提交问题的状态
 * @param query
 * @return {Function}
 */
export function saveQuestion(query = '') {
    return async (dispatch) => {
        try {
            let headers = Object.assign(getTokenHeader({}), {'Content-Type': 'application/json'});
            const data = (await
                axios.put(`${baseUrl}/v1/userAnswer/user/saveAnswerStatus?${Qs.stringify(query)}`, {}, {headers})).data;
            dispatch({
                type: PUT_SAVEQUESTION_SUCCESS,
                data: data
            })
        }
        catch (error) {
            dispatch({
                type: PUT_SAVEQUESTION_FAILURE,
                error: new Error('获取用户提交问题状态失败')
            })
        }
    }
}

/**
 * 请求未解决问题
 */
export function updateSolveNotQuestion(query = '') {
    return async (dispatch) => {
        try {
            let headers = Object.assign(getTokenHeader({}), {'Content-Type': 'application/json'});
            let value = (JSON.stringify(query));
            const data = (await axios.put(`${baseUrl}/v1/userQuestion/user/updateNotSolvedQuestion?`, value,
                {headers})).data;
            dispatch({
                type: UPDATE_SOLVENOTQUESTION_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_SOLVENOTQUESTION_FAILURE,
                error: new Error('修改补充说明失败, 请稍后再试')
            });
        }
    }
}