import { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdb.service';

export const useMovies = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [
          trendingData, 
          popularData, 
          topRatedData,
          upcomingData,
          genresData
        ] = await Promise.all([
          tmdbService.getTrending(),
          tmdbService.getPopular(),
          tmdbService.getTopRated(),
          tmdbService.getUpcoming(),
          tmdbService.getGenres()
        ]);
        
        setTrending(trendingData);
        setPopular(popularData.results);
        setTopRated(topRatedData.results);
        setUpcoming(upcomingData.results);
        setGenres(genresData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { 
    trending, 
    popular, 
    topRated,
    upcoming,
    genres,
    loading, 
    error 
  };
}; 