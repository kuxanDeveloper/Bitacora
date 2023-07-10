import React from "react";
import styles from "../../../styles/StickerDetails.module.scss";
import Link from "next/link";

function Results({ data, Options, group, name_group, sticker }) {
  return (
    <div className={styles.restults}>
      {Options.BtnEditResultAndUrl ? (
        <Link
          title="Editar prueba"
          href={{
            pathname: "/Sample/EditResult/[id]",
            query: {
              id: data.CODIGO_RESULTADO_BITACORA,
              group: group,
              name_group: name_group,
              sticker: sticker,
            },
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
          <span className={styles.info_title}>Estatus</span>
          <p className={`${styles.info_text} ${styles.inline}`}>
            {data.NOMBRE_PRUEBA !== null && data.NOMBRE_PRUEBA !== undefined
              ? data.NOMBRE_PRUEBA
              : ""}
          </p>
        </div>

        <div className={styles.info_group}>
          <span className={`${styles.info_title} ${styles.inline}`}>Resultado</span>
          <p className={styles.info_text}>
            {" "}
            {data.PLANTILLA_RESULTADO !== null &&
            data.PLANTILLA_RESULTADO !== undefined
              ? data.PLANTILLA_RESULTADO
              : ""}
          </p>
        </div>
        {data.OPCION_DESCRIPCION != null ? (
          <div className={styles.info_group}>
            <span className={ styles.info_title}>Opciones</span>
            <p className={`${styles.info_title} ${styles.inline}` }>
              {data.OPCION_DESCRIPCION !== null &&
              data.OPCION_DESCRIPCION !== undefined
                ? data.OPCION_DESCRIPCION
                : ""}
            </p>
          </div>
        ) : (
          <></>
        )}

        <div className={styles.info_group}>
          <span className={styles.info_title}>Fecha de creación resultado</span>
          <p className={styles.info_text}>
            {data.FECHA_CREACION_RESULTADO_FORMAT !== null &&
            data.FECHA_CREACION_RESULTADO_FORMAT !== undefined
              ? data.FECHA_CREACION_RESULTADO_FORMAT
              : ""}
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Results;
