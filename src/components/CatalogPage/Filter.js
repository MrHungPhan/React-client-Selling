import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Filter extends Component {
    constructor(props){
        super(props)

        this.state ={
            sortProducts : '',
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

        console.log(this.state.sort)
        const { sortProducts, filterPrice } = this.state;
        if(sortProducts){
             const sortArr = sortProducts.split('_');
            this.props.filterProducts({
                sortBy : sortArr[0],
                sortValue : parseInt(sortArr[1]),
                filterPrice
            })      
        }else{
            this.props.filterProducts({
                sortBy : '',
                sortValue : '',
                filterPrice 
            })   
        }
       
       
    }

    render() {
        var { sortProducts, filterPrice } = this.state;
        return (
            <div className="filter">
                <div className="fiter-title">
                    <span>Sắp xếp theo</span>
                </div>
                <ul className="filter-content">
                    <li className="filter-item">
                        <select 
                        name="sortProducts"
                        id=""
                        onChange={this.onChange}
                        value={sortProducts}
                        >
                            <option value="">Mặc định</option>
                            <option value="name_1">Tên từ A -> Z</option>
                            <option value="name_-1">Tên từ Z -> A</option>
                            <option value="price_1">Giá từ thấp -> cao</option>
                            <option value="price_-1">Giá từ cao -> thấp</option>
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
                            <option value="0>200000">Dưới 200.000đ</option>
                            <option value="200000>400000">Từ 200.000đ -> 400.000đ</option>
                            <option value="400000>600000">Từ 400.000đ-> 600.000đ</option>
                            <option value="600000">Trên 600.000đ</option>
                        </select>
                    </li>
                    
                </ul>
            </div>
        );
    }
}

Filter.propTypes = {

};

export default Filter;