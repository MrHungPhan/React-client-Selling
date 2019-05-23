import React, { Component } from 'react';
import { Row, Col} from 'reactstrap';
import {Link, Redirect} from 'react-router-dom'
import './checkoutSuccess.css'
import { connect } from 'react-redux';
import * as actions from '../../actions/ActionTypes'

class CheckoutSuccess extends Component {
    componentDidMount() {
        console.log(this.props.match)
        if (this.props.match.path === '/checkout/success/:orderId') {
            document.body.classList.add('selling-cart');
        }
    }

    componentWillUnmount(){
        this.props.reStoreInfo()
    }

    render() { 
        const { user, info } = this.props
        const { order, time, total } = info
        if(!order){
            return <Redirect to='/' />
        }   
        return <div id="checkout-success">
            <div className="out-s-title">
                <div className="icon-success">
                     <i className="fas fa-check-circle"></i>
                </div>
                <h5>Đặt hàng thành công</h5>
            </div>
            <div className="out-s-content">
                <div className="o-s-name">
                    <h6>Chào <span>{user.display_name}</span></h6>
                    <div> Chúc mừng bạn đã đặt hàng thành công !!!</div>
                    <p>Hãy xác nhận đơn hàng trong Email của bạn để được giao hàng cho đơn vị vận chuyển</p>
                </div>
                <div className="o-s-order">
                    <Row>
                        <Col md="4">
                            <p>Mã đơn hàng:</p>
                            <p>Phương thức thanh toán:</p>
                            <p>Thời gian dự kiến giao hàng:</p>
                            <p>Tổng thanh toán:</p>
                            <p>Tình trạng</p>
                        </Col>
                        <Col md="8">
                            <p className="order-i-content">{order.id}</p>
                            <p className="order-i-content">Thanh toán khi nhận hàng</p>
                            <p className="order-i-content">{time}</p>
                            <p className="order-i-content o-i-item">{total}</p>
                            <p className="order-i-content o-i-item">Chưa thanh toán</p>
                        </Col>
                    </Row>
                </div>
                <div className='o-s-footer'>
                    <div>
                        <Link to='/'>Tiếp tục mua sắm</Link>
                    </div>
                    <div>
                         <Link to ='/order/history'>Chi tiết đơn hàng</Link>
                    </div>
                </div>
            </div>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        user : state.userProfile,
        info : state.info
    }
}

const mapDispatchToProps = ( dispatch, props ) =>{
    return {
        reStoreInfo : () => {
            dispatch(actions.reStoreInfo())
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutSuccess);