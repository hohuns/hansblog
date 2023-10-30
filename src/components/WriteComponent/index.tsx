"use client";
import Image from "next/image";
import styles from "./write.module.css";
import { useState } from "react";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";
import { useFirebase } from "@/hooks/useFireBase";
import { useQueryPostMutation } from "@/hooks/useReactQuery";
import Loader from "../Loader";

const WriteComponent = () => {
  const { status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [catSlug, setCatSlug] = useState<string>("");
  const [isImgUploading, setIsImgUploading] = useState<boolean>(false);
  const { mutate, isLoading } = useQueryPostMutation(
    `/api/posts`,
    ["posts"],
    undefined,
    true
  );

  // Upload file
  useFirebase(file, setMedia, setIsImgUploading);

  if (status === "loading") {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/");
  }

  const slugify = (str: string) => {
    return str.match(
      /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/g
    )
      ? str
          .split(/\s+/)[0]
          .concat((Math.floor(Math.random() * 90000) + 10000).toString())
      : str
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_-]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .concat((Math.floor(Math.random() * 90000) + 10000).toString());
  };

  const handleSubmit = async () => {
    const requestBody = {
      title,
      desc: value,
      img: media,
      slug: slugify(title),
      catSlug: catSlug || "coding", //If not selected, choose the general category
    };
    mutate(requestBody);
  };

  if (typeof window !== "undefined") {
    return (
      <>
        {(isImgUploading || isLoading) && <Loader />}
        <div className={styles.container}>
          <input
            type="text"
            placeholder="Title"
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className={styles.select}
            onChange={(e) => setCatSlug(e.target.value)}
          >
            <option value="food">FOOD</option>
            <option value="travel">TRAVEL</option>
            <option value="coding">CODING</option>
          </select>
          <div className={styles.editor}>
            <input
              type="file"
              id="image"
              onChange={(e) => setFile((e as any)?.target?.files[0])}
              style={{ display: "none" }}
              accept="image/*"
            />
            <button className={styles.imgContainer}>
              <label htmlFor="image">
                <Image
                  src="/travel.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.img}
                />
              </label>
            </button>
            <ReactQuill
              className={styles.textArea}
              theme="bubble"
              value={value}
              onChange={setValue}
              placeholder="Tell your story..."
            />
          </div>
          <button
            className={styles.publish}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Publish
          </button>
        </div>
      </>
    );
  }
};

export default WriteComponent;
