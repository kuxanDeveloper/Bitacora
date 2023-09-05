import React, { useState } from "react";
import styles from "../../../styles/StickerDetails.module.scss";
import stylesLst from "../../../styles/ListSeguimientos.module.scss";
import ListSegum from "./ListSeguimresult";

import Link from "next/link";

function Results({ data, Options, group, name_group, sticker }) {
  return (
    <div className={styles.restults} id={"Estatus" + data.COD_PRUEBA}>


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
              Options={Options}
            ></ListSegum>
          </div>
        </div>
      </div>

      <hr />
    </div>
  );
}

export default Results;
