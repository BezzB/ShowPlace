export const fetchTopMovie = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    // Return the first movie from the top rated list
    return response.data.results[0];
  } catch (error) {
    console.error('Error fetching top movie:', error);
    throw error;
  }
};

export const fetchTopRatedMovies = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
}; 