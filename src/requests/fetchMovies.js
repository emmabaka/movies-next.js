import axios from 'axios';

const API_KEY = 'e9d0a81ada840dc5591eec7d6bc6424f';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

async function fetchMovies(param, query) {
  try {
    if (param === 'trending') {
      const res = await axios.get(`trending/all/day?api_key=${API_KEY}`);
      return res.data.results;
    } else if (param === 'search') {
      const res = await axios.get(
        `search/movie?query=${query}&api_key=${API_KEY}`
      );
      return res.data.results;
    }
  } catch (error) {
    console.log(error);
  }
}

export default fetchMovies;
