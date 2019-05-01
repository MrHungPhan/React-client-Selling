import * as types from '../const/index';

var info = {
    districts : [],
    wards : [],
    services :[]
}

const myReducer = (state = info, action)=> {
    switch(action.type){
        case types.GET_DISTRICTS:
            return {...state, districts : action.districts}
        case types.GET_WARDS:
            return {...state, wards : action.wards}
        case types.GET_SERVICES:
            return { ...state, services: action.services}
        default : return {...state}
    }
}

export default myReducer;