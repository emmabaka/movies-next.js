import Image from "next/image";
import fetchMovieDetails from "@/requests/fetchMovieDetails";
import Cast from "./components/Cast/Cast";
import Reviews from "./components/Reviews/Reviews";
import BackButton from "./components/BackButton/BackButton";
import s from "./page.module.scss";

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
      <div className={`container ${s.movieContainer}`}>
        <BackButton />
        <div className={s.imgAndInfoWrap}>
          <Image
            className={s.img}
            src={
              movie?.poster_path
                ? IMAGES_BASE_URL + movie.poster_path
                : "https://cdn.pixabay.com/photo/2017/05/13/09/04/question-mark-2309040_1280.jpg"
            }
            alt={movie?.title ?? movie?.name ?? ""}
            width={200}
            height={300}
          />
          <div className={s.infoWrap}>
            <h2 className={s.movieTitle}>{movie?.title ?? "Not found"}</h2>
            <ul className={s.infoList}>
              <li className={s.infoItem}>
                Score:{" "}
                {movie?.vote_average ? movie?.vote_average : "No results"}
              </li>
              <li className={s.infoItem}>
                Number of voters:{" "}
                {movie?.vote_count ? movie?.vote_count : "No results"}
              </li>
              <li className={s.infoItem}>
                Release date:{" "}
                {movie?.release_date ? movie?.release_date : "No results"}
              </li>
              <li className={s.infoItem}>
                Original language:{" "}
                {movie?.original_language
                  ? movie?.original_language
                  : "No results"}
              </li>
              <li className={s.infoItem}>
                Genres:{" "}
                {movie?.genres
                  ? movie?.genres?.map((item: Genres) => item.name).join(", ")
                  : "No results"}
              </li>
            </ul>
          </div>
        </div>
        <section>
          <h3>Overview</h3>
          <p>{movie?.overview ? movie?.overview : "No results"}</p>
        </section>
        <Cast />
        <Reviews movieId={params.movieId} />
      </div>
    </section>
  );
};

export default Movie;
