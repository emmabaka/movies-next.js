"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import fetchMovies from "@/requests/fetchMovies";
import s from "./page.module.scss";

const IMAGES_BASE_URL = "https://image.tmdb.org/t/p/w200/";

import { Movie } from "./types";

const Movies = () => {
  const [filter, setFilter] = useState("");
  const [movies, setMovies] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const searchMovies = searchParams.get("query") ?? "";

  useEffect(() => {
    setFilter(searchMovies);
    fetchMovies("search", filter).then((res) => setMovies(res));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilter(searchMovies);
  };

  const updateQuery = (e: { target: { value: any } }) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    value === "" ? params.delete("query") : params.set("query", value);

    const queryString = params.toString();
    router.push(pathname + "?" + queryString);
  };

  return (
    <section>
      <div className="container">
        <form className={s.form} onSubmit={handleSubmit}>
          <input
            className={s.search}
            type="text"
            name="query"
            onChange={updateQuery}
            value={searchMovies}
          />
          <button className={s.searchButton} type="submit">
            Search
          </button>
        </form>
        <ul className={s.moviesList}>
          {movies &&
            movies.map((movie: Movie) => (
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
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Movies;
