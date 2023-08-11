import Link from "next/link";
import Image from "next/image";
import fetchMovies from "@/requests/fetchMovies";
import s from "./page.module.scss";

const IMAGES_BASE_URL = "https://image.tmdb.org/t/p/w200/";

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
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Home = async () => {
  const trending = await fetchMovies("trending");

  return (
    <section className={s.trending}>
      <div className="container">
        <h1 className={s.title}>Trending movies</h1>
        <ul className={s.moviesList}>
          {trending.map((movie: Movie) => {
            return (
              <li key={movie.id} className={s.movieContainer}>
                <Link href={`/movies/${movie.id}`} className={s.movie}>
                  <Image
                    src={
                      movie?.poster_path
                        ? IMAGES_BASE_URL + movie.poster_path
                        : "https://cdn.pixabay.com/photo/2017/05/13/09/04/question-mark-2309040_1280.jpg"
                    }
                    alt={movie?.title ?? movie?.name ?? ""}
                    width={240}
                    height={350}
                  />
                  <span className={s.movieTitle}>
                    {movie.title ?? movie.name}
                  </span>
                  <span className={s.movieRating}>
                    Rating: {movie.vote_average}/10
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Home;
