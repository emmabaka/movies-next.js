"use client";
import { useRouter } from "next/navigation";
import { VscTriangleLeft } from "react-icons/vsc";

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };
  return (
    <button type="button" onClick={handleClick}>
      <VscTriangleLeft /> Go back
    </button>
  );
};

export default BackButton;
