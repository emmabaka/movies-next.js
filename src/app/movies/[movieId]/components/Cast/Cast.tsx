"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import fetchMovieDetails from "@/requests/fetchMovieDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

const IMAGES_BASE_URL = "https://image.tmdb.org/t/p/w200/";

export interface CastPerson {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    fetchMovieDetails("cast", movieId)
      .then((res) => setCast(res.cast.toReversed()))
      .catch((e) => setCast([]));
  }, [movieId]);

  return (
    <section>
      <div className="container">
        <Swiper
          modules={[Scrollbar, Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
        >
          {cast?.map((item: CastPerson) => {
            return (
              <SwiperSlide key={item.id}>
                <div>
                  <Image
                    src={
                      item.profile_path
                        ? IMAGES_BASE_URL + item.profile_path
                        : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    }
                    alt={item.name}
                    width={200}
                    height={300}
                  />
                  <p>{item.name}</p>
                  <p>Charachter: {item.character}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Cast;
