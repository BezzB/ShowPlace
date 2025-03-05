import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbService } from '../../services/tmdb.service';
import { streamingService } from '../../services/streamingService';
import LoadingSpinner from '../common/LoadingSpinner';
import shaka from 'shaka-player';
import './WatchPage.scss';
import { WatchNavBar } from './WatchNavBar';

export const MovieWatchPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const initPlayer = async () => {
      try {
        shaka.polyfill.installAll();
        if (!shaka.Player.isBrowserSupported()) {
          throw new Error('Browser not supported for video playback');
        }

        const player = new shaka.Player(videoRef.current);
        playerRef.current = player;

        player.addEventListener('error', (event) => {
          setError(`Error: ${event.detail.message}`);
        });

        // Configure player UI
        const ui = new shaka.ui.Overlay(
          player,
          videoRef.current.parentElement,
          videoRef.current
        );

        const controls = ui.getControls();
        const config = {
          controlPanelElements: [
            'play_pause',
            'time_and_duration',
            'spacer',
            'volume',
            'fullscreen',
          ],
          addSeekBar: true,
          addBigPlayButton: true,
          seekBarColors: {
            base: 'rgba(255, 255, 255, 0.3)',
            buffered: 'rgba(255, 255, 255, 0.5)',
            played: '#E50914',
          },
        };
        ui.configure(config);

      } catch (error) {
        console.error('Error initializing Shaka Player:', error);
        setError('Error initializing video player');
      }
    };

    initPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getMovieDetails(id);
        setMovie(data);
        const url = await streamingService.getBestSource('movie', id);

        if (playerRef.current && url) {
          await playerRef.current.load(url);
          videoRef.current.play();
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Error loading movie data');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div className="error-message">Movie not found</div>;

  return (
    <div className="watch-page">
      <WatchNavBar 
        title={movie?.title}
        isSeries={false}
      />

      <div className="video-section">
        <div className="video-container">
          <video
            ref={videoRef}
            className="shaka-video"
          />
        </div>
      </div>

      <div className="info-section">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <div className="metadata">
          <span>Release Date: {movie.release_date}</span>
          <span>Rating: {movie.vote_average}/10</span>
        </div>
      </div>
    </div>
  );
};