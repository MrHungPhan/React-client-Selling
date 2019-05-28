import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FacebookButton from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleButton from 'react-google-login';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'

class ThirtOauthModal extends PureComponent {
    constructor(props){
        super(props);

        this.state= {
            modalOauth : false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            modalOauth : nextProps.modalOauth
        })
    }

    toggleOauth = () =>{
        this.setState({
            modalOauth : !this.state.modalOauth
        })
        this.props.toggleOauth();
    }

    toggleSignIn = () => {
        this.props.toggleSignIn();
    }

    toggleSignUp = () => {
        this.props.toggleSignUp()
    }

    responseGoogle = (response) => {
        this.props.oauthGoogle(response.accessToken);
        this.toggleOauth();
    }

    responseFacebook = (response) => {
        console.log(response);
        this.props.oauthFacebook(response.accessToken);
        this.toggleOauth();
    }

    render() {
        return (
            <Modal size="xs" isOpen={this.state.modalOauth} toggle={this.toggleOauth} className="modal-oauth">
            <ModalHeader toggle={this.toggleOauth}>Đăng nhập</ModalHeader>
            <ModalBody>
                <FacebookButton
                    render={renderProps => (
                        <button
                            className="oauth-button face-oauth"
                            onClick={renderProps.onClick}>
                            <i className="fab fa-facebook-f"></i>
                            <span>Facebook</span>
                        </button>
                    )}
                    appId="586087701869270"
                    fields="name, email, picture"
                    callback={this.responseFacebook}
                />
                <GoogleButton
                    clientId="127620076050-ada2ulg5j5s33rbl7dalu75tqauhjbse.apps.googleusercontent.com"
                    render={renderProps => (
                        <button
                            className="oauth-button google-oauth"
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}>
                            <i className="fab fa-google-plus-g"></i>
                            <span>Google +</span>
                        </button>
                    )}
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}

                />
                <br />

            </ModalBody>
            <ModalFooter>
                <div className="style-title-footer toggle-signin" onClick={this.toggleSignIn}><i>Đăng nhập bằng tài khoản</i></div>
                <div className="style-title-footer" onClick={this.toggleSignUp}><i>Đăng kí</i></div>
            </ModalFooter>
        </Modal>

        );
    }
}

ThirtOauthModal.propTypes = {

};

export default ThirtOauthModal;