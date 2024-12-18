import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tmdbService } from '../../../../services/tmdb.service';
import { getBackdropUrl } from '../../../../config/tmdb.config';
import LoadingSpinner from '../../../common/LoadingSpinner';
import './Sections.scss';

// Genre descriptions
const genreDescriptions = {
  Action: 'Explosive sequences and thrilling adventures',
  Adventure: 'Epic journeys and daring quests',
  Animation: 'Imaginative storytelling through animation',
  Comedy: 'Laugh-out-loud entertainment',
  Crime: 'Gripping tales of law and disorder',
  Documentary: 'Real stories that inspire and inform',
  Drama: 'Emotional and compelling narratives',
  Family: 'Entertainment for all ages',
  Fantasy: 'Magical worlds and mythical creatures',
  History: 'Stories from the past that shaped our present',
  Horror: 'Spine-chilling thrills and scares',
  Music: 'Rhythm, beats, and musical journeys',
  Mystery: 'Intriguing puzzles and suspenseful plots',
  Romance: 'Love stories that touch the heart',
  'Science Fiction': 'Futuristic tales and technological wonders',
  'TV Movie': 'Made-for-television entertainment',
  Thriller: 'Heart-pounding suspense',
  War: 'Stories of conflict and courage',
  Western: 'Tales of the American frontier'
};

const Genres = ({ genres }) => {
  const [genreBackdrops, setGenreBackdrops] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBackdrops = async () => {
      try {
        setLoading(true);
        const backdropPromises = genres.map(async (genre) => {
          const backdrop = await tmdbService.getGenreBackdrops(genre.id);
          return { id: genre.id, backdrop };
        });

        const backdrops = await Promise.all(backdropPromises);
        const backdropMap = backdrops.reduce((acc, { id, backdrop }) => {
          acc[id] = backdrop;
          return acc;
        }, {});

        setGenreBackdrops(backdropMap);
      } catch (error) {
        console.error('Error fetching backdrops:', error);
      } finally {
        setLoading(false);
      }
    };

    if (genres?.length > 0) {
      fetchBackdrops();
    }
  }, [genres]);

  return (
    <section className="section genres-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Browse by Genre</h2>
        </div>
        <div className="genres-grid">
          {genres?.map((genre) => (
            <Link 
              key={genre.id} 
              to={`/genre/${genre.id}`} 
              className="genre-card"
              style={{
                backgroundImage: genreBackdrops[genre.id]
                  ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${getBackdropUrl(genreBackdrops[genre.id])})`
                  : 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9))'
              }}
            >
              <div className="genre-content">
                <h3>{genre.name}</h3>
                <p className="description">
                  {genreDescriptions[genre.name] || 'Discover amazing movies in this genre'}
                </p>
                <span className="explore">
                  Explore Now <i className="fas fa-arrow-right"></i>
                </span>
              </div>
            </Link>
          ))}
        </div>
        {loading && <LoadingSpinner />}
      </div>
    </section>
  );
};

export default Genres; 