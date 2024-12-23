import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopMovie } from '../api/tmdb';

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
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
            url(https://image.tmdb.org/t/p/original${topMovie.backdrop_path})`
          }}>
          <div className="hero-content">
            <h1>{topMovie.title}</h1>
            <p>{topMovie.overview}</p>
            <Link to={`/movie/${topMovie.id}`} className="cta-button">
              Learn More
            </Link>
          </div>
        </div>
      )}
      {/* Rest of your landing page content */}
    </div>
  );
}

export default LandingPage; 