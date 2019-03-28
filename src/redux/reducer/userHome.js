import actions from '../action/index';
const {
    GET_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_PASSWORD_SUCCESS
} = actions;
export default (state = {}, action) => {
    switch (action.type) {
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                getUserInfo:action.data,
            };
        case UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                updateUserInfo:action.data,
            };
        case UPDATE_USER_PASSWORD_SUCCESS:
            return {
                ...state,
                updateUserPassword:action.data,
            };
        default:
            return state;
    }
};