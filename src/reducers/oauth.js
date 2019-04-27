import * as types from '../const/index'; 

var oauth = {
    isAuthencated : false,
    token : '',
    errorSignin : '',
    errorSignup : '',
    isSignUp : false,
    message : ''
}

const myReducer = (state = oauth, action) => {
    switch(action.type){
        case types.OAUTH_SIGN_UP : 
            return { ...state, 
                isSignUp: true,
                 error : "", 
                 message : action.message}
        case types.RESET_MESSAGE:
                return {
                    ...state,
                    message : ''
                }
        case types.OAUTH_SIGN_IN:
            return {...state,
                 isAuthencated : true,
                 isSignUp: false, 
                 isSignUp: false, 
                 token : action.token, 
                 errorSignin : "",
                 errorSignup: '',
                  message : ''}
        case types.RESET_ERROR_SIGNIN:
                return {
                    ...state,
                    errorSignin : ''
                }
        case types.OAUTH_GOOGLE : 
            return {...state,
                 isAuthencated : true, 
                 isSignUp: false,
                 token : action.token,
                 errorSignin : "",
                 errorSignup: '',
                  message : ''}
        case types.OAUTH_ERROR : 
            return {...state,
                isAuthencated: false,
                token : '',
                isSignUp: false,
                message: '',
                 errorSignin : action.error,
                errorSignup: ''}
        case types.SIGNUP_ERROR : 
            return {...state,
                isAuthencated: false,
                token : '',
                isSignUp: false,
                message: '',
                errorSignup : action.error,
                errorSignin: ''}
        case types.LOGOUT_USER:
            return {...state,
                 isAuthencated : false,
                 isSignUp: false,
                  token : '',
                  errorSignin : "",
                  errorSignup: '',
                    message : ''}
        default : return {...state}
    }
}

export default myReducer;