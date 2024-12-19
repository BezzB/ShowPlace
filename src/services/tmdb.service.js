import TMDB_CONFIG from '../config/tmdb.config';

const BASE_URL = TMDB_CONFIG.BASE_URL;
const API_KEY = TMDB_CONFIG.API_KEY;
const IMAGE_BASE_URL = TMDB_CONFIG.IMAGE_BASE_URL;

const genreBackgrounds = {
  28: '/action-background.jpg',    // Action
  12: '/adventure-background.jpg', // Adventure
  16: '/animation-background.jpg', // Animation
  35: '/comedy-background.jpg',    // Comedy
  80: '/crime-background.jpg',     // Crime
  99: '/documentary-background.jpg', // Documentary
  18: '/drama-background.jpg',     // Drama
  10751: '/family-background.jpg', // Family
  14: '/fantasy-background.jpg',   // Fantasy
  36: '/history-background.jpg',   // History
  27: '/horror-background.jpg',    // Horror
  10402: '/music-background.jpg',  // Music
  9648: '/mystery-background.jpg', // Mystery
  10749: '/romance-background.jpg', // Romance
  878: '/scifi-background.jpg',    // Science Fiction
  10770: '/tv-background.jpg',     // TV Movie
  53: '/thriller-background.jpg',  // Thriller
  10752: '/war-background.jpg',    // War
  37: '/western-background.jpg',   // Western
};

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
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&sort_by=${options.sortBy || 'popularity.desc'}&vote_count.gte=100&include_adult=false`
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

  getGenreDetails: async (genreId) => {
    try {
      const [genres, movies] = await Promise.all([
        tmdbService.getGenres(),
        tmdbService.getMoviesByGenre(genreId)
      ]);
      const genre = genres.find(g => g.id === parseInt(genreId));
      return {
        ...genre,
        movies: movies.results,
        totalPages: movies.total_pages
      };
    } catch (error) {
      console.error('Error fetching genre details:', error);
      throw error;
    }
  },

  getGenreBackdrops: async (genreId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&vote_count.gte=1000&include_adult=false`
      );
      const data = await response.json();
      // Return the first movie's backdrop if available
      return data.results[0]?.backdrop_path || null;
    } catch (error) {
      console.error('Error fetching genre backdrop:', error);
      throw error;
    }
  },

  // Add getGenreBackground to the tmdbService object
  getGenreBackground: async (genreId) => {
    try {
      // First try to get a dynamic background from TMDB
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
      );
      const data = await response.json();
      
      // If we have results with backdrop_path, use the first one
      if (data.results && data.results[0]?.backdrop_path) {
        return `${IMAGE_BASE_URL}original${data.results[0].backdrop_path}`;
      }
      
      // If no dynamic background, use our fallback backgrounds
      if (genreBackgrounds[genreId]) {
        return genreBackgrounds[genreId];
      }
      
      // If all else fails, return a default background
      return '/default-genre-background.jpg';
    } catch (error) {
      console.error('Error fetching genre background:', error);
      return '/default-genre-background.jpg';
    }
  }
}; 