"use client";
import Link from "next/link";
import styles from "./comments.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import {
  useQueryDeleteMutation,
  useQueryFetchGet,
  useQueryPostMutation,
} from "@/hooks/useReactQuery";
import moment from "moment";

const Comments = ({ postSlug }: { postSlug: string }) => {
  const { data: userData, status } = useSession();
  const [desc, setDesc] = useState("");
  const { data, isFetching, refetch } = useQueryFetchGet(
    `/api/comments?postSlug=${postSlug}`,
    ["comments"]
  );
  const { mutate: mutateUpdate } = useQueryPostMutation(
    `/api/comments`,
    ["comments"],
    refetch
  );
  const { mutate: mutateDelete } = useQueryDeleteMutation(
    `/api/posts/${postSlug}`,
    ["posts"],
    undefined,
    true
  );

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const requestBody = { desc, postSlug };
    mutateUpdate(requestBody);
    setDesc("");
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const requestBody = { slug: postSlug };
    mutateDelete(requestBody);
    setDesc("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        {status === "authenticated" && (
          <h3
            className={styles.title}
            style={{ color: "crimson", cursor: "pointer" }}
            onClick={handleDelete}
          >
            Delete Post
          </h3>
        )}
        <h1 className={styles.title}>Comments</h1>
      </div>
      {status === "authenticated" ? (
        <div className={styles.write}>
          <textarea
            placeholder="write a comment..."
            className={styles.input}
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
          />
          <button className={styles.button} onClick={handleSubmit}>
            Send
          </button>
        </div>
      ) : (
        <Link className={styles.loginComment} href="/login">
          Login to write a comment
        </Link>
      )}
      <div className={styles.comments}>
        {isFetching
          ? "loading"
          : data?.data?.map(
              (item: {
                id: string;
                user: {
                  image: string;
                  name: string;
                };
                createdAt: string;
                desc: string;
              }) => (
                <div className={styles.comment} key={item.id}>
                  <div className={styles.user}>
                    {item?.user?.image && (
                      <Image
                        src={item?.user?.image}
                        alt=""
                        width={50}
                        height={50}
                        className={styles.img}
                      />
                    )}
                    <div className={styles.userInfo}>
                      <span className={styles.username}>
                        {item?.user?.name}
                      </span>
                      <span className={styles.date}>
                        {moment(item?.createdAt).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </span>
                    </div>
                  </div>
                  <p className={styles.desc}>{item?.desc}</p>
                </div>
              )
            )}
      </div>
    </div>
  );
};

export default Comments;
