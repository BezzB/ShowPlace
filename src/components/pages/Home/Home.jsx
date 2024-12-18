import React from 'react';
import { Homecard } from './Homecard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import '../../../styles/components/Home.scss';

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn next" onClick={onClick}>
      <button>
        <i className="fa fa-chevron-right"></i>
      </button>
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn prev" onClick={onClick}>
      <button>
        <i className="fa fa-chevron-left"></i>
      </button>
    </div>
  );
};

const Home = ({ items }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  };

  return (
    <div className="movies-slider">
      <div className="slider-container">
        <Slider {...settings}>
          {items.map((item) => (
            <div key={item.id} className="slider-item">
              <Homecard item={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
