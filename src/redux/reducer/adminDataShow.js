import actions from '../action/index';

const {
    GET_SMALL_CLASS_DATA_SUCCESS,
    GET_BIG_CLASS_DATA_SUCCESS,
    GET_ANSWER_DATA_SUCCESS
} = actions;
export default (state = {}, action) => {
    switch (action.type) {
        case GET_SMALL_CLASS_DATA_SUCCESS:
            return {
                ...state,
                getSmallClassData: action.data,
            };
        case GET_BIG_CLASS_DATA_SUCCESS:
            return {
                ...state,
                getBigClassData: action.data,
            };
        case GET_ANSWER_DATA_SUCCESS:
            return {
                ...state,
                getAnswerData: action.data,
            };
        default:
            return state;
    }
};