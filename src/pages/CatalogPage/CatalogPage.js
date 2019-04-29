import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap'

import SliderCatalog from '../../components/CatalogPage/SliderCatalog';
import Filter from '../../components/CatalogPage/Filter';

class CatalogPage extends Component {
    render() {
        var { slider, path, filterProducts } = this.props
        return (
            <div>
                <SliderCatalog slider={slider} />
                <Filter path={path}
                    filterProducts={filterProducts}
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