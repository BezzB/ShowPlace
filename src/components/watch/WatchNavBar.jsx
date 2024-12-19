import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WatchNavBar.scss';

export const WatchNavBar = ({ 
  title, 
  seasons, 
  selectedSeason, 
  selectedEpisode, 
  onSeasonChange, 
  onEpisodeChange,
  currentEpisode,
  isSeries = false 
}) => {
  const navigate = useNavigate();

  return (
    <div className="watch-navbar">
      <div className="nav-content">
        <div className="left-section">
          <button className="back-button" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div className="title-info">
            <h1>{title}</h1>
            {isSeries && currentEpisode && (
              <span className="episode-label">
                S{selectedSeason} E{selectedEpisode} - {currentEpisode.name}
              </span>
            )}
          </div>
        </div>

        {isSeries && (
          <div className="controls-section">
            <div className="season-select">
              <select 
                value={selectedSeason} 
                onChange={(e) => onSeasonChange(Number(e.target.value))}
              >
                {seasons
                  .filter(season => season.episode_count > 0)
                  .map(season => (
                    <option key={season.id} value={season.season_number}>
                      Season {season.season_number}
                    </option>
                  ))}
              </select>
            </div>

            <div className="episode-select">
              <select
                value={selectedEpisode}
                onChange={(e) => onEpisodeChange(Number(e.target.value))}
              >
                {seasons
                  .find(s => s.season_number === selectedSeason)
                  ?.episodes?.map(episode => (
                    <option key={episode.id} value={episode.episode_number}>
                      Episode {episode.episode_number}: {episode.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 