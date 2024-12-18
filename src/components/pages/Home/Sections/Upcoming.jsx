import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../../../config/tmdb.config';
import './Sections.scss';

const Upcoming = ({ items }) => {
  return (
    <section className="section upcoming-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Coming Soon</h2>
          <Link to="/upcoming" className="view-all">
            View All <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="movies-grid">
          {items?.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="card-image">
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                <div className="card-overlay">
                  <div className="release-info">
                    <i className="fas fa-calendar"></i>
                    <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                  </div>
                  <Link to={`/movie/${movie.id}`} className="play-button">
                    <i className="fas fa-info-circle"></i>
                  </Link>
                </div>
              </div>
              <div className="card-content">
                <h3>{movie.title}</h3>
                <p className="overview">{movie.overview.substring(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Upcoming; 