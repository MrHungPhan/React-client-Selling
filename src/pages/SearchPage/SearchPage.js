import React, { PureComponent } from 'react';
import { Row, Container, Col } from 'reactstrap'

import Title from '../../components/CatalogPage/Title'
import ProductItem from '../../components/CatalogPage/ProductItem'
import QuickViewProduct from '../../components/QuickViewProduct2';
import empty from './empty.svg';
import './search.css'

class Search extends PureComponent {
    render() { 
        const { products,fetchProductDetailt,
            toggle, query,
            modal, product, addToCart,
            filterProducts
        } = this.props;
        console.log('search - ', products)
        return  <div> 
             <Container>
                    <Row>
                    <Col md="12">
                                <Title  
                                    pathFirst="tìm kiếm"
                                    path={`Từ khóa : ${query}`}
                                    filterProducts={filterProducts}
                                />
                            </Col>   
                    </Row>
                </Container>
            {
                products.length !== 0 && <div>
                <section id="products-cata">
                        <Container>
                            <Row>
                            
                            {
                                products.length !== 0 && products.map(product=> {
                                return <ProductItem
                                        fetchProductDetailt = {fetchProductDetailt}
                                        toggle = {toggle}
                                        key = {product.id}
                                        product = {product}
                                        match={{url : ''}}
                                    />
                                })
                            }
                        </Row>
                        </Container>
                    
                    </section>
                    <QuickViewProduct
                        product ={product}
                        modal = {modal}
                        toggle = {toggle}
                        addToCart = {addToCart}
                    />
                    </div>
            } 
            {
                products.length ===0 && <div className="empty-search">
                    <img src={empty} style={{width: "220px"}}/>
                    <div>Không tìm thấy kết quả</div>
                </div>
            }
        </div>   ;
    }
}

export default Search;