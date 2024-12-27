import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../features/auth/AuthProvider';
import { fetchTopRatedMovies } from '../../../api/tmdb';
import { trackEvent } from '../../../utils/analytics';
import { FaPlay, FaInfoCircle } from 'react-icons/fa'; // Import icons
import MovieCard from '../../common/MovieCard';
import LoadingSpinner from '../../common/LoadingSpinner';
import './Homecard.scss';

function Homecard() {
  const { user, premium } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchTopRatedMovies();
        setMovies(data.results.slice(0, 12)); // Show more movies
        
        // Track page view
        trackEvent('view_home_movies', {
          user_id: user?.uid,
          premium_status: premium
        });
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [user, premium]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="homecard-container">
      <h2>Top Rated Movies</h2>
      {!premium && (
        <div className="premium-banner">
          <Link to="/pricing">Upgrade to Premium for full access!</Link>
        </div>
      )}
      <div className="featured-movie">
        {movies[0] && (
          <div 
            className="featured-backdrop"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[0].backdrop_path})`
            }}
          >
            <div className="featured-content">
              <h1>{movies[0].title}</h1>
              <p>{movies[0].overview}</p>
              <div className="action-buttons">
                <Link to={`/movie/${movies[0].id}`} className="action-button primary">
                  <FaPlay /> <span>Watch Now</span>
                </Link>
                <Link to={`/movie/${movies[0].id}`} className="action-button secondary">
                  <FaInfoCircle /> <span>More Info</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="movies-grid">
        {movies.slice(1).map((movie) => (
          <MovieCard 
            key={movie.id} 
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
}

export default Homecard;
