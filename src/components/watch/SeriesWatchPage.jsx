import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { tvServices } from '../../services/tvServices';
import { streamingService } from '../../services/streamingService';
import { getImageUrl } from '../../config/tmdb.config';
import LoadingSpinner from '../common/LoadingSpinner';
import { WatchNavBar } from './WatchNavBar';
import './WatchPage.scss';

export const SeriesWatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSeason = Number(searchParams.get('season')) || 1;
  const initialEpisode = Number(searchParams.get('episode')) || 1;

  const [series, setSeries] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(initialSeason);
  const [selectedEpisode, setSelectedEpisode] = useState(initialEpisode);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [nextEpisode, setNextEpisode] = useState(null);
  const [streamUrl, setStreamUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  // Fetch series details
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const result = await tvServices.getShowDetails(id);
        setSeries(result.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [id]);

  // Update current and next episode when season or episode changes
  useEffect(() => {
    if (series && selectedSeason) {
      const season = series.seasons.find(s => s.season_number === selectedSeason);
      if (season?.episodes) {
        const episode = season.episodes.find(e => e.episode_number === selectedEpisode);
        if (episode) {
          setCurrentEpisode(episode);

          // Find next episode
          const nextEp = season.episodes.find(e => e.episode_number === selectedEpisode + 1);
          if (nextEp) {
            setNextEpisode(nextEp);
          } else {
            // Look for first episode of next season
            const nextSeason = series.seasons.find(s => s.season_number === selectedSeason + 1);
            if (nextSeason?.episodes?.length > 0) {
              setNextEpisode({
                ...nextSeason.episodes[0],
                season_number: nextSeason.season_number
              });
            } else {
              setNextEpisode(null);
            }
          }
        }
      }
    }
  }, [series, selectedSeason, selectedEpisode]);

  // Update stream URL when episode changes
  useEffect(() => {
    const getStreamUrl = async () => {
      if (currentEpisode) {
        const url = await streamingService.getBestSource('tv', id, selectedSeason, selectedEpisode);
        setStreamUrl(url);
      }
    };

    getStreamUrl();
  }, [id, selectedSeason, selectedEpisode, currentEpisode]);

  // Handle season change
  const handleSeasonChange = useCallback((newSeason) => {
    setSelectedSeason(newSeason);
    setSelectedEpisode(1); // Reset to first episode of new season
  }, []);

  // Handle episode change
  const handleEpisodeChange = useCallback((newEpisode) => {
    setSelectedEpisode(newEpisode);
  }, []);

  // Handle next episode
  const handleNextEpisode = useCallback(() => {
    if (nextEpisode) {
      if (nextEpisode.season_number !== selectedSeason) {
        setSelectedSeason(nextEpisode.season_number);
      }
      setSelectedEpisode(nextEpisode.episode_number);
    }
  }, [nextEpisode, selectedSeason]);

  // Handle video end (autoplay)
  const handleVideoEnd = useCallback(() => {
    if (autoplay && nextEpisode) {
      handleNextEpisode();
    }
  }, [autoplay, nextEpisode, handleNextEpisode]);

  // Handle mouse movement for controls
  const handleMouseMove = useCallback(() => {
    setShowControls(true);
    // Hide controls after 3 seconds of inactivity
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!series) return <div className="error-message">Series not found</div>;

  return (
    <div 
      className="watch-page series-watch"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
    >
      <WatchNavBar 
        title={series.name}
        seasons={series.seasons}
        selectedSeason={selectedSeason}
        selectedEpisode={selectedEpisode}
        onSeasonChange={handleSeasonChange}
        onEpisodeChange={handleEpisodeChange}
        currentEpisode={currentEpisode}
        isSeries={true}
      />

      <div className="video-section">
        <div className="video-container">
          <iframe
            src={streamUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title={`${series.name} S${selectedSeason}E${selectedEpisode}`}
            onEnded={handleVideoEnd}
          />

          {showControls && (
            <div className="video-controls">
              <div className="top-controls">
                <button className="back-button" onClick={() => navigate(-1)}>
                  <i className="fas fa-arrow-left"></i>
                </button>
                <h2>{series.name}</h2>
              </div>

              <div className="bottom-controls">
                <div className="episode-info">
                  <h3>{currentEpisode?.name}</h3>
                  <p>S{selectedSeason} E{selectedEpisode}</p>
                </div>

                <div className="playback-controls">
                  <button 
                    className="autoplay-toggle"
                    onClick={() => setAutoplay(!autoplay)}
                    title={autoplay ? "Disable Autoplay" : "Enable Autoplay"}
                  >
                    <i className={`fas fa-${autoplay ? 'check-circle' : 'circle'}`}></i>
                    <span>Autoplay</span>
                  </button>

                  {nextEpisode && (
                    <button 
                      className="next-episode"
                      onClick={handleNextEpisode}
                      title="Play Next Episode"
                    >
                      <span>Next Episode</span>
                      <i className="fas fa-forward"></i>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="content-section">
        <div className="episode-details">
          <div className="current-episode">
            <h2>Now Playing</h2>
            <div className="episode-info">
              <span className="episode-number">S{selectedSeason} E{selectedEpisode}</span>
              <h3>{currentEpisode?.name}</h3>
              <p>{currentEpisode?.overview}</p>
            </div>
          </div>

          {nextEpisode && (
            <div className="next-up">
              <h2>Next Episode</h2>
              <div className="episode-card" onClick={handleNextEpisode}>
                <div className="thumbnail">
                  {nextEpisode.still_path ? (
                    <img src={getImageUrl(nextEpisode.still_path)} alt={nextEpisode.name} />
                  ) : (
                    <div className="no-image">
                      <i className="fas fa-film"></i>
                    </div>
                  )}
                  <div className="play-overlay">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
                <div className="info">
                  <span className="episode-number">
                    S{nextEpisode.season_number} E{nextEpisode.episode_number}
                  </span>
                  <h3>{nextEpisode.name}</h3>
                  <p>{nextEpisode.overview}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 