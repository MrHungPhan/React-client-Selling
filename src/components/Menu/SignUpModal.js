import React, { PureComponent, isValidElement } from 'react';
import PropTypes from 'prop-types';
import {  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { Link } from 'react-router-dom';
import  loading from './spinner3.svg'


// // validate
const required = value => (value || typeof value === 'number' ? undefined : 'Required')

const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

  const validateEmail = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

//     // warn
const aol = value =>
value && /.+@aol\.com/.test(value)
    ? 'Really? You still use AOL for your email?'
    : undefined

const alphaNumeric = value =>
value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && error && <span className='err-email'><i class="fas fa-exclamation-circle error-warn"></i>{error}</span>}
        </div>
    </div>
)

class SignUpModal extends PureComponent {
    constructor(props){
        super(props);

        this.state={
            modalSignUp : false,
            message : '',
            isFetching : false
        }
    }

    componentDidUpdate(){
        console.log(this.state.message);
        if(this.state.message){
            this.props.toggleSignIn()
            this.props.messageToSignin(this.state.message)
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            modalSignUp : nextProps.modalSignUp,
        })
        if(nextProps.modalSignUp){
            this.setState({
                message : nextProps.message
            })
        }else{
            this.setState({
                message :''
            })
        }
    }

    toggleSignUp = () => {
        document.body.style.paddingRight = "0";
        this.props.reset();
        this.props.toggleSignUp()
    }

    toggleSignIn = () => {
        this.props.toggleSignIn();
        this.props.reset();
    }

    onSubmit = (values) => {
        this.props.onSignUp(values);
        this.setState({
            ...this.state,
            isFetching: true
        })
        setTimeout(() => {
            this.setState({
                ...this.state,
                isFetching: false
            })
        }, 4000);
    }

    
    render() {
        var { handleSubmit, errorSignup } = this.props
        var { isFetching } =this.state
        const { email , password } = this.props;
        return (
            <Modal isOpen={this.state.modalSignUp} toggle={this.toggleSignUp} className="modal-signup">
            <ModalHeader toggle={this.toggleSignUp}>Đăng kí</ModalHeader>
            <ModalBody>
                 {
                    errorSignup ?  <Alert color="danger">{errorSignup}</Alert> : ''
                }
                <form onSubmit={handleSubmit(this.onSubmit)}>
                        <fieldset>
                            <Field
                                name="email"
                                type="email"
                                component={renderField}
                                label="Email"
                                validate={[validateEmail, required]}
                                warn={aol}
                            />
                        </fieldset>
                        <fieldset>
                            <Field
                                name="username"
                                type="text"
                                component={renderField}
                                label="Tên hiển thị"
                                validate={[required, maxLength(15)]}
                                warn={alphaNumeric}
                            />
                        </fieldset>
                        <fieldset>
                            <Field
                                name="password"
                                type="password"
                                component={renderField}
                                label="Mật khẩu"
                                validate={[required]}
                                warn={alphaNumeric}
                            />
                        </fieldset>
                        <button type="submit">
                           {
                               isFetching && <img className="loading-signup" src={loading} />
                           } 
                            Đăng kí
                        </button>
                    </form>
            </ModalBody>
            <ModalFooter>
                <div className="style-title-footer" onClick={this.toggleSignIn}><i>Bạn đã có tài khoản</i></div>
            </ModalFooter>
        </Modal>
        );
    }
}

SignUpModal.propTypes = {

};

SignUpModal =  reduxForm({
    form : 'signup'
})(SignUpModal)

const selector = formValueSelector('signup') // from => form : 'oauth'


// connect redux get value Field Input
// SignUpModal = connect(state => {
//     const { email, password } = selector(state, 'email', 'password');
//     return {
//         email,
//         password
//     }
// })(SignInModal)

export default SignUpModal