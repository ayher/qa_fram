import axios from 'axios';
import actions from './index';
import configs from '../../common/config';
import {getTokenHeader} from './common/setHead';

const baseUrl = configs.baseUrl;
const {
    //获取反馈管理中小分类数据
    GET_SMALL_CLASS_DATA_SUCCESS,
    GET_SMALL_CLASS_DATA_FAILURE,
    //获取反馈管理中大分类数据
    GET_BIG_CLASS_DATA_SUCCESS,
    GET_BIG_CLASS_DATA_FAILURE,
    GET_ANSWER_DATA_SUCCESS,
    GET_ANSWER_DATA_FAILURE,
} = actions;

/**
 * 小分类的接口
 * @param query
 * @returns {function(*)}
 */
export function getSmallClassData(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/repository/admin/getFromList`,
                {headers}
            )).data;
            dispatch({
                type: GET_SMALL_CLASS_DATA_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_SMALL_CLASS_DATA_FAILURE,
                error: new Error('获取小分类失败, 请稍后再试')
            });
        }
    }
}

/**
 * 获取大分类数据
 * @returns {function(*)}
 */
export function getBigClassData() {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/repository/admin/getTypeList`,
                {headers}
            )).data;
            dispatch({
                type: GET_BIG_CLASS_DATA_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_BIG_CLASS_DATA_FAILURE,
                error: new Error('获取大分类失败，请稍后再试！')
            });
        }
    }
}

/**
 * 获取提问数据
 * @returns {function(*)}
 */
export function getAnswerData() {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/ask/admin/getMostAskList?rows=8`,
                {headers}
            )).data;
            dispatch({
                type: GET_ANSWER_DATA_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_ANSWER_DATA_FAILURE,
                error: new Error('获取大分类失败，请稍后再试！')
            });
        }
    }
}