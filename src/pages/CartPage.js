import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../components/CartPage/CartPage.css';
import CartItem from '../components/CartPage/CartItem'
import { Row, Container, Col } from 'reactstrap';
import { Cookies } from 'react-cookie';

var cookie = new Cookies();

class CartPage extends Component {
    componentDidMount() {
        console.log(this.props.match)
        if (this.props.match.path === '/cart') {
            document.body.classList.add('selling-cart');
        }
    }

    showCart = (cart) => {
        return cart.map((product, index) => {
            return <CartItem 
                key = {index}
                product ={product}
            />
        })
    }

    totalCart = (cart) => {
        var total = 0;
        for(let item of cart){
            total += item.product.price * item.quantity
        }
        return total
    }

    render() {
        const token = cookie.get('token');
        if(!token){
            var cart = JSON.parse(localStorage.getItem('cart'))
        }else{
            var { cart } = this.props
        }
        console.log(cart);
        return (
            <div id="main-cart">
                <Container>
                    <Row>
                        <Col xs="12">
                            <div className="cart-title-quantity">
                                Gio hang <span>({ cart ? cart.length : 0} san pham)</span>
                            </div>
                        </Col>
                        <Col md="9">
                            <div className='cart-list'>
                               {
                                   cart && this.showCart(cart)
                               }
                               {
                                   !cart && <div className ="empty-cart">Gio hang trong</div>
                               }
                            </div>
                        </Col>
                        <Col md="3">
                            <div className="cart-order">
                                <div className='cart-pay'>
                                    <div className='pa-content'>
                                        Tam tinh
                                        <span>{ cart ? this.totalCart(cart) : 0 } d</span>
                                    </div>
                                    <div className='pa-content'>
                                        Thanh tien
                                        <span className='pa-done-money'>{ cart ? this.totalCart(cart) : 0 } d</span>
                                    </div>

                                </div>
                                <button className='cart-check-out'>Tien hanh thanh toan</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

CartPage.propTypes = {

};

export default CartPage;