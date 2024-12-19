import React from 'react';
import { useTVShows } from '../../../hooks/useTVShows';
import MovieCard from '../../common/MovieCard';
import LoadingSpinner from '../../common/LoadingSpinner';
import './TVShowsPage.scss';

export const TVShowsPage = () => {
  const { shows, loading, error } = useTVShows();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="tv-shows-page">
      <div className="container">
        <h1>TV Shows</h1>
        <div className="shows-grid">
          {shows.map(show => (
            <MovieCard
              key={show.id}
              movie={{
                ...show,
                title: show.name,
                release_date: show.first_air_date
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 