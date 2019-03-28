import actions from '../action/index';

const {
    GET_SOLVEQUESTION_SUCCESS,
    GET_NOTSOLVEQUESTION_SUCCESS,
    PUT_ANSWER_SUCCESS,
    GET_SMALL_CLASS_DATA_SUCCESS,
    GET_BIG_CLASS_DATA_SUCCESS,
} = actions;
export default (state = {}, action) => {
    switch (action.type) {
        case GET_SOLVEQUESTION_SUCCESS:
            return {
                ...state,
                getSolveQuestion: action.data,
            };
        case GET_NOTSOLVEQUESTION_SUCCESS:
            return {
                ...state,
                getNotsolveQuestion: action.data,
            };
        case PUT_ANSWER_SUCCESS:
            return {
                ...state,
                putAnswer: action.data,
            };
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
        default:
            return state;
    }
};