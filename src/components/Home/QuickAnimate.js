import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {   scroller } from 'react-scroll'
const quick = [
    {
        id : "shirt",
        name : "Áo nam mới",
        src :  "images/i-sh.png"
    },
    {
        id : "trousers",
        name : "Quần nam mới",
        src :  "images/trousers.png"
    },
    {
        id : "accessories",
        name : "Phụ kiện",
        src :  "images/phukien-icon.png"
    },
    {
        id : "shose",
        name : "Giày nam",
        src :  "images/ishose.png"
    }
]

class QuickAnimate extends PureComponent {
    render() {
        return (
            <ul className="quick-animate">      
                    { this.showQuick(quick) }
            </ul>
        );
    }

    onClick = (name) => {
        scroller.scrollTo(name ,{
            duration : 1000,
            delay : 0,
            smooth : 'easeInOutQuart'
        })
    }

    showQuick = (quick) => {
        var resuilt = null;
        resuilt = quick.map((item, index) => {
            return <li key ={index} onClick={() => this.onClick(item.id)} className="icon-quick" id={`icon-quick-${item.id}`} >
                <img src={item.src} alt="" />
                <span className="icon-des">{item.name}</span>
            </li>   
        })
        return resuilt;
    }
}

QuickAnimate.propTypes = {

};

export default QuickAnimate;