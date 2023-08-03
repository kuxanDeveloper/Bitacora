import React from "react";
import Link from "next/link";
import styles from "../../../styles/IndexUsers.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";
import { ExportToExcelcsvTrazaSistema } from "../../../pages/api/Sample/ViewDetailsTrazabilidad/[id]";
import { useRouter } from "next/router";
import Pagination from "../../Tools/Pagination";
import ImageOptimize from "../../Tools/ImageOptimize";
function ComponentTrazaSisIndex({
  InforSampleDetails,
  FechaIngreso,
  FechaIngresoFinal,
  UserRegisterStiker,
  Tipotabla,
  MesAnio,
  query,
}) {
  const router = useRouter();

  const Addobjnew = () => {
    let newObje = {};

    newObje.page = query.page;

    if (FechaIngreso != null && FechaIngreso != "") {
      newObje.dateAdmision = FechaIngreso;
    }
    if (FechaIngresoFinal != null && FechaIngresoFinal != "") {
      newObje.dateFinal = FechaIngresoFinal;
    }
    if (UserRegisterStiker != null && UserRegisterStiker != "") {
      newObje.URS = UserRegisterStiker;
    }

    if (Tipotabla != null && Tipotabla != "") {
      newObje.Tipo_tabla = Tipotabla;
    }

    if (MesAnio != null && MesAnio != "") {
      newObje.Mes = MesAnio;
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
            <Link
              className={styles.export_btn}
              href={""}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                ExportToExcelcsvTrazaSistema(
                  "system",
                  "",
                  FechaIngreso,
                  FechaIngresoFinal,
                  UserRegisterStiker,
                  "",
                  Tipotabla
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
                  <th style={{ width: "20%" }}>
                    <p>Tipo de configuracion</p>
                  </th>
                  <th style={{ width: "25%" }}>
                    <p>Información de la trazabilidad</p>
                  </th>
                  <th style={{ width: "20%" }}>
                    <p>Accion de la trazabilidad</p>
                  </th>
                  <th style={{ width: "35%" }}>
                    <p>Descripcion de la trazabilidad</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {InforSampleDetails != null && InforSampleDetails != undefined ?
                InforSampleDetails.ListadotrazabilidadTablas != null &&
                InforSampleDetails.ListadotrazabilidadTablas != undefined
                  ? InforSampleDetails.ListadotrazabilidadTablas.map(
                      (data, index) => (
                        <tr key={index}>
                          <td style={{ width: "20%" }}>
                            <p>
                              <b>Configuración:</b> {data.TABLA}
                            </p>
                          </td>
                          <td style={{ width: "25%" }}>
                            <p>
                              <b>Responsable:</b> {data.USUARIO_ACCION}
                              <br></br>
                              <b>Fecha Trazabilidad:</b>{" "}
                              {data.FECHA_ACCION_FORMAT}
                            </p>
                          </td>
                          <td style={{ width: "20%" }}>
                            <p>{data.ACCION_TABLA}</p>
                          </td>
                          <td style={{ width: "35%" }}>
                            <p>
                              {data.DESCRIPCION_TABLA}

                              {data.TIPO_TRAZA == "4" ? (
                                <p>
                                  <b>
                                    {data.EXITO_LOGIN == true
                                      ? "El login se realizo exitosamente"
                                      : "El intento de login fallo"}
                                  </b>{" "}
                                </p>
                              ) : (
                                ""
                              )}
                            </p>
                          </td>
                        </tr>
                      )
                    )
                  : "":""}
              </tbody>
            </table>
            {InforSampleDetails != null && InforSampleDetails != undefined ?
            InforSampleDetails.ListadotrazabilidadTablas != null &&
            InforSampleDetails.ListadotrazabilidadTablas != undefined ? (
              <>
                <br></br>
                <Pagination
                  TotalPage={InforSampleDetails.TotalPage}
                  page={query.page}
                  pathname={router.pathname}
                  queryArme={Addobjnew()}
                  hash={null}
                  CountPage={InforSampleDetails.Per_PAge}
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

export default ComponentTrazaSisIndex;
