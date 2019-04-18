import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/ActionTypes';
import { Cookies } from 'react-cookie';

import CartPage from '../pages/CartPage';

const cookie = new Cookies();

class CartPageContainer extends Component {
    componentDidMount(){
        const token = cookie.get('token')
        if(token){
             this.props.fectchGetCart()
        }
    }

    render() {
        var { match, cart } = this.props
        return (
            <CartPage 
            match = {match}
            cart = {cart}
            />
        );
    }
}

CartPageContainer.propTypes = {

};

const mapStateToProps = (state) => {
    return {
        cart : state.cart
    }
}

const mapDispatchToProps = (dispatch, props) =>{
    return{
        fectchGetCart  : () => {
            dispatch(actions.fetchGetCart())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPageContainer);