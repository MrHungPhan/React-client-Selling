import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, TabContent, Nav, NavItem, NavLink, TabPane } from 'reactstrap';
import './pt.css'
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import ProductDetailt from '../../components/ProductsDetailtPage/ProductDetailt';

const arrStar = [
    { value : 1, class : 'far fa-star'},
    {value : 0.5, class : 'fas fa-star-half-alt'},
     { value : 0, class: 'fas fa-star'} 
]

class ProductDetailtPage extends PureComponent {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
    }

    componentWillReceiveProps(nextProps){
        const { product } = nextProps;
        if(product.length !==0 )
            document.getElementById('tab-description').innerHTML = product[0].description
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    addToCart = (product) => {
        this.props.addToCart(product)
    }

    showStar = () =>{
        var resuilt = [];
        for(let i = 0; i < 5; i ++){
            resuilt.push(
                <i class="far fa-star"></i>
            )
        }

        return resuilt;
    }

    render() {
        var { product } = this.props
        console.log(product)
        return (
            <div>
                <Container>
                   <ProductDetailt addToCart={this.addToCart} product ={product}/>
                    <div className="product-text">
                        <Row>
                           <Col xs ="12">
                                <Nav tabs>
                                    <NavItem>
                                        <div
                                            className={classnames("item-tab",{ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle('1'); }}
                                        >
                                            Mô tả
                                      </div>
                                    </NavItem>
                                    <NavItem>
                                        <div
                                            className={classnames("item-tab",{ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                        >
                                            Đánh giá
                                  </div>
                                    </NavItem>
                                   
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane id='tab-description' tabId="1">        
                                        
                                    </TabPane>
                                    <TabPane id='tab-rate' tabId="2"> 
                                    <div className="rate-star">
                                        <div className='rate-count'>
                                             {
                                                (product.length > 0 && product[0].rating === 0) && <div>
                                                    <h4>Đánh giá sản phẩm</h4>
                                                    {
                                                        this.showStar()
                                                    }
                                                    <div className='star-count'>(0 đánh giá)</div>
                                                </div>
                                                } 
                                        </div>
                                         <div className='rate-button'>
                                            <button>Viết đánh giá</button>
                                        </div>
                                    </div>
                                    <div className='rate-cmt'>

                                    </div>
                                    </TabPane>
                                  
                                </TabContent>
                                </Col>
                        </Row>
                    </div>
                </Container>
            </div>
                );
            }
        }
        
ProductDetailtPage.propTypes = {

                };
                
export default ProductDetailtPage;