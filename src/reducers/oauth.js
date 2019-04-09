import * as types from '../const/index'; 

var oauth = {
    isAuthencated : false,
    token : '',
    error : ''
}

const myReducer = (state = oauth, action) => {
    switch(action.type){
        case types.OAUTH_SIGN_UP : 
            return { ...state, isAuthencated: true, token : action.token, error : ""}
        case types.OAUTH_SIGN_IN:
            return {...state, isAuthencated : true, token : action.token, error : ""}
        case types.OAUTH_GOOGLE : 

            return {...state, isAuthencated : true, token : action.token, error : ''}
        case types.OAUTH_ERROR : 
            return {...state, error : action.error}
        case types.LOGOUT_USER:
            return {...state, isAuthencated : false, token : '', error: ''}
        default : return {...state}
    }
}

export default myReducer;