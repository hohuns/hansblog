import React from "react";
import styles from "./blog.module.css";
import CardList from "@/components/CardList";
import Menu from "@/components/Menu";

const BlogPage = ({
  searchParams,
}: {
  searchParams: {
    cat: string | undefined;
    page: number | undefined;
  };
}) => {
  const page = Number(searchParams.page) || 1;
  const { cat } = searchParams; // dividing query string

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{cat} Blog</h1>
      <div className={styles.content}>
        <CardList page={page} cat={cat ? cat : ""} />
        <Menu />
      </div>
    </div>
  );
};

export default BlogPage;
