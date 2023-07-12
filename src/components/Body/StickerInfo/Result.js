import React from "react";
import styles from "../../../styles/StickerInfo.module.css";
import Link from "next/link";
function Result({ data, infoBitacora, Options }) {
  return (
    <div className={styles.result_body}>
      {Options.BtnCrearResultAndUrl ? (
        <Link
          href={{
            pathname: "/Sample/CreateResult/[id]",
            query: {
              id: infoBitacora[0].CODIGO_BITACORA,
              group: infoBitacora[0].ID_GRUPO_ASIGNADO,
              name_group: infoBitacora[0].NOMBRE_GRUPO_ASIGNADO,
              sticker:
                infoBitacora[0].NUMERO_STICKER + "-" + infoBitacora[0].SUFIJO,
            },
          }}
          className={styles.create_followUp}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-circle-plus"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#fff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
            <path d="M9 12l6 0" />
            <path d="M12 9l0 6" />
          </svg>
        </Link>
      ) : (
        ""
      )}

      <div className={styles.card_group}>
        <p className={styles.group_title}>Usuario que creo el resultado</p>

        <span className={styles.group_result}>
          {data.USUARIO_CREADOR_RESULTADO}
        </span>
      </div>
      <div className={styles.card_group}>
        <p className={styles.group_title}>Estatus</p>

        <span className={styles.group_result}>{data.NOMBRE_PRUEBA}</span>
      </div>

      <div className={styles.card_group}>
        <p className={styles.group_title}>Resultado</p>

        <span className={styles.group_result}>
          {data.PLANTILLA_RESULTADO !== null &&
          data.PLANTILLA_RESULTADO !== undefined
            ? data.PLANTILLA_RESULTADO
            : ""}
        </span>
      </div>
      {data.OPCION_DESCRIPCION != null &&
      data.OPCION_DESCRIPCION != undefined ? (
        <div className={styles.card_group}>
          <p className={styles.group_title}>Opciones</p>

          <span className={styles.group_result}>
            {data.OPCION_DESCRIPCION !== null &&
            data.OPCION_DESCRIPCION !== undefined
              ? data.OPCION_DESCRIPCION
              : ""}
          </span>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.card_group}>
        <p className={styles.group_title}>Fecha de último resultado</p>
        <span className={styles.group_result}>
          {data.FECHA_CREACION_RESULTADO_FORMAT !== null &&
          data.FECHA_CREACION_RESULTADO_FORMAT !== undefined
            ? data.FECHA_CREACION_RESULTADO_FORMAT
            : ""}
        </span>
      </div>
    </div>
  );
}

export default Result;
