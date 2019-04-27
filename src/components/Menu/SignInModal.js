import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';

// validate
const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const emailValidate = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Email khong hop le'
    : undefined

const aol = value =>
value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined

const renderField = ({
    input,
    type,
    meta: { touched, error, warning }
    }) => (
    <div>
        <div>
        <input {...input} type={type} />
        {touched &&
            ((error && <span className="err-email"><i className="fas fa-exclamation-circle error-warn"></i>{error}</span>) ||
            (warning && <span>{warning}</span>))}
        </div>
    </div>
)

class SignInModal extends PureComponent {
    constructor(props){
        super(props);

        this.state={
            modalSignIn : false,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            modalSignIn : nextProps.modalSignIn,
        })
    }

    toggleSignIn =() => {
        this.setState({
            modalSignIn : !this.state.modalSignIn,
        })

        // reset field redux form
        this.props.reset();

        this.props.toggleSignIn();
    }

    toggleOauth = () => {
        this.props.toggleOauth();
        this.props.reset();
    }

    toggleSignUp = () => {
        this.props.toggleSignUp();
        this.props.reset();
    }

    onSubmit = (formData) => {
        this.props.onSignIn(formData);
    }

    render() {
        var { handleSubmit, errorSignin, messageVerify } = this.props

        return (
            <Modal isOpen={this.state.modalSignIn} toggle={this.toggleSignIn} className="modal-signin">
            <ModalHeader toggle={this.toggleSignIn}>Đăng nhập</ModalHeader>
            <ModalBody>
                {
                    errorSignin ?  <Alert color="danger">{errorSignin}</Alert> : ''
                }
                {
                    messageVerify ?  <Alert color="danger">{messageVerify}</Alert> : ''
                }
                <form onSubmit = {handleSubmit(this.onSubmit)}>
                    <fieldset>
                        <label className="label-sign" htmlFor="email">Nhap Email</label>
                        <Field
                            label="email"
                            name="email"
                            type="text"
                            id="email"
                            component={renderField}
                            validate = {[emailValidate, required]}
                            warn = {aol}
                        />
                    </fieldset>
                    <fieldset>
                        <label className="label-sign" htmlFor="password">Mat khau</label>
                        <Field
                            label="password"
                            name="password"
                            type="password"
                            id="password"
                            component={renderField}
                            validate = {required}
                            warn = {aol}
                        />
                    </fieldset>
                    <div onClick={this.toggleOauth} className="toggle-fb-gg"><i>Đăng nhập bằng <span>Facebook</span> hoặc <span>Gmail</span> </i></div>
                    <button type="submit">Đăng nhập</button>
                </form>
            </ModalBody>
            <ModalFooter>
                <div className="style-title-footer forget-pass" onClick={this.toggleSignIn}><i>Quên mật khẩu</i></div>
                <div className="style-title-footer" onClick={this.toggleSignUp}><i>Đăng kí</i></div>
            </ModalFooter>
        </Modal>
        );
    }
}

SignInModal.propTypes = {

};

SignInModal =  reduxForm({
    form : 'oauth'
})(SignInModal)

const selector = formValueSelector('oauth') // from => form : 'oauth'


// connect redux get value Field Input
SignInModal = connect(state => {
    const { email, password } = selector(state, 'email', 'password');
    return {
        email,
        password
    }
})(SignInModal)

export default SignInModal