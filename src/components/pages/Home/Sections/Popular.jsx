import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../../../common/MovieCard';
import './Sections.scss';

const Popular = ({ items = [] }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 5);

  if (!items || items.length === 0) return null;

  return (
    <section className="section popular-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular on ShowPlace</h2>
          <div className="header-actions">
            {items.length > 5 && (
              <button 
                className="view-all"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll ? (
                  <>Show Less <i className="fas fa-chevron-up"></i></>
                ) : (
                  <>Show More <i className="fas fa-chevron-down"></i></>
                )}
              </button>
            )}
            <button 
              className="view-all"
              onClick={() => navigate('/popular')}
            >
              View All <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
        <div className="movies-grid">
          {displayedItems.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular; 