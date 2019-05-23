import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap'
import lodash from 'lodash'
import formatMoney from '../../utils/formatMoney';
import to_slug from '../../utils/convertLink';
import { Link } from 'react-router-dom'

class CartItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            quantity : 0
        }
    }

    componentDidMount(){
        this.setState({
            quantity : this.props.product.quantity
        })
    }

    onMinus = async (product) => {
        if(this.state.quantity > 1){
            await this.setState({
            quantity : this.state.quantity - 1
             })
        }
        this.props.updateCart({
            productItem : product,
            quantity: this.state.quantity
        });
    }

    onPlus = async (product) => {
        if(this.state.quantity < 10){
             await  this.setState({
            quantity : this.state.quantity + 1
        })
        }
        this.props.updateCart({
            productItem : product,
            quantity: this.state.quantity
        });
    }

    onChange = () => {

    }

    deteleCart = (product) => {
        this.props.deteleCart(product)
    }

    render() {
        var { product } = this.props
        var productInfo = product.product;
        var color = product.color;
        var size = product.size
        const to = to_slug(productInfo.name)+'-'+productInfo.id
        return (
                <div className="c-list-item">
                    <Row>
                        <Col md='2' className="c-img">
                            <img src={productInfo.image} />
                        </Col>
                        <Col md='10' className="c-info">
                            <div className="c-info-name">
                               <Link to={to}>{productInfo.name}</Link>
                    </div>
                            <div className='c-info-style'>
                                <div className='c-style c-color'>
                                   {
                                       !lodash.isEqual(color, {}) ? <img src={color.src_image} /> : ''
                                   } 
                                </div>
                                <div className='c-style c-size'>
                                {
                                     size && !lodash.isEqual(size, {}) ? <span>{size.name}</span> : ''
                                }
                                    
                                </div>
                                <div className='c-style c-price'>
                                   {formatMoney(productInfo.price)}
                             </div>
                                <div className='c-style c-quantity'>
                                    <button 
                                    onClick={() => this.onPlus(product)}
                                    className='c-btn c-plus'>+</button>
                                    <input type="number" 
                                        name='c-quantity'
                                        onChange={this.onChange}
                                        value={this.state.quantity} />
                                    <button 
                                        onClick={() => this.onMinus(product)}
                                        className='c-btn c-minus'>-</button>
                                </div>
                                <div className="c-style c-delete-item">
                                    <span><i onClick={() => this.deteleCart(product)} 
                                    className="far fa-trash-alt"></i></span>
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