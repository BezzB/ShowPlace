import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbService } from '../../services/tmdb.service';
import { getImageUrl } from '../../config/tmdb.config';
import { streamingService } from '../../services/streamingService';
import LoadingSpinner from '../common/LoadingSpinner';
import './WatchPage.scss';
import { WatchNavBar } from './WatchNavBar';

export const MovieWatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [streamUrl, setStreamUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  useEffect(() => {
    const getStreamUrl = async () => {
      const url = await streamingService.getBestSource('movie', id);
      setStreamUrl(url);
    };

    getStreamUrl();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!movie) return <div className="error-message">Movie not found</div>;

  return (
    <div className="watch-page">
      <WatchNavBar 
        title={movie?.title}
        isSeries={false}
      />

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
          <img src={getImageUrl(movie.poster_path)} alt={movie.title} className="poster" />
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
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>
    </div>
  );
}; 