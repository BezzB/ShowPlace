const STREAMING_SOURCES = {
  VIDSRC: 'vidsrc',
  VIDPLAY: 'vidplay',
  STREAMTAPE: 'streamtape'
};

export const streamingService = {
  currentSource: STREAMING_SOURCES.VIDSRC,

  sources: {
    [STREAMING_SOURCES.VIDSRC]: {
      base: 'https://vidsrc.xyz/embed'
    },
    [STREAMING_SOURCES.VIDPLAY]: {
      base: 'https://vidplay.site/e'
    },
    [STREAMING_SOURCES.STREAMTAPE]: {
      base: 'https://streamtape.com/e'
    }
  },

  getStreamingUrl(mediaType, id, season = null, episode = null) {
    const source = this.currentSource;
    const baseUrl = this.sources[source].base;

    try {
      switch (source) {
        case STREAMING_SOURCES.VIDSRC:
          if (mediaType === 'movie') {
            return `${baseUrl}/movie/${id}`;
          }
          return `${baseUrl}/tv/${id}/${season}/${episode}`;

        case STREAMING_SOURCES.VIDPLAY:
          if (mediaType === 'movie') {
            return `${baseUrl}/movie/${id}`;
          }
          return `${baseUrl}/series/${id}-${season}-${episode}`;

        case STREAMING_SOURCES.STREAMTAPE:
          if (mediaType === 'movie') {
            return `${baseUrl}/movie/${id}`;
          }
          return `${baseUrl}/series/${id}/${season}/${episode}`;

        default:
          return this.getVidsrcUrl(mediaType, id, season, episode);
      }
    } catch (error) {
      console.error('Error generating streaming URL:', error);
      return this.getVidsrcUrl(mediaType, id, season, episode);
    }
  },

  getVidsrcUrl(mediaType, id, season = null, episode = null) {
    const baseUrl = this.sources[STREAMING_SOURCES.VIDSRC].base;
    if (mediaType === 'movie') {
      return `${baseUrl}/movie/${id}`;
    }
    return `${baseUrl}/tv/${id}/${season}/${episode}`;
  },

  async getBestSource(mediaType, id, season = null, episode = null) {
    return this.getStreamingUrl(mediaType, id, season, episode);
  }
}; 