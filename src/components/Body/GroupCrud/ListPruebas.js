import React, { useState, useEffect } from "react";
import styleTable from "../../../styles/TableStyles.module.scss";
import styles from "../../../styles/CreateNotes.module.scss";
import Link from "next/link";
import Swal from "sweetalert2";

function ListPrueba({
  ListPruebas,
  setListPruebas,
  InforOptionsSelc,
  InforPruebaXGrupo,
}) {
  const [valorprueba, setvalorprueba] = useState("");
  const [ListPruebasNombre, setListPruebasNombre] = useState([]);
  useEffect(() => {
    if (
      InforPruebaXGrupo != null &&
      InforPruebaXGrupo != undefined &&
      InforPruebaXGrupo.length > 0
    ) {
      InforPruebaXGrupo.map((data, index) => {
        const objetomodelo = {
          nombre: data.NOMBRE_PRUEBA,
          codigo: data.COD_PRUEBA.toString(),
        };

        setListPruebasNombre((prevArray) => [...prevArray, objetomodelo]);
        setListPruebas((prevArray) => [
          ...prevArray,
          data.COD_PRUEBA.toString(),
        ]);
      });
    }
  }, [InforPruebaXGrupo]);

  function Agregarpruebalist() {
    let txtopcion = document.getElementById("pruebaResult");

    if (txtopcion.value == "" || txtopcion.value == undefined) {
      Swal.fire({
        title: "¡Advertencia!",
        text: "Debe seleccionar el estatus que desea agregar",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    } else {
      let opc = txtopcion.value;
      let textopc = txtopcion.options[txtopcion.selectedIndex].text;
      if (ListPruebasNombre.filter((item) => item.codigo === opc).length > 0) {
        Swal.fire({
          title: "¡Advertencia!",
          text: "El estatus que intenta guardar ya se encuentra agregado en el listado",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        setvalorprueba("");
        return;
      }

      const objetomodelo = {
        nombre: textopc,
        codigo: opc,
      };

      setListPruebasNombre((prevArray) => [...prevArray, objetomodelo]);
      setListPruebas((prevArray) => [...prevArray, opc]);
      setvalorprueba("");
    }
  }

  function DeleteRowEstatus(idRow) {
    setListPruebasNombre(
      ListPruebasNombre.filter((item) => item.codigo !== idRow)
    );
    setListPruebas(ListPruebas.filter((item) => item !== idRow));
  }

  return (
    <div className={styles.form_group}>
      <div className={styles.input_group}>
        <label className={styles.group_title}>Estatus</label>

        <select
          name="pruebaResult"
          id="pruebaResult"
          onChange={(e) => setvalorprueba(e.target.value)}
          value={valorprueba}
          className={styles.group_input}
        >
          <option value={""} selected>
            Seleccione un estatus
          </option>
          {InforOptionsSelc.listadoPrueba != null &&
          InforOptionsSelc.listadoPrueba != undefined
            ? InforOptionsSelc.listadoPrueba.map((data, index) => (
                <option key={index} value={data.COD_PRUEBA}>
                  {data.NOMBRE_PRUEBA}
                </option>
              ))
            : ""}
        </select>

        <div
          className={`${styles.btn_container_send} ${styles.btn_blue} ${styleTable.width_max_group}`}
        >
          <button
            title="Agregar Estatus"
            className={styles.btn_send}
            onClick={(e) => {
              e.preventDefault();
              Agregarpruebalist();
            }}
          >
            <span>&#10010; </span>
            Agregar Estatus
          </button>
        </div>
      </div>

      <div className={styles.input_group}>
        <table className={styleTable.tableStyle} id="TablaEstatus">
          <thead>
            <tr>
              <th>Descripcion Estatus</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {ListPruebasNombre != null && ListPruebasNombre != undefined
              ? ListPruebasNombre.map((data, index) => (
                  <tr key={index} id={data.codigo}>
                    <td className={styleTable.textCenterColumn}>
                      <p>{data.nombre}</p>
                    </td>
                    <td>
                      <Link
                        title="Eliminar Estatus"
                        className={styleTable.colorrojoBoton}
                        type="button"
                        href={""}
                        onClick={(e) => {
                          e.preventDefault();
                          DeleteRowEstatus(data.codigo);
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
  );
}
export default ListPrueba;
