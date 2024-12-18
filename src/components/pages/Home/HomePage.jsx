import React from 'react';
import { useMovies } from '../../../hooks/useMovies';
import Popular from './Popular/Popular';
import LoadingSpinner from '../../common/LoadingSpinner';
import './HomePage.scss';

export const HomePage = () => {
  const { trending, popular, loading, error } = useMovies();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" style={{ 
        backgroundImage: `url(https://image.tmdb.org/t/p/original${trending[0]?.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {/* ... hero content ... */}
      </section>

      {/* Popular Section */}
      <Popular items={popular} />

      {/* ... other sections ... */}
    </div>
  );
};
