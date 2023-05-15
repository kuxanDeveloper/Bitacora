import React from "react";
import Styles from "@/styles/Recovery.module.css";

function Recovery() {
  return (
    <>
      <div className={Styles.recovery}>
        <figure className={Styles.logo}>
          <img
            src="https://www.bd.com/content/dam/bdcom-assets/en/en-us/images/graphic/icon/header-bd-logo.svg"
            alt=""
            className={Styles.logo_img}
          />
        </figure>

        <div className={Styles.recovery_container}>
          <div className={Styles.container_cotent}>
            <div className={Styles.inputs_container}>
              <label for="" className={Styles.input_label}>
               
                Usuario
              </label>

              <input type="text" className={Styles.username} />
            </div>

            <p href="" className={Styles.error}>
              Parrafo de error
            </p>

            <div className={Styles.btn_container}>
              <button className={Styles.btn_recovery}>Recuperar Contraseña</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Recovery;
