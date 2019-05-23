import React, { PureComponent } from 'react';
import { Container,Button, Form, FormGroup, Input, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './header.css'

class Header extends PureComponent {
    constructor(props){
        super(props);

        this.state={
            keySearch : ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
    }

    componentWillReceiveProps(){
        if(this.props.location.pathname !== '/search'){
            this.setState({
                keySearch:''
            })
        }
    }

    render() { 
        const {pathName } = this.props;
        var nameSearch = ''
        if(pathName){
            nameSearch = pathName.split('/')[pathName.split('/').length - 1]
            console.log(nameSearch)
        }
        
        const headerLocation = this.props.location;
        console.log('hearder - ', headerLocation)
        return <div className="header">
            <Container>
            <Row>
                <Col md="3" className="doc-logo">
                    <img src=".././images/logo4.png" /> 
                </Col>
                <Col md="7" className="form-search">
                <Form inline onSubmit={this.onSubmit} >
                    <FormGroup>
                        <Input type="text"
                         name="keySearch" 
                         placeholder="Nhập từ khóa cần tìm"
                        value={this.state.keySearch}
                        onChange={this.onChange}
                          >
                          </Input>  
                        {/* {
                            (headerLocation.pathname !== '/' && headerLocation.pathname !== '/lien-he') && <div className="search-cata">{nameSearch}</div>
                        } */}
                    </FormGroup>
                    {' '}
                    <Link to={`/search?key=${this.state.keySearch}`}><i class="fas fa-search"></i></Link>
                    </Form>
                </Col>
                <Col className='hot-line'>
                    <div>Hotline : 037.777.343</div>
                </Col>
            </Row>
           
            </Container>
        </div>;
    }
}

const mapStateToProps = state => {
    return{
        pathName : state.productsCatalogPage.path
    }
    
}
 
export default connect(mapStateToProps, null)(Header);