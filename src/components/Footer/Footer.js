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
                                <li className="f-list-item">123 Trương Thế Vinh, Hai Bà Trưng</li>
                                <li className="f-list-item">65 XUân Thủy, Opening Soon</li>
                                <li className="f-list-item">90 Hà Huy, Láng</li>
                            </ul>
                            <h6>Chi Nhánh Tỉnh</h6>
                            <ul className="footer-list">
                                <li className="f-list-item">234 Quang Trung, Hải Phòng</li>
                                <li className="f-list-item">88 Hoàng THị Loan,Vinh, Nghệ An</li>
                                <li className="f-list-item">12 Trần Phú, TP Hồ Chí Minh</li>
                                <li className="f-list-item">01 Lê Duẩn, Bắc Giangn</li>
                                <li className="f-list-item">123 Bạch Liêu, Đà Nẵng</li>
                                <li className="f-list-item">65 Khánh Phùng, Huế</li>
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
                                    <Link to="/">Bài baó về MenShop</Link>
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
                            <h5>Đăng kí nhận thông báo</h5>
                            <h6>Đăng kí nhận thông tin khuyến mãi và cập nhật
                                sản phẩm mới từ MenShop
                            </h6>
                            <Form inline>

                                <FormGroup>
                                    <Label for="examplePassword" hidden>Password</Label>
                                    <Input type="password" name="password" id="examplePassword" placeholder="Nhập Email" />
                                </FormGroup>
                                {' '}
                                <Button>Submit</Button>

                            </Form>
                            <div className="mail-contact">Email liên hệ : menshop789@gmail.com</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>;
    }
}

export default Footer;