import React from 'react';
import { useMovies } from '../../../hooks/useMovies';
import LoadingSpinner from '../../common/LoadingSpinner';
import Trending from './Sections/Trending';
import TopRated from './Sections/TopRated';
import Upcoming from './Sections/Upcoming';
import Genres from './Sections/Genres';
import Popular from './Sections/Popular';
import './HomePage.scss';

export const HomePage = () => {
  const { 
    trending, 
    popular, 
    topRated,
    upcoming,
    genres,
    loading, 
    error 
  } = useMovies();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="home-page">
      {/* Hero Section with first trending movie */}
      <section className="hero-section" style={{ 
        backgroundImage: `url(https://image.tmdb.org/t/p/original${trending[0]?.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        {/* ... hero content ... */}
      </section>

      <Trending items={trending} />
      <TopRated items={topRated} />
      <Upcoming items={upcoming} />
      <Genres genres={genres} />
      <Popular items={popular?.results || []} />
    </div>
  );
};
