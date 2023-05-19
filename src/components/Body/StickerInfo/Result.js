import React from "react";
import styles from "../../../styles/StickerInfo.module.css";
function Result({ data }) {
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
        <p className={styles.group_title}>Resultado preliminar 1</p>

        <span className={styles.group_result}>
          {data.PRIMER_RESULTADO_PARCIAL !== null &&
          data.PRIMER_RESULTADO_PARCIAL !== undefined
            ? data.PRIMER_RESULTADO_PARCIAL
            : ""}
        </span>
      </div>

      <div className={styles.card_group}>
        <p className={styles.group_title}>Resultado preliminar 2</p>

        <span className={styles.group_result}>
          {data.SEGUNDO_RESULTADO_PARCIAL !== null &&
          data.SEGUNDO_RESULTADO_PARCIAL !== undefined
            ? data.SEGUNDO_RESULTADO_PARCIAL
            : ""}
        </span>
      </div>

      <div className={styles.card_group}>
        <p className={styles.group_title}>Resultado preliminar 3</p>

        <span className={styles.group_result}>
          {data.TERCER_RESULTADO_PARCIAL !== null &&
          data.TERCER_RESULTADO_PARCIAL !== undefined
            ? data.TERCER_RESULTADO_PARCIAL
            : ""}
        </span>
      </div>

      <div className={styles.card_group}>
        <p className={styles.group_title}>Resultado final</p>

        <span className={styles.group_result}>
          {data.RESULTADO_FINAL !== null && data.RESULTADO_FINAL !== undefined
            ? data.RESULTADO_FINAL
            : ""}
        </span>
      </div>

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
