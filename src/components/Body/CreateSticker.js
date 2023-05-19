import React, { useState } from "react";
import styles from "../../styles/CreateSticker.module.css";
import { backhistory } from "../Tools/functiones";
import ImageOptimize from "../Tools/ImageOptimize";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { onSubmitCreate } from "../Tools/CRUD";
import * as Yup from "yup";
function CreateSticker({ ListadoGrupoActivo, id }) {
  // const [EstadoState, setEstadoState] = useState(null);
  const [UserInterno, setUserInterno] = useState(false);
  const [UserExterno, setUserExterno] = useState(false);
  const validationSchema = Yup.object().shape({
    NumSticker: Yup.string().required("Campo N° de sticker obligatorio"),
    GrupoSticker: Yup.string().required("Campo grupo obligatorio"),
    ObservaInici: Yup.string().required(
      "Campo observaciones iniciales obligatorio"
    ),
    UserCheckinter: Yup.bool(),
    UserCheckexter: Yup.bool()
  });

  // const uncheckEstado = () => {
  //   var checkbox1 = document.getElementById("Activo");
  //   var checkbox2 = document.getElementById("Inactivo");

  //   checkbox1.onclick = function () {
  //     if (checkbox1.checked != false) {
  //       checkbox2.checked = null;
  //       setEstadoState(checkbox1.value);
  //     }
  //   };

  //   checkbox2.onclick = function () {
  //     if (checkbox2.checked != false) {
  //       checkbox1.checked = null;
  //       setEstadoState(checkbox2.value);
  //     }
  //   };
  //   if (checkbox2.checked) setEstadoState(checkbox2.value);

  //   if (checkbox1.checked) setEstadoState(checkbox1.value);
  //   clearErrors("estado");

  //   if (!checkbox1.checked && !checkbox2.checked) {
  //     setEstadoState(null);
  //   }
  // };

  const uncheckUserInterExterno = () => {
    var checkbox1 = document.getElementById("UserCheckinter");
    var checkbox2 = document.getElementById("UserCheckexter");

    checkbox1.onclick = function () {
      if (checkbox1.checked != false) {
        checkbox2.checked = null;
        setUserInterno(checkbox1.value);
      }
    };

    checkbox2.onclick = function () {
      if (checkbox2.checked != false) {
        checkbox1.checked = null;
        setUserExterno(checkbox2.value);
      }
    };

    setUserInterno(checkbox1.checked);
    setUserExterno(checkbox2.checked);
    clearErrors("UserInternoExterno");
  };

  //The class name can vary

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setError, clearErrors } =
    useForm(formOptions);
  const { errors } = formState;

  const VerificacionSubmit = () => {
    let validator = true;
    // if (EstadoState === null) {
    //   setError("estado", {
    //     type: "custom",
    //     message: "Debes seleccionar un estado",
    //   });
    //   validator = false;
    // }
    if (UserInterno === false && UserExterno === false) {
      setError("UserInternoExterno", {
        type: "custom",
        message: "Debes seleccionar un cliente interno o externo",
      });
      validator = false;
    }

    if (!validator) {
      return;
    }
    // clearErrors("estado");
    clearErrors("UserInternoExterno");

    document.getElementById("buttonSubmitUnico").click();
  };

  return (
    <>
      <section className={styles.Create_sticker}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href="#!"
              onClick={() => {
                backhistory();
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear sticker</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreate)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  <p className={styles.sticker_title}>Sticker</p>
                  {/* <!-- imagenes --> */}
                  <div className={styles.images_container}>
                    <figure className={styles.sticker_figure}>
                      <a href="#!">
                        <ImageOptimize
                          Values={{
                            src: "/img/Camera@2x.png",
                            alt: "Logo de camara",
                            title: "Imagen número 1",
                            classValue: styles.img_camera,
                            width: 24,
                            height: 24,
                          }}
                        ></ImageOptimize>
                      </a>
                    </figure>
                    <figure className={styles.sticker_figure}>
                      <Link href="#!">
                        <ImageOptimize
                          Values={{
                            src: "/img/Camera@2x.png",
                            alt: "Logo de camara",
                            title: "Imagen número 2",
                            classValue: styles.img_camera,
                            width: 24,
                            height: 24,
                          }}
                        ></ImageOptimize>
                      </Link>
                    </figure>
                  </div>

                  {/* <!-- estado --> */}

                  {/* <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <div className={styles.sticker_status}>
                        <span className={styles.group_title}>estado</span>

                        <label>Activo</label>
                        <input
                          {...register("estado")}
                          name="estado"
                          type="checkbox"
                          id="Activo"
                          value={true}
                          onClick={() => uncheckEstado()}
                        />

                        <label>Inactivo</label>
                        <input
                          {...register("estado")}
                          name="estado"
                          type="checkbox"
                          id="Inactivo"
                          value={false}
                          onClick={() => uncheckEstado()}
                        />

                        <div className={styles.invalid_feedback}>
                          {errors.estado?.message}
                        </div> */}

                        {/* <!-- ---- --> */}
                      {/* </div>
                    </div>
                  </div> */}
                  {/* <!-- form group --> */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        N° de Sticker
                      </label>
                      <input
                        {...register("NumSticker")}
                        name="NumSticker"
                        maxLength="100"
                        type="text"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.NumSticker?.message}
                      </div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Grupo</label>
                      <select
                        defaultValue={id}
                        {...register("GrupoSticker")}
                        name="GrupoSticker"
                        id="GrupoSticker"
                      >
                        <option disabled value="">
                          Seleccione una opción
                        </option>
                        {ListadoGrupoActivo.map((data, index) => (
                          <option key={index} value={data.Id_grupo}>
                            {data.NOMBRE_GRUPO}
                          </option>
                        ))}
                      </select>

                      <div className={styles.invalid_feedback}>
                        {errors.GrupoSticker?.message}
                      </div>
                    </div>
                  </div>
                  {/* <!-- form group --> */}

                  <div className={styles.form_group}>
                    <div className={styles.sticker_status}>
                      <label>Usuario interno</label>
                      <input
                        {...register("UserCheckinter")}
                        name="UserCheckinter"
                        id="UserCheckinter"
                        type="checkbox"
                        onClick={() => uncheckUserInterExterno()}
                      />

                      <label>Usuario externo</label>
                      <input
                        {...register("UserCheckexter")}
                        name="UserCheckexter"
                        id="UserCheckexter"
                        type="checkbox"
                        onClick={() => uncheckUserInterExterno()}
                      />

                      {/* <!-- ---- --> */}
                    </div>
                    <div className={styles.invalid_feedback}>
                      {errors.UserInternoExterno?.message}
                    </div>
                  </div>

                  {/* <!-- form group --> */}
                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Observaciones iniciales
                      </label>
                      <textarea
                        {...register("ObservaInici")}
                        name="ObservaInici"
                        id="ObservaInici"
                        cols="70"
                        rows="5"
                        maxLength="2000"
                      ></textarea>
                      <div className={styles.invalid_feedback}>
                        {errors.ObservaInici?.message}
                      </div>
                    </div>
                  </div>

                  <div className={styles.btn_container_send}>
                    <button
                      type="button"
                      onClick={() => VerificacionSubmit()}
                      href="#!"
                      className={styles.btn_send}
                    >
                      Guardar Cambios
                    </button>

                    <button
                      id="buttonSubmitUnico"
                      style={{ display: "none" }}
                    ></button>
                    <Link
                      href={{
                        pathname: "/[id]",
                        query: { id: id },
                        hash: "Cactive#UserInter#OverallSample",
                      }}
                      className={styles.btn_cancel}
                    >
                      Cancelar
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateSticker;
