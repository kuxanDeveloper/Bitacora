import React from "react";
import styleTable from "../../../styles/TableStyles.module.scss";
import styles from "../../../styles/ListResultAdd.module.scss";
import { DeleteRowStatus } from "../../Tools/functiones";
function ListResulltAdd({ ListAddResultMultple, setListAddResultMultple }) {
  return (
    <>
      {ListAddResultMultple.length > 0 ? (
        ListAddResultMultple.map((data, index) => (
          <div className={styles.list_card}>
            <button
              className={styles.btn_eliminar}
              title="Eliminar status"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                DeleteRowStatus(
                  data,
                  setListAddResultMultple,
                  ListAddResultMultple
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-trash-x"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#fff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7h16" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                <path d="M10 12l4 4m0 -4l-4 4" />
              </svg>
            </button>
            <div className={styles.row}>
              <span className={styles.list_title}>Estatus:</span>
              <span className={styles.text}>
                {"HEMOCULTIVO 1 ANAEROBIO INFORME FINAL"}
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.list_title}>Seguimiento:</span>
              <span className={styles.text}>
                {"HEMOCULTIVO 1 ANAEROBIO INFORME FINAL"}
              </span>
            </div>

            <div className={styles.row}>
              <span className={styles.list_title}>Estatus:</span>
              <span className={styles.text}>
                {"HEMOCULTIVO 1 ANAEROBIO INFORME FINAL"}
              </span>
            </div>

            <div className={styles.row}>
              <span className={styles.list_title}>Opciones:</span>
              <span className={styles.text}>
                {"HEMOCULTIVO 1 ANAEROBIO INFORME FINAL"}
              </span>
            </div>
          </div>
        ))
      ) : (
        ""
      )}

      {/* <table> */}
        {/* <thead>
          <tr>
            <th>Estatus</th>
            <th>Seguimiento</th>
            <th>Opciones</th>
            <th>Eliminar</th>
          </tr>
        </thead> */}
        {/* <tbody> */}
          {/* {ListAddResultMultple.length > 0 ? (
            ListAddResultMultple.map((data, index) => (
              <tr key={index}>
                <td>{data.TextoEstatus}</td>
                <td>{data.textoSeguimiento}</td>
                <td>{data.OptionID != null ? data.textoOption : "N/A"}</td>
                <td>
                  <button
                    title="Eliminar status"
                    type="button"
                    className={styleTable.colorrojoBoton}
                    onClick={(e) => {
                      e.preventDefault();
                      DeleteRowStatus(
                        data,
                        setListAddResultMultple,
                        ListAddResultMultple
                      );
                    }}
                  >
                    <span>&#128941;</span>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr></tr>
          )} */}
        {/* </tbody>
      </table> */}
    </>
  );
}

export default ListResulltAdd;
