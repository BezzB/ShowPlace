import React from 'react';
import { Homecard } from './Homecard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const SmapleNextArrow = (props)=>{
  const {onClick} =props
  return(
    <div className="control-btn" onClick={onClick}>
      <button className='next'>
      <i className='fa fa-cheveron-right'></i>
      </button>
    </div>
  )
}

const SmaplePrevtArrow = (props)=>{
  const {onClick} =props
  return(
    <div className="control-btn" onClick={onClick}>
      <button className='prev'>
      <i className='fa fa-chevron-left'></i>
      </button>
    </div>
  )
}

const Home = ({ items }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow:<SmapleNextArrow />,
    prevArrow:<SmaplePrevtArrow />,

  };
  return (
    <>  
      <div className="homeContainer">
      <Slider {...settings}>
        {items.map((item) => (
          <Homecard key={item.id} item={item} />
        ))}
        </Slider>
      </div>
      
    </>
  );
};

export default Home;
