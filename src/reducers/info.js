import * as types from '../const/index';

var info = {
    districts : [],
    wards : [],
    services :[],
    total : 0,
    time : '',
    order : null
}

const myReducer = (state = info, action)=> {
    switch(action.type){
        case types.GET_DISTRICTS:
            return {...state, districts : action.districts}
        case types.GET_WARDS:
            return {...state, wards : action.wards}
        case types.GET_SERVICES:
            return { ...state, services: action.services}
        case types.CHECKOUT_SUCCESS:
            return { ...state, order :action.order}
        case types.STORE_INFO:
            return { ...state, time : action.data.time, total : action.data.total}
        case types.RESTORE_INFO:
            return { ...state, order : null}
        default : return {...state}
    }
}

export default myReducer;