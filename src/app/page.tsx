import Link from "next/link";
import fetchMovies from "@/requests/fetchMovies";
import s from "./page.module.scss";

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
    <section>
      <div className="container">
        <ul>
          {trending.map((movie: Movie) => {
            return (
              <li key={movie.id}>
                <Link href={`/movies/${movie.id}`}>
                  {movie.title ?? movie.name}
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
