import React from "react";
import styles from "../../../src/styles/StickerTable.module.scss";
import { AperturaandCierre } from "../Tools/functiones";

import Link from "next/link";
import { Checkbox } from "@mui/material";

export default function StickersTable({
  data,
  isActive,
  Options,
  isSampleGeneral,
  LstObservacionesPrede,
  idGruop
}) {
console.log(data);
  return (
    <>
      <tr className={`${styles.table_body} checkListResult`}>
        <td><input id={`IdBitc_${data.CODIGO_BITACORA}`} value={`${data.NUMERO_STICKER}-${data.SUFIJO}_${data.CODIGO_BITACORA}`} name="inputCheckoutResult" type="checkbox" /></td>
        <td>{data.NUMERO_STICKER + `-` + data.SUFIJO}</td>
        <td>{data.FECHA_FORMAT_CREADO_COMPLETA}</td>
        {idGruop == 0 ? (
                    <td>{data.NOMBRE_GRUPO_ASIGNADO}</td>
                  ) : (
                    ""
                  )}
        <td>{isActive == true ? (
                            <span>&#x2705;</span>
                          ) : (
                            <span>&#10060;</span>
                          )} </td>
        <td className={styles.btn_options}>
          {isActive ? (
            Options.Cerrarorden ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  AperturaandCierre(data, LstObservacionesPrede);
                }}
                className={styles.btn_sticker}
              >
                {isActive ? "Cerrar orden" : "Abrir orden"}
              </button>
            ) : (
              ""
            )
          ) : Options.ActivarOrden ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                AperturaandCierre(data, LstObservacionesPrede);
              }}
              className={styles.btn_sticker}
            >
              {isActive ? "Cerrar orden" : "Abrir orden"}
            </button>
          ) : (
            ""
          )}
          <Link
              href={{
                pathname: "/Sample/ViewDetails/[id]",
                query: { id: data.CODIGO_BITACORA },
              }}
              className={styles.btn_sticker}
            >
              Ver Más
            </Link>
            {isActive ?
            <Link
              href={{
                pathname: "/Sample/CreateResult/[id]",
                query: {
                  id: data.CODIGO_BITACORA,
                  group:
                    data.ID_GRUPO_ASIGNADO != undefined &&
                    data.ID_GRUPO_ASIGNADO != null
                      ? data.ID_GRUPO_ASIGNADO
                      : "",
                  name_group:
                    data.NOMBRE_GRUPO_ASIGNADO != undefined &&
                    data.NOMBRE_GRUPO_ASIGNADO != null
                      ? data.NOMBRE_GRUPO_ASIGNADO
                      : "",
                  sticker:
                  data.NUMERO_STICKER != undefined &&
                  data.NUMERO_STICKER != null
                      ? data.NUMERO_STICKER +
                        "-" +
                        data.SUFIJO
                      : "",
                },
              }}
              className={styles.btn_sticker}
            >
              Agregar Estatus
            </Link> : ""}
        </td>
      </tr>
    </>
  );
}
