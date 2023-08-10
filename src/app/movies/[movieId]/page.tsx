interface Params {
  params: {
    movieId: string;
  };
}

const Movie = ({ params }: Params) => {
  return (
    <section>
      <div className="container">
        <p>Movie id is {params.movieId}</p>
      </div>
    </section>
  );
};

export default Movie;
