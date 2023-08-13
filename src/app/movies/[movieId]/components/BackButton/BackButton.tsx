"use client";
import { useRouter } from "next/navigation";
import { VscTriangleLeft } from "react-icons/vsc";
import s from './BackButton.module.scss'

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button className={s.backButton} type="button" onClick={handleClick}>
      <VscTriangleLeft /> Go back
    </button>
  );
};

export default BackButton;
