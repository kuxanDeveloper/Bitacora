import React from "react";
import styles from "../../../styles/StickerInfo.module.css";
function Result({ data }) {
  console.log(data);
  return (
    <div className={styles.result_body}>
      <div className={styles.card_group}>
        <p className={styles.group_title}>Usuario que creo el resultado</p>

        <span className={styles.group_result}>
          {data.USUARIO_CREADOR_RESULTADO}
        </span>
      </div>
      <div className={styles.card_group}>
        <p className={styles.group_title}>Prueba</p>

        <span className={styles.group_result}>{data.NOMBRE_PRUEBA}</span>
      </div>

      <div className={styles.card_group}>
        <p className={styles.group_title}>Resultado</p>

        <span className={styles.group_result}>
          {data.PLANTILLA_RESULTADO !== null &&
          data.PLANTILLA_RESULTADO !== undefined
            ? data.PLANTILLA_RESULTADO
            : ""}
        </span>
      </div>
      {data.OPCION_DESCRIPCION != null &&
      data.OPCION_DESCRIPCION != undefined ? (
        <div className={styles.card_group}>
          <p className={styles.group_title}>Opciones</p>

          <span className={styles.group_result}>
            {data.OPCION_DESCRIPCION !== null &&
            data.OPCION_DESCRIPCION !== undefined
              ? data.OPCION_DESCRIPCION
              : ""}
          </span>
        </div>
      ) : (
        <></>
      )}

      <div className={styles.card_group}>
        <p className={styles.group_title}>Fecha de último resultado</p>
        <span className={styles.group_result}>
          {data.FECHA_CREACION_RESULTADO_FORMAT !== null &&
          data.FECHA_CREACION_RESULTADO_FORMAT !== undefined
            ? data.FECHA_CREACION_RESULTADO_FORMAT
            : ""}
        </span>
      </div>
    </div>
  );
}

export default Result;
