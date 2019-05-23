import { Cookies } from 'react-cookie'
import lodash from 'lodash';
import 'dotenv';
import { types } from 'util';
import { func } from 'prop-types';

import * as type from '../const/index';
import callApi from '../utils/apiCaller';
import apiTransport from '../utils/apitTransport';
import socket from '../utils/socket';


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
        if(res.status == 200){
            dispatch(onStoreProductsCatalog(res.data))
        }    
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

export const filterProducts = (path) => {
    return async dispatch => {
        const res = await callApi(`catapage${path}`, 'GET');
        dispatch(onStoreProductsCatalog(res.data))
    }
}


///////////////////////// PRODUCT DEATILT /////////////////////////////////////

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
    const cart = JSON.parse(localStorage.getItem('cart'));
    if(cart) data.cart = cart;
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
    const data = {
        access_token: accessToken
    }
    const cart = JSON.parse(localStorage.getItem('cart'));
    if(cart) data.cart = cart
    return async dispatch => {
        try{
            const res = await callApi('user/oauth/google', 'POST', data );
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
        localStorage.removeItem('cart');
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

//////////////////// CART ////////////////////////////////////////

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

//delete cart item
export const deleteCart = (productItem) => {
    return async dispatch=>{
        const res = await callApi('cart/deleteItem', 'POST', productItem);
        if(res.status===200){
            dispatch({
                type :type.DELETE_CART,
                cart : res.data.cart
            })
        }
    }
}

//update cart item
export const updateCart = (data) => {
    return async dispatch=>{
        const res = await callApi('cart/updateItem', 'POST', data);
        if(res.status===200){
            dispatch({
                type :type.UPDATE_CART,
                cart : res.data.cart
            })
        }
    }
}

////////////////// CART LOCAL /////////////////////////////

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

export const deleteCartLocal = (productItem) => {
    return dispatch => {
        var cart = JSON.parse(localStorage.getItem('cart'));
        if(cart){
            lodash.remove(cart, function(item){
               return lodash.isEqual(item, productItem);
            })
            if(cart.length === 0){
                localStorage.removeItem('cart');
            }else{
                localStorage.setItem('cart', JSON.stringify(cart));
            } 
            dispatch({
                type: type.DELETE_CART_LOCAL,
                cart
            })
        }
       
    }
}

export const updateCartLocal = (data) => {
    return dispatch => {
        const { productItem, quantity } = data;
        var cart = JSON.parse(localStorage.getItem('cart'));
        if(cart){
            const index = checkExitsProductOnCartLocal(productItem, cart);
            cart[index].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));

            dispatch({
                type : type.UPDATE_CART_LOCAL,
                cart
            })
        }
    }
}

/////////////////////// CHECKOUT ORDER //////////////////////////////
//get info Order
export const getDistricts = () => {
    return async dispatch => {
        const res = await callApi('order/getDistricts',"GET")
      if(res.status === 200){
          dispatch({
            type : type.GET_DISTRICTS,
            districts : res.data
        })
      }
        
    }
}

export const getWards = (districtId) =>{
    return async dispatch=>{
        const res = await callApi('order/getWards', 'POST', {
            districtId : parseInt(districtId)
        })

        if(res.status === 200){
            dispatch({
                type : type.GET_WARDS,
                wards :res.data.Wards
            })
        }
    }
}

export const getServices = (toDistrictId) => {
    return async dispatch => {
        const res = await callApi('order/getServices', 'POST', {
            toDistrictId : parseInt(toDistrictId)
        })
        console.log(res)
        if(res.status === 200){
            dispatch({
                type : type.GET_SERVICES,
                services : res.data
            })
        }
    }
}

export const checkoutOrder = (values) =>{
    return async dispatch =>{
        const res = await callApi('order/checkoutOrder', 'POST', values);
        if(res.status === 200){
            console.log(res)
            dispatch({
                type : type.CHECKOUT_SUCCESS,
                order : res.data
            })
        }
    }
}

export const storeInfo = (total, time) => {
    return {
        type: type.STORE_INFO,
        data : {
            total,
            time
        }
    }
}

export const reStoreInfo = () => {
    return {
        type : type.RESTORE_INFO
    }
}

///////////////////// SEARCH ////////////////////////////////
export const searchProducts = (key) => {
    return async dispatch => {
        const res = await callApi('search?key='+key, 'GET');
        console.log(res);
        if(res.status === 200){
              dispatch({
            type: type.SEARCH_KEY,
            data : res.data
        })
        }
      
    }
}

export const filterSearchProducts = (path) => {
    return async dispatch => {
        const res = await callApi(path, 'GET');
        if(res.status === 200){
            dispatch({
                type : type.FILTER_SEARCH_PRODUCT,
                data : res.data
            })
        }
    }
}


//////////////////////// Order ////////////////////////////
export const getOrderHistory = () => {
    return async dispatch => {
        const res = await callApi('order/getOrderHistory', 'GET');
        console.log(res)
        if(res.status === 200){
            dispatch({
                type : type.GET_ORDER_HISTORY,
                orders : res.data
            })
        }
    }
}

   ////////////////////////////// get user online ////////////////////////
   export const getUserOnline = () => {
    return async dispatch => {
        socket.on('count-users', data => {
           dispatch({
                type: type.COUNT_USER_ONLINE,
                count :data
           })
       })
    }
}