const STREAMING_SOURCES = {
  VIDSRC: 'vidsrc',
  SUPEREMBED: 'superembed',
  TWOEMBED: '2embed'
};

export const streamingService = {
  // Current source (can be changed by user preference)
  currentSource: STREAMING_SOURCES.VIDSRC,

  // Source URLs
  sources: {
    [STREAMING_SOURCES.VIDSRC]: {
      base: 'https://vidsrc.to/embed',
      pro: 'https://vidsrc.pro/embed'
    },
    [STREAMING_SOURCES.SUPEREMBED]: {
      base: 'https://multiembed.mov/directstream.php'
    },
    [STREAMING_SOURCES.TWOEMBED]: {
      base: 'https://2embed.org/embed'
    }
  },

  // Get streaming URL based on current source
  getStreamingUrl(mediaType, id, season = null, episode = null) {
    switch (this.currentSource) {
      case STREAMING_SOURCES.VIDSRC:
        return this.getVidsrcUrl(mediaType, id, season, episode);
      case STREAMING_SOURCES.SUPEREMBED:
        return this.getSuperembedUrl(mediaType, id, season, episode);
      case STREAMING_SOURCES.TWOEMBED:
        return this.get2embedUrl(mediaType, id, season, episode);
      default:
        return this.getVidsrcUrl(mediaType, id, season, episode);
    }
  },

  // Source-specific URL generators
  getVidsrcUrl(mediaType, id, season, episode) {
    const base = this.sources[STREAMING_SOURCES.VIDSRC].base;
    if (mediaType === 'movie') {
      return `${base}/movie/${id}`;
    }
    return season && episode ? `${base}/tv/${id}/${season}/${episode}` : `${base}/tv/${id}`;
  },

  getSuperembedUrl(mediaType, id, season, episode) {
    const base = this.sources[STREAMING_SOURCES.SUPEREMBED].base;
    const params = new URLSearchParams({
      video_id: id,
      tmdb: 1,
      type: mediaType
    });

    if (mediaType === 'tv' && season && episode) {
      params.append('season', season);
      params.append('episode', episode);
    }

    return `${base}?${params.toString()}`;
  },

  get2embedUrl(mediaType, id, season, episode) {
    const base = this.sources[STREAMING_SOURCES.TWOEMBED].base;
    if (mediaType === 'movie') {
      return `${base}/tmdb/movie?id=${id}`;
    }
    return `${base}/tmdb/tv?id=${id}&s=${season}&e=${episode}`;
  },

  // Change streaming source
  setSource(source) {
    if (STREAMING_SOURCES[source]) {
      this.currentSource = source;
    }
  },

  // Check if source is available
  async checkSource(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  },

  // Get best available source
  async getBestSource(mediaType, id, season = null, episode = null) {
    for (const source of Object.values(STREAMING_SOURCES)) {
      this.currentSource = source;
      const url = this.getStreamingUrl(mediaType, id, season, episode);
      if (await this.checkSource(url)) {
        return url;
      }
    }
    // Fallback to default source
    this.currentSource = STREAMING_SOURCES.VIDSRC;
    return this.getStreamingUrl(mediaType, id, season, episode);
  }
}; 