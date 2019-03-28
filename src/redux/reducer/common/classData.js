import actions from '../../action/index';

const {
    GET_BIG_CKASS_SUCCESS,
    GET_SMALL_CKASS_SUCCESS
} = actions;
export default (state = {}, action) => {
    switch (action.type) {
        case GET_BIG_CKASS_SUCCESS:
            return {
                ...state,
                getBigClass: action.data,
            };
        case GET_SMALL_CKASS_SUCCESS:
            return {
                ...state,
                getSmallClass: action.data,
            };
        default:
            return state;
    }
};