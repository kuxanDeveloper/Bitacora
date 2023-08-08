import React from "react";
import CircleInfo from "../../components/Statistics/CircleInfo";
function Index() {
  return (
    <>
      <div className="statistics">
        <section className="filters">
          <h1>Estadisticas</h1>

          <label>
            Desde
            <input type="datetime-local" placeholder="Desde" />
          </label>

          <label>
            Hasta
            <input type="datetime-local" placeholder="Hasta" />
          </label>
        </section>

        {/* circulos de informacion */}
        <section>

          <h2>Hemocultivo</h2>

          <div>
            <CircleInfo></CircleInfo>
            <CircleInfo></CircleInfo>
            <CircleInfo></CircleInfo>
            <CircleInfo></CircleInfo>
            <CircleInfo></CircleInfo>
          </div>
        </section>


      </div>
    </>
  );
}

export default Index;
