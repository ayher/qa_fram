import axios from 'axios';
import actions from '../index';
import configs from '../../../common/config';
import {getTokenHeader} from '../common/setHead';

const {
    GET_BIG_CKASS_SUCCESS,
    GET_BIG_CKASS_FAILURE,
    // 获取小分类
    GET_SMALL_CKASS_SUCCESS,
    GET_SMALL_CKASS_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;

/**
 * 获取后台大分类数据
 * @param query
 * @returns {function(*)}
 */
export function getBigClass(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/type//getQuestionTypeList`,
                {headers}
            )).data;
            dispatch({
                type: GET_BIG_CKASS_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_BIG_CKASS_FAILURE,
                error: new Error('大分类数据获取失败, 请稍后再试')
            });
        }
    }
}

/**
 * 获取后台大分类数据
 * @param query
 * @returns {function(*)}
 */
export function getSmallClass(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/from/getQuestionFromList`,
                {headers}
            )).data;
            dispatch({
                type: GET_SMALL_CKASS_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_SMALL_CKASS_FAILURE,
                error: new Error('小分类数据获取失败, 请稍后再试')
            });
        }
    }
}