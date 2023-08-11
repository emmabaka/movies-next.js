import Image from "next/image";
import fetchMovieDetails from "@/requests/fetchMovieDetails";
import Cast from "./components/Cast/Cast";

const IMAGES_BASE_URL = "https://image.tmdb.org/t/p/w200/";

interface Params {
  params: {
    movieId: string;
  };
}

interface Genres {
  id: number;
  name: string;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title?: string;
  name?: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genres: Genres[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Movie = async ({ params }: Params) => {
  const movie: Movie = await fetchMovieDetails("details", params.movieId);

  return (
    <section>
      <div className="container">
        <div>
          <Image
            src={
              movie?.poster_path
                ? IMAGES_BASE_URL + movie.poster_path
                : "https://cdn.pixabay.com/photo/2017/05/13/09/04/question-mark-2309040_1280.jpg"
            }
            alt={movie?.title ?? movie?.name ?? ""}
            width={200}
            height={300}
          />
          <div>
            <h2>{movie?.title ?? "Not found"}</h2>
            <p>
              Score: {movie?.vote_average ? movie?.vote_average : "No results"}
            </p>
            <p>
              Number of voters:{" "}
              {movie?.vote_count ? movie?.vote_count : "No results"}
            </p>
            <p>
              Release date:{" "}
              {movie?.release_date ? movie?.release_date : "No results"}
            </p>
            <p>
              Original language:{" "}
              {movie?.original_language
                ? movie?.original_language
                : "No results"}
            </p>
            <p>
              Genres:{" "}
              {movie?.genres
                ? movie?.genres?.map((item: Genres) => item.name).join(", ")
                : "No results"}
            </p>
            <h3>Overview</h3>
            <p>{movie?.overview ? movie?.overview : "No results"}</p>
          </div>
        </div>
        <Cast />
      </div>
    </section>
  );
};

export default Movie;
