import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cookies } from "react-cookie";
import { NavLink } from 'react-router-dom' /// NavItem ==== li

var cookie = new Cookies()

class MenuCart extends Component {
   
    render() {
        const token = cookie.get('token');
        if(token)
            var { cart } = this.props
         var cart = JSON.parse(localStorage.getItem('cart'));
        return (   
                <NavLink to = '/cart' className= "cart-menu">
                    <i className ="fas fa-shopping-cart"></i> 
                    {
                        cart ? <span className="cart-length">{cart.length}</span> : ''
                    }
                </NavLink>
        );
    }
}

MenuCart.propTypes = {

};

export default MenuCart;