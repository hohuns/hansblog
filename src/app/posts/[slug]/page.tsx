import Menu from "@/components/Menu";
import styles from "./singlepage.module.css";
import Image from "next/image";
import Comments from "@/components/Comments";
import moment from "moment";

const getData = async (slug: string) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

//({ params }: { params: { slug: string } }) => query param
const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const data = await getData(slug);

  return (
    <div className={styles.container}>
      <div
        className={styles.infoContainer}
        style={{ height: data?.data?.img ? "400px" : undefined }}
      >
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{data?.data?.title}</h1>
          <div className={styles.user}>
            {data?.data?.user?.image && (
              <div className={styles.userImgContainer}>
                <Image
                  src={data?.data?.user?.image}
                  alt=""
                  fill
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{data?.data?.user?.name}</span>
              <span className={styles.date}>
                {moment(data?.data?.createdAt).format(
                  "MMMM Do YYYY, h:mm:ss a"
                )}
              </span>
            </div>
          </div>
        </div>
        {data?.data?.img && (
          <div className={styles.imgContainer}>
            <Image src={data?.data?.img} alt="" fill className={styles.img} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: data?.data?.desc }}
          />
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <Menu />
      </div>
    </div>
  );
};

export default SinglePage;
