import React, { PureComponent } from 'react';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import classnames from 'classnames';

import change_alias from '../../utils/convertLink';
import formatMoney from '../../utils/formatMoney'


class ProductItem extends PureComponent {
  constructor(props){
          super(props)

        this.state = {
            isShowClick : false
        }
    }

    isShowClick = () => {
        this.setState({
            isShowClick: true
        })
    }

    isOffClick = () => {
        this.setState({
            isShowClick : false
        })
    }

    toggle = () => {
        this.props.fetchProductDetailt(this.props.product.id);
        this.props.toggle();
    }

    render() {
        var { product } = this.props
        var to = change_alias(product.name) + '-' + product.id
        return (
            <Col sm="3">
            
                        <Link onMouseOver ={this.isShowClick} 
                                onMouseLeave= {this.isOffClick} 
                                to={`/${to}`} 
                                className="link-pro-item" >
                            <div  className= {classnames("pro-item", {'hover-cart' : this.state.isShowClick})}>
                                <div className="pro-image">
                                    <img src={product.image} alt="" />

                                </div>
                                <div className="pro-info">
                                    <div className="pro-name">
                                        {product.name}
                                    </div>
                                    <div className="pro-price">
                                        {formatMoney(product.price)}
                                     </div>
                                </div>
                            </div>

                        </Link>
                        <ul onMouseOver ={this.isShowClick} 
                        onMouseLeave= {this.isOffClick} 
                        className={classnames('pro-click', {'active' : this.state.isShowClick})}>
                            <li 
                            onClick={this.toggle} 
                            className="click-item q-view">
                                <i className="far fa-eye"></i>
                            </li>
                            <li className="click-item q-favi">
                                <i class="fas fa-heart"></i>
                            </li>
                        </ul>

            </Col>


        );
    }
}

export default ProductItem;
