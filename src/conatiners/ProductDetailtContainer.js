import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash';

import * as actions from '../actions/ActionTypes';
import ProductDetailtPage from '../pages/ProductDetailtPage'

class ProductDetailtContainer extends Component {
    getIdFromUrl = (url) => {
        var urlArr = url.split('-');
        var id = parseInt(urlArr[urlArr.length -1]);
        return id;
    }
    componentWillMount(){
        var { match } = this.props;
        var id = null;
        if(match.params.product){
            id = this.getIdFromUrl(match.params.product);
        }else{
            id = this.getIdFromUrl(match.params.name)
        }
        this.props.fetchProductDetailt(id);
    }

    shouldComponentUpdate(nextProps, nextState){
        if(lodash.isEqual(nextProps, this.props) && lodash.isEqual(nextState, this.state)){
            return false
        }
        return true
    }

    render() {
        var { product } = this.props;
        return (
            <ProductDetailtPage
            product = {product}
            />

        );
    }
}

ProductDetailtContainer.propTypes = {

};

const mapStateToProps = (state) => {
    return {
        product : state.productDetailt
    }
}

const mapDispatchToProps = (dispatch , props) => {
    return{
        fetchProductDetailt : (id) => {
            dispatch(actions.fetchProductDetailt(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailtContainer);