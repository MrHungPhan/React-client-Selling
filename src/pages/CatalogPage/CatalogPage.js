import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap'

import SliderCatalog from '../../components/CatalogPage/SliderCatalog';
import Title from '../../components/CatalogPage/Title';

class CatalogPage extends Component {
    render() {
        var { slider, path, filterProducts } = this.props
        return (
            <div>
                <SliderCatalog slider={slider} />
                <Title path={path}
                    filterProducts={filterProducts}
                    pathFirst='Trang chủ'
                />

                <Container >
                    <section id="products-cata">
                        <Row>
                            {this.props.children}
                        </Row>
                    </section>
                </Container>

            </div>
        );
    }
}

CatalogPage.propTypes = {

};

export default CatalogPage;