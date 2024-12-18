import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../../../../config/tmdb.config';
import './Sections.scss';

const TopRated = ({ items }) => {
  return (
    <section className="section top-rated-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Top Rated</h2>
          <Link to="/top-rated" className="view-all">
            View All <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
        <div className="movies-grid">
          {items?.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="card-image">
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                <div className="card-overlay">
                  <div className="rating">
                    <i className="fas fa-star"></i>
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                  <Link to={`/movie/${movie.id}`} className="play-button">
                    <i className="fas fa-play"></i>
                  </Link>
                </div>
              </div>
              <div className="card-content">
                <h3>{movie.title}</h3>
                <span className="release-date">{new Date(movie.release_date).getFullYear()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRated; 