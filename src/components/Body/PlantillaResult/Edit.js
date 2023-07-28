import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitUpdatePlantilla } from "../../Tools/crudPlantillaResult";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckPlantillaReslt } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import ListOption from "./ListOptions";
import Image from "next/image";
function ComponentGroup({ InfoPlantilla, InforOptionsSelc,InforOptionsXpruebas, idPlantilla }) {
  const [ListOpciones, setListOpciones] = useState([]);

  const validarEsquemaGrupo = Yup.object().shape({
    Codigo_Plantilla: Yup.string().required(
      "El codigo de la plantilla es obligatorio"
    ),
    Plantilla_resultado: Yup.string().required(
      "El campo nombre del seguimiento es obligatorio"
    ),
    Estado_plantilla: Yup.string().required(
      "El campo de estado del seguimiento es obligatorio"
    ),
    Orden_plantilla: Yup.string().required(
      "El campo de orden del seguimiento es obligatorio"
    ),
    Lista_opciones: Yup.array().notRequired(),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaGrupo) };
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
                pathname: "/Configuration/PlantillaResultado/IndexPlantilla",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Editar Seguimiento de resultado</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitUpdatePlantilla)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {InfoPlantilla != null && InfoPlantilla != undefined
                    ? InfoPlantilla.map((data, index) => (
                        <div key={index}>
                          <div
                            className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                          >
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Nombre Seguimiento
                              </label>
                              <input
                                {...register("Plantilla_resultado")}
                                name="Plantilla_resultado"
                                maxLength="100"
                                type="text"
                                min="0"
                                className={styles.group_input} 
                                defaultValue={data.RESULTADO_PLANTILLA}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.Plantilla_resultado?.message}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                          >
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Estado del seguimiento
                              </label>
                              <input id="EstadoPlantilla" defaultChecked={data.ESTADO_PLANTILLA} type="checkbox" />
                            </div>
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                N° Orden Seguimiento
                              </label>
                              <input
                                {...register("Orden_plantilla")}
                                name="Orden_plantilla"
                                maxLength="100"
                                type="number"
                                min="0"
                                className={styles.group_input}
                                defaultValue={data.ORDEN}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.Orden_plantilla?.message}
                              </div>
                            </div>
                          </div>

                          <ListOption
                            ListOpciones={ListOpciones}
                            setListOpciones={setListOpciones}
                            InforOptionsSelc={InforOptionsSelc}
                            InforOptionsXpruebas={InforOptionsXpruebas}
                          ></ListOption>

                          <div className={styles.btn_container_send}>
                            {!formState.isSubmitting && (
                              <button
                                onClick={() => {
                                  setCheckPlantillaReslt(setValue);
                                  setValue("Lista_opciones", ListOpciones);
                                  setValue("Codigo_Plantilla", idPlantilla);
                                }}
                                className={styles.btn_send}
                              >
                                Editar Seguimiento
                              </button>
                            )}
                            <Link
                              className={styles.btn_cancel}
                              href={{
                                pathname:
                                  "/Configuration/PlantillaResultado/IndexPlantilla",
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

export default ComponentGroup;
