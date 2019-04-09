import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Filter.css'
import { Container, Row, Col } from 'reactstrap';

class Filter extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col md = "6" sm="12">
                            <div className ="path-cata">
                                Trang chu > So mi
                            </div>
                        </Col>
                        <Col md = "6" sm="12">
                            <div className="filter">
                                <div className="fiter-title">
                                    <span>Sap xep theo</span>
                                </div>
                                <ul className="filter-content">
                                    <li className="filter-item">
                                        <select name="" id="">
                                            <option value="">Ten</option>
                                            <option value="">Tu A-> Z</option>
                                            <option value="">Tu Z-> A</option>
                                        </select>
                                    </li>
                                    <li className="filter-item">
                                        <select name="" id="">
                                            <option value="">Ten</option>
                                            <option value="">Tu A-> Z</option>
                                            <option value="">Tu Z-> A</option>
                                        </select>
                                    </li>
                                    <li className="filter-item">
                                        <select name="" id="">
                                            <option value="">Ten</option>
                                            <option value="">Tu A-> Z</option>
                                            <option value="">Tu Z-> A</option>
                                        </select>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

Filter.propTypes = {

};

export default Filter;