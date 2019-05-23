import React, { PureComponent } from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, TabContent, Nav, NavItem, NavLink, TabPane } from 'reactstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { Cookies } from 'react-cookie';
import formatMoney from '../../utils/formatMoney'
import './ProductDetailt.css'

const cookie = new Cookies();

class ProductDetailt extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            sizes: [],
            image : '',
            form: {
                color: null,
                size: null,
                quantity: 1
            }
        }
    }

    componentWillReceiveProps(nextProps){
        const { product } = nextProps;
        if(product.length > 0){
             this.setState({
                image : product[0].image
            })
        }
       
    }

    changeImage = (img) => {
        console.log(img)
        this.setState({
            image : img
        })
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

    onChange = async (e) => {
        var target = e.target;
        var name = target.name;
        var value = lodash.isNaN(parseInt(target.value)) ? target.value : parseInt(target.value);
        await this.setState({
            ...this.state,
            form: {
                ...this.state.form,
                [name]: value
            }
        })
        console.log(this.state.form);

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

    onSubmit = (e) => {
        e.preventDefault();
        var product = this.getProductAddCart(this.state.form)
            this.props.addToCart(product)

        // reset form data
        document.getElementById('color').checked = false;
        this.setState({
            sizes : [],
            form : {
                ...this.state.form,
                color : null,
                size : null,
                quantity: 1
            }
        })
    }

    ///////////////////////////////////////
    onMouseEnterImage = (e) => {
        const preview = document.getElementById("preview-img");
        const img = document.getElementById("p-img-zoom");
        img.style.transform = "scale(1.6)";
        console.log(e)
        if(preview){
            //    preview.style.display = "block";
            //  preview.style.background= `url(${this.state.image})`;
            //  preview.style.backgroundRepeat = "no-repeat"
            //    const posX = e.nativeEvent.clientX;
            //   const posY = e.nativeEvent.offsetY;
            //   console.log(posX, posY)
            //   preview.style.backgroundPosition = (-posX*2.5)+"px "+(-posY*5.5)+"px";
            const event = e.nativeEvent;
            console.log(event.offsetY, event.offsetX, event.pageX, event.pageY)
        }
      
        
    }

    onMouseLeaveImage = (e) => {
        const img = document.getElementById("p-img-zoom");
        img.style.transform = "scale(1)";
    }

    onMouseMoveImage = (e) => {
        const img = document.getElementById("p-img-zoom");
        const event = e.nativeEvent;
        console.log(event.pageX, event.pageY)
        console.log(img.offsetHeight, img.offsetWidth, img.offsetLeft, img.offsetTop)
        img.style.transformOrigin = ((event.pageX -120)/img.offsetWidth)*100 + '%' + ((event.pageY - 120)/img.offsetHeight)*100 + '%';
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            autoplay: true,
            speed: 500,
            autoplaySpeed: 2000,
            cssEase: "linear",
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        var { product } = this.props;
        var { sizes, quantity, form } = this.state;

        console.log('here - ',product);
        return (
            <div className="product-view">
                <Row>
                    <Col md="4">
                        <div className="product-d-image">
                            <div
                             onMouseEnter={this.onMouseEnterImage}
                             onMouseLeave={this.onMouseLeaveImage}
                             onMouseMove={this.onMouseMoveImage}
                              className="p-img">
                                <img 
                                id="p-img-zoom"
                                
                                src={product.length > 0 ? this.state.image : ''} />
                            </div>
                            
                        </div>
                        <div className="product-images-slider">
                            <Slider {...settings}>
                               {
                                   product[3] && product[3].map(img => (
                                        <div onClick={e => this.changeImage(img.image)} className="slide-img-pr-detailt" key={img.id}>
                                            <img alt="" src={img.image} />
                                        </div>
                                   ))
                               }

                            <div className="slide-img-pr-detailt" >
                                          
                                        </div>
                                       
                               
                            </Slider>
                        </div>
                    </Col>
                    <Col md="8">
                        <div className="product-d-actions">
                            <div className="p-name">
                                <h2>{product.length > 0 ? product[0].name : ''}</h2>
                            </div>
                            <div className="p-price">
                                <h3>{product.length > 0 ? formatMoney(product[0].price) : ''}</h3>
                            </div>
                            <div className="p-actions">
                                <Form onSubmit={this.onSubmit}>

                                    <FormGroup>
                                        <span className="frm-title">Màu sắc : </span>
                                        <div className="frm-check">
                                            {
                                                (product.length > 0 && product[1].length > 0) ? product[1].map(color => {
                                                    return <Label
                                                        key={color.id}
                                                        onClick={() => this.showSize(color.id)}
                                                    >
                                                        <Input
                                                            id="color"
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
                                    <div className="message-size"><i>Chọn màu sắc để hiển thị kích thước hiện có</i></div>
                                    <FormGroup>
                                        <span className="frm-title">Kích thước : </span>
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
                                        <span className="frm-title">Số lượng : </span>
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
                                        <button className="btn-add-cart" type="submit"><div><i className="fas fa-cart-plus"></i>Thêm vào giỏ hàng</div>
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

            </div>
        );
    }
}

ProductDetailt.propTypes = {

};

export default ProductDetailt;