import * as types from '../const/index';

var dataCart = localStorage.getItem('cart')
var cart = cart ? dataCart : [];

const myReducer = (state = cart, action)=> {
    switch(action.type){
        case(types.ADD_TO_CART):
            return [...action.cart]
        case(types.FECTCH_GET_CART):
            return [...action.cart];
        case(types.ADD_TO_CART_LOCAL):
           return [...action.cart]
        default : return [...state]
    }
}

export default myReducer;