import React from "react";
import styles from "./categorylist.module.css";
import Link from "next/link";
import Image from "next/image";

const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CategoryList = async () => {
  const data = await getData();
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Categories</h1>
      <div className={styles.categories}>
        {data?.data?.map(
          (item: { id: string; slug: string; title: string; img: string }) => (
            <Link
              key={item?.id as string}
              href={`/blog?cat=${item?.slug}`}
              className={`${styles.category} ${styles[item?.slug]}`}
            >
              {item?.img && (
                <Image
                  src={item?.img}
                  alt=""
                  width={32}
                  height={32}
                  className={styles.img}
                />
              )}
              {item?.title}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default CategoryList;
