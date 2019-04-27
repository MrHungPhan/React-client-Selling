import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Row, Container, Col } from 'reactstrap';
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import formatMoney from '../../utils/formatMoney';

import './CartPage.css';
import CartItem from '../../components/CartPage/CartItem'


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
        return formatMoney(total)
    }

    render() {
        const { oauth } = this.props
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
                                Giỏ hàng <span>({ cart ? cart.length : 0} sản phẩm)</span>
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
                                        Tạm tính
                                        <span>{ cart ? this.totalCart(cart) : 0 }</span>
                                    </div>
                                    <div className='pa-content'>
                                        Thành tiền
                                        <span className='pa-done-money'>{ cart ? this.totalCart(cart) : 0 }</span>
                                    </div>

                                </div>
                                <Link to='/cart/checkout'
                                    disable={true}
                                 className={classnames('btn btn-danger cart-check-out',
                                  {'point-disable': !token || cart.length === 0})}>
                                 {!token ? "Đăng nhập để thanh toán" : "Tiến hành thanh toán"}
                                 </Link>
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