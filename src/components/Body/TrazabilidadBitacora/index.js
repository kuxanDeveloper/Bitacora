import React, { useEffect } from "react";
import Link from "next/link";
import styles from "../../../styles/IndexUsers.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";

function ComponentTrazaBitIndex({ InforSampleDetails }) {
  return (
    <>
      <section className={styles.Index_users}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/index",
                hash: "Normal",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>
            Listado de Trazabilidad en la lectura de stickers
          </p>
          <br />
          <div className={styles.card}>
            <table className={styleTable.tableStyle}>
              <tbody>
                {InforSampleDetails != null && InforSampleDetails != undefined
                  ? InforSampleDetails.map((data, index) => (
                      <div key={index}>
                        <tr key={index}>
                          <th>Número de sticker</th>
                          <th>Sufijo</th>
                          <th>Usuario</th>
                        </tr>
                        <tr key={index}>
                          <td>{data.NUMERO_STICKER}</td>
                          <td>{data.SUFIJO_STICKER}</td>
                          <td>{data.USU_CREADOR_AUD_BITACORA}</td>
                        </tr>

                        <tr key={index}>
                          <th>Accion de la trazabilidad</th>
                          <th>Descripcion de la trazabilidad</th>
                        </tr>
                        <tr key={index}>
                          <td>{data.ACCION_BITACORA}</td>
                          <td>{data.DESCRIPCION_BITACORA}</td>
                        </tr>

                        <tr key={index}>
                          <th>Fecha trazabilidad</th>
                          {data.TIPO_TRAZA == "3" ?
                          <th>Calculo del resultado</th>
                        :""}
                        </tr>

                        <tr key={index}>
                          <td>{data.FECHA_CREACION_AUD_BITACORA}</td>
                          {data.TIPO_TRAZA == "3" ?
                          <td>{data.CALCULO_TIEMPO_RESULTADO}</td>
                        :""}
                        </tr>
                      </div>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

export default ComponentTrazaBitIndex;
