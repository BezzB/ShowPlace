const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: 'b8aec53163485e4c6bf50ce3749ea472',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
  BACKDROP_SIZE: 'original',
  POSTER_SIZE: 'w500',
  PROFILE_SIZE: 'w185',
  LANGUAGE: 'en-US',
  REGION: 'US',
  INCLUDE_ADULT: false,
  INCLUDE_VIDEO: true,
  IMAGE_SIZES: {
    backdrop: {
      w300: 'w300',
      w780: 'w780',
      w1280: 'w1280',
      original: 'original'
    },
    poster: {
      w92: 'w92',
      w154: 'w154',
      w185: 'w185',
      w342: 'w342',
      w500: 'w500',
      w780: 'w780',
      original: 'original'
    },
    profile: {
      w45: 'w45',
      w185: 'w185',
      h632: 'h632',
      original: 'original'
    }
  }
};

export const getImageUrl = (path, size = TMDB_CONFIG.POSTER_SIZE) => {
  if (!path) return null;
  return `${TMDB_CONFIG.IMAGE_BASE_URL}${size}${path}`;
};

export const getBackdropUrl = (path, size = TMDB_CONFIG.BACKDROP_SIZE) => {
  if (!path) return null;
  return `${TMDB_CONFIG.IMAGE_BASE_URL}${size}${path}`;
};

export const getProfileUrl = (path, size = TMDB_CONFIG.PROFILE_SIZE) => {
  if (!path) return null;
  return `${TMDB_CONFIG.IMAGE_BASE_URL}${size}${path}`;
};

export default TMDB_CONFIG; 