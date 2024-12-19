import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../config/tmdb.config';
import './MovieCard.scss';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleWatch = () => {
    navigate(`/watch/${movie.id}`);
  };

  return (
    <div className="movie-card">
      <div className="card-image">
        <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
        <div className="card-overlay">
          <div className="rating">
            <i className="fas fa-star"></i>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          <div className="actions">
            <button onClick={handleWatch} className="watch-button">
              <i className="fas fa-play"></i>
            </button>
            <Link to={`/movie/${movie.id}`} className="info-button">
              <i className="fas fa-info-circle"></i>
            </Link>
          </div>
          <span className="release-date">
            {new Date(movie.release_date).getFullYear()}
          </span>
        </div>
      </div>
      <div className="card-content">
        <h3>{movie.title}</h3>
        <p className="overview">{movie.overview.substring(0, 100)}...</p>
      </div>
    </div>
  );
};

export default MovieCard; 