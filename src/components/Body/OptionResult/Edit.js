import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitUpdateOption } from "../../Tools/crudOptionResult";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckOptionReslt } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";

function ComponentOptionEdit({ InforOption, idOption }) {
  const validarEsquemaobservation = Yup.object().shape({
    Codigo_Opciones: Yup.string().required(
        "Es obligatorio recivir el codigo de la opciones a editar"
      ),
    Opcion_descripcion: Yup.string().required(
      "El campo descripcion de la opcion es obligatorio"
    ),
    Estado_opcion: Yup.string().required(
      "Es obligatorio seleccionar el estado de la opcion"
    ),
    Orden_opcion: Yup.string().required(
      "El Campo orden de la opcion es obligatorio"
    ),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaobservation) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;
  return (
    <>
      <section className={styles.create_note}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Configuration/OptionsResult/IndexOption",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Editar Opcion de resultado</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitUpdateOption)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {InforOption != null && InforOption != undefined
                    ? InforOption.map((data, index) => (
                        <div key={index}>
                          <div
                            className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                          >
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Estado de la Opcion
                              </label>
                              <input 
                              id="EstadoOpc" 
                              type="checkbox" 
                              defaultChecked={data.ESTADO_OPCION}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.Estado_opcion?.message}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                          >
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Descripcion de la opcion de resultado
                              </label>
                              <input
                                {...register("Opcion_descripcion")}
                                name="Opcion_descripcion"
                                maxLength="150"
                                className={styles.group_input} 
                                defaultValue={data.OPCION_DESCRIPCION}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.Opcion_descripcion?.message}
                              </div>
                            </div>

                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Orden Grupo
                              </label>
                              <input
                                {...register("Orden_opcion")}
                                name="Orden_opcion"
                                maxLength="100"
                                type="number"
                                min="0"
                                className={styles.group_input} 
                                defaultValue={data.ORDEN}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.Orden_opcion?.message}
                              </div>
                            </div>
                          </div>

                          <div className={styles.btn_container_send}>
                            {!formState.isSubmitting && (
                              <button
                                onClick={() => {
                                  setCheckOptionReslt(setValue);
                                  setValue("Codigo_Opciones",idOption);
                                }}
                                className={styles.btn_send}
                              >
                                Editar Opcion
                              </button>
                            )}
                            <Link
                              className={styles.btn_cancel}
                              href={{
                                pathname:
                                  "/Configuration/OptionsResult/IndexOption",
                              }}
                            >
                              Cancelar
                            </Link>
                          </div>
                        </div>
                    ))
                    : ""}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default ComponentOptionEdit;
