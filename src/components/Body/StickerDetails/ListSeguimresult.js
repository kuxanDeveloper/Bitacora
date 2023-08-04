import React, { useState } from "react";
import styles from "../../../styles/ListResultAdd.module.scss";
import { DeleteRowStatusDataBase } from "../../Tools/functiones";
import {
  validateResultArmadoIsOpciones,
  validateResultArmadoIsSeguimiento,
} from "../../Tools/functiones";
function ListResulltAdd({
  IdPrub,
  NombrePrub,
  ListadoSeguimientos,
  TipoTabla,
  UsuCreador,
  FechaCreacion,
}) {
  return (
    <>
      {ListadoSeguimientos.length > 0
        ? ListadoSeguimientos.map((data, index) => (
            <div
              key={index}
              id={"SeguRest" + data.CODIGO_RESULTADO_BITACORA}
              className={styles.list_card}
            >
              {TipoTabla == true ? (
                <button
                  className={styles.btn_eliminar}
                  title="Eliminar status"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    DeleteRowStatusDataBase(data, IdPrub, NombrePrub);
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
              ) : (
                ""
              )}

              <div className={styles.row}>
                <span className={styles.list_title}>Seguimiento:</span>
                <span className={styles.text}>
                  {validateResultArmadoIsSeguimiento(
                    data.PLANTILLA_RESULTADO,
                    data.RESULTADO_ARMADO
                  )
                    ? data.RESULTADO_ARMADO
                    : data.PLANTILLA_RESULTADO}
                </span>
              </div>

              {data.OPCION_DESCRIPCION != null ? (
                <div className={styles.row}>
                  <span className={styles.list_title}>Opcion:</span>
                  <span className={styles.text}>
                    {validateResultArmadoIsOpciones(
                      data.OPCION_DESCRIPCION,
                      data.RESULTADO_ARMADO
                    )
                      ? data.RESULTADO_ARMADO
                      : data.OPCION_DESCRIPCION}
                  </span>
                </div>
              ) : (
                ""
              )}

              {UsuCreador != data.USUARIO_CREADOR_RESULTADO ? (
                <div className={styles.BackColor}>
                  <div className={styles.row}>
                    <span className={styles.list_title}>
                      Usuario que creo el seguimiento:
                    </span>
                    <span className={styles.text}>
                      {data.USUARIO_CREADOR_RESULTADO}
                    </span>
                  </div>
                  <div className={styles.row}>
                    <span className={styles.list_title}>
                      Fecha de creacion del seguimiento:
                    </span>
                    <span className={styles.text}>
                      {data.FECHA_CREACION_RESULTADO_FORMAT}
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* <div className={styles.row}>
              <span className={styles.list_title}>Opciones:</span>
              <span className={styles.text}>
                {"HEMOCULTIVO 1 ANAEROBIO INFORME FINAL"}
              </span>
            </div> */}
            </div>
          ))
        : ""}
    </>
  );
}

export default ListResulltAdd;
