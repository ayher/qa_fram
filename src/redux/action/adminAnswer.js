import axios from 'axios';
import actions from './index';
import configs from '../../common/config';
import Qs from 'qs';
import {getTokenHeader} from './common/setHead';

const {
    //获取答案列表
    GET_QUESTIONLIST_SUCCESS,
    GET_QUESTIONLIST_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;

export function getQAMergeList(query = '') {
    return async (dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/v1/question/admin/getQAMergeList?${Qs.stringify(query)}`,
                {headers}
            )).data;
            dispatch({
                type: GET_QUESTIONLIST_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_QUESTIONLIST_FAILURE,
                error: new Error('问题列表获取失败, 请稍后再试')
            });
        }
    }
}
