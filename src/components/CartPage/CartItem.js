import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap'
import lodash from 'lodash'

class CartItem extends Component {

    onChange = () => {

    }

    render() {
        var { product } = this.props
        var productInfo = product.product;
        var color = product.color;
        var size = product.size
        return (
                <div className="c-list-item">
                    <Row>
                        <Col md='2' className="c-img">
                            <img src={productInfo.image} />
                        </Col>
                        <Col md='10' className="c-info">
                            <div className="c-info-name">
                               {productInfo.name}
                    </div>
                            <div className='c-info-style'>
                                <div className='c-style c-color'>
                                   {
                                       !lodash.isEqual(color, {}) ? <img src={color.src_image} /> : ''
                                   } 
                                </div>
                                <div className='c-style c-size'>
                                {
                                      !lodash.isEqual(size, {}) ? <span>{size.name}</span> : ''
                                }
                                    
                                </div>
                                <div className='c-style c-price'>
                                   {productInfo.price}
                             </div>
                                <div className='c-style c-quantity'>
                                    <button className='c-btn c-plus'>+</button>
                                    <input type="number" 
                                    name='c-quantity'
                                     onChange={this.onChange}
                                    value={product.quantity} />
                                    <button className='c-btn c-minus'>-</button>
                                </div>
                                <div className="c-style c-delete-item">
                                    <span><i className="far fa-trash-alt"></i></span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>

                );
            }
        }
        
CartItem.propTypes = {

                };
                
export default CartItem;