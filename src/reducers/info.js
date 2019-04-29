import * as types from '../const/index';

var info = {
    districts : []
}

 const myReducer = (state = info, action) =>{
    switch(action.type){
        case types.GET_DISTRICTS:
            return {...state, districts: action.districts}
        default : return {...state}
    }
}

export default myReducer