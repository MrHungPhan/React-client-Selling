import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash';
import { Cookies } from 'react-cookie'

import * as actions from '../actions/ActionTypes';
import CatalogPage from '../pages/CatalogPage/CatalogPage';
import ProductItem from '../components/CatalogPage/ProductItem';
import QuickViewProduct2 from '../components/QuickViewProduct2';

const cookie = new Cookies();

class CatalogPageContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
          modal: false,

          page : 1,
          hasMore : true
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

    loadMore = async () => {
        await this.setState({
            page: this.state.page + 1
        })      
        document.body.classList.remove('selling-cart');
        var { match } = this.props;
        var { page } = this.state;
        if(lodash.size(match.params) === 2){
            this.props.fetchProductsCatalogChild(match, page)
        }else{
             this.props.fetchProductsCatalog(match, page);
        }
    }

    componentWillMount(){
        document.body.classList.remove('selling-cart');
        var { match } = this.props;
        var { page } = this.state;
        if(lodash.size(match.params) === 2){
            this.props.fetchProductsCatalogChild(match, page)
        }else{
             this.props.fetchProductsCatalog(match, page);
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.productsCatalog.pageTotal){
            console.log(nextProps.productsCatalog.pageTotal,this.state.page )
           if(nextProps.productsCatalog.pageTotal === this.state.page){
               this.setState({
                   hasMore: false
               })
           } 
        }

        // if(nextProps.match.params.name !== this.props.match.params.name){
        //     debugger
        //     this.props.fetchProductsCatalog(nextProps.match);
        // }
        // if(nextProps.match.params.product !== this.props.match.params.product){
        //     this.props.fetchProductsCatalogChild(nextProps.match);
        // }
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
        var { sortBy, sortValue, filterPrice } = values;
        var { match } = this.props;
        var { page } = this.state;  
        var path = `${match.url}?page=${page}&${sortBy ? `sortBy=${sortBy}` : ''}${sortValue ? `&sortValue=${sortValue}` : ''}${filterPrice ? `&filterPrice=${filterPrice}` : ''}`;
        console.log(path);
        this.props.filterProducts(path)
    }
    
    render() {
        var { productsCatalog, productDetailt } = this.props
        console.log(productsCatalog)
        var { modal, hasMore } = this.state;
        return (
            <CatalogPage
              filterProducts={this.filterProducts}
                slider={productsCatalog.slider ? productsCatalog.slider : ''}
                path = {productsCatalog.path}

                loadMore={this.loadMore}
                hasMore={hasMore}
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
        fetchProductsCatalog : (match, page) => {
    
            dispatch(actions.fetchProductsCatalogPage(match, page))
        },
        fetchProductsCatalogChild : (match, page) => {
    
            dispatch(actions.fetchProductsCatalogChildPage(match, page))
        },
        fetchProductDetailt : (id) => {
            dispatch(actions.fetchProductDetailt(id));
        },

        addToCart : (product) => {
            dispatch(actions.addToCart(product))
        },
        addToCartLocal : (product) => {
            dispatch(actions.addToCartLocal(product))
        },

        filterProducts : (path) => {
            dispatch(actions.filterProducts(path))
        }

    }
}

export default connect(mapStateToProps, mapDistchToProps, null, {
    pure : true
})(CatalogPageContainer);