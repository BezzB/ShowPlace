import React from 'react';
import { Link } from 'react-router-dom';
import { SinglePage } from '../../watch/SinglePage';

export const Homecard = ({ item: { id, cover, name, rating, time, desc, starring, genres, tags, video } }) => {
  return (
    <>
    <container className="container-sm">
       <div className="box">
        <div className="coverImage">
          <img src={cover} alt="" />
          </div>
        <div className="content flex">
        <div className="details row">
          <h1>{name}</h1>
        <div className="rating flex">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star-half"></i>
        </div>
        <label>{rating} / 5</label>
        <label>Time: {time}</label>
        </div>
        <p className='p'>{desc}
        <div className="playButton">
          <Link to={'/SinglePage/${id}'}>
            <button>
              <div className="img">
              <img src="./images/play-button.png" alt="" />
              <img src="./images/play.png" alt="" className='change'/>
              Watch Thrailer
              </div>
            </button>
          </Link>
        </div>
        </p>
        <div className='cast'>
          <h4> 
            <span>Starring: </span>
            {starring}
          </h4>
          <h4>
            <span>Genre: </span>
            {genres}
          </h4>
          <h4>
            <span>Tags: </span>
            {tags}
          </h4>
        </div>        
        <button type="button" class="btn btn-danger" > 
        <i class="fa-solid fa-play"></i>Play Now
        </button>        
      </div>
      </div>    
        
      </container>
    </>
  );
};

export default Homecard;
