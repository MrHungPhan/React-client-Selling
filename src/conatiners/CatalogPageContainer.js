import React, {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import lodash from 'lodash';

import * as actions from '../actions/ActionTypes';
import CatalogPage from '../pages/CatalogPage';
import ProductItem from '../components/CatalogPage/ProductItem';
import QuickViewProduct from '../components/QuickViewProduct';

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

    render() {
        var { products, productDetailt } = this.props
        var { modal } = this.state;
        return (
            <CatalogPage>
               { this.showProducts(products) }
               <QuickViewProduct 
                product = {productDetailt}
                modal = {modal}
                toggle = {this.toggle}
                />
            </CatalogPage>
        );
    }

    showProducts = (products) => {
        var resuilt = [];
        var { match } = this.props;
        console.log(products)
        resuilt = products.map((item, index) => {
            return <ProductItem
                    fetchProductDetailt = {this.fetchProductDetailt}
                    toggle = {this.toggle}
                    key = {index}
                    product = {item}
                    match = {match}
                    />
        })

        return resuilt;
    }
}

CatalogPageContainer.propTypes = {

};

const mapStateToProps = (state) => {
    return{
        products : state.productsCatalogPage,
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
        }
    }
}

export default connect(mapStateToProps, mapDistchToProps, null, {
    pure : true
})(CatalogPageContainer);