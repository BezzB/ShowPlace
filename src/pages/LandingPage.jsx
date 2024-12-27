import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopMovie } from '../api/tmdb';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import './LandingPage.scss';

function LandingPage() {
  const [topMovie, setTopMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopMovie = async () => {
      try {
        const movie = await fetchTopMovie();
        setTopMovie(movie);
      } catch (error) {
        console.error('Error fetching top movie:', error);
      } finally {
        setLoading(false);
      }
    };

    getTopMovie();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="landing-page">
      {topMovie && (
        <div className="hero-section" 
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${topMovie.backdrop_path})`
          }}>
          <div className="hero-content">
            <h1>{topMovie.title}</h1>
            <p>{topMovie.overview}</p>
            <div className="cta-buttons">
              <Link to={`/movie/${topMovie.id}`} className="cta-button">
                <FaPlay /> Watch Now
              </Link>
              <Link to={`/movie/${topMovie.id}`} className="cta-button secondary">
                <FaInfoCircle /> More Info
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage; 