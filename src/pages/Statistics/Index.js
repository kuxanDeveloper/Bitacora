import React from "react";
import Styles from "../../styles/Statistics.module.scss";
import CircleInfo from "../../components/Statistics/CircleInfo";
import Image from "next/image";
import Chart from "react-google-charts";

export const data = [
  ["Task", "Hours per Day"],
  ["Hemocultivo", 11],
  ["Prueba1", 2],
  ["Prueba2", 2],
  ["Prueba3", 2],
  ["Prueba 4", 7],
];

export const options = {
  title: "My Daily Activities",
};

function Index() {
  return (
    <>
      <div className={Styles.statistics}>
        <Image
          className={Styles.bg_image}
          width={1980}
          height={800}
          src={"/img/photo-1614935151651-0bea6508db6b.avif"}
        ></Image>
        <section className={Styles.filters}>
          <div className={Styles.content}>
            <h1 className={Styles.title}>Estadisticas</h1>

            <div className={Styles.inputs_container}>
              <label className={Styles.filter_label}>
                Desde
                <input
                  className={Styles.label_input}
                  type="datetime-local"
                  placeholder="Desde"
                />
              </label>

              <label className={Styles.filter_label}>
                Hasta
                <input
                  className={Styles.label_input}
                  type="datetime-local"
                  placeholder="Hasta"
                />
              </label>

              <button className={Styles.search_btn}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-search"
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
            <h2 className={Styles.title}>Hemocultivo</h2>

            <div className={Styles.circles_container}>
              <CircleInfo></CircleInfo>
              <CircleInfo></CircleInfo>
              <CircleInfo></CircleInfo>
              <CircleInfo></CircleInfo>
              <CircleInfo></CircleInfo>
            </div>

            <hr className={Styles.circle_hr} />
          </section>

          <div className={Styles.graphics}>
            <section className={Styles.round_statics}>
              <div>
                <select name="" id="">
                  <option value="" selected disabled>
                    Seleccione un grupo
                  </option>
                </select>
              </div>
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"450px"}
              />
            </section>
            <section className={Styles.bar_statics}>
              <div>
                <select name="" id="">
                  <option value="" selected disabled>
                    Seleccione un grupo
                  </option>
                </select>
                <select name="" id="">
                  <option value="" selected disabled>
                    Seleccione
                  </option>
                </select>
              </div>
              <Chart
                chartType="Bar"
                data={data}
                options={options}
                width={"100%"}
                height={"400px"}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
