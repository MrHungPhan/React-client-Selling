import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import lodash from 'lodash';
import { Cookies } from "react-cookie";

var cookie = new Cookies();

class QuickViewProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            sizes: [],
            form: {
                color: null,
                size: null,
                quantity: 1
            }
        }
    }

    componentWillReceiveProps(nextprops) {
        this.setState({
            ...this.state,
            modal: nextprops.modal
        })
    }

    toggle = () => {
        this.setState({
            ...this.state,
            sizes: []
        })
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
        if (this.state.form.quantity < 10) {
            this.setState({
                ...this.state,
                form: {
                    ...this.state.form,
                    quantity: this.state.form.quantity + 1
                }
            })
        }

    }

    onMinus = () => {
        if (this.state.form.quantity > 1) {
            this.setState({
                ...this.state,
                form: {
                    ...this.state.form,
                    quantity: this.state.form.quantity - 1
                }
            })
        }

    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = lodash.isNaN(parseInt(target.value)) ? target.value : parseInt(target.value);
        this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: value
            }
        })

    }

    getProductAddCart = () => {
        var colorPr, sizePr= null;
        var { color, size, quantity } = this.state.form;
        var { product } = this.props;
        for(let item of product[1]){
            if(item.id === color)
                colorPr = {...item};
        }
        if (product[2].length > 0){
            for (let item of product[2]) {
            let id = parseInt(lodash.keys(item)[0]);
            if (color === id) {
                let sizes = lodash.values(item)[0];
                for(let isize of sizes){
                    if(isize.id === size) sizePr = {...isize}
                }
            }
        }
        }
        return {
            product : product[0],
            color : colorPr,
            size : sizePr,
            quantity : quantity
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
       var product = this.getProductAddCart();
       console.log(product);
       var cart = [];
       cart.push(product);
       const token = cookie.get('token');
       if(!token){
            localStorage.setItem('cart', "sadsdasd")
       }
       this.setState({
           ...this.state,
           form : {
               color : null,
               size : null,
               quantity : 1
           }
       })
       console.log(this.state);
        this.toggle();
    }

    render() {
        var { product } = this.props;
        var { modal, sizes, quantity, form } = this.state;
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
                                            <Form onSubmit ={this.onSubmit}>

                                                <FormGroup>
                                                    <span className="frm-title">Mau sac : </span>
                                                    <div className="frm-check">
                                                        {
                                                            (product.length > 0 && product[1].length > 0) ? product[1].map(color => {
                                                                return <Label
                                                                    key={color.id}
                                                                    onClick={() => this.showSize(color.id)}
                                                                >
                                                                    <Input
                                                                        type="radio"
                                                                        name="color"
                                                                        value={color.id}
                                                                        onChange={this.onChange}
                                                                    />
                                                                    <img src={color.src_image} />

                                                                </Label>
                                                            }) : ''
                                                        }

                                                    </div>
                                                </FormGroup>
                                                <div className="message-size"><i>Chon mau sac de hien thi kich thuoc hien co</i></div>
                                                <FormGroup>
                                                    <span className="frm-title">Kich thuoc : </span>
                                                    <div className="frm-check">
                                                        {
                                                            sizes.length > 0 ? sizes.map(size => {
                                                                return <Label className="item-size"
                                                                    key={size.id}
                                                                >
                                                                    <Input
                                                                        type="radio"
                                                                        name="size"
                                                                        value={size.id}
                                                                        onChange={this.onChange}
                                                                    />
                                                                    <div className="item-style">
                                                                        {size.name}
                                                                    </div>
                                                                </Label>
                                                            }) : ''
                                                        }

                                                    </div>
                                                </FormGroup>

                                                <FormGroup>
                                                    <span className="frm-title">So luong : </span>
                                                    <div className="frm-quantity">
                                                        <button type="button"
                                                            className="q-btn btn-plus"
                                                            onClick={this.onPlus}
                                                        >
                                                            <i className="fas fa-plus"></i>
                                                        </button>
                                                        <input type="number"
                                                            name="quantity"
                                                            value={form.quantity}
                                                            onChange={this.onChange}
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
                                                    <Link to='/' className="btn-buy-now">
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

QuickViewProduct.propTypes = {

};

export default QuickViewProduct;