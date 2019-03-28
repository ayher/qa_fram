import actions from '../action/index';

const {
    //获取知识库列表
    GET_QUESTIONLIST_SUCCESS,
} = actions;
export default (state = {}, action) => {
    switch (action.type) {
        case GET_QUESTIONLIST_SUCCESS:
            return {
                ...state,
                getQAMergeList: action.data,
            };
        default:
            return state;
    }
};