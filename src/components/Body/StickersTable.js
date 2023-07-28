import React from "react";
import styles from "../../../src/styles/StickerTable.module.scss";
import { AperturaandCierre } from "../Tools/functiones";

import Link from "next/link";

export default function StickersTable({
  data,
  isActive,
  Options,
  isSampleGeneral,
  LstObservacionesPrede,
}) {
  return (
    <>
      <tr className={styles.table_body}>
        <td>{data.NUMERO_STICKER + `-` + data.SUFIJO}</td>
        <td>{data.FECHA_FORMAT_CREADO_COMPLETA}</td>
        <td>{isActive ? "Activo" : "Inactivo"}</td>
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
        </td>
      </tr>
    </>
  );
}
