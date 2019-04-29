import React from 'react';
import lodash from 'lodash';

import HomePageContainer from './containers/HomePageContainer';
import CatalogPageContainer from './containers/CatalogPageContainer';
import ProductDetailtContainer from './containers/ProductDetailtContainer';
import CartPageContainer from './containers/CartPageContainer'
import UserProfileContainer from './containers/UserProfileContainer'
import CartCheckoutContainer from './containers/CartCheckoutContainer'

function isNameProduct(name){
    var nameArr = name.split('-');
    var id = parseInt(nameArr[nameArr.length-1]);
    if(lodash.isNaN(id))
        return false;
    return true
}

const routes = [
    {
        path : '/',
        exact : true,
        main : () => <HomePageContainer/>
    },
    {
        path : '/cart',
        exact : true,
        main : ({match}) => <CartPageContainer match = {match}/>
    },
    {
        path : '/cart/checkout',
        exact : true,
        main : ({match}) => <CartCheckoutContainer match={match} />
    },
    {
        path : '/user-profile',
        exact : true,
        main : () => <UserProfileContainer />
    },
    {
        path : '/:name',
        exact : true,
        main : ({match, history}) =>{
            if(!isNameProduct(match.params.name))
                return <CatalogPageContainer match={match} />
            else
                return <ProductDetailtContainer match = {match} />
        } 
    },
    {
        path : '/:name/:product',
        exact : true,
        main : ({match}) =>{
            if(!isNameProduct(match.params.product))
                return <CatalogPageContainer match={match} />
            else
                return <ProductDetailtContainer match = {match} />
        } 
    },
    {
        path : '/:name/:childName/:product',
        exact : true,
        main : ({match}) =>{
                return <ProductDetailtContainer match = {match} />
        } 
    }
];





export default routes;