import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TMDB_CONFIG from '../../../../config/tmdb.config';
import './Popular.scss';

const Popular = ({ items }) => {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 4);

  return (
    <section className="popular-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular on ShowPlace</h2>
          <button 
            className="view-all"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'View All'}
          </button>
        </div>
        <div className="popular-grid">
          {displayedItems.map((movie) => (
            <div key={movie.id} className="popular-card">
              <div className="card-image">
                <img 
                  src={`${TMDB_CONFIG.IMAGE_BASE_URL}${TMDB_CONFIG.POSTER_SIZE}${movie.poster_path}`}
                  alt={movie.title} 
                />
                <div className="card-overlay">
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <Link to={`/movie/${movie.id}`} className="play-button">
                    <i className="fas fa-play"></i>
                  </Link>
                  <span className="duration">{movie.release_date.split('-')[0]}</span>
                </div>
              </div>
              <div className="card-content">
                <h3>{movie.title}</h3>
                <p className="description">{movie.overview.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular; 