import styleTable from "../../../styles/TableStyles.module.scss";
import styles from "../../../styles/CreateNotes.module.scss";
import Link from "next/link";
import Swal from "sweetalert2";
import React, { useState } from "react";

function listSufijos() {
  const [ListSufijo, setListSufijo] = useState([]);

  function AgregarSufijolist() {
    let txtSufijo = document.getElementById("SufijoGroup");

    if (txtSufijo.value == "" || txtSufijo.value == undefined) {
      Swal.fire({
        title: "¡Advertencia!",
        text: "Debe digitar el número de sufijo que desea agregar",
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      return;
    } else {

        

        let sufij = txtSufijo.value;
        setListSufijo(prevArray => [...prevArray, sufij])
        console.log(ListSufijo);
    }
  }

  function DeleteRowSufijo(idRow)
  {  
    setListSufijo(ListSufijo.filter(item => item !== idRow))
  }

  return (
    <div className={styles.form_group}>
      <div className={styles.input_group}>
        <label className={styles.group_title}>Sufijo del grupo</label>
        <input
          name="SufijoGroup"
          id="SufijoGroup"
          maxLength="2"
          max="5000"
          type="number"
          min="0"
          className={styles.group_input}
        />
        <div
          className={`${styles.btn_container_send} ${styles.btn_blue} ${styleTable.width_max_group}`}
        >
          <button 
            title="Agregar Sufijo"
            className={styles.btn_send}
            onClick={(e) => {
              e.preventDefault();
              AgregarSufijolist();
            }}
          >
            <span>&#10010; </span>
            Agregar Sufijo
          </button>
        </div>
      </div>

      <div className={styles.input_group}>
        <table className={styleTable.tableStyle} id="TablaSufijos">
          <thead>
            <tr>
              <th>Número de sufijo</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {ListSufijo.map((data, index) => (
                  <tr key={index} id={data}>
                    <td className={styleTable.textCenterColumn}>
                      <p>{data}</p>
                    </td>
                    <td>
                      <Link
                        title="Eliminar Sufijo"
                        className={styleTable.colorrojoBoton}
                        type="button"
                        href={""}
                        onClick={(e) => {
                            e.preventDefault();
                            DeleteRowSufijo(data);
                          }}
                      >
                        <span>&#128942; </span>
                        Eliminar Sufijo
                      </Link>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default listSufijos;
