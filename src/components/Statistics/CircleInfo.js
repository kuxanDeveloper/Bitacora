import React from "react";
import Styles from "../../styles/CircleInfo.module.scss";

function CircleInfo() {
  return (
    <>
      <div className={Styles.circle}>
        <h3 className={Styles.title}>Hemocultivo</h3>

        <p className={Styles.total}>545</p>

        <span className={Styles.porcent}>80%</span>
      </div>
    </>
  );
}

export default CircleInfo;
