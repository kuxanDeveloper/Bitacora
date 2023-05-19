import React from "react";
import styles from "../../../styles/StickerInfo.module.css";
function Lastfollow_up({ data }) {
  return (
    <div className={styles.follow_up_body}>
      <div className={styles.card_group}>
        <p className={styles.group_title}>Observaciones seguimiento</p>

        <span className={styles.group_result}>
          {data.OBSERVACIONES_DETALLE}
        </span>
      </div>
      <div className={styles.card_group}>
        <p className={styles.group_title}>Usuario que creó el seguimiento</p>

        <span className={styles.group_result}>
          {data.EMAIL_CREADOR_DETALLE}
        </span>
      </div>

      <div className={styles.card_group}>
        <p className={styles.group_title}>Fecha</p>

        <span className={styles.group_result}>
          {data.FECHA_CREADO_DETALLE_FORMAT}
        </span>
      </div>
    </div>
  );
}

export default Lastfollow_up;
