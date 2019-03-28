import axios from 'axios';
import actions from './index';
import configs from '../../common/config';
import Qs from 'qs';
import {getTokenHeader} from './common/setHead';

const {
    //获取知识库列表
    GET_REPOSITORYLIST_SUCCESS,
    GET_REPOSITORYLIST_FAILURE,
    //查找答案
    GET_FINDKNOWLEDGE_SUCCESS,
    GET_FINDKNOWLEDGE_FAILURE,
    //修改答案
    UPDATE_QUESTION_SUCCESS,
    UPDATE_QUESTION_FAILURE,
    //添加知识
    ADD_KNOWLEDGE_SUCCESS,
    ADD_KNOWLEDGE_FAILURE,
    // 推送知识到数据库
    PUT_KNOWLEDGE_SUCCESS,
    PUT_KNOWLEDGE_FAILURE,
    // 上传导入数据库
    UPLOAD_REPOSITORY_SUCCESS,
    UPLOAD_REPOSITORY_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;

export function getRepositoryList(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/repository/admin/getRepositoryList?${Qs.stringify(query)}`,
                {headers}
            )).data;
            dispatch({
                type: GET_REPOSITORYLIST_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_REPOSITORYLIST_FAILURE,
                error: new Error('问题列表获取失败, 请稍后再试')
            });
        }
    }
}

/**
 * 管理员修改问题
 * @param query
 * @returns {function(*)}
 */
export function changeQuestion(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.put(`${baseUrl}/v1/repository/admin/updateKnowledge`, query, {headers})).data;
            dispatch({
                type: UPDATE_QUESTION_SUCCESS,
                data: data
            });

        } catch (error) {
            dispatch({
                type: UPDATE_QUESTION_FAILURE,
                error: new Error('问题修改失败, 请稍后再试')
            });
        }
    };
}

export function addKnowledge(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.post(`${baseUrl}/v1/repository/admin/addKnowledge`, query, {headers})).data;
            dispatch({
                type: ADD_KNOWLEDGE_SUCCESS,
                data: data
            });

        } catch (error) {
            dispatch({
                type: ADD_KNOWLEDGE_FAILURE,
                error: new Error('问题添加失败, 请稍后再试')
            });
        }
    };
}

export function searchKnowledge(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/repository/admin/search?${Qs.stringify(query)}`, {headers})).data;
            dispatch({
                type: GET_FINDKNOWLEDGE_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_FINDKNOWLEDGE_FAILURE,
                error: new Error('查询失败, 请稍后再试')
            });
        }
    }
}


export function putKnowledge(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            console.log(headers);
            const data = (await axios.put(`${baseUrl}/v1/repository/admin/pushRepository`, null, {headers})).data;
            dispatch({
                type: PUT_KNOWLEDGE_SUCCESS,
                data: data
            });

        } catch (error) {
            dispatch({
                type: PUT_KNOWLEDGE_FAILURE,
                error: new Error('推送知识库失败, 请稍后再试')
            });
        }
    };
}

export function uploadRepository(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.put(`${baseUrl}/v1/repository/admin/uploadBatchKnowledge`, query, {headers})).data;
            dispatch({
                type: UPLOAD_REPOSITORY_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: UPLOAD_REPOSITORY_FAILURE,
                error: new Error('上传知识库失败, 请稍后再试')
            });
        }
    };
}