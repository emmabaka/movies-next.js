import Image from "next/image";
import fetchMovieDetails from "@/requests/fetchMovieDetails";
import Cast from "./components/Cast/Cast";
import Reviews from "./components/Reviews/Reviews";
import BackButton from "./components/BackButton/BackButton";
import s from "./page.module.scss";

const IMAGES_BASE_URL = "https://image.tmdb.org/t/p/w200/";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

import { Params, Movie, Genres } from "./types";

const Movie = async ({ params }: Params) => {
  const movie: Movie = await fetchMovieDetails("details", params.movieId);

  const converDate = (date: string) => {
    const dateObject = new Date(date);

    const day = dateObject.getDate();
    const month = monthNames[dateObject.getMonth()];
    const year = dateObject.getFullYear();

    return `${day} ${month} ${year}`;
  };

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
                <span className={s.info}>Score:</span>
                {movie?.vote_average ? movie?.vote_average : "No results"} (
                {movie?.vote_count ? movie?.vote_count : "No results"})
              </li>
              <li className={s.infoItem}>
                <span className={s.info}>Release date:</span>
                {movie?.release_date
                  ? converDate(movie?.release_date)
                  : "No results"}
              </li>
              <li className={s.infoItem}>
                <span className={s.info}>Original language:</span>
                {movie?.original_language
                  ? movie?.original_language
                  : "No results"}
              </li>
              <li className={s.infoItem}>
                <span className={s.info}>Genres:</span>
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
