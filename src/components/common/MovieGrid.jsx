import React from 'react';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';
import './MovieGrid.scss';

const MovieGrid = ({ movies, loading, error }) => {
  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!movies?.length) return <div className="no-results">No movies found</div>;

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid; 