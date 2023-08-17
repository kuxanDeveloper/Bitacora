import React from "react";
import styles from "../../../styles/StickerInfo.module.css";
import Link from "next/link";
import stylesLst from "../../../styles/ListSeguimientos.module.scss";
import ListSegum from "../StickerDetails/ListSeguimresult";

function Result({ data, infoBitacora, Options }) {
  return (
    <div>
      <div style={{justifyContent: "center"}} className={styles.result_body}>
        {Options.BtnCrearResultAndUrl && infoBitacora[0].ESTADO_STICKER ? (
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
          <p className={styles.group_title}>Estatus</p>

          <span className={styles.group_result}>{data.NOMBRE_PRUEBA}</span>
        </div>

        <div className={styles.card_group}>
          <p className={styles.group_title}>Fecha de creacion del estatus</p>
          <span className={styles.group_result}>
            {data.FECHA_CREACION_MINIMO_FORMAT !== null && data.FECHA_CREACION_MINIMO_FORMAT !== undefined
              ? data.FECHA_CREACION_MINIMO_FORMAT
              : ""}
          </span>
        </div>
        <div className={styles.card_group}>
          <p className={styles.group_title}>Usuario que creo el estatus</p>
          <span className={styles.group_result}>
            {data.Email !== null && data.Email !== undefined
              ? data.Email
              : ""}
          </span>
        </div>
      </div>
      <div className={stylesLst.form_group}>
        <div className={stylesLst.input_group}>
          <div className={stylesLst.list}>
            <ListSegum
              IdPrub={data.COD_PRUEBA}
              NombrePrub={data.NOMBRE_PRUEBA}
              ListadoSeguimientos={data.ListadoSeguimientos}
              TipoTabla={false}
              UsuCreador={data.Email}
              FechaCreacion={data.FECHA_CREACION_MINIMO}
            ></ListSegum>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
