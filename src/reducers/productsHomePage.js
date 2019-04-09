import * as types from '../const/index'

var productsHomePage = {};

const myReducer = (state = productsHomePage, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCTS_HOME:
            state = action.productsHome;
            return {...state}
         default : return {...state}
    }
}

export default myReducer;