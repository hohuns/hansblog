import React from "react";
import styles from "./menu.module.css";
import MenuPost from "@/components/MenuPost";

const Menu = () => {
  return (
    <div className={styles.container}>
      {/* <h2 className={styles.subtitle}>{"What's hot"}</h2> */}
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPost />
    </div>
  );
};

export default Menu;
