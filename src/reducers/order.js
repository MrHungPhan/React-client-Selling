import * as types from '../const/index';

var init = [];

const myReducer = (state = init, action) => {
    switch(action.type){
        case types.GET_ORDER_HISTORY : 
            return [...action.orders]
        default : 
            return [...state]
    }
}

export default myReducer