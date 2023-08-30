import React, { useEffect, useState, Fragment } from "react";
import {
  onclickPruebaTargetCreate,
  onclickPlantillaTargetCreate,
  AddResultToList,
  ComboDinamyc,
  AperturaandCierreMasivo,
  CierreMasivoXestatus,
  comprobarCambioestadomasivo,
} from "../../Tools/functiones";
import { onSubmitCreateResultBloque } from "../../Tools/CRUD";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import styles from "../../../styles/Results.module.scss";
import ListResulltAdd from "./ListResulltAdd";
import ImageOptimize from "../../Tools/ImageOptimize";
import Select from "react-select";
function ComponentCreateResult({
  ListPruebas,
  ListResultados,
  setvaluePruebachange,
  ListadoBitacoras,
  name_group,
  setvaluePlantillachange,
  ListOptiones,
  group,
  ListAddResultMultple,
  setListAddResultMultple,
  ListMicroorganismo,
  ListNumber,
  LstObservacionesPrede,
}) {
  const validationSchema = Yup.object().shape({
    Codigo_prueba: Yup.string().notRequired(),
    Codigo_resultado_preliminar_1: Yup.string().notRequired(),
    Codigo_opcion: Yup.string().notRequired(),
    SelectDinamyc: Yup.string().notRequired(),
    GrupoSticker: Yup.string().notRequired(),
    ListadoBitacorasLst: Yup.array()
      .min(2, "Debe por lo menos tener dos numeros de sticker agregados")
      .required("Debe por lo menos tener dos numeros de sticker agregados"),
    ListResultMultiple: Yup.array()
      .min(1, "Debe por lo menos tener un estatus agregado")
      .required("Debe por lo menos tener un estatus agregado"),
  });
  const [ComboDynamic, setComboDynamic] = useState(false);
  const [ListSelectDimanyc, setListSelectDimanyc] = useState([]);
  const [selectobjeEstatus, SetselectobjeEstatus] = useState({});
  const [selectobjeSeguimiento, SetselectobjeSeguimiento] = useState(null);
  const [selectobjeopciones, Setselectobjeopciones] = useState(null);
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue, clearErrors, setError } =
    useForm(formOptions);
  const { errors } = formState;

  const optionStatus = [];
  const optionSegumiento = [];
  const optionOpciones = [];

  useEffect(() => {
    if (ListadoBitacoras != null && ListadoBitacoras != undefined) {
      let NumBitacora = "";
      ListadoBitacoras != null && ListadoBitacoras != undefined
        ? ListadoBitacoras.map(
            (data) => (NumBitacora = NumBitacora + `${data.split("_")[0]}, `)
          )
        : (NumBitacora = NumBitacora + "");
      if (NumBitacora != "") {
        const pBit = document.getElementById("parrBitac");
        pBit.innerText = NumBitacora.substring(0, NumBitacora.length - 2);
      }
    }
  }, [ListadoBitacoras]);

  if (ListPruebas != null && ListPruebas != undefined) {
    ListPruebas.map((data) =>
      optionStatus.push({ value: data.COD_PRUEBA, label: data.NOMBRE_PRUEBA })
    );
  }

  if (ListResultados != null && ListResultados != undefined) {
    ListResultados.map((data) =>
      optionSegumiento.push({
        value: data.COD_PLANTILLA,
        label: data.RESULTADO_PLANTILLA,
      })
    );
  }

  if (ListOptiones != undefined && ListOptiones != null) {
    if (ListOptiones.length > 0) {
      ListOptiones.map((data) =>
        optionOpciones.push({
          value: data.COD_OPCIONES,
          label: data.OPCION_DESCRIPCION,
        })
      );
    }
  }

  return (
    <>
      <section className={styles.Create_Result}>
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
                pathname: "/[id]",
                query: { id: group, page: "1" },
                hash: "Cactive#OverallSample",
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

          <p className={styles.title}>Crear estatus en bloque</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateResultBloque)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}
                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label
                        className={`${styles.group_title} ${styles.inline}`}
                      >
                        Números de sticker :
                      </label>
                      <p className={styles.inline} id="parrBitac"></p>
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
                      <Select
                        instanceId={"Codigo_prueba"}
                        name="Codigo_prueba"
                        id="Codigo_prueba"
                        defaultValue={""}
                        onChange={(e) => {
                          SetselectobjeEstatus({
                            value: e.value,
                            label: e.label,
                          });
                          setvaluePruebachange(e.value);
                          onclickPruebaTargetCreate(
                            setvaluePlantillachange,
                            setValue,
                            setComboDynamic,
                            setListSelectDimanyc
                          );
                          setComboDynamic(false);
                          setListSelectDimanyc(false);
                          clearErrors("Codigo_prueba");
                        }}
                        placeholder={"Seleccione un estatus"}
                        options={optionStatus}
                      ></Select>
                      {/* <select
                        {...register("Codigo_prueba")}
                        name="Codigo_prueba"
                        id="Codigo_prueba"
                        defaultValue={""}
                        className={styles.group_input}
                        onChange={(e) => {
                          setvaluePruebachange(e.target.value);
                          onclickPruebaTargetCreate(
                            setvaluePlantillachange,
                            setValue,
                            setComboDynamic,
                            setListSelectDimanyc
                          );
                          setComboDynamic(false);
                          setListSelectDimanyc(false);
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
                      </select> */}

                      <div className={styles.invalid_feedback}>
                        {errors.Codigo_prueba?.message}
                      </div>
                    </div>
                  </div>

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Seguimiento</label>
                      <Select
                        instanceId={"Codigo_resultado_preliminar_1"}
                        name="Codigo_resultado_preliminar_1"
                        id="Codigo_resultado_preliminar_1"
                        defaultValue={""}
                        onChange={(e) => {
                          SetselectobjeSeguimiento({
                            value: e.value,
                            label: e.label,
                          });
                          setvaluePlantillachange(e.value);
                          onclickPlantillaTargetCreate(setValue);
                          ComboDinamyc(
                            e.label,
                            ListMicroorganismo,
                            ListNumber,
                            setListSelectDimanyc,
                            setComboDynamic,
                            clearErrors
                          );
                          clearErrors("Codigo_resultado_preliminar_1");
                        }}
                        options={optionSegumiento}
                        placeholder="Seleccione un seguimiento"
                        value={selectobjeSeguimiento}
                      ></Select>
                      {/* <select
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
                            setListSelectDimanyc,
                            setComboDynamic,
                            clearErrors
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
                      </select> */}
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
                              <Select
                                instanceId={"Codigo_opcion"}
                                name="Codigo_opcion"
                                id="Codigo_opcion"
                                defaultValue={""}
                                onChange={(e) => {
                                  Setselectobjeopciones({
                                    value: e.value,
                                    label: e.label,
                                  });
                                  clearErrors("Codigo_opcion");
                                  ComboDinamyc(
                                    e.label,
                                    ListMicroorganismo,
                                    ListNumber,
                                    setListSelectDimanyc,
                                    setComboDynamic,
                                    clearErrors
                                  );
                                }}
                                options={optionOpciones}
                                placeholder="Seleccione una opción"
                                value={selectobjeopciones}
                              ></Select>
                              {/* <select
                                {...register("Codigo_opcion")}
                                name="Codigo_opcion"
                                id="Codigo_opcion"
                                className={styles.input_group}
                                defaultValue={""}
                                onChange={(e) => {
                                  clearErrors("Codigo_opcion");
                                  ComboDinamyc(
                                    e.target.id,
                                    ListMicroorganismo,
                                    ListNumber,
                                    setListSelectDimanyc,
                                    setComboDynamic,
                                    clearErrors
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
                              </select> */}
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

                  {ComboDynamic ? (
                    <>
                      <div className={`${styles.form_group}`}>
                        {ListSelectDimanyc.map((data, index) => {
                          return <Fragment key={index}>{data}</Fragment>;
                        })}
                      </div>
                      <div className={styles.invalid_feedback}>
                        {errors.SelectDinamyc?.message}
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  <div className={styles.btn_container_send}>
                    <Link
                      className={styles.create_followUp}
                      href={""}
                      title="agregar estatus"
                      onClick={(e) => {
                        e.preventDefault();
                        AddResultToList(
                          selectobjeEstatus,
                          selectobjeSeguimiento,
                          selectobjeopciones,
                          setListAddResultMultple,
                          ListAddResultMultple,
                          setError,
                          ListOptiones,
                          setvaluePlantillachange,
                          ComboDynamic,
                          setListSelectDimanyc,
                          setComboDynamic,
                          SetselectobjeSeguimiento,
                          Setselectobjeopciones
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
                      <label className={styles.group_title}>
                        Listado de estatus agregados
                      </label>

                      <div className={styles.list}>
                        <ListResulltAdd
                          ListAddResultMultple={ListAddResultMultple}
                          setListAddResultMultple={setListAddResultMultple}
                        ></ListResulltAdd>
                      </div>

                      <div className={styles.invalid_feedback}>
                        {errors.ListResultMultiple?.message}
                      </div>
                    </div>
                  </div>

                  <div className={styles.btn_container_send}>
                    <input id="CierreBloqCheck" type="checkbox" />
                    <label>
                      <b>Cerrar el bloque de stickers</b>
                    </label>
                  </div>

                  <div className={styles.btn_container_send}>
                      <button 
                        className={`${styles.btn_send}`}
                        id="btnVisibleEstatus"
                        onClick={(e) => {
                          e.preventDefault;
                          comprobarCambioestadomasivo(ListAddResultMultple);
                        }}
                      >
                        Guardar cambios
                      </button>

                    <button
                      className={`${styles.btn_send} ${styles.ocultar}`}
                      id="btnGuardarCierreMasivo"
                      onClick={(e) => {
                        e.preventDefault;
                        CierreMasivoXestatus(
                          LstObservacionesPrede,
                          ListadoBitacoras
                        );
                      }}
                    ></button>
                    {!formState.isSubmitting && (
                      <button
                        className={`${styles.btn_send} ${styles.ocultar}`}
                        id="btnGuardarMasivo"
                        onClick={() => {
                          setValue("ListadoBitacorasLst", ListadoBitacoras);
                          setValue("ListResultMultiple", ListAddResultMultple);
                          setValue("GrupoSticker", group);
                        }}
                      ></button>
                    )}

                    <Link
                      className={styles.btn_cancel}
                      href={{
                        pathname: "/[id]",
                        query: { id: group, page: "1" },
                        hash: "Cactive#OverallSample",
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
