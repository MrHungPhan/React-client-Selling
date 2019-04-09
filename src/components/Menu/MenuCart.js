import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom' /// NavItem ==== li

class MenuCart extends Component {
    render() {
        return (   
                <NavLink to = '/cart' className= "cart-menu">
                    <i className ="fas fa-shopping-cart"></i> 
                </NavLink>
        );
    }
}

MenuCart.propTypes = {

};

export default MenuCart;