import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import {connect} from 'react-redux';
import * as actions from '../actions/ActionTypes';

import HomePage from '../pages/HomePage';
import SessionProducts from '../components/Home/SessionProducts';
import ProductItem from '../components/Home/ProductItem';
import QuickViewProduct from '../components/QuickViewProduct';
import QuickViewProduct2 from '../components/QuickViewProduct2';

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
    }

    render() {      
        var { productsHome, productDetailt } = this.props;
        var { modal } = this.state;

        return (
            <HomePage> 
                {/* Get Session Products from Reducers */}
                {this.showSessionProducts(productsHome)}
                <QuickViewProduct2 
                product = {productDetailt}
                modal = {modal}
                toggle = {this.toggle}
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
                 <SessionProducts id={key} key={key}>
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
      productDetailt : state.productDetailt
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchProductsHome : () => {

            dispatch(actions.fetchProductsHomePage())
        },

        fetchProductDetailt : (id) => {
            dispatch(actions.fetchProductDetailt(id));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);