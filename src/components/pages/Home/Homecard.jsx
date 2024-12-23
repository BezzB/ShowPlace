import { useState, useEffect } from 'react';
import MovieCard from '../../common/MovieCard';
import { fetchTopRatedMovies } from '../../../api/tmdb';
import './Homecard.css';
import { useContext } from 'react';
import { AuthContext } from '../../../features/auth/AuthProvider';
import { trackEvent } from '../../../utils/analytics';
import { Link } from 'react-router-dom';

function Homecard() {
  const { user, premium } = useContext(AuthContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchTopRatedMovies();
        setMovies(data.results.slice(0, 6));
        
        // Track page view
        trackEvent('view_home_movies', {
          user_id: user?.uid,
          premium_status: premium
        });
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    getMovies();
  }, [user, premium]);

  return (
    <div className="homecard-container">
      <h2>Top Rated Movies</h2>
      {!premium && (
        <div className="premium-banner">
          <Link to="/pricing">Upgrade to Premium for full access!</Link>
        </div>
      )}
      <div className="movies-grid">
        {movies.map((movie) => (
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
