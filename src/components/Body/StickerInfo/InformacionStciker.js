import React from "react";
import styles from "../../../styles/StickerInfo.module.css";
import ImageOptimize from "../../Tools/ImageOptimize";
import { useContextBitacora } from "../../../context/BitacoraContext";
function InformacionStciker({ data, CountSeguimienti }) {
  const { setShowModal, setdobleImagen } = useContextBitacora();
  return (
    <>
      <div className={styles.card_sticker}>
        {/* <!-- imagenes --> */}
        <div className={styles.images_container}>
          <p className={styles.sticker_title}>Sticker</p>

          <div className={styles.sticker_number}>
            <p className={styles.info_sticker}>{data.NUMERO_STICKER}</p>
            <button
              type="button"
              onClick={() => {
                setShowModal(true);
                setdobleImagen(true);
              }}
              className={styles.photo}
            >
              <ImageOptimize
                Values={{
                  src: "/img/Camera@2x.png",
                  alt: "Logo de camara",
                  title: "",
                  classValue: styles.photo_img,
                  width: 40,
                  height: 40,
                  style: {},
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* <!-- estado --> */}
      <div className={styles.card_body}>
        <div className={styles.sticker_status}>
          <span className={styles.status_title}>Estado</span>
          <span className={styles.status}>
            {/* <!-- añada clase active para activar --> */}
            <span
              className={`${styles.status_icon} ${
                data.ESTADO_STICKER ? styles.active : ""
              }`}
            ></span>
            {data.ESTADO_STICKER ? "Activo" : "Inactivo"}
          </span>
        </div>

        <div className={styles.date_group}>
          <p className={styles.date_title}>Fecha de creación</p>
          <span className={styles.group_date}>
            {data.FECHA_FORMAT_CREADO_COMPLETA}
          </span>
        </div>

        <div className={styles.card_group}>
          <p className={styles.group_title}>Tipo de cliente</p>
          {/* <!-- anada la palabra internopara indicar que es interno nointerno para no interno --> */}
          <span
            className={`${styles.group_result}  ${
              data.CLIENTE_INTERNO ? styles.interno : ""
            }`}
          >
            {data.CLIENTE_INTERNO
              ? "Interno"
              : data.CLIENTE_EXTERNO
              ? "Externo"
              : ""}
          </span>
        </div>

        <div className={styles.card_group}>
          <p className={styles.group_title}>N° seguimientos</p>
          <span className={styles.group_result}>{CountSeguimienti}</span>
        </div>

        <div className={styles.card_group}>
          <p className={styles.group_title}>Usuario que creó el seguimiento</p>
          <span className={styles.group_result}>
            {data.USUARIO_EMAIL_CREADOR}
          </span>
        </div>

        <div className={styles.card_group}>
          <p className={styles.group_title}>Grupo</p>
          <span className={styles.group_result}>
            {data.NOMBRE_GRUPO_ASIGNADO}
          </span>
        </div>

        <div className={styles.card_group}>
          <p className={styles.group_title}>Observaciones iniciales</p>

          <span className={styles.group_result}>
            {data.OBSERVACIONES_INICIALES}
          </span>
        </div>
      </div>
    </>
  );
}

export default InformacionStciker;
