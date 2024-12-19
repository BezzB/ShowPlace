import { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdb.service';

export const useTVShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShows = async () => {
      try {
        setLoading(true);
        const data = await tmdbService.getPopularTVShows();
        setShows(data);
      } catch (error) {
        setError('Error fetching TV shows');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, []);

  return { shows, loading, error };
}; 