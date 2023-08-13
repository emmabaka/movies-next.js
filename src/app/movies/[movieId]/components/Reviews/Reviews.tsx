import fetchMovieDetails from "@/requests/fetchMovieDetails";
import Image from "next/image";
import { format } from "date-fns";

const IMAGES_BASE_URL = "https://image.tmdb.org/t/p/w200/";

interface AllReviews {
  id: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}

interface Review {
  author: string;
  author_details: AuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

interface AuthorDetails {
  name: string;
  username: string;
  avatar_path: any;
  rating: number;
}

const Reviews = async ({ movieId }: { movieId: string }) => {
  const reviews: AllReviews = await fetchMovieDetails("review", movieId);

  function dateFormat(date: string) {
    return format(new Date(date), "dd.MM.yyyy HH:mm");
  }

  return (
    <section>
      <h3>Reviews</h3>
      {reviews?.results?.length === 0 || !reviews ? (
        <p>We don`t have any reviews for this movie</p>
      ) : (
        <>
          <p>Total: {reviews.total_results}</p>
          <ul>
            {reviews.results?.map((item: Review) => (
              <li key={item.id}>
                <div>
                  <Image
                    src={
                      item.author_details.avatar_path
                        ? IMAGES_BASE_URL + item.author_details.avatar_path
                        : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    }
                    alt={item.author_details.name}
                    width={60}
                    height={60}
                  />
                  <span>{item.author_details.username}</span>
                  <div>
                    <span>Create: {dateFormat(item.created_at)}</span>
                    <span>Update: {dateFormat(item.updated_at)}</span>
                  </div>
                </div>
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Reviews;
