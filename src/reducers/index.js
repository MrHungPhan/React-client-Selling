import { combineReducers } from 'redux';

import productsHomePage from './productsHomePage';
import menus from './menu';
import productsCatalogPage from './productsCatalogPage';
import productDetailt from './productDetailt'
import {reducer as formReducerOauth } from 'redux-form';
import oauth from './oauth';
import userProfile from './userProfile';
import cart from './cart'
import info from './info';
import searchData from './search'
import orders from './order'


var myReducers = combineReducers({
   productsHomePage,
   menus,
   productsCatalogPage,
   productDetailt,
   form : formReducerOauth,
   oauth : oauth,
   userProfile : userProfile,
   cart,
   info,
   searchData,
   orders
})

export default myReducers;