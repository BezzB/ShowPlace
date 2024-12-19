import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getImageUrl } from '../../config/tmdb.config';
import { tvServices } from '../../services/tvServices';
import { streamingService } from '../../services/streamingService';
import LoadingSpinner from '../common/LoadingSpinner';
import './WatchPage.scss';
import { WatchNavBar } from './WatchNavBar';

export const SeriesWatchPage = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [streamUrl, setStreamUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [streamError, setStreamError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const result = await tvServices.getShowDetails(id);
        console.log('Series Data:', result.data);
        setSeries(result.data);
        
        if (result.data.seasons?.length > 0) {
          const firstValidSeason = result.data.seasons.find(s => s.episodes?.length > 0);
          console.log('First Valid Season:', firstValidSeason);
          if (firstValidSeason) {
            setSelectedSeason(firstValidSeason.season_number);
            setSelectedEpisode(1);
            setCurrentEpisode(firstValidSeason.episodes[0]);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeries();
  }, [id]);

  const handleSeasonChange = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
    setSelectedEpisode(1);
  };

  useEffect(() => {
    if (series && selectedSeason) {
      const season = series.seasons.find(s => s.season_number === selectedSeason);
      if (season?.episodes?.length > 0) {
        const episode = season.episodes.find(e => e.episode_number === selectedEpisode);
        if (episode) {
          setCurrentEpisode(episode);
        }
      }
    }
  }, [series, selectedSeason, selectedEpisode]);

  useEffect(() => {
    const getStreamUrl = async () => {
      const url = await streamingService.getBestSource('tv', id, selectedSeason, selectedEpisode);
      setStreamUrl(url);
    };

    if (currentEpisode) {
      getStreamUrl();
    }
  }, [id, selectedSeason, selectedEpisode, currentEpisode]);

  const handleIframeError = useCallback(() => {
    setIframeLoading(false);
    setStreamError(true);
    
    if (retryCount < Object.keys(streamingService.sources).length) {
      const sources = Object.keys(streamingService.sources);
      streamingService.currentSource = sources[(retryCount + 1) % sources.length];
      setRetryCount(prev => prev + 1);
      
      const newUrl = streamingService.getStreamingUrl(
        'tv', 
        id, 
        selectedSeason, 
        selectedEpisode
      );
      setStreamUrl(newUrl);
    }
  }, [retryCount, id, selectedSeason, selectedEpisode]);

  if (loading) return <LoadingSpinner />;
  if (!series) return <div className="error-message">Series not found</div>;

  const currentSeason = series.seasons.find(s => s.season_number === selectedSeason);

  return (
    <div className="watch-page series-watch">
      <WatchNavBar 
        title={series?.name}
        seasons={series?.seasons?.filter(s => s.episodes?.length > 0) || []}
        selectedSeason={selectedSeason}
        selectedEpisode={selectedEpisode}
        onSeasonChange={handleSeasonChange}
        onEpisodeChange={setSelectedEpisode}
        isSeries={true}
      />

      <div className="video-section">
        <div className="video-container">
          {iframeLoading && (
            <div className="loading-overlay">
              <LoadingSpinner />
              <p>Loading video stream...</p>
            </div>
          )}
          {streamError && (
            <div className="stream-error">
              <i className="fas fa-exclamation-circle"></i>
              <p>
                {retryCount >= Object.keys(streamingService.sources).length
                  ? "All sources failed. Please try again later."
                  : "Trying alternative source..."}
              </p>
              <button 
                onClick={() => {
                  setRetryCount(0);
                  setStreamError(false);
                  setIframeLoading(true);
                  window.location.reload();
                }}
              >
                Retry
              </button>
            </div>
          )}
          <iframe
            key={streamUrl}
            src={streamUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title={`${series?.name} S${selectedSeason}E${selectedEpisode}`}
            allow="encrypted-media; autoplay; fullscreen"
            style={{ 
              display: iframeLoading || streamError ? 'none' : 'block',
              backgroundColor: '#000'
            }}
            onLoad={() => {
              setIframeLoading(false);
              setStreamError(false);
            }}
            onError={handleIframeError}
          />
        </div>
      </div>

      {!loading && series && (
        <div className="content-section">
          <div className="main-content">
            {currentEpisode && (
              <div className="current-episode-info">
                <h2>Now Playing</h2>
                <div className="episode-details">
                  <span className="episode-number">S{selectedSeason} E{selectedEpisode}</span>
                  <h3>{currentEpisode.name}</h3>
                  <p>{currentEpisode.overview}</p>
                </div>
              </div>
            )}
          </div>

          <div className="episodes-sidebar">
            <div className="season-tabs">
              {series.seasons
                .filter(season => season.episodes?.length > 0)
                .map(season => (
                  <button
                    key={season.id}
                    className={`season-tab ${selectedSeason === season.season_number ? 'active' : ''}`}
                    onClick={() => handleSeasonChange(season.season_number)}
                  >
                    Season {season.season_number}
                  </button>
                ))}
            </div>

            <div className="episodes-list">
              {currentSeason?.episodes?.map(episode => (
                <div 
                  key={episode.id} 
                  className={`episode-card ${selectedEpisode === episode.episode_number ? 'active' : ''}`}
                  onClick={() => setSelectedEpisode(episode.episode_number)}
                >
                  <div className="episode-thumbnail">
                    {episode.still_path ? (
                      <img src={getImageUrl(episode.still_path)} alt={episode.name} />
                    ) : (
                      <div className="no-image">
                        <i className="fas fa-film"></i>
                      </div>
                    )}
                    <div className="play-overlay">
                      <i className="fas fa-play"></i>
                    </div>
                  </div>
                  <div className="episode-details">
                    <div className="episode-header">
                      <span className="episode-number">Episode {episode.episode_number}</span>
                      <span className="episode-runtime">{episode.runtime} min</span>
                    </div>
                    <h3>{episode.name}</h3>
                    <p className="episode-overview">{episode.overview}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 