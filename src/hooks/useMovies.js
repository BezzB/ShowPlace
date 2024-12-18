import { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdb.service';

export const useMovies = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const [trendingData, popularData] = await Promise.all([
          tmdbService.getTrending(),
          tmdbService.getPopular()
        ]);
        
        setTrending(trendingData);
        setPopular(popularData.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { trending, popular, loading, error };
}; 