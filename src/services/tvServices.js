import { tmdbService } from './tmdb.service';

const TVMAZE_BASE_URL = 'https://api.tvmaze.com';
const EPISODATE_BASE_URL = 'https://www.episodate.com/api';

export const tvServices = {
  // Primary API (TMDB)
  async getShowDetails(id) {
    try {
      // Try TMDB first
      const tmdbData = await tmdbService.getTVShowDetails(id);
      return {
        source: 'tmdb',
        data: tmdbData
      };
    } catch (error) {
      console.error('TMDB Error:', error);
      
      // Fallback to TVMaze
      try {
        const response = await fetch(`${TVMAZE_BASE_URL}/shows/${id}?embed[]=episodes&embed[]=cast`);
        const tvMazeData = await response.json();
        return {
          source: 'tvmaze',
          data: this.formatTVMazeData(tvMazeData)
        };
      } catch (tvMazeError) {
        console.error('TVMaze Error:', tvMazeError);

        // Final fallback to Episodate
        try {
          const response = await fetch(`${EPISODATE_BASE_URL}/show-details?q=${id}`);
          const episodateData = await response.json();
          return {
            source: 'episodate',
            data: this.formatEpisodateData(episodateData)
          };
        } catch (episodateError) {
          console.error('Episodate Error:', episodateError);
          throw new Error('Failed to fetch show details from all sources');
        }
      }
    }
  },

  async searchShows(query) {
    const results = [];

    // Search across all APIs in parallel
    try {
      const [tmdbResults, tvMazeResults, episodateResults] = await Promise.allSettled([
        tmdbService.searchTVShows(query),
        fetch(`${TVMAZE_BASE_URL}/search/shows?q=${query}`).then(res => res.json()),
        fetch(`${EPISODATE_BASE_URL}/search?q=${query}`).then(res => res.json())
      ]);

      // Combine and format results
      if (tmdbResults.status === 'fulfilled') {
        results.push(...tmdbResults.value.results.map(show => ({
          source: 'tmdb',
          data: show
        })));
      }

      if (tvMazeResults.status === 'fulfilled') {
        results.push(...tvMazeResults.value.map(item => ({
          source: 'tvmaze',
          data: this.formatTVMazeData(item.show)
        })));
      }

      if (episodateResults.status === 'fulfilled') {
        results.push(...episodateResults.value.tv_shows.map(show => ({
          source: 'episodate',
          data: this.formatEpisodateData(show)
        })));
      }

      // Remove duplicates and sort by popularity
      return this.deduplicateAndSort(results);

    } catch (error) {
      console.error('Search Error:', error);
      throw error;
    }
  },

  // Data formatters
  formatTVMazeData(show) {
    return {
      id: show.id,
      title: show.name,
      overview: show.summary?.replace(/<[^>]*>/g, '') || '',
      poster_path: show.image?.original || show.image?.medium,
      first_air_date: show.premiered,
      vote_average: show.rating?.average || 0,
      number_of_seasons: show._embedded?.episodes?.reduce((max, ep) => Math.max(max, ep.season), 0) || 0,
      seasons: this.formatTVMazeSeasons(show._embedded?.episodes || []),
      status: show.status,
      genres: show.genres,
      network: show.network?.name
    };
  },

  formatEpisodateData(show) {
    return {
      id: show.id,
      title: show.name,
      overview: show.description,
      poster_path: show.image_path,
      first_air_date: show.start_date,
      vote_average: show.rating || 0,
      number_of_seasons: show.episodes?.length || 0,
      seasons: this.formatEpisodateSeasons(show.episodes || []),
      status: show.status,
      genres: show.genres?.split(',').map(g => g.trim()) || [],
      network: show.network
    };
  },

  formatTVMazeSeasons(episodes) {
    const seasons = {};
    episodes.forEach(ep => {
      if (!seasons[ep.season]) {
        seasons[ep.season] = {
          season_number: ep.season,
          episodes: []
        };
      }
      seasons[ep.season].episodes.push({
        episode_number: ep.number,
        name: ep.name,
        overview: ep.summary?.replace(/<[^>]*>/g, '') || '',
        air_date: ep.airdate,
        still_path: ep.image?.original || ep.image?.medium
      });
    });
    return Object.values(seasons);
  },

  formatEpisodateSeasons(episodes) {
    const seasons = {};
    episodes.forEach(ep => {
      const seasonNum = parseInt(ep.season);
      if (!seasons[seasonNum]) {
        seasons[seasonNum] = {
          season_number: seasonNum,
          episodes: []
        };
      }
      seasons[seasonNum].episodes.push({
        episode_number: parseInt(ep.episode),
        name: ep.name,
        overview: ep.description || '',
        air_date: ep.air_date
      });
    });
    return Object.values(seasons);
  },

  deduplicateAndSort(results) {
    // Remove duplicates based on show name
    const uniqueShows = results.reduce((acc, curr) => {
      const existingShow = acc.find(show => 
        show.data.title.toLowerCase() === curr.data.title.toLowerCase()
      );
      if (!existingShow) {
        acc.push(curr);
      } else if (curr.source === 'tmdb') {
        // Prefer TMDB data if available
        const index = acc.indexOf(existingShow);
        acc[index] = curr;
      }
      return acc;
    }, []);

    // Sort by vote average/rating
    return uniqueShows.sort((a, b) => b.data.vote_average - a.data.vote_average);
  }
}; 