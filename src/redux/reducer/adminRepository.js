import actions from '../action/index';

const {
    //获取知识库列表
    GET_REPOSITORYLIST_SUCCESS,
    //查找答案
    GET_FINDKNOWLEDGE_SUCCESS,
    UPDATE_QUESTION_SUCCESS,
    //添加知识
    ADD_KNOWLEDGE_SUCCESS,
    // 推送知识到数据库
    PUT_KNOWLEDGE_SUCCESS,

    UPLOAD_REPOSITORY_SUCCESS
} = actions;

export default (state = {}, action) => {
    switch (action.type) {
        case GET_REPOSITORYLIST_SUCCESS:
            return {
                ...state,
                getRepositoryList: action.data,
            };
        case GET_FINDKNOWLEDGE_SUCCESS:
            return {
                ...state,
                searchKnowledge: action.data,
            };
        case UPDATE_QUESTION_SUCCESS:
            return {
                ...state,
                changeQuestion: action.data,
            };
        case ADD_KNOWLEDGE_SUCCESS:
            return {
                ...state,
                addKnowledge: action.data,
            };
        case PUT_KNOWLEDGE_SUCCESS:
            return {
                ...state,
                putKnowledge: action.data,
            };
        case UPLOAD_REPOSITORY_SUCCESS:
            return {
                ...state,
                uploadRepository: action.data,
            };
        default:
            return state;
    }
};
