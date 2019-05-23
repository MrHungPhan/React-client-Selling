import * as types from '../const/index';
var search = []

const myReducer = (state = search, action) => {
    switch(action.type){
        case types.SEARCH_KEY:
            return [...action.data]
        case types.FILTER_SEARCH_PRODUCT:
            return [...action.data]
        default: return [...state]
    }
}

export default myReducer