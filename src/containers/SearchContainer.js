import React, { PureComponent } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { Cookies } from 'react-cookie'
import * as actions from '../actions/ActionTypes'

import SearchPage from '../pages/SearchPage/SearchPage'

const cookie = new Cookies();

class SearchContainer extends PureComponent {
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
        }, () => console.log(this.state));
    }

    fetchProductDetailt = (id) => {
        this.props.fetchProductDetailt(id)
    }

    addToCart = (product) => {
        const token = cookie.get('token');
        if(token){
            this.props.addToCart(product);
        }else{
            this.props.addToCartLocal(product)
        }
    }

    filterProducts = (data) => {
        console.log(data);
        var { sortBy, sortValue, filterPrice } = data;
        var { match, location } = this.props;
        var path = `${location.pathname.replace('/', '')}${location.search}&${sortBy ? `sortBy=${sortBy}` : ''}${sortValue ? `&sortValue=${sortValue}` : ''}${filterPrice ? `&filterPrice=${filterPrice}` : ''}`;
        console.log(path);
        this.props.filterProducts(path)
    }
        
    componentDidMount(){
        document.body.classList.remove('selling-cart');
        const { match, location } = this.props;
        var query = queryString.parse(location.search);
        this.props.searchProducts(query.key)
    }
    render() { 
        var { modal } = this.state;
        const { data, productDetailt, location } = this.props
        var query = queryString.parse(location.search);
        return  <SearchPage
                query = {query.key}
                products ={data}
                fetchProductDetailt={this.fetchProductDetailt}
                toggle={this.toggle}   
                filterProducts={this.filterProducts}
                
                // quick view product
                product ={productDetailt}
                modal = {modal}
                addToCart = {this.addToCart}
            >   
        </SearchPage>;
    }
}

const mapStateToProps = state => {
    return {
        data : state.searchData,
        productDetailt : state.productDetailt
    }
}
 
const mapDispatchToProps = (dispatch, props) => {
    return{
        searchProducts : (key) => {
            dispatch(actions.searchProducts(key))
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
            dispatch(actions.filterSearchProducts(path))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);