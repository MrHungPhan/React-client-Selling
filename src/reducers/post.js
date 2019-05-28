import * as types from '../const/index';

var init = {
    postsArr : [],
    postTailt : {}
};

const myReducer = (state = init, action) => {
    switch(action.type){
        case types.GET_POST:
            return {...state, postsArr : action.data}
        case types.GET_POST_DETAILT:
            return { ...state, postTailt: action.data}
        default : return {...state}
    }
}

export default myReducer