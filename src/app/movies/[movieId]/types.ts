export interface Params {
  params: {
    movieId: string;
  };
}

export interface Genres {
  id: number;
  name: string;
}

export interface Movie {
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
