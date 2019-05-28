import React from 'react';
import {
    Container, Row,
    Col, FormGroup, Label, Input, Form, Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

import './footer.css'

class Footer extends React.PureComponent {
    render() {
        return <footer>
            <Container>
                <Row>
                    <Col md="4">
                        <div className="footer-col">
                            <h5>Thông tin liên hệ</h5>
                            <h6>Cửa hàng tại Hà Nội</h6>
                            <h6>Tổng đài online : 0973648655</h6>
                            <ul className="footer-list">
                                <li className="f-list-item">234 Xã Đàn, Đống Đa</li>
                                <li className="f-list-item">88 Đình Phúc, Cầu Giấy</li>
                                <li className="f-list-item">12 Ưng Hoàng, Hà Đông</li>
                                <li className="f-list-item">01 Minh Khai, Long Biên</li>
                            </ul>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="footer-col">
                            <h5>Về chúng tôi</h5>
                            <ul className="footer-list">
                                <li className="f-list-item">
                                    <Link to="/">Fanpage cộng đồng MenShop</Link>
                                </li>
                              
                                <li className="f-list-item">
                                    <Link to="/">Chính sách bảo mật</Link>
                                </li>

                            </ul>
                            <h5>Thông tin khác</h5>
                            <ul className="footer-list">
                                <li className="f-list-item">
                                    <Link to="/">Chính sách đổi trả</Link>
                                </li>
                                <li className="f-list-item">
                                    <Link to="/">Chính sách khách hàng VIP</Link>
                                </li>
                                <li className="f-list-item">
                                    <Link to="/">Hướng dẫn mua hàng</Link>
                                </li>

                            </ul>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="footer-col">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.942680656857!2d105.69499921455396!3d18.666567969565428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139cdd192714e55%3A0xf85248138294dd29!2zVsO1IFRo4buLIFPDoXUsIFRwLiBWaW5oLCBOZ2jhu4cgQW4sIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1558837145779!5m2!1svi!2s" height="100%" frameborder="0" style={{border:0}} allowfullscreen></iframe>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>;
    }
}

export default Footer;