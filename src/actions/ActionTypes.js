import { Cookies } from 'react-cookie'
import lodash from 'lodash';
import 'dotenv'

import * as type from '../const/index';
import callApi from '../utils/apiCaller';
import apiTransport from '../utils/apitTransport'
import { types } from 'util';

var cookie = new Cookies();

// get Menu

export const fetchMenu = () => {
    return async dispatch => {
        const res = await callApi('menu', 'GET', null)
        dispatch(onStoreMenu(res.data))
    }
}

export const onStoreMenu = (menus) => {
    return {
        type: type.FECTCH_MENU,
        menus
    }
}


// action goi actions se can midleware
// get all products Home Page
export const fetchProductsHomePage = () => {
    return async (dispatch) => {
        const res = await callApi('home/products', 'GET', null)
        dispatch(onStoreProductsHome(res.data));
    }
}
export const onStoreProductsHome = (productsHome) => {
    return {
        type: type.FETCH_PRODUCTS_HOME,
        productsHome
    }

}

// get Products Catalogs
export const fetchProductsCatalogPage = (match) => {
    return async dispatch => {
        const res = await callApi(`catapage/${match.params.name}`, "GET", null)
        dispatch(onStoreProductsCatalog(res.data))
    }
}

export const fetchProductsCatalogChildPage = (match) => {
    return async dispatch => {
        const res = await callApi(`catapage/${match.params.name}/${match.params.product}`, "GET", null)
        dispatch(onStoreProductsCatalog(res.data))
    }
}

export const onStoreProductsCatalog = (products) => {
    return {
        type: type.FETCH_PRODUCTS_CATALOG,
        products
    }
}

// Get Product Detailt
export const fetchProductDetailt = (id) => {
    return async dispatch => {
        const res = await callApi(`product/${id}`, 'GET', null)
        dispatch(onStoreProductDetailt(res.data))
    }
}

export const onStoreProductDetailt = (product) => {
    return {
        type: type.FETCH_PRODUCT_DETAILT,
        product
    }
}

////////////////////////////////////////////////////////////////////////////
// OAUTH USER

// Sign Up Account
export const signUp = (data) => {
    return async dispatch => {
        try {
            const res = await callApi('user/signUp', 'POST', data)
            if(res.status === 200){
                dispatch({
                    type: type.OAUTH_SIGN_UP,
                    message : res.data.message
                })
            }
            
        } catch (error) {
            dispatch({
                type: type.SIGNUP_ERROR,
                error: "Email đã tồn tại"
            })
        }
    }
}


// Sign in Account
export const signIn = (data) => {
    return async dispatch => {
            const res = await callApi('user/signIn', 'POST', data);
            if (res.data.token) {
                 //  localStorage.setItem('token', res.data.token)
                 cookie.set('token', res.data.token, {
                    maxAge: 60 * 60 * 60 * 24 * 5
                });

                dispatch({
                    type: type.OAUTH_SIGN_IN,
                    token: res.data.token
                })
            }else{
                dispatch({
                    type: type.OAUTH_ERROR,
                    error : res.data.message
                })
            }

    }
}

// Oauth Google 
export const oauthGoogle = (accessToken) => {
    return async dispatch => {
        try{
            const res = await callApi('user/oauth/google', 'POST', {
            access_token: accessToken
        });
        if (res.status === 200) {
            cookie.set('token', res.data.token, {
                maxAge: 60 * 60 * 60 * 24 * 5
            });

            dispatch({
                type: type.OAUTH_GOOGLE,
                token: res.data.token
            })

        }
        }catch(error){
            console.log(error)
        }  
    }
}

// get User Profile
export const getUserProfile = () => {
    return async dispatch => {
        const res = await callApi('user/profile', "POST", null);
        dispatch({
            type: type.OAUTH_GET_USER,
            user: res.data.user
        })
    }
}

// Logout User
export const logOutUser = () => {
    return dispatch => {
        cookie.remove('token');
        dispatch({
            type : type.LOGOUT_USER,
        });
    }
}

// reset message to toggle to signin modal because sign up sccess -> sign modal base message => message must change
export const resetMessage = () => {
    return dispatch =>{
        dispatch({
            type : type.RESET_MESSAGE
        })
    }
}

export const resetErrorSign = () => {
    return dispatch => {
        dispatch({
            type : type.RESET_ERROR_SIGNIN
        })
    }
}

//////////////////////////////////////////////////////////////////
// cart
// add to cart api
export const addToCart = (product) => {
    return async dispatch => {
        const res = await callApi('cart/add', 'POST', product);
        if(res.status === 200){
            dispatch({
                type : type.ADD_TO_CART,
                cart : res.data.cart
            })
        }
    }
}
//add cart localStrage
var checkExitsProductOnCartLocal = (productNew, cart) => {
    var check = -1;
    for (let i = 0; i < cart.length; i++) {
        if (lodash.isEqual(productNew.product, cart[i].product) && lodash.isEqual(productNew.color, cart[i].color) && lodash.isEqual(productNew.size, cart[i].size)) {
            check = i;
        }
    }
    return check;
}

export const addToCartLocal = (product) => {
    return dispatch => {
            var cartData = JSON.parse(localStorage.getItem('cart'));
            var cart = cartData ? cartData : [];
            if(cart){
                const index = checkExitsProductOnCartLocal(product, cart);
                if(index !== -1){
                    cart[index].quantity = cart[index].quantity + product.quantity
                }else{
                    cart.push(product)
                };
            }else{
                cart.push(product)
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            dispatch({
                type : type.ADD_TO_CART_LOCAL,
                cart
            })
        }
}


// get cart
export const fetchGetCart = () => {
    return async dispatch => {
        const res = await callApi('cart/getCart', 'GET', null);
        if(res.status === 200){
            dispatch({
                type : type.FECTCH_GET_CART,
                cart : res.data.cart
            })
        }
    }
    
}

//get Districts
export const getDistricts = () => {
    return async dispatch => {
        const res = await apiTransport('GetDistricts',"POST", {
            token:"TokenStaging"
        })
        console.log(res)
        dispatch({
            type : type.GET_DISTRICTS,
            districts : res.data.data
        })
    }
}
