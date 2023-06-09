import React from "react";
import Link from "next/link";
import styles from "../../../styles/IndexUsers.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";

function ComponentTrazaBitIndex({ InforSampleDetails }) {
  return (
    <>
      <section className={styles.Index_users}>
        <div className={`${styles.sticker_container} ${styleTable.max_width_card}`}>

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
            <table className={styleTable.tableStyleTraza}>
              <thead>
                <tr>
                <th style={{ width: "20%" }}><p>Información del sticker</p></th>
                <th style={{ width: "25%" }}><p>Información de la trazabilidad</p></th>
                <th style={{ width: "20%" }}><p>Accion de la trazabilidad</p></th>
                <th style={{ width: "35%" }}><p>Descripcion de la trazabilidad</p></th>
                </tr>                
              </thead>
              <tbody>
                {InforSampleDetails != null && InforSampleDetails != undefined
                  ? InforSampleDetails.map((data, index) => (
                      <tr key={index}>
                        <td style={{ width: "20%" }}><p><b>Numero de Sticker:</b> {data.NUMERO_STICKER}
                        <br></br>
                        <b>Sufijo:</b> {data.SUFIJO_STICKER}
                        </p>
                        </td>
                        <td style={{ width: "25%" }}><p>
                        <b>Responsable:</b> {data.USU_CREADOR_AUD_BITACORA}
                          <br></br>
                          <b>Fecha Trazabilidad:</b> {data.FECHA_AUDITORIA_FORMAT}
                          </p>
                        </td>
                        <td style={{ width: "20%" }}><p>{data.ACCION_BITACORA}</p></td>
                        <td style={{ width: "35%" }}><p>
                          {data.DESCRIPCION_BITACORA}

                          {data.TIPO_TRAZA == "3"
                            ? 
                            <p><b>Calculo del resultado:</b> {data.CALCULO_TIEMPO_RESULTADO}</p>
                            : ""}</p>
                        </td>
                      </tr>
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
