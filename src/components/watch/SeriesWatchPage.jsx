import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getImageUrl } from '../../config/tmdb.config';
import { tvServices } from '../../services/tvServices';
import { streamingService } from '../../services/streamingService';
import LoadingSpinner from '../common/LoadingSpinner';
import './WatchPage.scss';
import { WatchNavBar } from './WatchNavBar';

export const SeriesWatchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [series, setSeries] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [streamUrl, setStreamUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        setLoading(true);
        const result = await tvServices.getShowDetails(id);
        setSeries(result.data);
        if (result.data.seasons?.length > 0) {
          const firstValidSeason = result.data.seasons.find(s => s.episode_count > 0);
          if (firstValidSeason) {
            setSelectedSeason(firstValidSeason.season_number);
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

  const handleNextEpisode = () => {
    const currentSeason = series.seasons.find(s => s.season_number === selectedSeason);
    if (selectedEpisode < currentSeason.episode_count) {
      setSelectedEpisode(prev => prev + 1);
    } else if (selectedSeason < series.number_of_seasons) {
      const nextSeason = series.seasons.find(s => s.season_number === selectedSeason + 1);
      if (nextSeason && nextSeason.episode_count > 0) {
        setSelectedSeason(prev => prev + 1);
        setSelectedEpisode(1);
      }
    }
  };

  const handlePreviousEpisode = () => {
    if (selectedEpisode > 1) {
      setSelectedEpisode(prev => prev - 1);
    } else if (selectedSeason > 1) {
      const prevSeason = series.seasons.find(s => s.season_number === selectedSeason - 1);
      if (prevSeason && prevSeason.episode_count > 0) {
        setSelectedSeason(prev => prev - 1);
        setSelectedEpisode(prevSeason.episode_count);
      }
    }
  };

  const handleSeasonChange = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
    setSelectedEpisode(1);
  };

  useEffect(() => {
    if (series && selectedSeason) {
      const season = series.seasons.find(s => s.season_number === selectedSeason);
      if (season && season.episodes?.length > 0) {
        setCurrentEpisode(season.episodes[selectedEpisode - 1]);
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

  if (loading) return <LoadingSpinner />;
  if (!series) return <div className="error-message">Series not found</div>;

  const currentSeason = series.seasons.find(s => s.season_number === selectedSeason);

  return (
    <div className="watch-page series-watch">
      <WatchNavBar 
        title={series?.name}
        seasons={series?.seasons || []}
        selectedSeason={selectedSeason}
        selectedEpisode={selectedEpisode}
        onSeasonChange={handleSeasonChange}
        onEpisodeChange={setSelectedEpisode}
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
            title={`${series?.name} S${selectedSeason}E${selectedEpisode}`}
          ></iframe>
        </div>
      </div>

      <div className="tv-info-section">
        <div className="show-info">
          <img src={getImageUrl(series.poster_path)} alt={series.name} className="poster" />
          <div className="details">
            <h1>{series.name}</h1>
            <div className="meta">
              <span>{new Date(series.first_air_date).getFullYear()}</span>
              <span>{series.number_of_seasons} Seasons</span>
              <span>{series.vote_average.toFixed(1)} ⭐</span>
            </div>
            <p className="overview">{series.overview}</p>
          </div>
        </div>

        <div className="episodes-section">
          <div className="episodes-grid">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 