import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { tmdbService } from '../../../services/tmdb.service';
import MovieCard from '../../common/MovieCard';
import LoadingSpinner from '../../common/LoadingSpinner';
import './GenrePage.scss';

const GenrePage = () => {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

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
        if (response.results.length === 0) {
          setHasMore(false);
        } else {
          setMovies(prev => [...prev, ...response.results]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreDetails();
  }, [id, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (loading && page === 1) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!genre) return <div className="error-message">Genre not found</div>;

  return (
    <div className="genre-page">
      <div className="page-header">
        <div className="container">
          <h1>{genre.name} Movies</h1>
          <p className="genre-description">
            Explore our collection of {genre.name.toLowerCase()} movies
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="movies-grid">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {hasMore && (
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