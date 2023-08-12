"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./Navigation.module.scss";


const Navigation = () => {
  const pathname = usePathname();
  console.log(pathname);

  const isMoviesActive = pathname.includes("/movies");
  const isHomeActive = pathname === "/";

  return (
    <>
      <Link
        className={isHomeActive ? `${s.navLink} ${s.active}` : s.navLink}
        href="/"
      >
        Home
      </Link>
      <Link
        className={isMoviesActive ? `${s.navLink} ${s.active}` : s.navLink}
        href="/movies"
      >
        Movies
      </Link>
    </>
  );
};

export default Navigation;
