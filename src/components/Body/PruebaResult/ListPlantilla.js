import React, { useState, useEffect } from "react";
import styleTable from "../../../styles/TableStyles.module.scss";
import styles from "../../../styles/CreateNotes.module.scss";
import Link from "next/link";
import Swal from "sweetalert2";

function ListPlantillas({
  ListPlantillas,
  setListPlantillas,
  InforOptionsSelc,
  InforPlantillasXPrueba,
}) {
  const [valorplantilla, setvalorplantilla] = useState("");
  const [ListPlantillasNombre, setListPlantillasNombre] = useState([]);

  useEffect(() => {
    if (
      InforPlantillasXPrueba != null &&
      InforPlantillasXPrueba != undefined &&
      InforPlantillasXPrueba.length > 0
    ) {
      InforPlantillasXPrueba.map((data) => {
        const objetomodelo = {
          nombre: data.RESULTADO_PLANTILLA,
          codigo: data.COD_PLANTILLA.toString(),
        };

        setListPlantillasNombre((prevArray) => [...prevArray, objetomodelo]);
        setListPlantillas((prevArray) => [
          ...prevArray,
          data.COD_PLANTILLA.toString(),
        ]);
      });
    }
  }, [InforPlantillasXPrueba]);

  function Agregarplantillalist() {
    let txtopcion = document.getElementById("plantillaResult");

    if (txtopcion.value == "" || txtopcion.value == undefined) {
      Swal.fire({
        title: "¡Advertencia!",
        text: "Debe seleccionar el seguimiento que desea agregar",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    } else {
      let opc = txtopcion.value;
      let textopc = txtopcion.options[txtopcion.selectedIndex].text
        .split("|")[1]
        .trim();
      if (
        ListPlantillasNombre.filter((item) => item.codigo === opc).length > 0
      ) {
        Swal.fire({
          title: "¡Advertencia!",
          text: "El seguimiento que intenta guardar ya se encuentra agregado en el listado",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        setvalorplantilla("");
        return;
      }

      const objetomodelo = {
        nombre: textopc,
        codigo: opc,
      };

      setListPlantillasNombre((prevArray) => [...prevArray, objetomodelo]);
      setListPlantillas((prevArray) => [...prevArray, opc]);
      setvalorplantilla("");
    }
  }

  function DeleteRowPlantilla(idRow) {
    setListPlantillasNombre(
      ListPlantillasNombre.filter((item) => item.codigo !== idRow)
    );
    setListPlantillas(ListPlantillas.filter((item) => item !== idRow));
  }

  return (
    <>
      <div className={styles.form_group}>
        <div className={styles.input_group}>
          <label className={styles.group_title}>Seguimientos</label>

          <select
            name="plantillaResult"
            id="plantillaResult"
            onChange={(e) => setvalorplantilla(e.target.value)}
            value={valorplantilla}
            className={styles.group_input}
          >
            <option value={""} selected>
              Seleccione un seguimiento
            </option>
            {InforOptionsSelc != null && InforOptionsSelc != undefined
              ? InforOptionsSelc.map((data, index) => (
                  <option key={index} value={data.COD_PLANTILLA}>
                    {data.COD_PLANTILLA + " | " + data.RESULTADO_PLANTILLA}
                  </option>
                ))
              : ""}
          </select>

          <div
            className={`${styles.btn_container_send} ${styles.btn_blue} ${styleTable.width_max_group}`}
          >
            <button
              title="Agregar Opcion"
              className={styles.btn_send}
              onClick={(e) => {
                e.preventDefault();
                Agregarplantillalist();
              }}
            >
              <span>&#10010; </span>
              Agregar Seguimiento
            </button>
          </div>
        </div>
      </div>
      <div className={styles.form_group}>
        <div className={styles.input_group}>
          <table className={styleTable.tableStyle} id="TablaSeguimiento">
            <thead>
              <tr>
                <th>Código de seguimiento</th>
                <th>Descripcion Seguimiento</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {ListPlantillasNombre != null && ListPlantillasNombre != undefined
                ? ListPlantillasNombre.map((data, index) => (
                    <tr key={index} id={data.codigo}>
                      <td className={styleTable.textCenterColumn}>
                        <p>{data.codigo}</p>
                      </td>
                      <td className={styleTable.textCenterColumn}>
                        <p>{data.nombre}</p>
                      </td>
                      <td>
                        <Link
                          title="Eliminar Plantilla"
                          className={styleTable.colorrojoBoton}
                          type="button"
                          href={""}
                          onClick={(e) => {
                            e.preventDefault();
                            DeleteRowPlantilla(data.codigo);
                          }}
                        >
                          <span>&#128941;</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default ListPlantillas;
