import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitCreatePlantilla } from "../../Tools/crudPlantillaResult";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckPlantillaReslt } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import ListOption from "./ListOptions";
import ImageOptimize from "../../Tools/ImageOptimize";
function ComponentGroup({ InforOptionsSelc }) {
  const [ListOpciones, setListOpciones] = useState([]);

  const validarEsquemaGrupo = Yup.object().shape({
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

  useEffect(() => {
    var checkbox1 = document.getElementById("EstadoPlantilla");
    checkbox1.checked = true;
  }, []);

  return (
    <>
      <section className={styles.create_note}>
        <ImageOptimize
          Values={{
            src: "/img/photo-1614935151651-0bea6508db6b.avif",
            alt: "Fondo BackGround",
            title: "Fondo BackGround",
            classValue: styles.background_img,
            width: 1920,
            height: 1080,
          }}
        ></ImageOptimize>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Configuration/PlantillaResultado/IndexPlantilla",
                query: { page: "1" },
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear Seguimiento de resultado</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreatePlantilla)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

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
                      <input id="EstadoPlantilla" type="checkbox" />
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
                  ></ListOption>

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        onClick={() => {
                          setCheckPlantillaReslt(setValue);
                          setValue("Lista_opciones", ListOpciones);
                        }}
                        className={styles.btn_send}
                      >
                        Guardar Seguimiento
                      </button>
                    )}
                    <Link
                      className={styles.btn_cancel}
                      href={{
                        pathname:
                          "/Configuration/PlantillaResultado/IndexPlantilla",
                        query: { page: "1" },
                      }}
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

export default ComponentGroup;
