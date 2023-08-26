import React, { useState, useEffect } from "react";
import styles from "../../styles/Pop_up.module.scss";
import styles2 from "../../styles/CreateNotes.module.scss";
import stylesCrud from "../../styles/StylesCRUDS.module.scss";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { guardarJefe } from "../Tools/functiones";
import Link from "next/link";

function Pop_up({ onClose, setNuvjefe, Nuvjefe }) {
  const [comprobarmsj, setcomprobarmsj] = useState("");

  const validarEsquemaFecha = Yup.object().shape({
    DESCRIPCION: Yup.string().required(
      "El campo nombre del jefe de laboratorio es obligatorio"
    ),
    DOCUMENTO: Yup.string().required(
      "El campo documento del jefe de laboratorio es obligatorio"
    ),
    setcomprobarmsj: Yup.string().required(),
  });

  const formOptionsFech = { resolver: yupResolver(validarEsquemaFecha) };
  const { register, handleSubmit, formState, setValue } =
    useForm(formOptionsFech);
  const { errors } = formState;

  return (
    <>
      <div className={styles.img_upload}>
        <div className={styles.upload_container}>
          <span
            onClick={onClose}
            id="botonCierreModal"
            className={styles.close_btn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2f2f2f"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                fill="currentColor"
                strokeWidth="0"
              />
            </svg>
          </span>

          <section className={styles2.create_note}>
            

            <div className={styles2.sticker_container}>
              <div className={styles2.back_btn_container}>
                
              </div>
              <p className={styles2.title}>Crear Jefe de laboratorio</p>
              <br />
              <div className={styles2.card}>
                <div className={styles2.stickers_container}>
                  <div className={styles2.card_sticker}>
                    {/* <!-- estado --> */}

                    <div
                      className={`${styles2.form_group} ${stylesCrud.SinLinea}`}
                    >
                      <div className={styles2.input_group}>
                        <label className={styles2.group_title}>
                          Nombre del jefe de laboratorio
                        </label>
                        <input
                          {...register("DESCRIPCION")}
                          name="DESCRIPCION"
                          id="DESCRIPCION"
                          maxLength="150"
                          className={styles2.group_input}
                        />
                        <div className={styles2.invalid_feedback}>
                          {errors.DESCRIPCION?.message}
                        </div>
                      </div>

                      <div className={styles2.input_group}>
                        <label className={styles2.group_title}>
                          Documento del jefe de laboratorio
                        </label>
                        <input
                          {...register("DOCUMENTO")}
                          name="DOCUMENTO"
                          id="DOCUMENTO"
                          maxLength="150"
                          className={styles2.group_input}
                        />
                        <div className={styles2.invalid_feedback}>
                          {errors.DOCUMENTO?.message}
                        </div>
                      </div>
                    </div>

                    <div className={styles2.btn_container_send}>
                      {!formState.isSubmitting && (
                        <button
                          className={styles2.btn_send}
                          onClick={(e) => {
                            e.preventDefault;
                            guardarJefe(
                              document.getElementById("DESCRIPCION").value,
                              document.getElementById("DOCUMENTO").value,
                              setNuvjefe,
                              Nuvjefe
                            );
                          }}
                        >
                          Guardar Jefe de laboratorio
                        </button>
                      )}
                      <div
                        className={styles2.btn_cancel}
                        onClick={onClose}
                        id="cerrarmodalJefe"
                      >
                        Cancelar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Pop_up;
