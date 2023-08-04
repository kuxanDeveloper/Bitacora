import React from "react";
import styles from "../../../styles/StickerDetails.module.scss";
import Link from "next/link";
import {
  validateResultArmadoIsOpciones,
  validateResultArmadoIsSeguimiento,
} from "../../Tools/functiones";
function Results({ data, Options, group, name_group, sticker }) {
  console.log(data);
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
        // Descomente el siguiente código para habilitar el botón de borrar

        // <Link
        //   title="Editar prueba"
        //   href={{
        //     pathname: "/Sample/EditResult/[id]",
        //     query: {
        //       id: data.CODIGO_RESULTADO_BITACORA,
        //       group: group,
        //       name_group: name_group,
        //       sticker: sticker,
        //     },
        //   }}
        //   className={styles.update_icon}
        // >
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     class="icon icon-tabler icon-tabler-trash-x"
        //     width="24"
        //     height="24"
        //     viewBox="0 0 24 24"
        //     strokeWidth="1.5"
        //     stroke="#ffffff"
        //     fill="none"
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //   >
        //     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        //     <path d="M4 7h16" />
        //     <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        //     <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        //     <path d="M10 12l4 4m0 -4l-4 4" />
        //   </svg>
        // </Link>
        ""
      )}

      {/* status y fecha */}
      <div className={styles.form_group}>
        <div className={styles.info_group}>
          <span className={`${styles.info_title} ${styles.inline}`}>
            Estatus:
          </span>
          <p className={`${styles.info_text} ${styles.inline}`}>
            {data.NOMBRE_PRUEBA !== null && data.NOMBRE_PRUEBA !== undefined
              ? data.NOMBRE_PRUEBA
              : ""}
          </p>
        </div>

        <div className={styles.info_group}>
          <span className={`${styles.info_title}  `}>Fecha de creación:</span>
          <p className={`${styles.info_text} ${styles.date}`}>
            {data.FECHA_CREACION_RESULTADO_FORMAT !== null &&
            data.FECHA_CREACION_RESULTADO_FORMAT !== undefined
              ? data.FECHA_CREACION_RESULTADO_FORMAT
              : ""}
          </p>
        </div>
        <div className={styles.info_group}>
          <span className={`${styles.info_title} ${styles.inline}`}>
            Estatus creado por:
          </span>
          <p className={`${styles.info_text} ${styles.inline}`}>
            {data.USUARIO_CREADOR_RESULTADO !== null &&
            data.USUARIO_CREADOR_RESULTADO !== undefined
              ? data.USUARIO_CREADOR_RESULTADO
              : ""}
          </p>
        </div>
      </div>

      <div className={styles.form_group}>
        {data.OPCION_DESCRIPCION != null ? (
          <div className={styles.info_group}>
            <span className={`${styles.info_title} ${styles.inline}`}>
              Opciones:
            </span>
            <p className={`${styles.info_text} ${styles.inline}`}>
              {validateResultArmadoIsSeguimiento(
                data.OPCION_DESCRIPCION,
                data.RESULTADO_ARMADO
              )
                ? data.RESULTADO_ARMADO
                : data.OPCION_DESCRIPCION !== null &&
                  data.OPCION_DESCRIPCION !== undefined
                ? data.OPCION_DESCRIPCION
                : ""}
            </p>
          </div>
        ) : (
          <></>
        )}

        <div className={styles.info_group}>
          <span className={`${styles.info_title}  ${styles.inline} `}>
            Seguimiento:
          </span>
          <p className={`${styles.info_text} ${styles.inline}`}>
            {validateResultArmadoIsSeguimiento(
              data.PLANTILLA_RESULTADO,
              data.RESULTADO_ARMADO
            )
              ? data.RESULTADO_ARMADO
              : data.PLANTILLA_RESULTADO !== null &&
                data.PLANTILLA_RESULTADO !== undefined
              ? data.PLANTILLA_RESULTADO
              : ""}
          </p>
        </div>
      </div>

      {/* resultado */}
      {/* <div className={styles.form_group}>
        <div className={styles.info_group}>
          <span className={`${styles.info_title} `}>Seguimiento</span>
          <p className={styles.info_text}>
            {" "}
            {data.PLANTILLA_RESULTADO !== null &&
            data.PLANTILLA_RESULTADO !== undefined
              ? data.PLANTILLA_RESULTADO
              : ""}
          </p>
        </div>
      </div> */}
      <hr />
    </div>
  );
}

export default Results;
