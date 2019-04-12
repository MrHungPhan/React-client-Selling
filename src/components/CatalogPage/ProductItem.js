import React, { Component } from 'react';
import classnames from 'classnames';
import { Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Spring, config } from 'react-spring/renderprops';
import './layout.css'

import change_alias from '../../utils/convertLink'

class ProductItem extends Component {
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
        var { product, index, match } = this.props
        
        return (
            <div className="col-md-5th-1 col-sm-3">
               
                        <Link className='link-pro-item'
                            to={`${match.url}/${change_alias(product.name)}-${product.id}`} 
                            onMouseOver ={this.isShowClick} 
                            onMouseLeave= {this.isOffClick}
                            >
                            <div   className= {classnames("pro-item", {'hover-cart' : this.state.isShowClick})}>
                                 <div className="pro-image image-cata">
                                    <img src={product.image} alt="" />
                        
                                </div>
                                <div className="pro-info">
                                    <div className="pro-name">
                                        {product.name}
                                    </div>
                                    <div className="pro-price">
                                       { product.price }$
                                     </div>
                                </div>
                            </div>

                        </Link>
                        <ul onMouseOver ={this.isShowClick}
                             onMouseLeave= {this.isOffClick}
                              className={classnames('pro-click', {'active' : this.state.isShowClick})}>
                            <li onClick={this.toggle} 
                            className="click-item q-view"
                            >
                                <i className="far fa-eye"></i>
                            </li>
                            <li className="click-item q-favi">
                                <i class="fas fa-heart"></i>
                            </li>
                        </ul>
                 
            </div>


        );
    }
}

export default ProductItem;
