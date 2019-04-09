import * as types from '../const/index';

var productDetailt = [];

const myReducer = (state = productDetailt, action) => {
    switch(action.type){
        case types.FETCH_PRODUCT_DETAILT :
            state = action.product;
            return [...state];
        default : return [...state]
    }
}

export default myReducer;