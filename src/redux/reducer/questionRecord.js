import actions from '../action/index';
const {
    GET_USERSOLVEQUESTION_SUCCESS,
    GET_USERSOLVENOTQUESTION_SUCCESS,
    PUT_SAVEQUESTION_SUCCESS,
    UPDATE_SOLVENOTQUESTION_SUCCESS,

} = actions;
export default (state = {}, action) => {
    switch (action.type) {
        case GET_USERSOLVEQUESTION_SUCCESS:
            return {
                ...state,
                getUserSolveQ:action.data,
            };
        case GET_USERSOLVENOTQUESTION_SUCCESS:
            return {
                ...state,
                getUserSolveNotQ:action.data,
            };
        case PUT_SAVEQUESTION_SUCCESS:
            return {
                ...state,
                saveQuestion:action.data,
            };
        case UPDATE_SOLVENOTQUESTION_SUCCESS:
            return {
                ...state,
                updateSolveNotQuestion:action.data,
            };
        default:
            return state;
    }
};