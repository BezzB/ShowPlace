import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbService } from '../../services/tmdb.service';
import { getImageUrl } from '../../config/tmdb.config';
import LoadingSpinner from '../common/LoadingSpinner';
import './WatchPage.scss';

export const WatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieData = await tmdbService.getMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!movie) return <div className="error-message">Movie not found</div>;

  const streamUrl = `https://vidsrc.xyz/embed/movie/${id}`;

  return (
    <div className="watch-page">
      <div className="video-section">
        <div className="video-container">
          <iframe
            src={streamUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title={movie.title}
          ></iframe>
        </div>
      </div>

      <div className="info-section">
        <div className="movie-info">
          <img 
            src={getImageUrl(movie.poster_path)} 
            alt={movie.title} 
            className="poster"
          />
          <div className="details">
            <h1>{movie.title}</h1>
            <div className="meta">
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>{movie.runtime} min</span>
              <span>{movie.vote_average.toFixed(1)} ⭐</span>
            </div>
            <p className="overview">{movie.overview}</p>
          </div>
        </div>
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>
    </div>
  );
}; 