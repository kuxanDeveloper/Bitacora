import React from "react";
import Link from "next/link";
import styles from "../../../styles/IndexUsers.module.scss";
import styleTable from "../../../styles/TableStyles.module.scss";
import { ExportToExcelcsvTrazaBitacora } from "../../../pages/api/Sample/ViewDetailsTrazabilidad/[id]";
import Pagination from "../../Tools/Pagination";
import { useRouter } from "next/router";
import ImageOptimize from "../../Tools/ImageOptimize";
function ComponentTrazaBitIndex({
  InforSampleDetails,
  NumeroSticker,
  FechaIngreso,
  FechaIngresoFinal,
  UserRegisterStiker,
  Sufijo,
  MesAnio,
  query,
}) {
  const router = useRouter();

  const Addobjnew = () => {
    let newObje = {};

    newObje.page = query.page;

    if (NumeroSticker != null && NumeroSticker != "") {
      newObje.NumSticker = NumeroSticker;
    }
    if (FechaIngreso != null && FechaIngreso != "") {
      newObje.dateAdmision = FechaIngreso;
    }
    if (FechaIngresoFinal != null && FechaIngresoFinal != "") {
      newObje.dateFinal = FechaIngresoFinal;
    }
    if (UserRegisterStiker != null && UserRegisterStiker != "") {
      newObje.URS = UserRegisterStiker;
    }

    if (Sufijo != null && Sufijo != "") {
      newObje.Sufijo = Sufijo;
    }

    if (MesAnio != null && MesAnio != "") {
      newObje.Mes = MesAnio;
    }

    return newObje;
  };
console.log(InforSampleDetails);
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
            Listado de Trazabilidad en la lectura de stickers
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
                ExportToExcelcsvTrazaBitacora(
                  "Sample",
                  NumeroSticker,
                  FechaIngreso,
                  FechaIngresoFinal,
                  UserRegisterStiker,
                  Sufijo,
                  ""
                );
              }}
            >
              Exportar csv
            </Link>
            <table className={styleTable.tableStyleTraza}>
              <thead>
                <tr>
                  <th style={{ width: "20%" }}>
                    <p>Información del sticker</p>
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
                InforSampleDetails.ListadotrazabilidadBitacora != null &&
                InforSampleDetails.ListadotrazabilidadBitacora != undefined
                  ? InforSampleDetails.ListadotrazabilidadBitacora.map(
                      (data, index) => (
                        <tr key={index}>
                          <td style={{ width: "20%" }}>
                            <p>
                              <b>Numero de Sticker:</b> {data.NUMERO_STICKER}
                              <br></br>
                              <b>Sufijo:</b> {data.SUFIJO_STICKER}
                            </p>
                          </td>
                          <td style={{ width: "25%" }}>
                            <p>
                              <b>Responsable:</b>{" "}
                              {data.USU_CREADOR_AUD_BITACORA}
                              <br></br>
                              <b>Fecha Trazabilidad:</b>{" "}
                              {data.FECHA_AUDITORIA_FORMAT}
                            </p>
                          </td>
                          <td style={{ width: "20%" }}>
                            <p>{data.ACCION_BITACORA}</p>
                          </td>
                          <td style={{ width: "35%" }}>
                            <p>
                              {data.DESCRIPCION_BITACORA}

                              {data.TIPO_TRAZA == "3" ? (
                                <p>
                                  <b>Calculo del resultado:</b>{" "}
                                  {data.CALCULO_TIEMPO_RESULTADO}
                                </p>
                              ) : (
                                ""
                              )}
                            </p>
                          </td>
                        </tr>
                      )
                    )
                  : "" :""}
              </tbody>
            </table>
            {InforSampleDetails != null && InforSampleDetails != undefined ?
            InforSampleDetails.ListadotrazabilidadBitacora != null &&
            InforSampleDetails.ListadotrazabilidadBitacora != undefined ? (
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
            ) :""}
          </div>
        </div>
      </section>
    </>
  );
}

export default ComponentTrazaBitIndex;
