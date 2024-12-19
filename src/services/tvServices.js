import TMDB_CONFIG from '../config/tmdb.config';

const BASE_URL = TMDB_CONFIG.BASE_URL;
const API_KEY = TMDB_CONFIG.API_KEY;

export const tvServices = {
  getShowDetails: async (id) => {
    try {
      // First get the main show details
      const showResponse = await fetch(
        `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,similar,videos`
      );
      const showData = await showResponse.json();

      // Then get details for each season
      const seasonsPromises = showData.seasons.map(async (season) => {
        const seasonResponse = await fetch(
          `${BASE_URL}/tv/${id}/season/${season.season_number}?api_key=${API_KEY}`
        );
        const seasonData = await seasonResponse.json();
        
        // Get details for each episode in the season
        const episodesPromises = seasonData.episodes.map(async (episode) => {
          const episodeResponse = await fetch(
            `${BASE_URL}/tv/${id}/season/${season.season_number}/episode/${episode.episode_number}?api_key=${API_KEY}`
          );
          return await episodeResponse.json();
        });

        const episodes = await Promise.all(episodesPromises);
        return {
          ...seasonData,
          episodes: episodes
        };
      });

      const seasons = await Promise.all(seasonsPromises);

      return {
        data: {
          ...showData,
          seasons: seasons
        }
      };
    } catch (error) {
      console.error('Error fetching TV show details:', error);
      throw error;
    }
  },

  // Other methods...
}; 