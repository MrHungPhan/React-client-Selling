import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'reactstrap'

import SliderCatalog from '../components/CatalogPage/SliderCatalog';
import Filter from '../components/CatalogPage/Filter';

class CatalogPage extends Component {
    render() {
        return (
            <div>
                <SliderCatalog />
                <Filter />

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