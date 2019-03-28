import actions from '../action/index';

const {
    GET_HOME_DATA_SUCCESS,
    GET_QUESTION_ANSWER_SUCCESS,
    GET_COMMON_QUESTION_SUCCESS,
    PUT_QUESTION_APPRAISE_SUCCESS,
    PUT_QUESTION_ANSWER_SUCCESS
} = actions;
export default (state = {}, action) => {
    switch (action.type) {
        case GET_HOME_DATA_SUCCESS:
            return {
                ...state,
                getHomeDatas: action.data,
            };
        case GET_QUESTION_ANSWER_SUCCESS:
            return {
                ...state,
                getQuestionAnswer: action.data,
            };
        case GET_COMMON_QUESTION_SUCCESS:
            return {
                ...state,
                getCommonQuestion: action.data,
            };
        case PUT_QUESTION_APPRAISE_SUCCESS:
            return {
                ...state,
                putQueationAppraise: action.data,
            };
        case PUT_QUESTION_ANSWER_SUCCESS:
            return {
                ...state,
                putQuestionAnswer: action.data,
            };
        default:
            return state;
    }
};