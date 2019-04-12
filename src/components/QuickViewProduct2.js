import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import lodash from 'lodash';
import { reduxForm, Field, formValueSelector, SubmissionError } from "redux-form";
import { Cookies } from "react-cookie";
import { connect } from 'react-redux';

var cookie = new Cookies();


const renderField = ({ input, index, color, type, meta: { touched, error } }) => {
    return <Label>
        <input {...input} type={type} />
        {index === 0 && touched && error ? window.alert(error) : ''}
        <img src={color.src_image} />
    </Label>
}


class QuickViewProduct2 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            sizes: null
        }
    }

    componentDidMount() {
        //set default input quantity value == 1
        this.props.initialize({ quantity: 1 })
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

    checkExitsProductOnCartLocal = (productNew, cart) => {
        var check = -1;
        for (let i = 0; i < cart.length; i++) {
            if (lodash.isEqual(productNew.product, cart[i].product) && lodash.isEqual(productNew.color, cart[i].color) && lodash.isEqual(productNew.size, cart[i].size)) {
                check = i;
            }
        }
        return check;
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

        // if not authencation 
        if (!token) {
            var cart = JSON.parse(localStorage.getItem("cart"));
            // if cart localStrorage exist
            if (cart) {
                const check = this.checkExitsProductOnCartLocal(product, cart);
                if (check !== -1) {
                    cart[check].quantity += product.quantity;
                } else {
                    cart.push(product);
                }

            } else { // elset nto exits , create new
                cart = [];
                cart.push(product);
            }
            localStorage.setItem("cart", JSON.stringify(cart))
        }

        // reset form data
        this.props.reset();
        this.setState({
            sizes : []
        })
        this.toggle();
    }


    render() {
        var { product, handleSubmit } = this.props;
        var { modal, sizes, quantity } = this.state;
        console.log(product)
        return (
            <div>
                <div>
                    <Modal isOpen={modal} toggle={this.toggle} className="modal-product-detailt" >
                        <ModalHeader toggle={this.toggle}>Chi tiet san pham</ModalHeader>
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
                                            <h3>{product.length > 0 ? product[0].price : ''}$</h3>
                                        </div>
                                        <div className="p-actions">
                                            <Form onSubmit={handleSubmit(this.onSubmit)}>

                                                <FormGroup>
                                                    <span className="frm-title">Mau sac : </span>
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
                                                                <div className="message-size"><i>Chon mau sac de hien thi kich thuoc hien co</i></div>
                                                                    <FormGroup>
                                                                        <span className="frm-title">Kich thuoc : </span>
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
                                                    <span className="frm-title">So luong : </span>
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
                                                    <button className="btn-add-cart" type="submit"><div><i className="fas fa-cart-plus"></i>Them vao gio</div>
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
    form: 'productAddCartForm'
})(QuickViewProduct2);

const selector = formValueSelector('productAddCartForm');

const mapStateToProps = (state) => {
    return {
        quantity: selector(state, 'quantity')
    }
}

QuickViewProduct2 = connect(mapStateToProps, null)(QuickViewProduct2)

export default QuickViewProduct2;