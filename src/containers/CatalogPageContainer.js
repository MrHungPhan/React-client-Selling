import React, {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { Cookies } from 'react-cookie'

import * as actions from '../actions/ActionTypes';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import ProductItem from '../components/CatalogPage/ProductItem';
import QuickViewProduct2 from '../components/QuickViewProduct2';

const cookie = new Cookies();

class CatalogPageContainer extends Component {
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
        var { match } = this.props;
        if(lodash.size(match.params) === 2){
            this.props.fetchProductsCatalogChild(match)
        }else{
             this.props.fetchProductsCatalog(match);
        }
       
    }

    componentWillReceiveProps(nextProps){
        
        if(nextProps.match.params.name !== this.props.match.params.name){
    
            this.props.fetchProductsCatalog(nextProps.match);
        }
        if(nextProps.match.params.product !== this.props.match.params.product){
            this.props.fetchProductsCatalogChild(nextProps.match);
        }
    }

     shouldComponentUpdate(nextProps, nextState){
        if(lodash.isEqual(nextProps, this.props) && lodash.isEqual(nextState, this.state)){
            return false
        }

        return true
    }

    addToCart = (product) => {
        const token = cookie.get('token');
        if(token){
            this.props.addToCart(product);
        }else{
            this.props.addToCartLocal(product)
        }
    }

    filterProducts = (values) => {
        console.log(values);
        var { sortName, sortPrice, filterPrice } = values;
        var { match } = this.props;
        var path = `${match.url}?${sortName ? `sortName=${sortName}` : ''}
        
        &sortPrice=${sortPrice}&filterPrice=${filterPrice}`;
        console.log(path)
    }

    render() {
        var { productsCatalog, productDetailt } = this.props
        console.log(productsCatalog)
        var { modal } = this.state;
        return (
            <CatalogPage
              filterProducts={this.filterProducts}
                slider={productsCatalog.slider ? productsCatalog.slider : ''}
                path = {productsCatalog.path}
            >
               { this.showProducts(productsCatalog) }
               <QuickViewProduct2 
                product = {productDetailt}
                modal = {modal}
                toggle = {this.toggle}
                addToCart = {this.addToCart}
                />
            </CatalogPage>
        );
    }

    showProducts = (productsCatalog) => {
        var resuilt = [];
        var { match } = this.props;
        console.log(productsCatalog)
        var { products } = productsCatalog;
        if(products){
             resuilt = products.map((item, index) => {
            return <ProductItem
                    fetchProductDetailt = {this.fetchProductDetailt}
                    toggle = {this.toggle}
                    key = {index}
                    product = {item}
                    match = {match}
                    />
          })
        }
       

        return resuilt;
    }
}

CatalogPageContainer.propTypes = {

};

const mapStateToProps = (state) => {
    return{
        productsCatalog : state.productsCatalogPage,
        productDetailt : state.productDetailt
    }
}

const mapDistchToProps = (dispatch, props) => {
    return {
        fetchProductsCatalog : (match) => {
    
            dispatch(actions.fetchProductsCatalogPage(match))
        },
        fetchProductsCatalogChild : (match) => {
    
            dispatch(actions.fetchProductsCatalogChildPage(match))
        },
        fetchProductDetailt : (id) => {
            dispatch(actions.fetchProductDetailt(id));
        },

        addToCart : (product) => {
            dispatch(actions.addToCart(product))
        },
        addToCartLocal : (product) => {
            dispatch(actions.addToCartLocal(product))
        }
    }
}

export default connect(mapStateToProps, mapDistchToProps, null, {
    pure : true
})(CatalogPageContainer);