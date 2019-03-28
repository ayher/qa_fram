import actions from '../action/index';

const {
    GET_USERLIST_SUCCESS,
    ADD_USER_SUCCESS,
    UPDATE_USERINFO_SUCCESS,
} = actions;
export default (state = {}, action) => {
    switch (action.type) {
        case GET_USERLIST_SUCCESS:
            return {
                ...state,
                getUserList: action.data,
            }
        case ADD_USER_SUCCESS:
            return {
                ...state,
                addUser: action.data,
            }
        case UPDATE_USERINFO_SUCCESS:
            return {
                ...state,
                adminUpdateUserInfo: action.data,
            }
        default:
            return state;
    }
};