import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import {connect} from 'react-redux';
import * as actions from '../actions/ActionTypes';
import { Cookies } from 'react-cookie';

import HomePage from '../pages/HomePage/HomePage';
import SessionProducts from '../components/Home/SessionProducts';
import ProductItem from '../components/Home/ProductItem';
import QuickViewProduct from '../components/QuickViewProduct';
import QuickViewProduct2 from '../components/QuickViewProduct2';
import socket from '../utils/socket';

const cookie = new Cookies()

class HomePageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: false
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }


    fetchProductDetailt = (id) => {
        this.props.fetchProductDetailt(id)
    }


    componentDidMount(){
        document.body.classList.remove('selling-cart');
        this.props.fetchProductsHome();
        this.props.getUserOnline();
    }

    addToCart = (product) =>{
        const token = cookie.get('token');
        if(token){
            this.props.addToCart(product);
        }else{
            this.props.addToCartLocal(product)
        }
        
    }

    render() {      
        var { productsHome, productDetailt, oauth } = this.props;
        var { modal } = this.state;
        return (
            <HomePage
                countUsers={oauth.countUsers}
            > 
                {/* Get Session Products from Reducers */}
                {this.showSessionProducts(productsHome)}
                <QuickViewProduct2 
                product = {productDetailt}
                modal = {modal}
                toggle = {this.toggle}
                addToCart={this.addToCart}
                />
            </HomePage>
        );
    }



    shouldComponentUpdate(nextProps, nextState){
        if(lodash.isEqual(nextProps, this.props) && lodash.isEqual(nextState, this.state)){
            return false
        }

        return true
    }


    showSessionProducts = (productsHome) => {

        var resuilt = [];
        for(var key in productsHome){
             resuilt = resuilt.concat(
                 <SessionProducts 
                 id={key} key={key}
                 >
                     {
                         productsHome[key].map((product, index) => {
                             return <ProductItem 
                                fetchProductDetailt = {this.fetchProductDetailt}
                                toggle = {this.toggle}
                                key ={index}
                                index = {index}
                                product={product}
                             />
                         })
                     }
                 </SessionProducts>
             )
        }
     
         return resuilt;
    }
}

HomePageContainer.propTypes = {

};

const mapStateToProps = (state) => {
    return {
      productsHome : state.productsHomePage,
      productDetailt : state.productDetailt,
      oauth : state.oauth
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchProductsHome : () => {

            dispatch(actions.fetchProductsHomePage())
        },

        fetchProductDetailt : (id) => {
            dispatch(actions.fetchProductDetailt(id));
        },

        addToCart : (product) => {
            dispatch(actions.addToCart(product));
        },
        addToCartLocal : (product) => {
            dispatch(actions.addToCartLocal(product))
        },

        getUserOnline : () => {
            dispatch(actions.getUserOnline())
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);