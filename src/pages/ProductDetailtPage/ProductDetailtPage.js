import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, TabContent, Nav, NavItem, NavLink, TabPane } from 'reactstrap';
import './pt.css'
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import ProductDetailt from '../../components/ProductsDetailtPage/ProductDetailt';

class ProductDetailtPage extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1'
        };
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

    render() {
        var { product } = this.props
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
                                            Mo ta
                                      </div>
                                    </NavItem>
                                    <NavItem>
                                        <div
                                            className={classnames("item-tab",{ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                        >
                                            Danh gia
                                  </div>
                                    </NavItem>
                                    <NavItem>
                                        <div
                                            className={classnames("item-tab",{ active: this.state.activeTab === '3' })}
                                            onClick={() => { this.toggle('3'); }}
                                        >
                                            Dat cau hoi cho san pham  
                                  </div>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">        
                                                1            
                                    </TabPane>
                                    <TabPane tabId="2"> 
                                                2      
                                    </TabPane>
                                    <TabPane tabId="3">
                                   
                                   3
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