import React from "react";
import styles from "@/components/Featured/feature.module.css";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  return (
    <div className={styles.container}>
      <span className={styles.title}>
        <b>Hello, this is HANS..!</b> <br></br>
      </span>
      <h1 className={styles.subTitle}>
        Discover my stories and comment it if you like.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image className={styles.img} src="/p1.jpg" alt="p1" fill={true} />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.postTitle}>About Me</h1>
          <p className={styles.postDesc}>
            A Junior MERN Stack developer with 2 years of experience especially
            specialized developing production-ready application with Next.js,
            React.js/Typescript in frontend and Node.js, Express.js,
            prisma,Mongo db, mysql for backend side as well.
          </p>
          <Link href="https://hans-web.vercel.app/about">
            <button disabled={true} className={styles.button}>
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
