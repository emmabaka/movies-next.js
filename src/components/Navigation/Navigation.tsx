"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./Navigation.module.scss";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            className={isActive ? `${s.navLink} ${s.active}` : s.navLink}
            href={link.href}
          >
            {link.name}
          </Link>
        );
      })}
    </>
  );
};

export default Navigation;
