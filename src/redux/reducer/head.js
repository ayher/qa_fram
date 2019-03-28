import actions from '../action/index';

const {
    GET_CAPTCHA_SUCCESS,
    PUT_LOGIN_SUCCESS,
    PUT_OTHERLOGIN_SUCCESS,
} = actions;
export default (state = {}, action) => {
    switch (action.type) {
        case GET_CAPTCHA_SUCCESS:
            return {
                ...state,
                getCaptcha: action.data,
            }
        case PUT_LOGIN_SUCCESS:
            return {
                ...state,
                login: action.data,
            }
        case PUT_OTHERLOGIN_SUCCESS:
            return {
                ...state,
                otherLogin: action.data,
            }
        default:
            return state;
    }
};