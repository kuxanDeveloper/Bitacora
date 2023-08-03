import React, { useState } from "react";
import {
  onclickPruebaTargetCreate,
  onclickPlantillaTargetCreate,
  AddResultToList,
  ComboDinamyc,
} from "../../Tools/functiones";
import { onSubmitCreateResult } from "../../Tools/CRUD";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import styles from "../../../styles/Results.module.scss";
import ListResulltAdd from "./ListResulltAdd";

import Image from "next/image";
function ComponentCreateResult({
  ListPruebas,
  ListResultados,
  setvaluePruebachange,
  id,
  name_group,
  sticker,
  setvaluePlantillachange,
  ListOptiones,
  group,
  ListAddResultMultple,
  setListAddResultMultple,
  ListMicroorganismo,
  ListNumber,
}) {
  const validationSchema = Yup.object().shape({
    Codigo_prueba: Yup.string().notRequired(),
    Codigo_resultado_preliminar_1: Yup.string().notRequired(),
    Codigo_opcion: Yup.string().notRequired(),
    COD_BITACORA: Yup.number(),
    ListResultMultiple: Yup.array()
      .min(1, "Debe por lo menos tener un estatus agregado")
      .required("Debe por lo menos tener un estatus agregado"),
  });
  const [ComboDynamic, setComboDynamic] = useState(false);
  const [ListSelectDimanyc, setListSelectDimanyc] = useState([]);
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue, clearErrors, setError } =
    useForm(formOptions);
  const { errors } = formState;

  return (
    <>
      <section className={styles.Create_Result}>
        <Image
          src="/img/bg_image.jpg"
          width={1000}
          height={1000}
          alt="a"
          className={styles.background_img}
        />
        <div className={styles.sticker_container}>
          <div className={styles.home_btn_container}>
            <Link
              href={`/${group}?page=1#Cactive#OverallSample`}
              className={styles.home_btn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#fff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M10 12h4v4h-4z" />
              </svg>
            </Link>
          </div>

          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Sample/FullDetails/[id]",
                query: { id: id },
                hash: "Pruebas",
              }}
              className={styles.back_btn}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={styles.icon}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="4"
                stroke="#e57d00"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l6 6" />
                <path d="M5 12l6 -6" />
              </svg>
              Volver
            </Link>
          </div>

          <p className={styles.title}>Crear estatus</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateResult)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}
                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label
                        className={`${styles.group_title} ${styles.inline}`}
                      >
                        Número de sticker :
                      </label>
                      <p className={styles.inline}>{sticker}</p>
                    </div>
                  </div>
                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <div className={`${styles.input_group}`}>
                        <label
                          className={`${styles.group_title} ${styles.inline}`}
                        >
                          Grupo :
                        </label>
                        <p className={styles.inline}>{name_group}</p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Estatus</label>

                      <select
                        {...register("Codigo_prueba")}
                        name="Codigo_prueba"
                        id="Codigo_prueba"
                        defaultValue={""}
                        className={styles.group_input}
                        onChange={(e) => {
                          setvaluePruebachange(e.target.value);
                          onclickPruebaTargetCreate(
                            setvaluePlantillachange,
                            setValue
                          );
                          clearErrors("Codigo_prueba");
                        }}
                      >
                        <option disabled value="">
                          Seleccione un estatus
                        </option>
                        {ListPruebas != null && ListPruebas != undefined
                          ? ListPruebas.map((data, index) => (
                              <option key={index} value={data.COD_PRUEBA}>
                                {`${data.NOMBRE_PRUEBA}`}
                              </option>
                            ))
                          : ""}
                      </select>

                      <div className={styles.invalid_feedback}>
                        {errors.Codigo_prueba?.message}
                      </div>
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
                          onclickPlantillaTargetCreate(setValue);

                          ComboDinamyc(
                            e.target.id,
                            ListMicroorganismo,
                            ListNumber,
                            setListSelectDimanyc
                          );
                          clearErrors("Codigo_resultado_preliminar_1");
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
                      <div className={styles.invalid_feedback}>
                        {errors.Codigo_resultado_preliminar_1?.message}
                      </div>
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
                                onChange={() => {
                                  clearErrors("Codigo_opcion");
                                  ComboDinamyc(
                                    e.target.id,
                                    ListMicroorganismo,
                                    ListNumber,
                                    setListSelectDimanyc
                                  );
                                }}
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
                              <div className={styles.invalid_feedback}>
                                {errors.Codigo_opcion?.message}
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      ))
                  }

                  {setComboDynamic ? (
                    <div className={styles.form_group}>
                      {ListSelectDimanyc.map((data) => data)}
                    </div>
                  ) : (
                    ""
                  )}

                  <div className={styles.btn_container_send}>
                    <Link
                      className={styles.create_followUp}
                      href={""}
                      onClick={(e) => {
                        e.preventDefault();
                        AddResultToList(
                          "Codigo_prueba",
                          "Codigo_resultado_preliminar_1",
                          "Codigo_opcion",
                          setListAddResultMultple,
                          ListAddResultMultple,
                          setError,
                          ListOptiones,
                          setvaluePlantillachange
                        );
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-circle-plus"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="#fff"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                        <path d="M9 12l6 0" />
                        <path d="M12 9l0 6" />
                      </svg>
                    </Link>
                  </div>

                  {/*Listado de los resultados agregados */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <ListResulltAdd
                        styles={styles}
                        ListAddResultMultple={ListAddResultMultple}
                        setListAddResultMultple={setListAddResultMultple}
                      ></ListResulltAdd>
                      <div className={styles.invalid_feedback}>
                        {errors.ListResultMultiple?.message}
                      </div>
                    </div>
                  </div>

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        className={styles.btn_send}
                        onClick={() => {
                          setValue("COD_BITACORA", id);
                          setValue("ListResultMultiple", ListAddResultMultple);
                        }}
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
