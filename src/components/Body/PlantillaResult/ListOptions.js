import React, { useState, useEffect } from "react";
import styleTable from "../../../styles/TableStyles.module.scss";
import styles from "../../../styles/CreateNotes.module.scss";
import Link from "next/link";
import Swal from "sweetalert2";

function ListOptions({ListOpciones, setListOpciones,InforOptionsSelc,InforOptionsXpruebas}) {
  
  const [valoropcion, setvaloropcion] = useState("");
  const [ListOpcionesNombre, setListOpcionesNombre] = useState([]);
  useEffect(() => {

    if(InforOptionsXpruebas != null &&
      InforOptionsXpruebas != undefined &&
      InforOptionsXpruebas.length > 0)
    {

      InforOptionsXpruebas.map((data,index) => {

        const objetomodelo = {
          nombre:data.OPCION_DESCRIPCION,
          codigo:data.COD_OPCIONES.toString()
        };

        setListOpcionesNombre((prevArray) => [...prevArray, objetomodelo]);
        setListOpciones((prevArray) => [...prevArray, data.COD_OPCIONES.toString()]);

      });

    }

  },[InforOptionsXpruebas]);

  function Agregaropcionlist() {
    let txtopcion = document.getElementById("opcionResult");

    if (txtopcion.value == "" || txtopcion.value == undefined) {
      Swal.fire({
        title: "¡Advertencia!",
        text: "Debe seleccionar la opcion que desea agregar",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    } else {
        let opc = txtopcion.value;
        let textopc = txtopcion.options[txtopcion.selectedIndex].text;;
        if(ListOpcionesNombre.filter((item) => item.codigo === opc).length > 0)
        {

            Swal.fire({
                title: "¡Advertencia!",
                text: "La opcion que intenta guardar ya se encuentra agregado en el listado",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              setvaloropcion("");
              return;
              
        }

        const objetomodelo = {
            nombre:textopc,
            codigo:opc
          };

          setListOpcionesNombre((prevArray) => [...prevArray, objetomodelo]);
        setListOpciones((prevArray) => [...prevArray, opc]);
        setvaloropcion("");
      
    }
  }

  function DeleteRowOpcion(idRow) {
    setListOpcionesNombre(ListOpcionesNombre.filter((item) => item.codigo !== idRow));
    setListOpciones(ListOpciones.filter((item) => item !== idRow));
  }

  return (
    <div className={styles.form_group}>
      <div className={styles.input_group}>
        <label className={styles.group_title}>Opciones</label>

        <select 
        name="opcionResult"
        id="opcionResult"
        onChange={(e) => setvaloropcion(e.target.value)}
        value={valoropcion}
        className={styles.group_input}
        >
            <option value={""} selected>Seleccione una opcion</option>
        {InforOptionsSelc != null &&
                InforOptionsSelc != undefined
                  ? InforOptionsSelc.map((data, index) => (

                        <option key={index} value={data.COD_OPCIONES}>{data.OPCION_DESCRIPCION}</option>

                  )) : ""}
        </select>
        

        
        <div
          className={`${styles.btn_container_send} ${styles.btn_blue} ${styleTable.width_max_group}`}
        >
          <button
            title="Agregar Opcion"
            className={styles.btn_send}
            onClick={(e) => {
              e.preventDefault();
              Agregaropcionlist();
            }}
          >
            <span>&#10010; </span>
            Agregar Opcion
          </button>
        </div>
      </div>

      <div className={styles.input_group}>
        <table className={styleTable.tableStyle} id="Tablaopciones">
          <thead>
            <tr>
              <th>Descripcion Opcion</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {ListOpcionesNombre != null && ListOpcionesNombre != undefined ?
            ListOpcionesNombre.map((data, index) => (
              <tr key={index} id={data.codigo}>
                <td className={styleTable.textCenterColumn}>
                  <p>{data.nombre}</p>
                </td>
                <td>
                  <Link
                    title="Eliminar Opcion"
                    className={styleTable.colorrojoBoton}
                    type="button"
                    href={""}
                    onClick={(e) => {
                      e.preventDefault();
                      DeleteRowOpcion(data.codigo);
                    }}
                  >
                    <span>&#128941;</span>
                  </Link>
                </td>
              </tr>
            )): ""}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default ListOptions;
