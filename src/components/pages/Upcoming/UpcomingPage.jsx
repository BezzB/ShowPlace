import React, { useState, useEffect } from 'react';
import { tmdbService } from '../../../services/tmdb.service';
import MovieCard from '../../common/MovieCard';
import LoadingSpinner from '../../common/LoadingSpinner';
import './UpcomingPage.scss';

const UpcomingPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getUpcoming(page);
        if (data.results.length === 0) {
          setHasMore(false);
        } else {
          setMovies(prev => [...prev, ...data.results]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  if (loading && page === 1) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="upcoming-page">
      <div className="page-header">
        <div className="container">
          <h1>Coming Soon</h1>
          <p>Upcoming movie releases</p>
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

export default UpcomingPage; 