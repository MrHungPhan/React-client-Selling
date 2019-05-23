import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/ActionTypes';
import { Cookies } from 'react-cookie';

import CartPage from '../pages/CartPage/CartPage';

const cookie = new Cookies();

class CartPageContainer extends PureComponent {
    componentDidMount(){
        const token = cookie.get('token')
        if(token){
             this.props.fectchGetCart()
        }
    }

    deteleCart = (product) => {
        const token = cookie.get('token')
        if(token){
            this.props.deleteCart(product)
        }else{
            this.props.deleteCartLocal(product)
        }
        
    }

    updateCart = (data) => {
        const token = cookie.get('token')   
        if(token){
           this.props.updateCart(data)
        }else{
            this.props.updateCartLocal(data)
        }
        
    }

    render() {
        var { match, cart, oauth } = this.props
        return (
            <CartPage 
                oauth={oauth}
                match = {match}
                cart = {cart}

                updateCart={this.updateCart}
                deteleCart={this.deteleCart}
            />
        );
    }
}

CartPageContainer.propTypes = {

};

const mapStateToProps = (state) => {
    return {
        cart : state.cart,
        oauth : state.oauth
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return{
        fectchGetCart  : () => {
            dispatch(actions.fetchGetCart())
        },

        deleteCartLocal : (product) => {
            dispatch(actions.deleteCartLocal(product))
        },

        updateCartLocal : (data) => {
            dispatch(actions.updateCartLocal(data))
        },

        deleteCart : (product) => {
            dispatch(actions.deleteCart(product))
        },

        updateCart : (data) => {
            dispatch(actions.updateCart(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPageContainer);