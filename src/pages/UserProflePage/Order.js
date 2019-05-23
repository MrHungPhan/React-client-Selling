import React, { PureComponent } from 'react'
import { TabContent, 
    TabPane, Nav, NavItem, 
    NavLink, Card, Button, CardTitle,
     CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import lodash from 'lodash'

import OrderItem from '../../components/Order/OrderItem'
import './order.css'

class OrderHistory extends PureComponent {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          orders : [],
          activeTab: '1',
          orderNotVerify : [],
          orderVerified : [],
          orderCancel : [],
          orderDeverling : [],
          orderDeverled : []
        };
      }
    
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }

      componentWillReceiveProps(nextProps){
        console.log('order - ', nextProps.orders)
        const { orders } = nextProps;
        if(this.state.orders.length === 0){
           for(let item of orders){              
              switch(item.status){
                case 'NotVerify':
                    this.setState({
                      orderNotVerify : [...this.state.orderNotVerify, item]
                    }, () => console.log(this.state.orderNotVerify));
                    break;
                case 'Verified':
                    this.setState({
                      orderVerified : [...this.state.orderVerified, item]
                    })
                    break;
                default : break
              }
            }
            this.setState({
              orders
            })
        }
           
        
       
      }

      render() {
        var { orderNotVerify, orderVerified, 
          orderCancel, orderDeverled, orderDeverling, activeTab } = this.state;
        return (
          <div className="">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                 Chờ xác nhận { orderNotVerify.length !== 0 && <span>({orderNotVerify.length})</span> }
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                Đã xác nhận { orderVerified.length !== 0 && <span>({orderVerified.length})</span> }
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
               Đang vận chuyển
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggle('4'); }}
                >
                Đã giao hàng
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '5' })}
                  onClick={() => { this.toggle('5'); }}
                >
                Đã hủy
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                       {
                        orderNotVerify.length!==0 && orderNotVerify.map(order => <OrderItem status="Chưa xác nhận" order={order} />) 
                       }
                       {
                        orderNotVerify.length === 0 && <p>Bạn không có đơn hàng</p>
                       }
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                      {
                        orderVerified.length!==0 &&  orderVerified.map(order => <OrderItem  status="Đã xác nhận" order={order} />)
                       }
                       {
                        orderVerified.length === 0 && <p>Bạn không có đơn hàng</p>
                       }
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                  <Col sm="12">
                      {
                        orderDeverling.length!==0 &&  orderDeverling.map(order => <OrderItem  status="Đang vận chuyển" order={order} />)
                       }
                       {
                        orderDeverling.length === 0 && <p>Bạn không có đơn hàng</p>
                       }
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Row>
                  <Col sm="12">
                      {
                        orderDeverled.length!==0 &&  orderDeverled.map(order => <OrderItem   status="Đã giao hàng" order={order} />)
                       }
                       {
                        orderDeverled.length === 0 && <p>Bạn không có đơn hàng</p>
                       }
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="5">
                <Row>
                  <Col sm="12">
                      {
                        orderCancel.length!==0 &&  orderCancel.map(order => <OrderItem  status="Đã hủy" order={order} />)
                       }
                       {
                        orderCancel.length === 0 && <p>Bạn không có đơn hàng</p>
                       }
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        );
      }
}

export default OrderHistory;