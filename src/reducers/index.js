import { combineReducers } from 'redux';

import productsHomePage from './productsHomePage';
import menus from './menu';
import productsCatalogPage from './productsCatalogPage';
import productDetailt from './productDetailt'
import {reducer as formReducerOauth } from 'redux-form';
import oauth from './oauth';
import userProfile from './userProfile';

var myReducers = combineReducers({
   productsHomePage,
   menus,
   productsCatalogPage,
   productDetailt,
   form : formReducerOauth,
   oauth : oauth,
   userProfile : userProfile
})

export default myReducers;