import React from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../../../hooks/useMovies';
import LoadingSpinner from '../../common/LoadingSpinner';
import Trending from './Sections/Trending';
import TopRated from './Sections/TopRated';
import Upcoming from './Sections/Upcoming';
import Genres from './Sections/Genres';
import Popular from './Sections/Popular';
import './HomePage.scss';

export const HomePage = () => {
  const { 
    trending, 
    popular, 
    topRated,
    upcoming,
    genres,
    loading, 
    error 
  } = useMovies();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  const featuredMovie = trending[0];

  return (
    <div className="home-page">
      <section className="hero-section" style={{ 
        backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredMovie?.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="overlay">
          <div className="hero-content">
            <h1>{featuredMovie?.title}</h1>
            <div className="meta">
              <span className="rating">
                <i className="fas fa-star"></i> {featuredMovie?.vote_average.toFixed(1)}/10
              </span>
              <span className="release-date">
                <i className="fas fa-calendar"></i> {new Date(featuredMovie?.release_date).getFullYear()}
              </span>
              {featuredMovie?.genres && (
                <span className="genres">
                  <i className="fas fa-film"></i> {featuredMovie.genres.map(g => g.name).join(', ')}
                </span>
              )}
            </div>
            <p className="description">
              {featuredMovie?.overview}
            </p>
            <div className="actions">
              <Link to={`/movie/${featuredMovie?.id}`} className="btn btn-primary">
                <i className="fas fa-play me-2"></i> Watch Now
              </Link>
              <button className="btn btn-secondary">
                <i className="fas fa-info-circle me-2"></i> More Info
              </button>
            </div>
          </div>
        </div>
      </section>

      <Trending items={trending} />
      <Popular items={popular} />
      <TopRated items={topRated} />
      <Upcoming items={upcoming} />
      <Genres genres={genres} />
    </div>
  );
};
