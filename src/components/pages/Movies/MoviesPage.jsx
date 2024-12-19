import React from 'react';
import { useMovies } from '../../../hooks/useMovies';
import MovieGrid from '../../common/MovieGrid';
import './MoviesPage.scss';

export const MoviesPage = () => {
  const { popular, loading, error } = useMovies();

  return (
    <div className="movies-page">
      <h1>Movies</h1>
      <MovieGrid movies={popular} loading={loading} error={error} />
    </div>
  );
}; 