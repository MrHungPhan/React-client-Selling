import { Cookies } from 'react-cookie'

import * as type from '../const/index';
import callApi from '../utils/apiCaller';
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
            dispatch(onStoreToken(res.data.token))
            localStorage.setItem('token', res.data.token)
        } catch (error) {
            dispatch({
                type: type.OAUTH_ERROR,
                error: "Email da ton tai"
            })
        }
    }
}

export const onStoreToken = (token) => {
    return {
        type: type.OAUTH_SIGN_UP,
        token
    }
}


// Sign in Account
export const signIn = (data) => {
    return async dispatch => {
        try {
            const res = await callApi('user/signIn', 'POST', data);
            if (res.status === 200) {

                 //  localStorage.setItem('token', res.data.token)
                 cookie.set('token', res.data.token, {
                    maxAge: 60 * 60 * 60 * 24 * 5
                });

                dispatch({
                    type: type.OAUTH_SIGN_IN,
                    token: res.data.token
                })

            }
        } catch (error) {
            dispatch({
                type: type.OAUTH_ERROR,
                error: "Ten dang nhap hoac mat khau khong chinh xac"
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
        console.log(res)
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