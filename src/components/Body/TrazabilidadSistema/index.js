import React from "react";
import Link from "next/link";
import styles from "../../../styles/IndexUsers.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";

function ComponentTrazaSisIndex({ InforSampleDetails }) {
  return (
    <>
      <section className={styles.Index_users}>
        <div className={`${styles.sticker_container} ${styleTable.max_width_card}`}>

          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/",
                hash: "Cactive",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>
            Listado de Trazabilidad de la configuracion del sistema
          </p>
          <br />
          <div className={styles.card}>
            <table className={styleTable.tableStyleTraza}>
              <thead>
                <tr>
                <th style={{ width: "20%" }}><p>Tipo de configuracion</p></th>
                <th style={{ width: "25%" }}><p>Información de la trazabilidad</p></th>
                <th style={{ width: "20%" }}><p>Accion de la trazabilidad</p></th>
                <th style={{ width: "35%" }}><p>Descripcion de la trazabilidad</p></th>
                </tr>                
              </thead>
              <tbody>
                {InforSampleDetails != null && InforSampleDetails != undefined
                  ? InforSampleDetails.map((data, index) => (
                      <tr key={index}>
                        <td style={{ width: "20%" }}>
                            <p><b>Configuración:</b> {data.TABLA}</p>
                        </td>
                        <td style={{ width: "25%" }}><p>
                        <b>Responsable:</b> {data.USUARIO_ACCION}
                          <br></br>
                          <b>Fecha Trazabilidad:</b> {data.FECHA_ACCION_FORMAT}
                          </p>
                        </td>
                        <td style={{ width: "20%" }}><p>{data.ACCION_TABLA}</p></td>
                        <td style={{ width: "35%" }}><p>
                          {data.DESCRIPCION_TABLA}

                          {data.TIPO_TRAZA == "4"
                            ? 
                            <p><b>{data.EXITO_LOGIN == true ? "El login se realizo exitosamente" : "El intento de login fallo"}</b> </p>
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

export default ComponentTrazaSisIndex;
