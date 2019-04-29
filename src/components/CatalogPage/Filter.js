import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Filter.css'
import { Container, Row, Col } from 'reactstrap';

class Filter extends Component {
    constructor(props){
        super(props)

        this.state ={
            sortName : '',
            sortPrice : '',
            filterPrice : ''
        }
    }

    onChange = async (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value
        await this.setState({
            [name] : value
        })
        this.props.filterProducts(this.state)
    }

    render() {
        var { path } = this.props;
        var { sortName, sortPrice, filterPrice } = this.state
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
                                        <select 
                                        name="sortName"
                                        id=""
                                        onChange={this.onChange}
                                        value={sortName}
                                        >
                                            <option value="">Tên</option>
                                            <option value="0">Từ A-> Z</option>
                                            <option value="1">Từ Z-> A</option>
                                        </select>
                                    </li>
                                    <li className="filter-item">
                                        <select name="sortPrice"
                                         id=""
                                         onChange={this.onChange}
                                         value={sortPrice}
                                         >
                                            <option value="">Giá</option>
                                            <option value="0">Từ cao -> thấp</option>
                                            <option value="1">Từ thấp -> cao</option>
                                        </select>
                                    </li>
                                   
                                </ul>
                                <div className="fiter-title">
                                    <span>Lọc</span>
                                </div>
                                <ul className="filter-content">
                                    <li className="filter-item">
                                        <select name="filterPrice"
                                         id=""
                                         onChange={this.onChange}
                                         value={filterPrice}
                                         >
                                            <option value="all">Tất cả</option>
                                            <option value="<200000">Dưới 200.000đ</option>
                                            <option value="200000>400000">Từ 200.000đ -> 400.000đ</option>
                                            <option value="400000>600000">Từ 400.000đ-> 600.000đ</option>
                                            <option value=">600000">Trên 600.000đ</option>
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