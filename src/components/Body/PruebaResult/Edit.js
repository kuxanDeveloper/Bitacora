import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitUpdatePrueba } from "../../Tools/crudPruebasResult";
import styles from "../../../styles/CreateNotes.module.scss";
import {
  setCheckPruebaReslt,
  OnkeyDowNumber,
  OnPasteNumber,
} from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import ListPlantilla from "./ListPlantilla";
import ImageOptimize from "../../Tools/ImageOptimize";
function ComponentGroup({
  InfoPrueba,
  InforOptionsSelc,
  InforPlantillasXPrueba,
  idPrueba,
}) {
  const [ListPlantillas, setListPlantillas] = useState([]);
  const [HoursValue, setHoursValue] = useState("");
  const validarEsquemaGrupo = Yup.object().shape({
    Codigo_prueba: Yup.string().required(
      "El codigo del estatus es obligatorio"
    ),
    Nombre_prueba: Yup.string().required(
      "El campo nombre del estatus es obligatorio"
    ),
    Estado_prueba: Yup.string().required(
      "El campo de estado del estatus es obligatorio"
    ),
    Orden_prueba: Yup.string().required(
      "El campo de orden del estatus es obligatorio"
    ),
    HORAS_ACTIVAR: Yup.string().required(
      "El campo de Horas activación estatus es obligatorio"
    ),
    Lst_plantillas: Yup.array().notRequired(),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaGrupo) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    if (
      InfoPrueba.listadoPrueba != null &&
      InfoPrueba.listadoPrueba != undefined
    ) {
      InfoPrueba.listadoPrueba.map((data) => {
        if (data.HORAS_ACTIVAR != null) {
          setHoursValue(data.HORAS_ACTIVAR);
        } else {
          setHoursValue("0");
        }
      });
    }
  }, [InfoPrueba.listadoPrueba]);
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
                pathname: "/Configuration/PruebaResultado/IndexPrueba",
                query: { page: "1" },
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Editar Estatus de resultado</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitUpdatePrueba)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {InfoPrueba.listadoPrueba != null &&
                  InfoPrueba.listadoPrueba != undefined
                    ? InfoPrueba.listadoPrueba.map((data, index) => (
                        <div key={index}>
                          <div className={`${styles.form_group}`}>
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Grupo perteneciente:
                              </label>
                              <label>
                                {InfoPrueba.ListadoGrupoXPrueba.map((data) => {
                                  if (
                                    InfoPrueba.ListadoGrupoXPrueba.length > 1
                                  ) {
                                    return data.Value + ", ";
                                  } else {
                                    return data.Value;
                                  }
                                })}
                              </label>
                            </div>
                          </div>
                          <div
                            className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                          >
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Nombre Estatus
                              </label>
                              <input
                                {...register("Nombre_prueba")}
                                name="Nombre_prueba"
                                maxLength="200"
                                type="text"
                                min="0"
                                className={styles.group_input}
                                defaultValue={data.NOMBRE_PRUEBA}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.Nombre_prueba?.message}
                              </div>
                            </div>
                          </div>

                          <div
                            className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                          >
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Estado del Estatus
                              </label>
                              <input
                                id="EstadoPrueba"
                                defaultChecked={data.ESTADO_PRUEBA}
                                type="checkbox"
                              />
                            </div>
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                N° Orden Estatus
                              </label>
                              <input
                                {...register("Orden_prueba")}
                                name="Orden_prueba"
                                maxLength="100"
                                type="number"
                                min="0"
                                className={styles.group_input}
                                defaultValue={data.ORDEN}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.Orden_prueba?.message}
                              </div>
                            </div>
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Horas para activación de estatus
                              </label>
                              <input
                                name="HORAS_ACTIVACION"
                                id="HORAS_ACTIVACION"
                                autoComplete="off"
                                maxLength="15"
                                type="text"
                                onKeyPress={(e) => OnkeyDowNumber(e)}
                                className={styles.group_input}
                                onPaste={(e) =>
                                  OnPasteNumber(
                                    e,
                                    document.getElementById("HORAS_ACTIVACION"),
                                    setHoursValue
                                  )
                                }
                                onChange={(e) => {
                                  setHoursValue(e.target.value);
                                }}
                                value={HoursValue}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.HORAS_ACTIVAR?.message}
                              </div>
                            </div>
                          </div>

                          <ListPlantilla
                            ListPlantillas={ListPlantillas}
                            setListPlantillas={setListPlantillas}
                            InforOptionsSelc={InforOptionsSelc}
                            InforPlantillasXPrueba={InforPlantillasXPrueba}
                          ></ListPlantilla>

                          <div className={styles.btn_container_send}>
                            {!formState.isSubmitting && (
                              <button
                                onClick={() => {
                                  setCheckPruebaReslt(setValue);
                                  setValue("Lst_plantillas", ListPlantillas);
                                  setValue("Codigo_prueba", idPrueba);
                                  setValue("HORAS_ACTIVAR", HoursValue);
                                }}
                                className={styles.btn_send}
                              >
                                Editar Estatus
                              </button>
                            )}
                            <Link
                              className={styles.btn_cancel}
                              href={{
                                pathname:
                                  "/Configuration/PruebaResultado/IndexPrueba",
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

export default ComponentGroup;
