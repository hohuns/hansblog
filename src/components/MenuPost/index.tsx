import React from "react";
import styles from "./menupost.module.css";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import _ from "lodash";

let categoryClasses = [
  styles.travel,
  styles.culture,
  styles.food,
  styles.fashion,
  styles.coding,
  styles.style,
];

const getData = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/menuposts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const MenuPost = async () => {
  const data = await getData();

  const categoryCssClassMaker = (catSlug: string) => {
    const tempClass = categoryClasses?.find((d) => d?.includes(catSlug));
    return tempClass;
  };

  return (
    <div>
      {!_.isEmpty(data?.data?.posts) ? (
        <>
          {data?.data?.posts?.map(
            (posts: {
              id: string;
              createdAt: string;
              catSlug: string;
              title: string;
              views: number;
              img: string;
              slug: string;
              user: any;
            }) => {
              return (
                <div className={styles.items} key={posts?.id}>
                  <Link className={styles.item} href={`/posts/${posts?.slug}`}>
                    {posts?.img && (
                      <div className={styles.imgContainer}>
                        <Image
                          className={styles.img}
                          src={posts?.img}
                          alt=""
                          fill
                        />
                      </div>
                    )}
                    <div className={styles.textContainer}>
                      <span
                        className={`${styles.category} ${categoryCssClassMaker(
                          posts?.catSlug
                        )}`}
                      >
                        {posts?.catSlug}
                      </span>
                      <h3 className={styles.postTitle}>{posts?.title}</h3>
                      <div className={styles.detail}>
                        <span className={styles.views}>
                          {posts?.user?.name}
                        </span>
                        <span className={styles.date}>
                          {" "}
                          -{" "}
                          {moment(posts.createdAt).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }
          )}
        </>
      ) : (
        <div className={styles.items}>
          <h2 className={styles.noneText}>No post yet..😌</h2>
        </div>
      )}
    </div>
  );
};

export default MenuPost;
