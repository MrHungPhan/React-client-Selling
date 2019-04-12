import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CartPage from '../pages/CartPage';

class CartPageContainer extends Component {
    render() {
        var { match } = this.props
        return (
            <CartPage 
            match = {match}
            />
        );
    }
}

CartPageContainer.propTypes = {

};

export default CartPageContainer;