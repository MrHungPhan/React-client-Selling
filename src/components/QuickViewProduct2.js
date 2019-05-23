import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import lodash from 'lodash';
import { reduxForm, Field, formValueSelector, SubmissionError } from "redux-form";
import { Cookies } from "react-cookie";
import { connect } from 'react-redux';
import formatMoney from '../utils/formatMoney'

var cookie = new Cookies();


const renderField = ({ input, index, color, type, meta: { touched, error } }) => {
    return <Label>
        <input {...input} type={type} />
        {index === 0 && touched && error ? window.alert(error) : ''}
        <img src={color.src_image} />
    </Label>
}


class QuickViewProduct2 extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            sizes: null
        }
    }

    componentWillReceiveProps(nextprops) {
        if(!nextprops.modal)
            this.setState({
                ...this.state,
                modal: nextprops.modal,
                sizes : null
            })
        else{
            this.setState({
                ...this.state,
                modal: nextprops.modal,
            })
        }
        console.log(this.state);
    }

    toggle = () => {
        //reset form before toggle modal
        this.props.reset();

        this.props.toggle();
    }

    showSize = (idColor) => {
        var { product } = this.props;
        if (product.length > 0) {
            if (product[2].length > 0) {
                for (let item of product[2]) {
                    let id = parseInt(lodash.keys(item)[0]);
                    if (idColor === id) {
                        this.setState({
                            ...this.state,
                            sizes: lodash.values(item)[0]
                        })
                    }
                }
            }
        }
    }

    onPlus = () => {
        if (this.props.quantity < 5)
            this.props.change('quantity', this.props.quantity + 1)
    }

    onMinus = () => {
        if (this.props.quantity > 1)
            this.props.change('quantity', this.props.quantity - 1)
    }

    getProductAddCart = (values) => {
        var colorPr, sizePr = null;
        var { color, size, quantity } = values;
        var { product } = this.props;
        for (let item of product[1]) {
            if (item.id === parseInt(color))
                colorPr = { ...item };
        }
        if (product[2].length > 0) {
            for (let item of product[2]) {
                let id = parseInt(lodash.keys(item)[0]);
                if (parseInt(color) === id) {
                    let sizes = lodash.values(item)[0];
                    for (let isize of sizes) {
                        if (isize.id === parseInt(size)) sizePr = { ...isize }
                    }
                }
            }
        }
        return {
            product: product[0],
            color: colorPr,
            size: sizePr,
            quantity: quantity
        }
    }


    onSubmit = (values) => {
        if (!values.color) {
            throw new SubmissionError({
                color: "Ban can chon mau"
            })
        }
        if (!values.size) {
            throw new SubmissionError({
                color: "Ban can chon size"
            })
        }
        var product = this.getProductAddCart(values)

        const token = cookie.get('token');

        console.log(product)
            this.props.addToCart(product)
    
        // reset form data
        this.props.reset();
        this.setState({
            sizes : []
        })
        this.toggle();
    }


    render() {
        console.log(this.props.initialized)
        var { product, handleSubmit } = this.props;
        var { modal, sizes, quantity } = this.state;
        return (
            <div>
                <div>
                    <Modal isOpen={modal} toggle={this.toggle} className="modal-product-detailt" >
                        <ModalHeader toggle={this.toggle}>Chi tiết sản phẩm</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col md="5">
                                    <div className="product-d-image">
                                        <div className="p-img">
                                            <img src={product.length > 0 ? product[0].image : ''} />
                                        </div>
                                        <div className="p-slider-img">

                                        </div>
                                    </div>
                                </Col>
                                <Col md="7">
                                    <div className="product-d-actions">
                                        <div className="p-name">
                                            <h2>{product.length > 0 ? product[0].name : ''}</h2>
                                        </div>
                                        <div className="p-price">
                                            <h3>{product.length > 0 ? formatMoney(product[0].price) : ''}</h3>
                                        </div>
                                        <div className="p-actions">
                                            <Form onSubmit={handleSubmit(this.onSubmit)}>

                                                <FormGroup>
                                                    <span className="frm-title">Màu sắc : </span>
                                                    <div className="frm-check">
                                                        {
                                                            (product.length > 0 && product[1].length > 0) ? product[1].map((color, index) => {
                                                                return <div key={index} onClick={() => this.showSize(color.id)}>
                                                                    <Field
                                                                        index={index}
                                                                        name="color"
                                                                        component={renderField}
                                                                        type="radio"
                                                                        value={color.id.toString()}
                                                                        color={color}
                                                                    />

                                                                </div>
                                                            }) : ''
                                                        }

                                                    </div>
                                                </FormGroup>
                                                {
                                                    (product.length !== 0 && product[2].length !== 0) && 
                                                                <div>
                                                                <div className="message-size"><i>Chọn màu sắc để hiển thị khích thước đang còn</i></div>
                                                                    <FormGroup>
                                                                        <span className="frm-title">Kích thước : </span>
                                                                        <div className="frm-check">
                                                                            {
                                                                                sizes ? sizes.map(size => {
                                                                                    return <Label className="item-size"
                                                                                        key={size.id}
                                                                                    >
                                                                                        <Field
                                                                                            name="size"
                                                                                            component="input"
                                                                                            type="radio"
                                                                                            value={size.id.toString()}
                                                                                        />
                                                                                        <div className="item-style">
                                                                                            {size.name}
                                                                                        </div>
                                                                                    </Label>
                                                                                }) : ''
                                                                            }

                                                                        </div>
                                                                    </FormGroup>
                                                                    </div>
                                                }
                                                {
                                                    (product.length !== 0 && product[2].length === 0)  && ''  // Neu san pham ko co size thi ko hien vd: Phu Kien
                                                }

                                                <FormGroup>
                                                    <span className="frm-title">Số lượng : </span>
                                                    <div className="frm-quantity">
                                                        <button type="button"
                                                            className="q-btn btn-plus"
                                                            onClick={this.onPlus}
                                                        >
                                                            <i className="fas fa-plus"></i>
                                                        </button>
                                                        <Field
                                                            name="quantity"
                                                            component="input"
                                                            type="number"
                                                        />
                                                        <button type="button"
                                                            className="q-btn btn-minus"
                                                            onClick={this.onMinus}
                                                        >
                                                            <i className="fas fa-minus"></i>
                                                        </button>
                                                    </div>
                                                </FormGroup>
                                                <div className="add-to-cart">
                                                    <button className="btn-add-cart" type="submit"><div><i className="fas fa-cart-plus"></i>Thêm vào giỏ hàng</div>
                                                    </button>
                                                    <Link to='/cart' className="btn-buy-now">
                                                        <span>Mua ngay</span>

                                                    </Link>
                                                </div>
                                            </Form>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        );
    }
}

QuickViewProduct2.propTypes = {

};

QuickViewProduct2 = reduxForm({
    form: 'productAddCartForm',
    destroyOnUnmount : false // default redux-form dispath action destroy state, block this action set false
})(QuickViewProduct2);

const selector = formValueSelector('productAddCartForm');

const mapStateToProps = (state) => {
    return {
        quantity: selector(state, 'quantity'),
        initialValues: {  // props of redux form, set initiallize for form
            color : null,
            size : null,
            quantity : 1 }
    }
}

QuickViewProduct2 = connect(mapStateToProps, null)(QuickViewProduct2)

export default QuickViewProduct2;