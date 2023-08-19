"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import fetchMovieDetails from "@/requests/fetchMovieDetails";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import s from "./Cast.module.scss";

const IMAGES_BASE_URL = "https://image.tmdb.org/t/p/w200/";

import { CastPerson } from "./types";

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  const isMobile = useMediaQuery({ query: "(max-width: 550px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 860px)" });
  const isLaptop = useMediaQuery({ query: "(max-width: 1200px)" });
  const isDesktop = useMediaQuery({
    query: "(min-width: 1200px)",
  });

  const currImgValues = () => {
    if (isMobile) {
      return { width: 80, height: 120, quantity: 3 };
    } else if (isTablet) {
      return { width: 80, height: 120 };
    } else if (isLaptop) {
      return { width: 140, height: 200 };
    } else if (isDesktop) {
      return { width: 200, height: 300 };
    } else {
      return { width: 140, height: 200 };
    }
  };

  useEffect(() => {
    fetchMovieDetails("cast", movieId)
      .then((res) => setCast(res.cast))
      .catch((e) => setCast([]));
  }, [movieId]);

  return (
    <section className={s.cast}>
      <h3>Cast</h3>
      <Swiper
        className={s.swiper}
        modules={[Scrollbar, Autoplay]}
        spaceBetween={20}
        slidesPerView={currImgValues()?.quantity || 5}
        scrollbar={{ draggable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
      >
        {cast?.map((item: CastPerson) => {
          return (
            <SwiperSlide key={item.id}>
              <div className={s.cardWrap}>
                <Image
                  src={
                    item.profile_path
                      ? IMAGES_BASE_URL + item.profile_path
                      : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  }
                  alt={item.name}
                  width={currImgValues()?.width}
                  height={currImgValues()?.height}
                />
                <p className={s.name}>{item.name}</p>
                <p className={s.role}>Role: {item.character}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Cast;
