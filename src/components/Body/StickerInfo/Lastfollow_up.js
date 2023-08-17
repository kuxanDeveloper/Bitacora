import React from "react";
import styles from "../../../styles/StickerInfo.module.css";
import Link from "next/link";
function Lastfollow_up({ data, Options, infoBitacora }) {
  return (
    <div className={styles.follow_up_body}>
      {Options.BtnCrearNotaAndUrl && infoBitacora[0].ESTADO_STICKER ? (
        <Link
          title="Agregar nota"
          href={{
            pathname: "/Sample/CreateFollowUp/[id]",
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
        <p className={styles.group_title}>Observaciones de nota</p>

        <span className={styles.group_result}>
          {data.OBSERVACIONES_DETALLE}
        </span>
      </div>
      <div className={styles.card_group}>
        <p className={styles.group_title}>Usuario que creó la nota</p>

        <span className={styles.group_result}>
          {data.EMAIL_CREADOR_DETALLE}
        </span>
      </div>

      <div className={styles.card_group}>
        <p className={styles.group_title}>Fecha creación</p>

        <span className={styles.group_result}>
          {data.FECHA_CREADO_DETALLE_FORMAT}
        </span>
      </div>
    </div>
  );
}

export default Lastfollow_up;
