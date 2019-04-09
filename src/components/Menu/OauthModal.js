import React, { Component } from 'react';
import lodash from 'lodash';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FacebookButton from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleButton from 'react-google-login';
import { Field, reduxForm } from 'redux-form';
import { Cookies } from 'react-cookie';
import './OauthModal.css'

var cookie = new Cookies();

class OauthModal extends Component {
    constructor(props) {
        super(props);

        this.toggleOauth = this.toggleOauth.bind(this);
        this.toggleSignIn = this.toggleSignIn.bind(this);
        this.toggleAll = this.toggleAll.bind(this);

        this.state = {
            modalOauth: false,
            modalSignIn: false,
            closeAll: false,
        }
    }

    toggleOauth() {
        if (this.state.modalSignIn) {
            this.setState(prevState => ({
                modalOauth: !prevState.modalOauth,
                modalSignIn: false
            }))
        } else {
            this.setState(prevState => ({
                modalOauth: !prevState.modalOauth
            }));
        }
    }
   
    toggleSignIn() {
        document.body.style.paddingRight = 0;
        this.setState(prevState => ({
            modalOauth: false,
            modalSignIn: !prevState.modalSignIn
        }));
    }

    toggleAll() {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true
        });
    }

    onOpened() {
        document.body.style.paddingRight = "15px";
    }


    responseGoogle = (response) => {
        console.log(response);
        this.props.oauthGoogle(response.accessToken);
        this.toggleOauth();
    }

    responseFacebook = (response) => {
        console.log(response);
    }

    onSubmit = (formData) => {
        this.props.onSignIn(formData);
        if (this.props.errorMessage !== "")
            this.toggleSignIn();
        else {
            this.toggleSignIn();
        }
    }

    logoutUser = () => {
        this.props.logoutUser()
    }


    render() {
        const { handleSubmit, userProfile, errorMessage } = this.props;

        const token = cookie.get('token')
        console.log(token)
        return (
            <div>     {
                token && <div onClick={this.showLogout} className="user-logout">{userProfile.display_name}
                    
                        <ul className="user-profile-info">
                            <li>
                                <i className="fas fa-user-circle"></i><NavLink to='/'>Thong tin</NavLink>
                            </li>
                            <li onClick={this.logoutUser}>
                                <i className="fas fa-sign-out-alt"></i><span>Dang xuat</span>
                            </li>
                        </ul>
                    
                </div>
            }
            {
                !token && <div className="oauth-modal">
                    <div onClick={this.toggleOauth} className="oauth-menu">
                        <i className="far fa-user-circle"></i> Đăng nhập
                    </div>
                     {/* Oauth Google FaceBook */}
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
                                <div className="style-title-footer toggle-signin" onClick={this.toggleSignIn}><i>Dang nhap bang tai khoan</i></div>
                                <div className="style-title-footer" onClick={this.toggleOauth}><i>Dang ki</i></div>
                            </ModalFooter>
                        </Modal>

                        {/* Sign In */}
                        <Modal isOpen={this.state.modalSignIn} toggle={this.toggleSignIn} onOpened={this.onOpened} className="modal-signin">
                            <ModalHeader toggle={this.toggleSignIn}>Đăng nhập</ModalHeader>
                            <ModalBody>
                                {
                                    errorMessage ? <div>{errorMessage}</div> : ''
                                }
                                <form onSubmit={handleSubmit(this.onSubmit)}>
                                    <fieldset>
                                        <label className="label-sign" htmlFor="email">Nhap Email</label>
                                        <Field
                                            label="email"
                                            name="email"
                                            type="text"
                                            id="email"
                                            component="input"
                                        />
                                    </fieldset>
                                    <fieldset>
                                        <label className="label-sign" htmlFor="password">Mat khau</label>
                                        <Field
                                            label="password"
                                            name="password"
                                            type="password"
                                            id="password"
                                            component="input"
                                        />
                                    </fieldset>
                                    <div onClick={this.toggleOauth} className="toggle-fb-gg"><i>Dang nhap bang <span>Facebook</span> hoac <span>Gmail</span> </i></div>
                                    <button type="submit">Dang nhap</button>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <div className="style-title-footer forget-pass" onClick={this.toggleSignIn}><i>Quen mat khau</i></div>
                                <div className="style-title-footer" onClick={this.toggleOauth}><i>Dang ki</i></div>
                            </ModalFooter>
                        </Modal>
                </div>
            }              
                    </div>
        )
    }
}

OauthModal.propTypes = {

};

export default reduxForm({
    form: 'oauth'
})(OauthModal);