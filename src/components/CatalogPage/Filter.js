import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Filter.css'
import { Container, Row, Col } from 'reactstrap';

class Filter extends Component {
    render() {
        var { path } = this.props
        return (
            <div>
                <Container>
                    <div className="catalog-title">
                       
                            <div className ="path-cata">
                                Trang chủ / {path}
                            </div>
                     
                      
                            <div className="filter">
                                <div className="fiter-title">
                                    <span>Sắp xếp theo</span>
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
                      
                    </div>
                </Container>
            </div>
        );
    }
}

Filter.propTypes = {

};

export default Filter;