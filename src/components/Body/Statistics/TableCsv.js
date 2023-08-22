import React from "react";
import styles from "../../../styles/IndexUsers.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";
import { ExportToExcelcsvFechasBit } from "../../../pages/api/Sample/ViewDetailsGroup/[id]";
import { useRouter } from "next/router";
import Pagination from "../../Tools/Pagination";
import ImageOptimize from "../../Tools/ImageOptimize";
import Link from "next/link";
import { ClickButtonMenuConf } from "../../Tools/functiones";

function TableCsv({ InforSampleDetails, FechaIngreso, FechaIngresoFinal,valueGrupo,query }) {

    const router = useRouter();

  const Addobjnew = () => {
    let newObje = {};

    newObje.page = query.page;

    if (FechaIngreso != null && FechaIngreso != "") {
      newObje.dateinicial = FechaIngreso;
    }
    if (FechaIngresoFinal != null && FechaIngresoFinal != "") {
      newObje.dateFinal = FechaIngresoFinal;
    }
    if (valueGrupo != null && valueGrupo != "") {
        newObje.grupo = valueGrupo;
      }

    return newObje;
  };

  return (
    <>
      <section className={styles.Index_users}>
        <ImageOptimize
          Values={{
            src: "/img/photo-1614935151651-0bea6508db6b.avif",
            alt: "Fondo BackGround",
            title: "Fondo BackGround",
            classValue: styles.background_img,
            width: 1920,
            height: 1080,
          }}
        ></ImageOptimize>

        <div
          className={`${styles.sticker_container} ${styleTable.max_width_card}`}
        >
          <div className={styles.back_btn_container}>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault;
                ClickButtonMenuConf();}}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>
            Listado de Fechas de lectura de stickers
          </p>
          <br />
          <div className={styles.card}>
            <Link
              className={styles.export_btn}
              href={""}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                ExportToExcelcsvFechasBit(
                  FechaIngreso,
                  FechaIngresoFinal,
                  valueGrupo
                );
              }}
            >
              Exportar csv
            </Link>
            <table
              style={{ marginTop: "10px" }}
              className={styleTable.tableStyleTraza}
            >
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>
                    <p>Grupo</p>
                  </th>
                  <th style={{ width: "10%" }}>
                    <p>Numero de sticker</p>
                  </th>
                  <th style={{ width: "10%" }}>
                    <p>Fecha Creado sticker</p>
                  </th>
                  <th style={{ width: "10%" }}>
                    <p>Fecha Recogida Muestra</p>
                  </th>
                  <th style={{ width: "10%" }}>
                    <p>Fecha Suena Positivo</p>
                  </th>
                  <th style={{ width: "10%" }}>
                    <p>Fecha Validacion Antibiograma</p>
                  </th>
                  <th style={{ width: "10%" }}>
                    <p>Fecha Validacion Hemocultivo</p>
                  </th>
                  <th style={{ width: "10%" }}>
                    <p>Fecha Validacion Identificacion botella</p>
                  </th>
                  <th style={{ width: "10%" }}>
                    <p>Fecha Validacion Final</p>
                  </th>
                  <th style={{ width: "10%" }}>
                    <p>Fecha Verificacion</p>
                  </th>
                  <th style={{ width: "10%" }}>
                    <p>Fecha Ingreso Botella</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {InforSampleDetails != null && InforSampleDetails != undefined
                  ? InforSampleDetails.LstBitacora != null &&
                    InforSampleDetails.LstBitacora != undefined
                    ? InforSampleDetails.LstBitacora.map((data, index) => (
                        <tr key={index}>
                          <td>
                            <p>{data.NOMBRE_GRUPO_ASIGNADO}</p>
                          </td>
                          <td>
                            <p>{data.NUMERO_STICKER + "-" + data.SUFIJO}</p>
                          </td>
                          <td>
                            <p>{data.FECHA_FORMAT_CREADO_COMPLETA}</p>
                          </td>
                          <td>
                            <p>{data.FECHA_FORMAT_RECOGIDA_MUESTRA}</p>
                          </td>
                          <td>
                            <p>{data.FECHA_HORA_SUENA_POSITIVO_FORMAT}</p>
                          </td>
                          <td>
                            <p>
                              {data.FECHA_HORA_VALIDACION_ANTIBIOGRAMA_FORMAT}
                            </p>
                          </td>
                          <td>
                            <p>
                              {
                                data.FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO_FORMAT
                              }
                            </p>
                          </td>
                          <td>
                            <p>
                              {
                                data.FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA_FORMAT
                              }
                            </p>
                          </td>
                          <td>
                            <p>
                              {
                                data.FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL_FORMAT
                              }
                            </p>
                          </td>
                          <td>
                            <p>{data.FECHA_HORA_VERIFICACION_FORMAT}</p>
                          </td>
                          <td>
                            <p>{data.FECHA_INGRESO_BOTELLA_FORMAT}</p>
                          </td>
                        </tr>
                      ))
                    : ""
                  : ""}
              </tbody>
            </table>
            {InforSampleDetails != null && InforSampleDetails != undefined ?
            InforSampleDetails.LstBitacora != null &&
            InforSampleDetails.LstBitacora != undefined && InforSampleDetails.LstBitacora.length > 0 ? (
              <>
                <br></br>
                <Pagination
                  TotalPage={InforSampleDetails.LstBitacora[0].TotalPage}
                  page={query.page}
                  pathname={router.pathname}
                  queryArme={Addobjnew()}
                  hash={null}
                  CountPage={InforSampleDetails.LstBitacora[0].Per_PAge}
                ></Pagination>
              </>
            ) : (
              ""
            ):""}
          </div>
        </div>
      </section>
    </>
  );
}

export default TableCsv;
