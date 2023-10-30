import Featured from "@/components/Featured";
import styles from "./homepage.module.css";
import CategoryList from "@/components/CategoryList";
import CardList from "@/components/CardList";
import Menu from "@/components/Menu";
import Loader from "@/components/Loader";
import { useEffect } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { cat: string | undefined; page: number | undefined };
}) {
  const page = Number(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page} />
        <Menu />
      </div>
    </div>
  );
}
