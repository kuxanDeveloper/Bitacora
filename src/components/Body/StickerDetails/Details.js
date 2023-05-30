import React from "react";
import styles from "../../../styles/StickerDetails.module.css";
import ImageOptimize from "../../Tools/ImageOptimize"
function Details({ data, setShowModal, setdobleImagen, setisImagenExterna }) {
  return (
    <div className={styles.followup}>
      {/* <!-- pruebas --> */}
      <button
        type="button"
        onClick={() => {
          setShowModal(true);
          setdobleImagen(true);
          setisImagenExterna(true);
        }}
        className={styles.img_icon}
      >
        <ImageOptimize
          Values={{
            src: "/img/Camera@2x.png",
            alt: "Logo dde camara",
            title: "Imagen de seguimiento",
            classValue: styles.img_camera,
            width: 35,
            height: 35,
          }}
        ></ImageOptimize>
      </button>
      <a className={styles.update_icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
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
