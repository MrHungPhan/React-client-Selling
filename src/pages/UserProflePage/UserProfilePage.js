import React, { PureComponent } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class UserProfilePage extends PureComponent {
    constructor(props){
        super(props);

        this.state={
            email :'',
            name : '',
            sex : '',
            dayBorn : 1,
            monthBorn : 1,
            yearBorn : 1970
        }
    }

    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        console.log(name, value)
        this.setState({
            [name]: value
        });
    }

    showMonth = () => {
        var resuilt = [];
        for(let i = 1; i <= 12; i++){
             resuilt.push(<option value={i}>Tháng {i}</option>)
        }
        return resuilt;
    }

    showYear = () => {
        var resuilt = [];
        var dt = new Date();
        for(let i = 1970; i <= dt.getFullYear() ; i++){
             resuilt.push(<option value={i}>{i}</option>)
        }
        return resuilt;
    }

    showDay = (m, y) => {
        var numberDay = new Date(y, m, 0).getDate();
        var resuilt = [];
        for(let i = 1; i <= numberDay ; i++){
             resuilt.push(<option value={i}>{i}</option>)
        }
        return resuilt;
    }

    render() {
        var { userProfile } = this.props;
        var { email, name, sex, birthDay } = this.state;
        return <div>
                        <p className="pr-title">Thông tin tài khoản</p>
                        <Row className="update-user-info">
                            <Col md="2">
                                <div className="update-image-user"><img src={userProfile.image} /></div>
                            </Col>
                            <Col md="6" className="frm-update-info">
                                <Form>
                                    <FormGroup row>
                                        <Label for="exampleEmail" sm={2}>Email</Label>
                                        <Col sm={10}>
                                            <Input type="email"
                                             name="email" 
                                             id="exampleEmail" 
                                             disabled
                                             value={userProfile.email} 
                                             onChange={this.onChange} />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="name" sm={2}>Tên</Label>
                                        <Col sm={10}>
                                            <Input type="text"
                                            name="name"
                                             id="name" 
                                             value={userProfile.display_name} 
                                             onChange={this.onChange}
                                             />
                                        </Col>
                                    </FormGroup>
                                   
                                    <FormGroup  row>
                                        <Label sm={2}>Giới tính</Label>
                                        <Col sm={2} className="col-form-label">
                                            <FormGroup check>
                                                <Label check>
                                                    <Input value="Nam" type="radio" name="sex" />{' '}
                                                   Nam
                                             </Label>
                                            </FormGroup>
                                        </Col>
                                        <Col sm={2} className="col-form-label">
                                            <FormGroup check>
                                                <Label check>
                                                    <Input value="Nu" type="radio" name="sex" />{' '}
                                                   Nữ
                                             </Label>
                                            </FormGroup>
                                        </Col>
                                             
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label for="exampleSelect" sm={2}>Ngày sinh</Label>
                                        <Col sm={3}>
                                            <Input type="select"
                                             name="dayBorn"
                                              id="exampleSelect" 
                                              value={this.state.dayBorn}
                                              onChange={this.onChange}
                                              >
                                                   {
                                                    this.showDay(this.state.monthBorn, this.state.yearBorn)
                                                }
                                             
                                            </Input>
                                        </Col>
                                        <Col sm={3}>
                                            <Input type="select" 
                                            name="monthBorn"
                                             id="exampleSelect"
                                             value={this.state.monthBorn}
                                             onChange={this.onChange}
                                             >
                                                {
                                                    this.showMonth()
                                                }
                                            </Input>
                                        </Col>
                                        <Col sm={3}>
                                            <Input type="select" 
                                            name="yearBorn"
                                             id="exampleSelect"
                                             value={this.state.value}
                                             onChange={this.onChange}
                                             >
                                                {
                                                    this.showYear()
                                                }
                                            </Input>
                                        </Col>
                                    
                                        </FormGroup>
                                   
                                    <FormGroup check row>
                                        <Col className="btn-update-user" sm={{ size: 10, offset: 2 }}>
                                            <Button>Cập nhật</Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Col>
                        </Row>
                 
        </div>;
    }
}

export default UserProfilePage;