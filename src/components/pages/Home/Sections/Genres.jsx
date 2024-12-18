import React from 'react';
import { Link } from 'react-router-dom';
import './Sections.scss';

const Genres = ({ genres }) => {
  return (
    <section className="section genres-section">
      <div className="container">
        <h2 className="section-title">Browse by Genre</h2>
        <div className="genres-grid">
          {genres?.map((genre) => (
            <Link 
              key={genre.id} 
              to={`/genre/${genre.id}`} 
              className="genre-card"
            >
              <h3>{genre.name}</h3>
              <span className="explore">
                Explore <i className="fas fa-arrow-right"></i>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Genres; 