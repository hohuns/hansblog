import { Fragment } from "react";
import styles from "./loading.module.css";

const Loader = () => {
  return (
    <div className={styles?.backdrop}>
      <div className={styles?.loader}></div>
    </div>
  );
};

export default Loader;
