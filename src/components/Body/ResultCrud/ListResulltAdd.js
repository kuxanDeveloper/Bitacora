import React from "react";
import styles from "../../../styles/ListResultAdd.module.scss";
import { DeleteRowStatus } from "../../Tools/functiones";
function ListResulltAdd({ ListAddResultMultple, setListAddResultMultple }) {
  return (
    <>
      {ListAddResultMultple.length > 0
        ? ListAddResultMultple.map((data, index) => (
            <div key={index} className={styles.list_card}>
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
                <span className={styles.text}>{data.TextoEstatus}</span>
              </div>
              <div className={styles.row}>
                <span className={styles.list_title}>Seguimiento:</span>
                <span className={styles.text}>
                  {data.Issegumiento
                    ? data.ResulDinamico != null
                      ? data.ResulDinamico
                      : data.textoSeguimiento
                    : data.textoSeguimiento}
                </span>
              </div>

              <div className={styles.row}>
                <span className={styles.list_title}>opciones:</span>
                <span className={styles.text}>
                  {!data.Issegumiento
                    ? data.ResulDinamico != null
                      ? data.ResulDinamico
                      : data.OptionID != null
                      ? data.textoOption
                      : "N/A"
                    : data.OptionID != null
                    ? data.textoOption
                    : "N/A"}
                </span>
              </div>
            </div>
          ))
        : ""}
    </>
  );
}

export default ListResulltAdd;
