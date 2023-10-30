import styles from "./cardlist.module.css";
import Pagination from "@/components/Pagination";
import Card from "@/components/Card";
import _ from "lodash";

const getData = async (page?: number | undefined, cat?: string | undefined) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/posts?page=${page}&cat=${cat || ""}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const CardList = async ({
  page,
  cat,
}: {
  page?: number | undefined;
  cat?: string | undefined;
}) => {
  const result = await getData(page, cat);
  const { posts, count } = result?.data;
  const POST_PER_PAGE = 2;
  const hasPrev = POST_PER_PAGE * ((page as number) - 1) > 0;
  const hasNext =
    POST_PER_PAGE * ((page as number) - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {!_.isEmpty(posts) ? (
          posts?.map(
            (item: {
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
              // eslint-disable-next-line react/jsx-key
            }) => <Card item={item} />
          )
        ) : (
          <div className={styles.posts}>
            <h2 className={styles.noneText}>No post yet..😌</h2>
          </div>
        )}
      </div>
      <Pagination page={page!} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
