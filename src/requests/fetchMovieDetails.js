import axios from "axios";

const API_KEY = "e9d0a81ada840dc5591eec7d6bc6424f";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

async function fetchMovieDetails(param, id) {
  try {
    if (param === "details") {
      const res = await axios.get(
        `movie/${id}?api_key=${API_KEY}&append_to_response=videos&language=en-US`
      );
      return res.data;
    } else if (param === "review") {
      const res = await axios.get(
        `movie/${id}/reviews?api_key=${API_KEY}&language=en-US`
      );
      return res.data;
    } else if (param === "cast") {
      const res = await axios.get(
        `movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export default fetchMovieDetails;
