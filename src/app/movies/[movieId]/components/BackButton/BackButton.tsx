"use client";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import s from "./BackButton.module.scss";

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button className={s.backButton} type="button" onClick={handleClick}>
      <AiOutlineArrowLeft /> Back
    </button>
  );
};

export default BackButton;
