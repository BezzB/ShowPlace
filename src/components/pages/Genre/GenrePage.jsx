import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbService } from '../../../services/tmdb.service';
import { getImageUrl } from '../../../config/tmdb.config';
import LoadingSpinner from '../../common/LoadingSpinner';
import MovieCard from '../../common/MovieCard';
import './GenrePage.scss';

const GenrePage = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchGenreDetails = async () => {
      try {
        setLoading(true);
        // Get genre details
        const genres = await tmdbService.getGenres();
        const currentGenre = genres.find(g => g.id === parseInt(id));
        setGenre(currentGenre);

        // Get movies for this genre
        const response = await tmdbService.getMoviesByGenre(id, page);
        setMovies(response.results);
        setTotalPages(response.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreDetails();
  }, [id, page]);

  const loadMore = async () => {
    if (page < totalPages) {
      try {
        const nextPage = page + 1;
        const response = await tmdbService.getMoviesByGenre(id, nextPage);
        setMovies(prevMovies => [...prevMovies, ...response.results]);
        setPage(nextPage);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading && page === 1) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!genre) return <div className="error-message">Genre not found</div>;

  return (
    <div className="genre-page">
      <div className="genre-header">
        <div className="container">
          <h1>{genre.name} Movies</h1>
          <p className="genre-description">
            Explore our collection of {genre.name.toLowerCase()} movies
          </p>
        </div>
      </div>

      <div className="genre-content">
        <div className="container">
          <div className="movies-grid">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {page < totalPages && (
            <div className="load-more">
              <button 
                className="btn-load-more"
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenrePage; 