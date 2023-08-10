import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitUpdateMicroorganismo } from "../../Tools/crudMicroorganismos";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckEstadoCrud } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import Image from "next/image";
function ComponentMicroEdit({ InforSampleDetails, id }) {
  const validarEsquemaobservation = Yup.object().shape({
    ID: Yup.string().required(),
    DESCRIPCION: Yup.string().required(
      "El campo nombre del microorganismo es obligatorio"
    ),
    ESTADO: Yup.string().required(
      "Es obligatorio seleccionar el estado del microorganismo"
    ),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaobservation) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <section className={styles.create_note}>
        <Image
          src="/img/bg_image.jpg"
          width={1000}
          height={1000}
          alt="a"
          className={styles.background_img}
        />
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Configuration/Microorganismos/IndexMicroorganismo",
                query: { page: "1" },
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Editar Microorganismo</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitUpdateMicroorganismo)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  {InforSampleDetails.listadoMicroorganismo != null && InforSampleDetails.listadoMicroorganismo != undefined
                    ? InforSampleDetails.listadoMicroorganismo.map((data, index) => (
                        <div key={index}>
                          <div
                            className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                          >
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Estado
                              </label>
                              <input
                                defaultChecked={data.ESTADO}
                                id="Estado"
                                type="checkbox"
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.ESTADO?.message}
                              </div>
                            </div>
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Nombre de Microorganismo
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
                          </div>

                          <div className={styles.btn_container_send}>
                            {!formState.isSubmitting && (
                              <button
                                onClick={() => {
                                  setCheckEstadoCrud(setValue);
                                  setValue("ID", id);
                                }}
                                className={styles.btn_send}
                              >
                                Editar Microorganismo
                              </button>
                            )}
                            <Link
                              className={styles.btn_cancel}
                              href={{
                                pathname:
                                  "/Configuration/Microorganismos/IndexMicroorganismo",
                                  query: { page: "1" },
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

export default ComponentMicroEdit;
