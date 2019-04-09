import * as types from '../const/index'

var userProfile = {}

const myReducer = (state = userProfile, action) => {
    switch(action.type){
        case types.OAUTH_GET_USER:
            state = {...action.user};    
            return {...state}
        case types.LOGOUT_USER:
            state = {};
            return {...state}
        default: return {...state}
    }
}

export default myReducer