"use client";
import dynamic from "next/dynamic";

const WriteComponent = dynamic(
  () => import("../../components/WriteComponent/index"),
  { ssr: false }
);

const WritePage = () => {
  return (
    <>
      <WriteComponent />
    </>
  );
};

export default WritePage;
