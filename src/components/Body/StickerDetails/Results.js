import React, { useState } from "react";
import styles from "../../../styles/StickerDetails.module.scss";
import stylesLst from "../../../styles/ListSeguimientos.module.scss";
import ListSegum from "./ListSeguimresult";

import Link from "next/link";

function Results({ data, Options, group, name_group, sticker }) {
  return (
    <div className={styles.restults} id={"Estatus" + data.COD_PRUEBA}>
      {/* {Options.BtnEditResultAndUrl ? (
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
      )} */}

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
          <span className={`${styles.info_title}  `}>
            Fecha de creación del estatus:
          </span>
          <p className={`${styles.info_text} ${styles.date}`}>
            {data.FECHA_CREACION_MINIMO_FORMAT !== null && data.FECHA_CREACION_MINIMO_FORMAT !== undefined
              ? data.FECHA_CREACION_MINIMO_FORMAT
              : ""}
          </p>
        </div>

        <div className={styles.info_group}>
          <span className={`${styles.info_title}  `}>
          Usuario que creo el estatus:
          </span>
          <p className={`${styles.info_text} ${styles.date}`}>
            {data.Email !== null && data.Email !== undefined
              ? data.Email
              : ""}
          </p>
        </div>
      </div>

      <div className={stylesLst.form_group}>
        <div className={stylesLst.input_group}>
          <div className={stylesLst.list}>
            <ListSegum
              IdPrub={data.COD_PRUEBA}
              NombrePrub={data.NOMBRE_PRUEBA}
              ListadoSeguimientos={data.ListadoSeguimientos}
              TipoTabla={true}
              UsuCreador={data.Email}
              FechaCreacion={data.FECHA_CREACION_MINIMO}
              group={group}
              name_group={name_group}
              sticker={sticker}
            ></ListSegum>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
}

export default Results;
