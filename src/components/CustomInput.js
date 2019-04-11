import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';

class CustomInput extends Component {
    render() {
        let {
            input,
            name,
            items,
            showSize,
            meta: { touched, error, warning }
        } = this.props;
        return (
            <div>
                {
                    items.map(item => {
                        return <Label
                            key={item.id}
                            onClick={showSize}
                        >
                            <input
                                name= "color"
                                onChange ={input.onChange}
                                value={item.id}
                                checked = {input.value === item.id}
                                type="radio"
                            />
                            <img src={item.src_image} />
                        </Label>
                    })
                }
            </div>
           
        )
    }
}

CustomInput.propTypes = {

};

export default CustomInput;