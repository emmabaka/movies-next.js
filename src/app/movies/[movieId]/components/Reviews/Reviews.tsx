import fetchMovieDetails from "@/requests/fetchMovieDetails";
import Image from "next/image";
import { format } from "date-fns";
import s from "./Reviews.module.scss";

const IMAGES_BASE_URL = "https://image.tmdb.org/t/p/w200/";

import { AllReviews, Review } from "./types";

const Reviews = async ({ movieId }: { movieId: string }) => {
  const reviews: AllReviews = await fetchMovieDetails("review", movieId);

  function dateFormat(date: string) {
    return format(new Date(date), "dd.MM.yyyy HH:mm");
  }

  return (
    <section className={s.reviews}>
      <h3>
        {reviews.total_results}{" "}
        {reviews.total_results > 1 ? "Reviews" : "Review"}
      </h3>
      {reviews?.results?.length === 0 || !reviews ? (
        <p>We don`t have any reviews for this movie</p>
      ) : (
        <>
          <ul>
            {reviews.results?.map((item: Review) => (
              <li key={item.id} className={s.reviewWrapp}>
                <div>
                  <div className={s.user}>
                    <Image
                      className={s.avatar}
                      src={
                        item.author_details.avatar_path
                          ? IMAGES_BASE_URL + item.author_details.avatar_path
                          : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                      }
                      alt={item.author_details.name}
                      width={50}
                      height={50}
                    />
                    <div className={s.userInfo}>
                      <span className={s.userName}>
                        {item.author_details.username}
                      </span>
                      <span className={s.leftDate}>
                        {dateFormat(item.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
                <p className={s.review}>{item.content}</p>
                <p className={s.updatedDate}>
                  Edited: {dateFormat(item.updated_at)}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};

export default Reviews;
