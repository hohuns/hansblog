import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import moment from "moment";

interface postDataType {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  desc: string;
  img: string;
  views: number;
  catSlug: string;
  cat: [];
  userEmail: string;
}

const Card = ({ item }: { item: postDataType }) => {
  return (
    <div className={styles.container} key={item?.id}>
      {item?.img && (
        <div className={styles.imgContainer}>
          <Image src={item?.img} alt="" fill className={styles.img} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {moment(item?.createdAt).format("MMMM Do YYYY, h:mm:ss a")} -{" "}
          </span>
          <span className={styles.category}>{item?.catSlug}</span>
        </div>
        <Link href={`/posts/${item?.slug}`}>
          <h1>{item?.title}</h1>
        </Link>
        {/* <p className={styles.desc}>{item?.desc.substring(0, 60)}</p> */}
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{
            __html: item?.desc.substring(0, 100).concat("..."),
          }}
        />
        <Link href={`/posts/${item?.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
