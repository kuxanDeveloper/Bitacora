import React, { useState, useEffect } from "react";
import styleTable from "../../../styles/TableStyles.module.scss";
import styles from "../../../styles/CreateNotes.module.scss";
import Link from "next/link";
import Swal from "sweetalert2";

function ListGrupo({
  ListGruposAnc,
  setListGruposAnc,
  InforOptionsSelc,
  InforGruposXAncest,
}) {
  const [valorGrupo, setvalorGrupo] = useState("");
  const [ListGruposAncNombre, setListGruposAncNombre] = useState([]);
  console.log(InforOptionsSelc);
  useEffect(() => {
    if (
      InforGruposXAncest != null &&
      InforGruposXAncest != undefined &&
      InforGruposXAncest.length > 0
    ) {
      InforGruposXAncest.map((data, index) => {
        const objetomodelo = {
          nombre: data.NOMBRE_GRUPO,
          codigo: data.Id_grupo.toString(),
        };

        setListGruposAncNombre((prevArray) => [...prevArray, objetomodelo]);
        setListGruposAnc((prevArray) => [
          ...prevArray,
          data.Id_grupo.toString(),
        ]);
      });
    }
  }, [InforGruposXAncest]);

  function Agregarplantillalist() {
    let txtopcion = document.getElementById("grupoResult");

    if (txtopcion.value == "" || txtopcion.value == undefined) {
      Swal.fire({
        title: "¡Advertencia!",
        text: "Debe seleccionar el grupo que desea agregar",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    } else {
      let opc = txtopcion.value;
      let textopc = txtopcion.options[txtopcion.selectedIndex].text;
      if (
        ListGruposAncNombre.filter((item) => item.codigo === opc).length > 0
      ) {
        Swal.fire({
          title: "¡Advertencia!",
          text: "El grupo que intenta guardar ya se encuentra agregado en el listado",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        setvalorGrupo("");
        return;
      }

      const objetomodelo = {
        nombre: textopc,
        codigo: opc,
      };

      setListGruposAncNombre((prevArray) => [...prevArray, objetomodelo]);
      setListGruposAnc((prevArray) => [...prevArray, opc]);
      setvalorGrupo("");
    }
  }

  function DeleteRowGrupo(idRow) {
    setListGruposAncNombre(
      ListGruposAncNombre.filter((item) => item.codigo !== idRow)
    );
    setListGruposAnc(ListGruposAnc.filter((item) => item !== idRow));
  }

  return (
    <div className={styles.form_group}>
      <div className={styles.input_group}>
        <label className={styles.group_title}>Grupos</label>

        <select
          name="grupoResult"
          id="grupoResult"
          onChange={(e) => setvalorGrupo(e.target.value)}
          value={valorGrupo}
          className={styles.group_input}
        >
          <option value={""} selected>
            Seleccione un grupo
          </option>
          {InforOptionsSelc != null && InforOptionsSelc != undefined
            ? InforOptionsSelc.map((data, index) => (
                <option key={index} value={data.Id_grupo}>
                  {data.NOMBRE_GRUPO}
                </option>
              ))
            : ""}
        </select>

        <div
          className={`${styles.btn_container_send} ${styles.btn_blue} ${styleTable.width_max_group}`}
        >
          <button
            title="Agregar Grupo"
            className={styles.btn_send}
            onClick={(e) => {
              e.preventDefault();
              Agregarplantillalist();
            }}
          >
            <span>&#10010; </span>
            Agregar Grupo
          </button>
        </div>
      </div>

      <div className={styles.input_group}>
        <table className={styleTable.tableStyle} id="TablaSeguimiento">
          <thead>
            <tr>
              <th></th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {ListGruposAncNombre != null && ListGruposAncNombre != undefined
              ? ListGruposAncNombre.map((data, index) => (
                  <tr key={index} id={data.codigo}>
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
                          DeleteRowGrupo(data.codigo);
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
export default ListGrupo;
