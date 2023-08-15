import React, { useState, useEffect } from "react";
import Styles from "../../../styles/Statistics.module.scss";
import CircleInfo from "../../../components/Body/Statistics/CircleInfo";
import Chart from "react-google-charts";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import ImageOptimize from "../../Tools/ImageOptimize";
import dayjs from "dayjs";
import "dayjs/locale/es";

import { ValidateSearchStatistic } from "../../Tools/functiones";
function PageIndexStatisct({
  ListDashboardPrinpal,
  fechaIni,
  fechaFin,
  ListGroup,
  ListStatus,
  SetValueChangeGrupoBarras,
  SetValueChangeGrupoTorta,
  ValueChangeGrupoTorta,
  ListDashboardSecundarioFilterComponent,
  fechaFormatIni,
  fechaFormatFin,
  ValueChangePruebaBarras,
  SetValueChangePruebaBarras,
}) {
  const data2 = [
    ["Estatus", ],
    ["Hemocultivo", 11],
    ["Prueba1", 2],
    ["Prueba2", 2],
    ["Prueba3", 2],
    ["Prueba 4", 7],
  ];

  return (
    <>
      <div className={Styles.statistics}>
        <ImageOptimize
          Values={{
            src: "/img/photo-1614935151651-0bea6508db6b.avif",
            alt: "Fondo BackGround",
            title: "Fondo BackGround",
            classValue: Styles.bg_image,
            width: 1920,
            height: 1080,
          }}
        ></ImageOptimize>
        <section className={Styles.filters}>
          <div className={Styles.content}>
            {/* <h2 className={Styles.title}>Estadisticas</h2> */}

            <div className={Styles.inputs_container}>
              <label className={Styles.filter_label}>Estadisticas Desde</label>
              <LocalizationProvider
                orientation="landscape"
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <MobileDateTimePicker
                  value={dayjs(fechaIni)}
                  className="FechaInitSearch"
                />
              </LocalizationProvider>

              <label className={Styles.filter_label}>Hasta</label>
              <LocalizationProvider
                orientation="landscape"
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
              >
                <MobileDateTimePicker
                  value={dayjs(fechaFin)}
                  className="FechaFinSearch"
                />
              </LocalizationProvider>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  ValidateSearchStatistic(
                    document.querySelector(".FechaInitSearch input").value,
                    document.querySelector(".FechaFinSearch input").value
                  );
                }}
                className={Styles.search_btn}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-search"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                  <path d="M21 21l-6 -6" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* circulos de informacion */}
        <div className={Styles.content}>
          <section className={Styles.circles}>
            <div className={Styles.circles_container}>
              {ListDashboardPrinpal != null && ListDashboardPrinpal != undefined
                ? ListDashboardPrinpal.length > 0
                  ? ListDashboardPrinpal.map((data, index) => (
                      <div key={index}>
                        <CircleInfo
                          title={data.NOMBRE_GRUPO}
                          porcent={data.PORCENTAJE_SACADO}
                          success={data.TOTAL_MUESTRAS_INACTIVAS}
                          total={data.TOTAL_MUESTRAS_ACTIVAS}
                        />
                      </div>
                    ))
                  : "Cargando..."
                : "Cargando..."}
            </div>

            <hr className={Styles.circle_hr} />
          </section>

          <div className={Styles.graphics}>
            <section className={Styles.round_statics}>
              <div>
                <select
                  name="GrupoTorta"
                  id="GrupoTorta"
                  defaultValue={""}
                  onChange={(e) => {
                    SetValueChangeGrupoTorta(e.target.value);
                  }}
                >
                  <option value="">Seleccione un grupo</option>
                  <option value="0">Todos</option>
                  {ListGroup != null && ListGroup != undefined
                    ? ListGroup.map((data, index) => (
                        <option key={index} value={data.Id_grupo}>
                          {data.NOMBRE_GRUPO}
                        </option>
                      ))
                    : "cargando..."}
                </select>
              </div>
              {ValueChangeGrupoTorta != "" ? (
                <Chart
                  chartType="PieChart"
                  data={ListDashboardSecundarioFilterComponent}
                  options={{
                    title: "Estatus por grupo",
                    is3D: true,
                  }}
                  width={"100%"}
                  height={"450px"}
                />
              ) : (
                ""
              )}
            </section>
            <section className={Styles.bar_statics}>
              <div>
                <select
                  name="GrupoBarra"
                  id="GrupoBarra"
                  defaultValue={""}
                  onChange={(e) => {
                    SetValueChangeGrupoBarras(e.target.value);
                    document.getElementById("StatusBarrar").value = "";
                  }}
                >
                  <option value="">Seleccione un grupo</option>
                  {ListGroup != null && ListGroup != undefined
                    ? ListGroup.map((data, index) => (
                        <option key={index} value={data.Id_grupo}>
                          {data.NOMBRE_GRUPO}
                        </option>
                      ))
                    : "cargando..."}
                </select>
                <select
                  name="StatusBarrar"
                  id="StatusBarrar"
                  onChange={(e) => {
                    SetValueChangePruebaBarras(e.target.value);
                  }}
                >
                  <option value="">Seleccione un estatus</option>
                  <option value="0">Todas los estatus</option>
                  {ListStatus != null && ListStatus != undefined
                    ? ListStatus.map((data, index) => (
                        <option key={index} value={data.COD_PRUEBA}>
                          {`${data.NOMBRE_PRUEBA}`}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
              {ValueChangePruebaBarras != "" ? (
                <Chart
                  chartType="Bar"
                  data={data2}
                  options={{
                    chart: {
                      title: "Estatus creados con un seguimiento",
                      subtitle: `Segumientos registrados desde ${fechaFormatIni} hasta ${fechaFormatFin}`,
                    },
                  }}
                  width={"100%"}
                  height={"400px"}
                />
              ) : (
                ""
              )}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageIndexStatisct;
