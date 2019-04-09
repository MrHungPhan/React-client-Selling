import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BannerSlider from '../components/Home/BannerSlider';
import QuickAnimate from '../components/Home/QuickAnimate'

class HomePage extends Component {
    
    render() {
        return (
            <div>
                {/* Banner Slider */}
                {/* <BannerSlider /> */}

                {/* Session Products */}
                { this.props.children }

                {/* Quick Animate */}
                <QuickAnimate />
            </div>
        );
    }
}

HomePage.propTypes = {

};

export default HomePage;