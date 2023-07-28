import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitEditJefeLab } from "../../Tools/crudJefeLaboratorio";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckEstadoCrud } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";

function ComponentEditJefeLab({ InfoJefeLab, idJefe }) {
  const validarEsquemaobservation = Yup.object().shape({
    ID: Yup.string().required("Recivir el codigo es obligatorio"),
    DESCRIPCION: Yup.string().required(
      "El campo nombre del jefe de laboratorio es obligatorio"
    ),
    ESTADO: Yup.string().required(
      "Es obligatorio seleccionar el estado del jefe de laboratorio"
    ),
    DOCUMENTO: Yup.string().required(
      "El campo documento del jefe de laboratorio es obligatorio"
    ),
    INF_ADICIONAL: Yup.string().notRequired(),
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
                pathname: "/Configuration/JefeLaboratorio/IndexJefe",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear Jefe de laboratorio</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitEditJefeLab)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  {InfoJefeLab != null && InfoJefeLab != undefined
                    ? InfoJefeLab.map((data, index) => (
                        <div key={index}>
                          <div
                            className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                          >
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Nombre del jefe de laboratorio
                              </label>
                              <input
                                {...register("DESCRIPCION")}
                                name="DESCRIPCION"
                                maxLength="150"
                                className={styles.group_input}
                                defaultValue={data.DESCRIPCION}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.DESCRIPCION?.message}
                              </div>
                            </div>

                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Estado del jefe de laboratorio
                              </label>
                              <input id="Estado" defaultChecked={data.ESTADO} type="checkbox" />
                              <div className={styles.invalid_feedback}>
                                {errors.ESTADO?.message}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                          >
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Documento del jefe de laboratorio
                              </label>
                              <input
                                {...register("DOCUMENTO")}
                                name="DOCUMENTO"
                                maxLength="150"
                                defaultValue={data.DOCUMENTO}
                                className={styles.group_input}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.DOCUMENTO?.message}
                              </div>
                            </div>

                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Informacion adicional
                              </label>
                              <input
                                {...register("INF_ADICIONAL")}
                                name="INF_ADICIONAL"
                                maxLength="150"
                                defaultValue={data.INF_ADICIONAL}
                                className={styles.group_input}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.INF_ADICIONAL?.message}
                              </div>
                            </div>
                          </div>

                          <div className={styles.btn_container_send}>
                            {!formState.isSubmitting && (
                              <button
                                onClick={() => {
                                  setCheckEstadoCrud(setValue);
                                  setValue("ID",idJefe);
                                }}
                                className={styles.btn_send}
                              >
                                Editar Jefe de laboratorio
                              </button>
                            )}
                            <Link
                              className={styles.btn_cancel}
                              href={{
                                pathname:
                                  "/Configuration/JefeLaboratorio/IndexJefe",
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

export default ComponentEditJefeLab;
