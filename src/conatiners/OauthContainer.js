import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as actions from '../actions/ActionTypes';

import Oauth from '../pages/Oauth';

class OauthContainer extends Component {

    onSubmit = (formData) => {
        console.log('subm')
       this.props.onSignUp(formData)
    }
    render() {
        return (
            <Oauth onSubmit = {this.onSubmit} />
        );
    }
}

OauthContainer.propTypes = {

};

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSignUp : (data) => {
            dispatch(actions.signUp(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OauthContainer);