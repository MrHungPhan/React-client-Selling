import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field , reduxForm } from 'redux-form';
import { Col, Row, Container } from 'reactstrap';
import FacebookButton from 'react-facebook-login';
import GoogleButton from 'react-google-login';

import OauthInput from './OauthInput';

class Oauth extends Component {

    responseGoogle = (response) => {
        console.log(response.accessToken)
    }

    responseFacebook = (response) => {
        console.log(response);
    }

    render() {
        const { handleSubmit } = this.props // props nay cua redux-form
        return (
            <Container>
                <Row>
                    <Col md="7">
                     <form onSubmit = {handleSubmit}>
               <fieldset>
                   <Field 
                   label = "email"
                    name = "email"
                    type = "text"
                    id = "email"
                    component = { OauthInput }
                   />
               </fieldset>
               <fieldset>
                   <Field 
                   label = "password"
                    name = "password"
                    type = "password"
                    id = "password"
                    component = {OauthInput}
                   />
               </fieldset>
               <button type ="submit">Dang ki</button>
           </form>
                    </Col>
                    <Col md ="5">
                    <FacebookButton 
                        appId="586087701869270"
                        fields ="name, email, picture"
                        callback= {this.responseFacebook}
                    />
                    <GoogleButton
                        clientId = "127620076050-ada2ulg5j5s33rbl7dalu75tqauhjbse.apps.googleusercontent.com"
                        onSuccess={this.responseGoogle}
                        onFailure ={this.responseGoogle}
                    />
                    </Col>
                </Row>
                
            </Container>
          
        );
    }
}

Oauth.propTypes = {

};

export default reduxForm({
    form : 'oauth'
})(Oauth);