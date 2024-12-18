import TMDB_CONFIG from '../config/tmdb.config';

const BASE_URL = TMDB_CONFIG.BASE_URL;
const API_KEY = TMDB_CONFIG.API_KEY;

export const tmdbService = {
  // Get trending movies with more options
  getTrending: async (mediaType = 'movie', timeWindow = 'week', page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/trending/${mediaType}/${timeWindow}?api_key=${API_KEY}&page=${page}`
      );
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error fetching trending:', error);
      throw error;
    }
  },

  // Get popular movies with more details
  getPopular: async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Enhanced movie details
  getMovieDetails: async (movieId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,credits,similar,recommendations,images,reviews&include_image_language=en,null`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  },

  // Enhanced search with filters
  searchMovies: async (query, page = 1, options = {}) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}&include_adult=${TMDB_CONFIG.INCLUDE_ADULT}&year=${options.year}&primary_release_year=${options.releaseYear}&region=${options.region || TMDB_CONFIG.REGION}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get movies by genre with additional filters
  getMoviesByGenre: async (genreId, page = 1, options = {}) => {
    try {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&include_adult=${TMDB_CONFIG.INCLUDE_ADULT}&include_video=${TMDB_CONFIG.INCLUDE_VIDEO}&sort_by=${options.sortBy || 'popularity.desc'}&vote_average.gte=${options.minRating}&vote_count.gte=${options.minVotes || 100}&with_original_language=${options.language}&year=${options.year}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      throw error;
    }
  },

  // Get movie genres list
  getGenres: async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await response.json();
      return data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  },

  // New methods for additional functionality
  getUpcoming: async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=${page}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      throw error;
    }
  },

  getTopRated: async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  },
}; 