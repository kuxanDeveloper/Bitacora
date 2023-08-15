import React from "react";
import Styles from "../../../styles/CircleInfo.module.scss";


function CircleInfo({ title, porcent, total, success }) {
  return (
    <>
      <div className={Styles.circle}>
        <h3 className={Styles.title}>{title}</h3>

        <p className={Styles.porcent}>{porcent}%</p>
        <div className={Styles.progress}>
          <div style={{ width: `${porcent}%` }}></div>
        </div>

        <span className={Styles.total}>
          {success}/<small>{total}</small>
        </span>
      </div>
    </>
  );
}

export default CircleInfo;
