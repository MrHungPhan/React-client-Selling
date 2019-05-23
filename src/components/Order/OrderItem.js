import React from 'react';
import { Table, Row, Col } from 'reactstrap';
import './order.css';
import lodash from 'lodash';

import formatMoney from '../../utils/formatMoney'

class OrderItem extends React.PureComponent {
    state = {
        showAddress : false
    }

    showDetailt = (details) => {
        return details.map(item =>{
            return <tr key ={item.product.id}>
                    <td className="o-p-product">
                        <div className='o-p-img'>
                            <img src={item.product.image} />
                        </div>
                        <div className='o-p-style'>
                            <div className="o-p-name">
                                <p>{item.product.name}</p>
                            </div>
                            <div className='o-p-color'>
                                <span>Màu sắc:</span> <img src={item.color.src_image} />
                            </div>
                            <div className='o-p-size'>
                            <span>Kích thước: </span>{item.size && <span>{item.size.name}</span>}
                            </div>
                        </div>

                    </td>
                    <td><div className='o-p-price'>
                       {formatMoney(item.product.price)}
                    </div></td>
                    <td>
                        <div className='o-p-quantity'>
                            {item.quantity}
                        </div>
                    </td>
                    <td>
                        <div className="o-p-total">
                            {formatMoney(item.product.price * item.quantity)}
                        </div>
                     </td>
                 </tr>

        })
    }

    showAddress = () => {
        this.setState({
            showAddress : true
        })
    }

    hiddenAddress = () => {
        this.setState({
            showAddress: false
        })
    }

    render() {
        const { order } = this.props;

        return <div className='order-history-item'>
            <div className="order-header">
                <div className="order-id">
                    <p>Mã đơn hàng: <span>#{order.id}</span></p>
                    <p>Đặt ngày: <span>{lodash.reverse(order.create_time.split('T')[0].split('-')).join('-')}</span></p>
                </div>
                <div className='order-address' 
                onMouseEnter={this.showAddress}
                onMouseLeave={this.hiddenAddress}
                >
                    <p>Người nhận:</p>
                    <p>{order.customer_name}</p>
                   {
                       this.state.showAddress && <div className='order-add-sub'>
                        {order.customer_address}
                    </div>
                   }
                </div>
                <div className="order-total">
                    <p>Tổng tiền</p>
                    <p>{order.total}</p>
                </div>
            </div>
            <div className="order-body">
                <div className="process-order">

                </div>
                <div className="order-info-detailt">
                   <Row>
                       <Col xs="12" md="8">
                        <div className='i-de i-de-left'>
                            <div className='i-de-title'lassName='i-de-title'>Tình trạng vận chuyển</div>
                            <Row>
                                 <Col xs="12" md="4">
                                <div>Nhà vận chuyển: </div>
                                <div>Tình trạng: </div>
                                <di>Mã vận đơn: </di>
                            </Col>
                            <Col xs="12" md="2">
                                <div>GHN</div>
                                <div>{
                                    this.props.status
                                }</div>
                                <div className='i-de-code'>{order.order_code}</div>
                             </Col>
                            <Col xs="12" md="6">
                                <div className='des-status-o'>
                                   {
                                       this.props.status === 'Chưa xác nhận' && <div>
                                           Bạn cần xác nhận đơn hàng, Sau 24h sẽ hũy nếu đơn hàng ko được xác nhận
                                       </div>
                                   } 
                                    {
                                       this.props.status === 'Đã xác nhận' && <div>
                                           Đơn hàng đã được xác nhận và đang chờ nhân viên giao hàng đến lấy
                                       </div>
                                   } 
                                    {
                                       this.props.status === 'Đang vận chuyển' && <div>
                                           Nhân viên giao hàng đang vận chuyển hàng
                                       </div>
                                       
                                   } 
                                    {
                                            this.props.status === 'Đã giao hàng' && <div>
                                               Nhân viên giao hàng đã giao hàng thành công
                                            </div>
                                        } 
                                        {
                                            this.props.status === 'Đã hủy' && <div>
                                              Đơn hàng của bạn đã bị hủy
                                            </div>
                                        } 
                                </div>
                            </Col>
                            </Row>
                           
                        </div>
                       </Col>
                   </Row>
                </div>
                <Table className='product-order-item' borderless>
                    <thead>
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.showDetailt(order.order_detailts)
                        }
                    </tbody>
                </Table>
            </div>
        </div>;
    }
}

export default OrderItem;