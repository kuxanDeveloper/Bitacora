import React from "react";
import styles from "../../styles/Skeleton.module.scss";

export default function Skeleton() {
  return (
    <>
      <div className={styles.skeleton}>
        <div className={styles.skeleton_card}>
          <div className="tile_w100"></div>
          <div className="title_w50"></div>
          <div className="cirle"></div>
        </div>
      </div>
    </>
  );
}
