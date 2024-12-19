import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tmdbService } from '../../../services/tmdb.service';
import { getImageUrl } from '../../../config/tmdb.config';
import LoadingSpinner from '../../common/LoadingSpinner';
import './SeriesDetailsPage.scss';

export const SeriesDetailsPage = () => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [currentSeason, setCurrentSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seasonLoading, setSeasonLoading] = useState(false);

  useEffect(() => {
    const fetchSeriesDetails = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getTVShowDetails(id);
        console.log('Series Data:', data);
        console.log('Seasons:', data.seasons);
        setSeries(data);
        if (data.seasons?.length > 0) {
          const firstValidSeason = data.seasons.find(s => s.episode_count > 0);
          console.log('First Valid Season:', firstValidSeason);
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

    fetchSeriesDetails();
  }, [id]);

  useEffect(() => {
    const fetchSeasonDetails = async () => {
      if (!series || !selectedSeason) return;

      try {
        setSeasonLoading(true);
        const seasonData = await tmdbService.getSeasonDetails(id, selectedSeason);
        setCurrentSeason(seasonData);
      } catch (error) {
        console.error('Error fetching season details:', error);
      } finally {
        setSeasonLoading(false);
      }
    };

    fetchSeasonDetails();
  }, [id, selectedSeason, series]);

  if (loading) return <LoadingSpinner />;
  if (!series) return <div className="error-message">Series not found</div>;

  return (
    <div className="series-details-page">
      <div className="backdrop">
        <img src={getImageUrl(series.backdrop_path, 'original')} alt={series.name} />
        <div className="overlay"></div>
      </div>

      <div className="content">
        <div className="series-header">
          <div className="poster">
            <img src={getImageUrl(series.poster_path)} alt={series.name} />
          </div>
          <div className="info">
            <h1>{series.name}</h1>
            <div className="meta">
              <span className="year">{new Date(series.first_air_date).getFullYear()}</span>
              <span className="seasons">{series.number_of_seasons} Seasons</span>
              <span className="rating">
                <i className="fas fa-star"></i> {series.vote_average?.toFixed(1)}
              </span>
            </div>
            <div className="genres">
              {series.genres?.map(genre => (
                <span key={genre.id} className="genre">{genre.name}</span>
              ))}
            </div>
            <p className="overview">{series.overview}</p>
            <div className="additional-info">
              <div className="info-item">
                <span className="label">Status</span>
                <span className="value">{series.status}</span>
              </div>
              <div className="info-item">
                <span className="label">Network</span>
                <span className="value">{series.networks?.[0]?.name}</span>
              </div>
              <div className="info-item">
                <span className="label">Episodes</span>
                <span className="value">{series.number_of_episodes}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="seasons-section">
          <div className="seasons-tabs">
            {series?.seasons
              ?.filter(season => season.season_number > 0)
              .map(season => (
                <button
                  key={season.id}
                  className={`season-tab ${selectedSeason === season.season_number ? 'active' : ''}`}
                  onClick={() => setSelectedSeason(season.season_number)}
                >
                  <div className="tab-content">
                    <span className="season-number">Season {season.season_number}</span>
                    <span className="episode-count">{season.episode_count} Episodes</span>
                    <span className="air-date">
                      {season.air_date ? new Date(season.air_date).getFullYear() : 'TBA'}
                    </span>
                  </div>
                  {selectedSeason === season.season_number && (
                    <div className="active-indicator">
                      <i className="fas fa-play"></i>
                    </div>
                  )}
                </button>
              ))}
          </div>

          {seasonLoading ? (
            <div className="season-loading">
              <LoadingSpinner />
            </div>
          ) : currentSeason && (
            <div className="season-content">
              <div className="season-header">
                <div className="season-info">
                  <h2>Season {currentSeason.season_number}</h2>
                  <div className="season-meta">
                    <span>{currentSeason.episodes?.length} Episodes</span>
                    <span>{new Date(currentSeason.air_date).getFullYear()}</span>
                  </div>
                  <p className="season-overview">
                    {currentSeason.overview || `Season ${currentSeason.season_number} of ${series.name}`}
                  </p>
                </div>
              </div>

              <div className="episodes-grid">
                {currentSeason.episodes?.map(episode => (
                  <div key={episode.id} className="episode-card">
                    <div className="episode-thumbnail">
                      {episode.still_path ? (
                        <img src={getImageUrl(episode.still_path)} alt={episode.name} />
                      ) : (
                        <div className="no-image">
                          <i className="fas fa-film"></i>
                        </div>
                      )}
                      <Link 
                        to={`/watch/tv/${series.id}?season=${currentSeason.season_number}&episode=${episode.episode_number}`} 
                        className="play-button"
                      >
                        <i className="fas fa-play"></i>
                        <span>Play Episode</span>
                      </Link>
                    </div>
                    <div className="episode-info">
                      <div className="episode-header">
                        <span className="episode-number">Episode {episode.episode_number}</span>
                        <span className="runtime">{episode.runtime} min</span>
                      </div>
                      <h3>{episode.name}</h3>
                      <p className="air-date">
                        Aired: {new Date(episode.air_date).toLocaleDateString()}
                      </p>
                      <p className="overview">{episode.overview}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {series.credits?.cast && (
          <div className="cast-section">
            <h2>Cast</h2>
            <div className="cast-grid">
              {series.credits.cast.slice(0, 12).map(actor => (
                <div key={actor.id} className="cast-card">
                  {actor.profile_path ? (
                    <img src={getImageUrl(actor.profile_path)} alt={actor.name} />
                  ) : (
                    <div className="no-image">
                      <i className="fas fa-user"></i>
                    </div>
                  )}
                  <div className="actor-info">
                    <h4>{actor.name}</h4>
                    <p>{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 