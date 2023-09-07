import React from "react";
import styles from "../../../styles/StickerDetails.module.scss";
import Link from "next/link";
import { useContextBitacora } from "../../../context/BitacoraContext";
function Details({ data, Options, name_group, sticker,group }) {
  const {
    setShowModal,
    setishabiliteBtn,
    setdobleImagen,
    setisImagenExterna,
    setValueImagesrcExterna2,
    setValueImagesrcExterna,
    setisImagenOne,
    setValueImagesrc2,
    setValueImagesrc,
  } = useContextBitacora();

  return (
    <div className={styles.followup}>
      {/* <!-- pruebas --> */}
      <button
        type="button"
        onClick={() => {
          setishabiliteBtn(false);
          setShowModal(true);
          setdobleImagen(false);
          setisImagenExterna(true);
          setisImagenOne(true);
          setValueImagesrcExterna(
            data.URL_PRIMERA_IMAGEN_DETALLE != null &&
              data.URL_PRIMERA_IMAGEN_DETALLE != undefined
              ? process.env.NEXT_PUBLIC_URL_API +
                  data.URL_PRIMERA_IMAGEN_DETALLE
              : null
          );
          setValueImagesrcExterna2(null);
          setValueImagesrc2(null);
          setValueImagesrc(null);
        }}
        className={styles.img_icon}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-camera"
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
          <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
          <path d="M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
        </svg>
      </button>

      {Options.BtnEditNotaAndUrl ? (
        <Link
          title="Editar nota"
          href={{
            pathname:
              data.ESTATUS != null
                ? "/Sample/EditNoteXSeguimiento/[id]"
                : "/Sample/EditFollowUp/[id]",
            query:
              (data.ESTATUS != null
                ? {
                    id: data.COD_DETALLE_BITACORA,
                    estatus: data.ESTATUS,
                    seguimiento: data.SEGUIMNIENTO,
                    opcion: data.OPCION_DESCRIPCION,
                    name_group: name_group,
                    group: group,
                    sticker: sticker,
                  }
                : {
                    id: data.COD_DETALLE_BITACORA,
                    name_group: name_group,
                    sticker: sticker,
                  }),
          }}
          className={styles.update_icon}
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

      <div className={styles.form_group}>
        <div className={styles.info_group}>
          <span className={`${styles.info_title} ${styles.inline}`}>
            Creado por:
          </span>
          <p className={`${styles.info_text} ${styles.inline}`}>
            {data.EMAIL_CREADOR_DETALLE}
          </p>
        </div>
        <div className={styles.info_group}>
          <span className={`${styles.info_title} ${styles.inline}`}>
            Fecha de creación
          </span>
          <p className={`${styles.info_text} ${styles.inline}`}>
            {data.FECHA_CREADO_DETALLE_FORMAT}
          </p>
        </div>
      </div>

      {data.ESTATUS != null ? (
        <div className={styles.form_group}>
          <div className={styles.info_group}>
            <span className={`${styles.info_title} ${styles.inline}`}>
              Estatus:
            </span>
            <p className={`${styles.info_text} ${styles.inline}`}>
              {data.ESTATUS}
            </p>
          </div>
          <div className={styles.info_group}>
            <span className={`${styles.info_title} ${styles.inline}`}>
              Seguimiento:
            </span>
            <p className={`${styles.info_text} ${styles.inline}`}>
              {data.SEGUIMNIENTO}
            </p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className={styles.form_group}>
        {data.OPCION_DESCRIPCION != null ? (
          <div className={styles.info_group}>
            <span className={styles.info_title}>Opcion: </span>
            <p className={styles.info_text}>{data.OPCION_DESCRIPCION}</p>
          </div>
        ) : (
          ""
        )}
        <div className={styles.info_group}>
          <span className={styles.info_title}>Observaciones: </span>
          <p className={styles.info_text}>{data.OBSERVACIONES_DETALLE}</p>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Details;
