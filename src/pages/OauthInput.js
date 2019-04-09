import React, { Component } from 'react';
import PropTypes from 'prop-types';

class OauthInput extends Component {
    render() {
        const { input : { value , onChange } } = this.props
        return (
            <div className ="form-group">
                <label htmlFor = { this.props.id }>{ this.props.label}</label>
                <input 
                    name = { this.props.name }
                    id = { this.props.id }
                    className = "form-control"
                    type = { this.props.type }
                    value = {value}
                    onChange = { onChange }
                />
            </div>
        );
    }
}

OauthInput.propTypes = {

};

export default OauthInput;