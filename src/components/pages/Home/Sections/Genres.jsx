import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tmdbService } from '../../../../services/tmdb.service';
import LoadingSpinner from '../../../common/LoadingSpinner';
import './Sections.scss';

const Genres = ({ genres }) => {
  const [genreBackgrounds, setGenreBackgrounds] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreBackgrounds = async () => {
      const backgrounds = {};
      for (const genre of genres) {
        backgrounds[genre.id] = await tmdbService.getGenreBackground(genre.id);
      }
      setGenreBackgrounds(backgrounds);
      setLoading(false);
    };

    if (genres?.length) {
      fetchGenreBackgrounds();
    }
  }, [genres]);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="section genres-section">
      <div className="container">
        <h2 className="section-title">Browse by Genre</h2>
        <div className="genres-grid">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/genre/${genre.id}`}
              className="genre-card"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${genreBackgrounds[genre.id]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="genre-content">
                <h3>{genre.name}</h3>
                <p className="movie-count">{genre.count} Movies</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Genres; 