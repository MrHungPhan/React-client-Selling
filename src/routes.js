import React from 'react';
import lodash from 'lodash';

import HomePageContainer from './conatiners/HomePageContainer';
import CatalogPageContainer from './conatiners/CatalogPageContainer';
import ProductDetailtContainer from './conatiners/ProductDetailtContainer';
import OauthContainer from './conatiners/OauthContainer';

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
        path : '/login',
        exact : true,
        main : ({ history }) => <OauthContainer history = {history} />
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