import React from 'react'
import { Cookies } from 'react-cookie';
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Form, Table } from 'reactstrap'
import { Field, reduxForm } from 'redux-form';
import './CartCheckOut.css'

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

    onSubmit = (value) => {
        debugger
        console.log(value)
    }

    onChange = (e) =>{
        console.log(e.target.value);
    }

    render() {
        const token = cookie.get('token')
        const { districts, handleSubmit } = this.props;
        return <div>
            {
                !token && <Redirect to="/" />
            }
            {
                token && <Container id="cart-checkout-page">
                    <Form onSubmit={handleSubmit(this.onSubmit)}>
                        <Row> 
                        <Col md="8">
                            <div className="c-checkout-left">     
                                    <div className="c-checkout-add">
                                        <div className='checkout-title'><i class="fas fa-map-marker-alt"></i>Thông tin người nhận</div>
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
                                                   districts.map(district => <option 
                                                        key={district.DistrictID} 
                                                        value={district.DistrictID}>
                                                       {district.ProvinceName} - {district.DistrictName}
                                                   </option>)
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
                                        <div className="checkout-title"><i class="fas fa-dolly"></i>Chọn dịch vụ vận chuyển</div>
                                        <div className='form-checkout'>
                                            <Table bordered>
                                                <thead>
                                                    <tr>
                                                        <th>Dịch vụ - Nhà vận chuyển</th>
                                                        <th>Thời gian giao hàng trung bình</th>
                                                        <th>Phí vận chuyển</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td htmlFor="service1">
                                                            <label htmlFor="service1">
                                                                <Field
                                                                    id="service1"
                                                                    type="radio"
                                                                    name="service"
                                                                    component="input"
                                                                    value="1"
                                                                />
                                                                Mark
                                                            </label>
                                                        </td>
                                                        <td><label htmlFor="service1">
                                                            Oto
                                                            </label></td>
                                                        <td><label htmlFor="service1">
                                                            mdo
                                                            </label></td>

                                                    </tr>
                                                    <tr>

                                                        <td>
                                                            <label htmlFor="service3">
                                                                <Field
                                                                    id="service3"
                                                                    type="radio"
                                                                    name="service"
                                                                    component="input"
                                                                    value="3"
                                                                />
                                                                Mark
                                                            </label>
                                                        </td>
                                                        <td><label htmlFor="service3">
                                                            Oto
                                                            </label></td>
                                                        <td><label htmlFor="service3">
                                                            mdo
                                                            </label></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <label htmlFor="service2">
                                                                <Field
                                                                    id="service2"
                                                                    type="radio"
                                                                    value="2"
                                                                    name="service"
                                                                    component="input"
                                                                />
                                                                Mark
                                                            </label>
                                                        </td>
                                                        <td><label htmlFor="service2">
                                                            Oto
                                                            </label></td>
                                                        <td><label htmlFor="service2">
                                                            mdo
                                                            </label></td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </div>
                                    <div className="checkout-pay-type">
                                        <div className="checkout-title"><i class="fas fa-money-check-alt"></i>Chọn hình thức thanh toán</div>
                                        <div className="form-checkout">
                                            <label>
                                                <Field 
                                                    type="radio"
                                                    name="pay"
                                                    component="input"
                                                    value="pay1"
                                                />
                                               <span><i class="fas fa-praying-hands"></i>Thanh toán khi nhận hàng</span> 
                                            </label>
                                            <label>
                                                <Field 
                                                    type="radio"
                                                    name="pay"
                                                    component="input"
                                                    value="pay2"
                                                />
                                                <span className="style-pay"><i class="fab fa-paypal"></i>Thanh toán trực tuyến</span>
                                            </label>
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
                                    <OrderItem />
                                    <OrderItem />
                                
                                    <div className="c-order c-total">
                                        <span>Tổng đơn hàng :</span><span>3000000đ</span>
                                    </div>
                                    <div className="c-order c-fee">
                                        <span>Phí vận chuyển :</span><span>500000đ</span>
                                    </div>
                                    <div className="c-order c-total-fee">
                                        <span>Tổng thành tiền</span><span>6700000đ</span>
                                    </div>
                                    <button className="btn-order-checkout" type="submit">Đặt hàng</button>
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
            }
        </div>;
    }
}


export default reduxForm({
    form: 'checkoutForm'
})(CartCheckOut);