import React from "react";
import styles from "../../../styles/StickerDetails.module.css";
function Details({ data }) {
  return (
    <div className={styles.followup}>
      {/* <!-- pruebas --> */}

      <a className={styles.update_icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#fff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
          <path d="M13.5 6.5l4 4" />
        </svg>
      </a>

      <div className={styles.form_group}>
        <div className={styles.info_group}>
          <span className={styles.info_title}>Creado por:</span>
          <p className={styles.info_text}>{data.EMAIL_CREADOR_DETALLE}</p>
        </div>

        <div className={styles.info_group}>
          <span className={styles.info_title}>Fecha de creación</span>
          <p className={styles.info_text}>{data.FECHA_CREADO_DETALLE_FORMAT}</p>
        </div>
      </div>

      <div className={styles.form_group}>
        <div className={styles.info_group}>
          <span className={styles.info_title}>Observaciones</span>
          <p className={styles.info_text}>{data.OBSERVACIONES_DETALLE}</p>
        </div>
      </div>
      <hr />

    </div>
    
  );
}

export default Details;
