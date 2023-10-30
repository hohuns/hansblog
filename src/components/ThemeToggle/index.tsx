"use client";
import React, { useContext } from "react";
import styles from "./themetoggle.module.css";
import { Context } from "@/context/Context";

const DarKModeToggle = () => {
  const { toggle, theme } = useContext(Context);
  return (
    <div className={styles.container} onClick={toggle}>
      <div className={styles.icon}>🌞</div>
      <div className={styles.icon}>🌚</div>
      <div
        className={styles.ball}
        style={theme === "light" ? { left: "1px" } : { right: "1px" }}
      />
    </div>
  );
};

export default DarKModeToggle;
