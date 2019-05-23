import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BannerSlider from '../../components/Home/BannerSlider';
import QuickAnimate from '../../components/Home/QuickAnimate'
import { relative } from 'path';

class HomePage extends Component {
    
    render() {
        const { countUsers } = this.props;
        return (
            <div style={{position: relative}}>
                {/* Banner Slider */}
                {/* <BannerSlider /> */}

                {/* Session Products */}
                { this.props.children }

                {/* Quick Animate */}
                <QuickAnimate />
                <div className="count-user-online">online: {countUsers}</div>
            </div>
        );
    }
}

HomePage.propTypes = {

};

export default HomePage;