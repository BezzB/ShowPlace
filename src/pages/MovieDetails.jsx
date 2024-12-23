import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../features/auth/AuthProvider';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CastSection from '../components/CastSection';
import SimilarMovies from '../components/SimilarMovies';
import ReviewSection from '../components/ReviewSection';

function MovieDetails() {
  const { id } = useParams();
  const { premium } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similar, setSimilar] = useState([]);
  const [cast, setCast] = useState([]);
  
  useEffect(() => {
    // Add fetch movie details logic
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="movie-details">
      {/* Hero Section */}
      <div className="hero-backdrop">
        {/* ... existing hero content ... */}
        
        {/* Add Watch Options */}
        <div className="watch-options">
          {!premium && <div className="premium-badge">Premium Content</div>}
          <button className="play-btn" disabled={!premium}>
            Play Now
          </button>
          <button className="trailer-btn">Watch Trailer</button>
          <button className="add-list-btn">Add to Watchlist</button>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="content-grid">
        <CastSection cast={cast} />
        <SimilarMovies movies={similar} />
        <ReviewSection movieId={movie?.id} />
      </div>
    </div>
  );
}

export default MovieDetails; 