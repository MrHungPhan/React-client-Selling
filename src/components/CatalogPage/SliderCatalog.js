import React, { Component } from "react";
import Slider from  'react-slick';
import './Slider.css';

export default class SliderCatalog extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 500,
      autoplaySpeed: 2000,
      cssEase: "linear",
      slidesToShow: 1,
      slidesToScroll: 1
    };
    var { slider } = this.props;
    console.log(slider)
    return (
      <div>{
        slider ? <Slider {...settings}>
              {
                slider ? slider.map(item => {
                  return  <div 
                            className = "back"
                            key ={item.id}
                            >
                            <img style={{width : "100%", height: "430px", objectFit: "cover"}} 
                            src={item.image} />
                      </div>
                }) : ''
        }
         
        </Slider> : ''
      }
        
      </div>
    );
  }
}