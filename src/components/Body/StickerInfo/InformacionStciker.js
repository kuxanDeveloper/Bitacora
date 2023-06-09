import React from "react";
import styles from "../../../styles/StickerInfo.module.css";
import { useContextBitacora } from "../../../context/BitacoraContext";
import { AperturaandCierre } from "../../Tools/functiones";
import Link from "next/link";

function InformacionStciker({
  data,
  CountSeguimienti,
  GrupoHabilite,
  Options,
  LstObservacionesPrede,
}) {
  const {
    setShowModal,
    setishabiliteBtn,
    setdobleImagen,
    setisImagenExterna,
    setValueImagesrcExterna,
    setValueImagesrcExterna2,
    setValueImagesrc2,
    setValueImagesrc,
  } = useContextBitacora();

  return (
    <>
      <div className={styles.card_sticker}>
        {/* <!-- imagenes --> */}
        <div className={styles.images_container}>
          <p className={styles.sticker_title}>N° sticker</p>

          <div className={styles.sticker_number}>
            <p
              className={styles.info_sticker}
            >{`${data.NUMERO_STICKER}-${data.SUFIJO}`}</p>
            <button
              type="button"
              onClick={() => {
                setShowModal(true);
                setdobleImagen(true);
                setishabiliteBtn(false);
                setisImagenExterna(true);
                setValueImagesrc2(null);
                setValueImagesrc(null);
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 20h-7a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v3.5" />
                <path d="M16 19h6" />
                <path d="M19 16v6" />
                <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              </svg>
            </button>
            {data.ESTADO_STICKER ? (
              Options.Cerrarorden ? (
                <button
                  type="button"
                  title={data.ESTADO_STICKER ? "Cerrar orden" : "Abrir orden"}
                  onClick={() => {
                    AperturaandCierre(data, LstObservacionesPrede);
                  }}
                  className={styles.photo}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className=""
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#fff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              ) : (
                ""
              )
            ) : Options.ActivarOrden ? (
              <button
                type="button"
                title={data.ESTADO_STICKER ? "Cerrar orden" : "Abrir orden"}
                onClick={() => {
                  AperturaandCierre(data, LstObservacionesPrede);
                }}
                className={styles.photo}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=""
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 5l0 14" />
                  <path d="M5 12l14 0" />
                </svg>
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* <!-- estado --> */}
      <div className={styles.card_body}>
        {Options.BtnEditResultAndUrl ? (
          <Link
            title="Editar sticker"
            className={styles.Edit_icon}
            href={{
              pathname: "/Sample/Edit/[id]",
              query: {
                id: data.CODIGO_BITACORA,
                group:
                  data.ID_GRUPO_ASIGNADO != undefined &&
                  data.ID_GRUPO_ASIGNADO != null
                    ? data.ID_GRUPO_ASIGNADO
                    : "",
                isHabilteGroup: GrupoHabilite,
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
        ) : (
          ""
        )}

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
