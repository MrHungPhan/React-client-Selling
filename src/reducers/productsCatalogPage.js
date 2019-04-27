import * as types from '../const/index';

var products = {};

const myReducer = (state = products, action) => {
    switch(action.type){
        case types.FETCH_PRODUCTS_CATALOG:
            state = action.products;
            return  {...state}
        default :return {...state}
    }
}

export default myReducer;