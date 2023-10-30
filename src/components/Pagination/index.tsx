"use client";
import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

const Pagination = ({
  page,
  hasPrev,
  hasNext,
}: {
  page: number;
  hasPrev: boolean;
  hasNext: boolean;
}) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={(e) => {
          e.preventDefault();
          router.push(`?page=${page - 1}`, { scroll: false });
        }}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={(e) => {
          e.preventDefault();
          router.push(`?page=${page + 1}`, { scroll: false });
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
