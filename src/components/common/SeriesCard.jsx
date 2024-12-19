import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../config/tmdb.config';
import './SeriesCard.scss';

const SeriesCard = ({ show }) => {
  if (!show) return null;

  const {
    id,
    name,
    poster_path,
    backdrop_path,
    vote_average,
    first_air_date,
    overview
  } = show;

  const imageUrl = getImageUrl(poster_path || backdrop_path);

  return (
    <div className="series-card">
      <div className="card-image">
        <img src={imageUrl} alt={name} />
        <div className="card-overlay">
          <div className="rating">
            <i className="fas fa-star"></i>
            <span>{vote_average?.toFixed(1)}</span>
          </div>
          <Link to={`/tv/${id}`} className="info-button">
            <i className="fas fa-info-circle"></i>
          </Link>
          <span className="release-date">
            {first_air_date ? new Date(first_air_date).getFullYear() : 'TBA'}
          </span>
        </div>
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p className="overview">{overview?.substring(0, 100)}...</p>
      </div>
    </div>
  );
};

export default SeriesCard; 