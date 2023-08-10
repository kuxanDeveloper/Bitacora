import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitEditTipoMue } from "../../Tools/crudTipoMuestra";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckEstadoCrud } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import ImageOptimize from "../../Tools/ImageOptimize";
function ComponentEditTipoMue({ InfoTipoMue, idTipo, InforOptionsSelc }) {
  const validarEsquemaobservation = Yup.object().shape({
    ID: Yup.string().required(),
    NOMBRE_TIPO_MUESTRA: Yup.string().required(
      "El campo nombre del tipo de muestra es obligatorio"
    ),
    ESTADO: Yup.string().required(
      "Es obligatorio seleccionar el estado del tipo de muestra"
    ),
    ID_GRUPO: Yup.string().required("El campo grupo es obligatorio"),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaobservation) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    if (
      InfoTipoMue.listadotiposMU != null &&
      InfoTipoMue.listadotiposMU != undefined
    ) {
      if (InfoTipoMue.listadotiposMU.length > 0) {
        const valorgrup = document.getElementById("ID_GRUPO");
        valorgrup.value = InfoTipoMue.listadotiposMU[0].ID_GRUPO;
        setValue("ID_GRUPO", InfoTipoMue.listadotiposMU[0].ID_GRUPO);
      }
    }
  }, [InforOptionsSelc]);

  return (
    <>
      <section className={styles.create_note}>
        <ImageOptimize
          Values={{
            src: "/img/bg_image.jpg",
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
                pathname: "/Configuration/TiposMuestras/IndexTipo",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Editar Tipo de muestra</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitEditTipoMue)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  {InfoTipoMue.listadotiposMU != null &&
                  InfoTipoMue.listadotiposMU != undefined
                    ? InfoTipoMue.listadotiposMU.map((data, index) => (
                        <div key={index}>
                          <div
                            className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                          >
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Nombre del Tipo de muestra
                              </label>
                              <input
                                {...register("NOMBRE_TIPO_MUESTRA")}
                                name="NOMBRE_TIPO_MUESTRA"
                                maxLength="150"
                                className={styles.group_input}
                                defaultValue={data.NOMBRE_TIPO_MUESTRA}
                              />
                              <div className={styles.invalid_feedback}>
                                {errors.NOMBRE_TIPO_MUESTRA?.message}
                              </div>
                            </div>

                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Estado del Tipo de muestra
                              </label>
                              <input
                                id="Estado"
                                defaultChecked={data.ESTADO}
                                type="checkbox"
                              />
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
                                Grupo
                              </label>
                              <select
                                {...register("ID_GRUPO")}
                                name="ID_GRUPO"
                                id="ID_GRUPO"
                                maxLength="150"
                                className={styles.group_input}
                                defaultValue={data.ID_GRUPO}
                              >
                                <option value="">Seleccione un grupo</option>
                                {InforOptionsSelc != null &&
                                InforOptionsSelc != undefined
                                  ? InforOptionsSelc.map((data, index) => (
                                      <option key={index} value={data.Id_grupo}>
                                        {data.NOMBRE_GRUPO}
                                      </option>
                                    ))
                                  : ""}
                              </select>
                              <div className={styles.invalid_feedback}>
                                {errors.ID_GRUPO?.message}
                              </div>
                            </div>
                          </div>

                          <div className={styles.btn_container_send}>
                            {!formState.isSubmitting && (
                              <button
                                onClick={() => {
                                  setCheckEstadoCrud(setValue);
                                  setValue("ID", idTipo);
                                }}
                                className={styles.btn_send}
                              >
                                Editar Tipo de muestra
                              </button>
                            )}
                            <Link
                              className={styles.btn_cancel}
                              href={{
                                pathname:
                                  "/Configuration/TiposMuestras/IndexTipo",
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

export default ComponentEditTipoMue;
