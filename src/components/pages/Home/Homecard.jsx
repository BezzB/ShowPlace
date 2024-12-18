import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/components/Home.scss';
import '../../../styles/animations.scss';

export const Homecard = ({ item: { id, cover, name, rating, time, desc, starring, genres, tags } }) => {
  // Convert genres string to array if it exists
  const genreList = genres ? genres.split(',').map(g => g.trim()) : [];
  
  return (
    <div className="movie-card hover-lift animate-fade-in">
      <div className="card-image">
        <img src={cover} alt={name} className="w-100 hover-scale" />
      </div>
      <div className="card-content p-3">
        <h2 className="card-title h4 mb-2">{name}</h2>
        <div className="rating mb-2">
          <div className="stars d-flex align-items-center">
            {[...Array(Math.floor(rating))].map((_, index) => (
              <i key={index} className="fa fa-star text-warning"></i>
            ))}
            {rating % 1 !== 0 && <i className="fa fa-star-half text-warning"></i>}
            <span className="ms-2">{rating}/5</span>
          </div>
        </div>
        <div className="details mb-3">
          <span className="badge bg-primary me-2">{time}</span>
          {genreList.length > 0 && genreList.map((genre, index) => (
            <span key={index} className="badge bg-secondary me-1">{genre}</span>
          ))}
        </div>
        <p className="card-text text-muted mb-3">
          {desc.replace(/<br>/g, ' ').substring(0, 100)}...
        </p>
        <div className="card-footer d-flex justify-content-between align-items-center">
          <div className="starring">
            <small className="text-muted">
              Starring: {typeof starring === 'string' ? starring : starring?.join(', ')}
            </small>
          </div>
          <Link to={`/singlepage/${id}`} className="btn btn-primary hover-scale">
            Watch Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Homecard;
