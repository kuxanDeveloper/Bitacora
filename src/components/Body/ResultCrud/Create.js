import React from "react";
import {
  onclickPruebaTarget,
  onclickPlantillaTarget,
} from "../../Tools/functiones";
import { onSubmitCreateResult } from "../../Tools/CRUD";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import styles from "../../../styles/Results.module.scss";
function ComponentCreateResult({
  ListPruebas,
  ListResultados,
  setvaluePruebachange,
  id,
  name_group,
  sticker,
  setvaluePlantillachange,
  ListOptiones,
}) {
  const validationSchema = Yup.object().shape({
    Codigo_prueba: Yup.string().required("Campo prueba obligatorio"),
    Codigo_resultado_preliminar_1: Yup.string().required(
      "Campo seguimiento obligatorio"
    ),
    Codigo_opcion: Yup.string().notRequired(),
    COD_BITACORA: Yup.number(),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <section className={styles.Create_Result}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Sample/FullDetails/[id]",
                query: { id: id },
                hash: "Pruebas",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear prueba</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateResult)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}
                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Número de sticker :
                      </label>
                      <p>{sticker}</p>
                    </div>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Grupo :</label>
                      <p>{name_group}</p>
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Prueba</label>

                      <select
                        {...register("Codigo_prueba")}
                        name="Codigo_prueba"
                        id="Codigo_prueba"
                        defaultValue={""}
                        className={styles.group_input}
                        onChange={(e) => {
                          setvaluePruebachange(e.target.value);
                          onclickPruebaTarget(
                            setvaluePlantillachange,
                            setValue
                          );
                        }}
                      >
                        <option disabled value="">
                          Seleccione una opción
                        </option>
                        {ListPruebas != null && ListPruebas != undefined
                          ? ListPruebas.map((data, index) => (
                              <option key={index} value={data.COD_PRUEBA}>
                                {`${data.NOMBRE_PRUEBA}`}
                              </option>
                            ))
                          : ""}
                      </select>

                      <div>{errors.Codigo_prueba?.message}</div>
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Seguimiento</label>
                      <select
                        {...register("Codigo_resultado_preliminar_1")}
                        name="Codigo_resultado_preliminar_1"
                        id="Codigo_resultado_preliminar_1"
                        className={styles.group_input}
                        defaultValue={""}
                        onChange={(e) => {
                          setvaluePlantillachange(e.target.value);
                          onclickPlantillaTarget(setValue);
                        }}
                      >
                        <option disabled value="">
                          Seleccione un seguimiento
                        </option>
                        {ListResultados != null && ListResultados != undefined
                          ? ListResultados.map((data, index) => (
                              <option key={index} value={data.COD_PLANTILLA}>
                                {`${data.RESULTADO_PLANTILLA}`}
                              </option>
                            ))
                          : ""}
                      </select>
                      <div>{errors.Codigo_resultado_preliminar_1?.message}</div>
                    </div>
                  </div>

                  {
                    (ListOptiones =
                      !undefined && ListOptiones != null ? (
                        ListOptiones.length > 0 ? (
                          <div className={styles.form_group}>
                            <div className={styles.input_group}>
                              <label className={styles.group_title}>
                                Opciones
                              </label>
                              <select
                                {...register("Codigo_opcion")}
                                name="Codigo_opcion"
                                id="Codigo_opcion"
                                className={styles.input_group}
                                defaultValue={""}
                              >
                                <option disabled value="">
                                  Seleccione una opción
                                </option>
                                {ListOptiones != null &&
                                ListOptiones != undefined
                                  ? ListOptiones.map((data, index) => (
                                      <option
                                        key={index}
                                        value={data.COD_OPCIONES}
                                      >
                                        {`${data.OPCION_DESCRIPCION}`}
                                      </option>
                                    ))
                                  : ""}
                              </select>
                              <div>{errors.Codigo_opcion?.message}</div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      ))
                  }

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        className={styles.btn_send}
                        onClick={() => setValue("COD_BITACORA", id)}
                      >
                        guardar cambios
                      </button>
                    )}

                    <Link
                      className={styles.btn_cancel}
                      href={{
                        pathname: "/Sample/FullDetails/[id]",
                        query: { id: id },
                        hash: "Pruebas",
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

export default ComponentCreateResult;
