import React from 'react'
import { Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Form, Table } from 'reactstrap'
import { Field, reduxForm } from 'redux-form';
import './CartCheckOut.css'
import  loading from './spinner3.svg'

import formatMoney from '../../utils/formatMoney'
import OrderItem from '../../components/OrderCheckOut/OrderItem'

const cookie = new Cookies()
//validate
const required = value => (value || typeof value === 'number' ? undefined : 'Required')
const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} type={type} />
                {touched &&
                    ((error && <span>* {error}</span>) ||
                        (warning && <span>{warning}</span>))}
            </div>
        </div>
    )

const renderSelectField = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
    children
}) => (
        <div>
            <label>{label}</label>
            <select {...input}>
                {children}
            </select>
            {touched &&
                ((error && <span>* {error}</span>) ||
                    (warning && <span>{warning}</span>))}
        </div>
    )



class CartCheckOut extends React.PureComponent {
    constructor(props){
        super(props);
        this.state = {
            isFetching : false,
            locationTo : '',
            serviceFee : 0,
            total : 0,
            requiredService : '',
            requiredPay : ''
        }
    }

    onChange = (e) => {
        console.log(e.target.value);
        const { districts } = this.props;
        for(let item of districts){
            if(item.DistrictID === parseInt(e.target.value))
                this.setState({
                    locationTo : item.ProvinceName
                })
        }
        this.props.getWards(e.target.value);
        this.props.getServices(e.target.value);
    }

    showFeeService = async (e) => {
        console.log(e.target.value)
        const { services } = this.props;
        for(let item of services){
            if(item.ServiceID ===parseInt(e.target.value)){
                  await this.setState({
                    serviceFee : item.ServiceFee
                })

                let totalOrder = this.totalCart(this.props.cart) + item.ServiceFee;
                debugger
                let time = `${this.countDayTranport(item.ExpectedDeliveryTime)} ngày`
                this.props.storeInfo(totalOrder, time)
            }
        }

        if(this.state.serviceFee !== 0 && this.props.cart){
            this.setState({
                total : this.totalCart(this.props.cart) + this.state.serviceFee
            })
        }



    }

    showDistricts = districts => {
        return districts.map(district => <option
            key={district.DistrictID}
            value={district.DistrictID}>
            {district.ProvinceName} - {district.DistrictName}
        </option>)
    }

    showWards = (wards) => {
        return wards.map(ward => <option
            key={ward.WardCode}
            value={ward.WardCode}>
            {ward.WardName}
        </option>)
    }

    totalCart = (cart) => {
        var total = 0;
        for (let item of cart) {
            total += item.product.price * item.quantity
        }
        return total
    }

    countDayTranport = (date) => {
        let dateFrom = new Date();
        let dateTo = new Date(date);
        let ms = Math.floor(dateTo.getTime() - dateFrom.getTime());
        let day = Math.floor(ms / (24 * 60 * 60 * 1000));
        return day;
    }

    showServices = services => {
        return services.map(service => {
            return <tr key={service.ServiceID}>
                <td>
                    <label htmlFor={service.ServiceID}>
                        <Field
                            id={service.ServiceID}
                            type="radio"
                            name="service"
                            component="input"
                            onChange={this.showFeeService}
                            value={service.ServiceID.toString()}
                        />
                        Giao hàng {service.Name}
                    </label>
                </td>
                <td className="text-center"><label htmlFor={service.ServiceID}>
                    {this.countDayTranport(service.ExpectedDeliveryTime)} ngày
                    </label></td>
                <td className="text-center" style={{ color: "tomato" }}><label htmlFor={service.ServiceID}>
                    {formatMoney(service.ServiceFee)}
                </label></td>
            </tr>
        })
    }

    onSubmit = async (values) => {
        const selectorRadioServier = document.querySelectorAll('input[name="service"]:checked');
        const selectorRadioPay = document.querySelectorAll('input[name="pay"]:checked');
        if(selectorRadioServier.length === 0){
            await this.setState({
                requiredService : '* Bạn cần chọn dịch vụ vận chuyển'
            })
        }else if (selectorRadioPay.length === 0){
            await this.setState({
                requiredPay : "* Bạn cần chọn hình thức thanh toán"
            })
        }else{
            this.props.onSubmit(values);
            this.setState({
                requiredPay : '',
                requiredService : ''
            })
        }

        await this.setState({
            ...this.state,
            isFetching: true
        })

        console.log(this.state.isFetching);
        setTimeout(() => {
            this.setState({
                ...this.state,
                isFetching: false
            })
        }, 8000);
        console.log(this.state.isFetching);
    }

    render() {
        console.log(this.state.requiredService, this.state.requiredPay)
        const token = cookie.get('token')
        const { districts, wards, services, cart, order, handleSubmit } = this.props;
        if(order)
            return <Redirect to= {`/checkout/success/${order.id}`} />
        return <div>
               <Container id="cart-checkout-page">
                    <Form onSubmit={handleSubmit(this.onSubmit)}>
                        <Row>
                            <Col md="8">
                                <div className="c-checkout-left">
                                    <div className="c-checkout-add">
                                        <div className='checkout-title'><i className="fas fa-map-marker-alt"></i>Thông tin người nhận</div>
                                        <div className="form-checkout">
                                            <Field
                                                label="Họ tên"
                                                name="name"
                                                type="text"
                                                component={renderField}
                                                validate={required}
                                            />
                                            <Field
                                                label="Số điện thoại"
                                                name="phone"
                                                type="number"
                                                component={renderField}
                                                validate={[required, maxLength(10)]}
                                            />

                                            <Field
                                                label="Tỉnh/Thành phố - Quận/Huyện"
                                                name="district"
                                                type="text"
                                                onChange={this.onChange}
                                                component={renderSelectField}
                                                validate={required}
                                            >

                                                <option />
                                                {
                                                    districts.length > 0 && this.showDistricts(districts)
                                                }
                                            </Field>

                                            <Field
                                                label="Phường/Xã"
                                                name="ward"
                                                type="text"
                                                component={renderSelectField}
                                                validate={required}
                                            >
                                                <option />
                                                {
                                                    wards && this.showWards(wards)
                                                }
                                            </Field>
                                            <Field
                                                label="Địa chỉ"
                                                name="address"
                                                type="text"
                                                component={renderField}
                                                validate={required}
                                            />
                                        </div>
                                    </div>
                                    <div className="c-checkout-service">
                                        <div className="checkout-title"><i className="fas fa-dolly"></i>Chọn dịch vụ vận chuyển</div>
                                        <div className='form-checkout'>
                                            <div className="location-order">
                                                <div className="location-from">Giao từ : <span>Nghệ An</span></div>
                                                <div className="loction-to">Đến : <span>{this.state.locationTo}</span></div>
                                            </div>
                                            {
                                                    this.state.requiredService && <div className="require-item">{this.state.requiredService}</div>
                                             }
                                            <Table bordered>
                                                <thead>
                                                    <tr>
                                                        <th>Dịch vụ - Nhà vận chuyển</th>
                                                        <th>Thời gian giao hàng trung bình</th>
                                                        <th>Phí vận chuyển</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        services && this.showServices(services)
                                                    }

                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div className="checkout-pay-type">
                                        <div className="checkout-title"><i className="fas fa-money-check-alt"></i>Chọn hình thức thanh toán</div>
                                        <div>
                                            
                                        </div>
                                        <div className="form-checkout">
                                            {
                                                this.state.requiredPay && <div className="require-item">{this.state.requiredPay}</div>
                                            }
                                            <div className="form-c-content">
                                                <Row>
                                                    <Col md="6">
                                                                <label>
                                                            <Field
                                                                type="radio"
                                                                name="pay"
                                                                component="input"
                                                                value="pay1"
                                                            />
                                                            <span><i className="fas fa-praying-hands"></i>Thanh toán khi nhận hàng</span>
                                                        </label>
                                                    </Col>
                                                    <Col md="6" className="text-right">
                                                        <label>
                                                    <Field
                                                        type="radio"
                                                        name="pay"
                                                        component="input"
                                                        value="pay2"
                                                    />
                                                    <span className="style-pay"><i className="fab fa-paypal"></i>Thanh toán trực tuyến</span>
                                                </label>
                                                    </Col>
                                                </Row>     
                                            </div>
                                            
                                        </div>
                                    </div>

                                </div>
                            </Col>
                            <Col md="4">
                                <div className="c-checkout-right">
                                    <div className="checkout-order-title">
                                        Thông tin đơn hàng
                                </div>
                                    <div className="checkout-order-content">

                                        {
                                            cart && cart.map((product, index) => {
                                                return <OrderItem key={index} product={product} />
                                            })
                                        }

                                        <div className="c-order c-total">
                                            <span>Tổng đơn hàng :</span><span>{formatMoney(this.totalCart(cart))}</span>
                                        </div>
                                        <div className="c-order c-fee">
                                            <span>Phí vận chuyển :</span><span>{formatMoney(this.state.serviceFee)}</span>
                                        </div>
                                        <div className="c-order c-total-fee">
                                            <span>Tổng thành tiền</span><span>{
                                                this.state.total !== 0 ? formatMoney(this.state.total) : this.totalCart(cart)
                                            }</span>
                                        </div>
                                        <button className="btn-order-checkout" type="submit">
                                            {
                                                this.state.isFetching && <img className="loading-signup" src={loading} />
                                            } 
                                           Đặt hàng
                                        </button>
                                        <div className="c-order-note">
                                            <div>Ghi chú</div>
                                            <textarea />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                </Container>
        </div>;
    }
}


export default reduxForm({
    form: 'checkoutForm'
})(CartCheckOut);