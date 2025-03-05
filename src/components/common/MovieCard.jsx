import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../features/auth/AuthProvider';
import LazyImage from './LazyImage';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const premium = auth?.premium || false;

  if (!movie) return null;

  const {
    id,
    title,
    name,
    poster_path,
    vote_average,
    release_date,
    first_air_date,
    overview
  } = movie;

  const displayTitle = title || name;
  const releaseDate = release_date || first_air_date;
  const mediaType = title ? 'movie' : 'tv';

  const handleWatch = () => {
    navigate(`/watch/${mediaType}/${id}`);
  };

  return (
    <div className="movie-card">
      <div className="card-image">
        <LazyImage 
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={displayTitle}
          placeholder="/placeholder-poster.png"
        />
        {movie.premium && !premium && (
          <div className="premium-overlay">
            <span>Premium Content</span>
          </div>
        )}
        <div className="card-overlay">
          <div className="rating">
            <i className="fas fa-star"></i>
            <span>{vote_average?.toFixed(1)}</span>
          </div>
          <div className="actions">
            <button onClick={handleWatch} className="watch-button">
              <i className="fas fa-play"></i>
            </button>
            <Link to={`/${mediaType}/${id}`} className="info-button">
              <i className="fas fa-info-circle"></i>
            </Link>
          </div>
          <span className="release-date">
            {releaseDate ? new Date(releaseDate).getFullYear() : 'TBA'}
          </span>
        </div>
      </div>
      <div className="card-content">
        <h3>{displayTitle}</h3>
        <p className="overview">{overview?.substring(0, 100)}...</p>
      </div>
    </div>
  );
};

export default MovieCard;