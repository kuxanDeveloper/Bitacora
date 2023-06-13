import React from "react";
import styles from "../../../styles/StickerInfo.module.css";
import ImageOptimize from "../../Tools/ImageOptimize";
import { useContextBitacora } from "../../../context/BitacoraContext";
import Link from "next/link";
function InformacionStciker({ data, CountSeguimienti }) {
  const {
    setShowModal,
    setishabiliteBtn,
    setdobleImagen,
    setisImagenExterna,
    setValueImagesrcExterna,
    setValueImagesrcExterna2,
  } = useContextBitacora();

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
                setishabiliteBtn(false);
                setisImagenExterna(true);
                setValueImagesrcExterna(
                  data.URL_PRIMERA_IMAGEN != null &&
                    data.URL_PRIMERA_IMAGEN != undefined &&
                    data.URL_PRIMERA_IMAGEN != ""
                    ? process.env.NEXT_PUBLIC_URL_API + data.URL_PRIMERA_IMAGEN
                    : null
                );
                setValueImagesrcExterna2(
                  data.URL_SEGUNDA_IMAGEN != null &&
                    data.URL_SEGUNDA_IMAGEN != undefined &&
                    data.URL_SEGUNDA_IMAGEN != ""
                    ? process.env.NEXT_PUBLIC_URL_API + data.URL_SEGUNDA_IMAGEN
                    : null
                );
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

            <Link
              title="Editar sticker"
              className={styles.Edit_icon}
              href={{
                pathname: "/Sample/Edit/[id]",
                query: {
                  id: data.NUMERO_STICKER,
                  group:
                    data.ID_GRUPO_ASIGNADO != undefined &&
                    data.ID_GRUPO_ASIGNADO != null
                      ? data.ID_GRUPO_ASIGNADO
                      : "",
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
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
            </Link>
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
