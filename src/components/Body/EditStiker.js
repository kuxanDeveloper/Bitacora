import React, { useEffect, useState } from "react";
import styles from "../../styles/CreateSticker.module.scss";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageOptimize from "../Tools/ImageOptimize";
import Link from "next/link";
import { useContextBitacora } from "../../context/BitacoraContext";
import {
  setImagenFileUpdate,
  OnchangeObservaCrearEdit,
  RegisterStickerObservaciones,
} from "../Tools/functiones";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import "dayjs/locale/es";
import Image from "next/image";
import dayjs from "dayjs";
import { onSubmitUpdate } from "../Tools/CRUD";
import Select from "react-select";

function EditStickerComponents({
  ListadoGrupoActivo,
  InforSampleDetails,
  group,
  id,
  isHabilteGroup,
  LstObservacionesPrede,
  setvalueGrupochange,
  ListadoSitioAna,
  ListadoJefeLaboratorio,
  ListadoTipoMuestra,
}) {
  const {
    setShowModal,
    setishabiliteBtn,
    ValueImagesrc,
    setValueImagesrc,
    ValueImagesrc2,
    setValueImagesrc2,
    setisImagenOne,
    setisImagenExterna,

    setValueImagesrcExterna,
    setValueImagesrcExterna2,
  } = useContextBitacora();
  const validationSchema = Yup.object().shape({
    COD_BITACORA: Yup.number(),
    NumSticker: Yup.string(),
    Cod_Imagen1: Yup.string(),
    Cod_Imagen2: Yup.string(),
    GrupoSticker: Yup.string().required("Campo grupo obligatorio"),
    ObservaInici: Yup.string().notRequired(),
    file: Yup.mixed().notRequired(),
    file2: Yup.mixed().notRequired(),
    Sufijo: Yup.number().notRequired(),
    SitioAnatomico: Yup.string().required(
      "Debe seleccionar un sitio anatomico"
    ),
    jefelaboratorio: Yup.string().notRequired(),
    tipoMuestra: Yup.string().required("Debe seleccionar un tipo de muestra"),
    FechaHoraRecogida: Yup.string().required(
      "Campo fecha recogida de la muestra obligatorio"
    ),
  });
  const [codSitioAnatomico, setcodSitioAnatomico] = useState("");
  const [codJefeLab, setcodJefeLab] = useState("");
  const [codTipoMuestra, setcodTipoMuestra] = useState("");
  const [fecha, Setfecha] = useState("");
  const [ValueGroup, setValueGroup] = useState("");

  useEffect(() => {
    setisImagenExterna(true);
    setValueImagesrc(null);
    setValueImagesrc2(null);
    if (
      InforSampleDetails.infoBitacora != null &&
      InforSampleDetails.infoBitacora != undefined
    ) {
      // var grupoSticker = document.getElementById("GrupoSticker");

      // if (isHabilteGroup == "true") {
      //   grupoSticker.setAttribute("disabled", "");
      // } else {
      //   grupoSticker.disabled = false;
      // }

      if (LstObservacionesPrede != null && LstObservacionesPrede != undefined) {
        let retornoValor = LstObservacionesPrede.find(
          (e) =>
            e.Descripcion_Observacion.toLowerCase() ==
            InforSampleDetails.infoBitacora[0].OBSERVACIONES_INICIALES.toLowerCase()
        );

        if (retornoValor != undefined && retornoValor != null) {
          document.getElementById("sltObservaIni").value =
            retornoValor.Codigo_observacion;
        } else if (
          InforSampleDetails.infoBitacora[0].OBSERVACIONES_INICIALES != "" &&
          InforSampleDetails.infoBitacora[0].OBSERVACIONES_INICIALES.toLowerCase() !=
            null
        ) {
          setShowobservaTextare(true);
        } else {
          document.getElementById("sltObservaIni").value = "";
        }
      }

      setcodSitioAnatomico(
        InforSampleDetails.infoBitacora[0].ID_SITIO_ANATOMICO
      );
      setValueGroup(group);
      setcodJefeLab(InforSampleDetails.infoBitacora[0].ID_JEFE_LABORATORIO);
      setcodTipoMuestra(InforSampleDetails.infoBitacora[0].ID_TIPO_MUESTRA);

      const fechabd =
        InforSampleDetails.infoBitacora[0].FECHA_RECOGIDA_DATETIME;

      if (fechabd != null && fechabd != undefined) {
        Setfecha(dayjs(fechabd));
      }
    }
  }, [InforSampleDetails.infoBitacora]);

  const [ShowobservaTextare, setShowobservaTextare] = useState(false);

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;
  const options = [];
  ListadoJefeLaboratorio.map((data) => {
    options.push({ value: data.ID, label: data.DESCRIPCION });
  });

  const optionssitio = [];
  ListadoSitioAna.map((data) => {
    optionssitio.push({ value: data.ID, label: data.DESCRIPCION });
  });

  const optionsTipoMue = [];
  ListadoTipoMuestra.map((data) => {
    optionsTipoMue.push({ value: data.ID, label: data.NOMBRE_TIPO_MUESTRA });
  });

  const optionsgrup = [];
  ListadoGrupoActivo.map((data) => {
    optionsgrup.push({ value: data.Id_grupo, label: data.NOMBRE_GRUPO });
  });

  console.log(isHabilteGroup);

  return (
    <section className={styles.Create_sticker}>
      <Image
        src="/img/bg_image.jpg"
        width={1000}
        height={1000}
        alt="a"
        className={styles.background_img}
      />
      <div className={styles.sticker_container}>
        <div className={styles.back_btn_container}>
          <Link href={`/${group}?page=1`} className={styles.back_btn}>
            Volver{" "}
          </Link>
        </div>

        <p className={styles.title}>Edición sticker</p>
        <br />
        <div className={styles.card}>
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            {InforSampleDetails.infoBitacora != null &&
            InforSampleDetails.infoBitacora != undefined
              ? InforSampleDetails.infoBitacora.map((data, index) => (
                  <div key={index} className={styles.stickers_container}>
                    <div className={styles.card_sticker}>
                      {/* <!-- estado --> */}

                      {/* <!-- form group --> */}

                      <div className={styles.form_group}>
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            N° de Sticker
                          </label>
                          <label>{`${data.NUMERO_STICKER}-${data.SUFIJO}`}</label>
                        </div>

                        <div className={styles.input_group}>
                          <label className={styles.group_title}>Grupo</label>
                          <Select
                            className="Grupo"
                            value={optionsgrup.filter(function (optiong) {
                              return (
                                optiong.value ==
                                (ValueGroup == null || ValueGroup == undefined
                                  ? ""
                                  : ValueGroup)
                              );
                            })}
                            isDisabled={
                              isHabilteGroup == "true" || InforSampleDetails.infoBitacora[0]
                              .ESTADO_STICKER == false
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              setValueGroup(e.value);
                              setvalueGrupochange(e.value);
                            }}
                            options={optionsgrup}
                            placeholder="Seleccione un grupo para el sticker"
                          ></Select>

                          {/* <select
                            defaultValue={group}
                            {...register("GrupoSticker")}
                            disabled={
                              InforSampleDetails.infoBitacora[0]
                                .ESTADO_STICKER == true
                                ? false
                                : true
                            }
                            name="GrupoSticker"
                            id="GrupoSticker"
                            onChange={(e) =>
                              setvalueGrupochange(e.target.value)
                            }
                          >
                            <option disabled value="">
                              Seleccione una opción
                            </option>
                            {ListadoGrupoActivo.map((data, index) => (
                              <option key={index} value={data.Id_grupo}>
                                {data.NOMBRE_GRUPO}
                              </option>
                            ))}
                          </select> */}

                          <div className={styles.invalid_feedback}>
                            {errors.GrupoSticker?.message}
                          </div>
                        </div>
                      </div>

                      <p className={styles.sticker_title}>
                        Imagenes de sticker
                      </p>
                      {/* <!-- imagenes --> */}
                      <div className={styles.images_container}>
                        {ValueImagesrc != null ||
                        data.URL_PRIMERA_IMAGEN != null ? (
                          <>
                            <ImageOptimize
                              Values={{
                                src:
                                  data.URL_PRIMERA_IMAGEN != null
                                    ? process.env.NEXT_PUBLIC_URL_API +
                                      data.URL_PRIMERA_IMAGEN
                                    : ValueImagesrc != null
                                    ? URL.createObjectURL(ValueImagesrc)
                                    : "",
                                alt: "sticker",
                                title: "imagen sticker",
                                classValue: styles.sticker_figure,
                                width: 80,
                                height: 65,
                              }}
                            ></ImageOptimize>
                            <Link
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                                setishabiliteBtn(true);
                                setisImagenOne(true);
                                data.URL_PRIMERA_IMAGEN == null &&
                                ValueImagesrc != null
                                  ? setisImagenExterna(false)
                                  : setisImagenExterna(true);
                                data.URL_PRIMERA_IMAGEN != null
                                  ? setValueImagesrcExterna(
                                      process.env.NEXT_PUBLIC_URL_API +
                                        data.URL_PRIMERA_IMAGEN
                                    )
                                  : setValueImagesrcExterna(null);
                              }}
                            >
                              <ImageOptimize
                                Values={{
                                  src: "/img/Camera@2x.png",
                                  alt: "Logo de camara",
                                  title: "Imagen",
                                  classValue: styles.img_camera,
                                  width: 34,
                                  height: 34,
                                }}
                              ></ImageOptimize>
                            </Link>
                          </>
                        ) : (
                          <figure className={styles.sticker_figure}>
                            <Link
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                                setishabiliteBtn(true);
                                setisImagenOne(true);
                                setisImagenExterna(false);
                              }}
                            >
                              <ImageOptimize
                                Values={{
                                  src: "/img/Camera@2x.png",
                                  alt: "Logo de camara",
                                  title: "Imagen",
                                  classValue: styles.img_camera,
                                  width: 24,
                                  height: 24,
                                }}
                              ></ImageOptimize>
                            </Link>
                          </figure>
                        )}

                        {ValueImagesrc2 != null ||
                        data.URL_SEGUNDA_IMAGEN != null ? (
                          <>
                            <ImageOptimize
                              Values={{
                                src:
                                  data.URL_PRIMERA_IMAGEN != null
                                    ? process.env.NEXT_PUBLIC_URL_API +
                                      data.URL_SEGUNDA_IMAGEN
                                    : ValueImagesrc2 != null
                                    ? URL.createObjectURL(ValueImagesrc2)
                                    : "",

                                alt: "sticker",
                                title: "imagen sticker 2",
                                classValue: styles.sticker_figure,
                                width: 80,
                                height: 65,
                              }}
                            ></ImageOptimize>
                            <Link
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                                setishabiliteBtn(true);
                                setisImagenOne(false);
                                data.URL_SEGUNDA_IMAGEN == null &&
                                ValueImagesrc2 != null
                                  ? setisImagenExterna(false)
                                  : setisImagenExterna(true);
                                data.URL_SEGUNDA_IMAGEN != null
                                  ? setValueImagesrcExterna2(
                                      process.env.NEXT_PUBLIC_URL_API +
                                        data.URL_SEGUNDA_IMAGEN
                                    )
                                  : setValueImagesrcExterna2(null);
                              }}
                            >
                              <ImageOptimize
                                Values={{
                                  src: "/img/Camera@2x.png",
                                  alt: "Logo de camara",
                                  title: "Imagen",
                                  classValue: styles.img_camera,
                                  width: 34,
                                  height: 34,
                                }}
                              ></ImageOptimize>
                            </Link>
                          </>
                        ) : (
                          <figure className={styles.sticker_figure}>
                            <Link
                              href=""
                              onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                                setishabiliteBtn(true);
                                setisImagenOne(false);
                                setisImagenExterna(false);
                                setValueImagesrcExterna2(null);
                                setValueImagesrcExterna(null);
                              }}
                            >
                              <ImageOptimize
                                Values={{
                                  src: "/img/Camera@2x.png",
                                  alt: "Logo de camara ",
                                  title: "Imagen 2",
                                  classValue: styles.img_camera,
                                  width: 24,
                                  height: 24,
                                }}
                              ></ImageOptimize>
                            </Link>
                          </figure>
                        )}
                      </div>

                      {/*-------------------------------Sitio Anatomico %
                      & Jefe  Laboratorio ------------------------------------------- */}

                      <div className={styles.form_group}>
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Sitio anatómico
                          </label>

                          <Select
                            className="SitioAnat"
                            value={optionssitio.filter(function (optiong) {
                              return (
                                optiong.value ==
                                (codSitioAnatomico == null ||
                                codSitioAnatomico == undefined
                                  ? ""
                                  : codSitioAnatomico)
                              );
                            })}
                            isDisabled={
                              InforSampleDetails.infoBitacora[0]
                                .ESTADO_STICKER == true
                                ? false
                                : true
                            }
                            onChange={(e) => {
                              setcodSitioAnatomico(e.value);
                            }}
                            options={optionssitio}
                            placeholder="Seleccione un sitio anatomico"
                          ></Select>

                          {/* <select
                            {...register("SitioAnatomico")}
                            disabled={
                              InforSampleDetails.infoBitacora[0]
                                .ESTADO_STICKER == true
                                ? false
                                : true
                            }
                            name="SitioAnatomico"
                            id="SitioAnatomico"
                            value={codSitioAnatomico}
                            onChange={(e) =>
                              setcodSitioAnatomico(e.target.value)
                            }
                          >
                            <option disabled value="">
                              Seleccione una opción
                            </option>
                            {ListadoSitioAna.map((data, index) => (
                              <option key={index} value={data.ID}>
                                {data.DESCRIPCION}
                              </option>
                            ))}
                          </select> */}

                          <div className={styles.invalid_feedback}>
                            {errors.SitioAnatomico?.message}
                          </div>
                        </div>

                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Jefe de laboratorio
                          </label>

                          <Select
                            className="jefelaboratorio"
                            // defaultInputValue={codJefeLab}
                            value={options.filter(function (option) {
                              return (
                                option.value ===
                                (codJefeLab == null || codJefeLab == undefined
                                  ? ""
                                  : codJefeLab)
                              );
                            })}
                            isDisabled={
                              InforSampleDetails.infoBitacora[0]
                                .ESTADO_STICKER == true
                                ? false
                                : true
                            }
                            onChange={(e) => {
                              setcodJefeLab(e.value);
                            }}
                            placeholder="Seleccione el tipo de jefe"
                            options={options}
                          ></Select>

                          <div className={styles.invalid_feedback}>
                            {errors.jefelaboratorio?.message}
                          </div>
                        </div>
                      </div>

                      {/*-------------------------------Tipo de muestra & observaciones predeterminadas------------------------------------------- */}

                      <div className={styles.form_group}>
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Tipo de muestra
                          </label>

                          <Select
                            className="TipoMue"
                            options={optionsTipoMue}
                            value={optionsTipoMue.filter(function (optiong) {
                              return (
                                optiong.value ==
                                (codTipoMuestra == null ||
                                codTipoMuestra == undefined
                                  ? ""
                                  : codTipoMuestra)
                              );
                            })}
                            isDisabled={
                              InforSampleDetails.infoBitacora[0]
                                .ESTADO_STICKER == true
                                ? false
                                : true
                            }
                            onChange={(e) => {
                              setcodTipoMuestra(e.value);
                            }}
                            placeholder="Seleccione un tipo de muestra"
                          ></Select>

                          {/* <select
                            {...register("tipoMuestra")}
                            name="tipoMuestra"
                            id="tipoMuestra"
                            value={codTipoMuestra}
                            disabled={
                              InforSampleDetails.infoBitacora[0]
                                .ESTADO_STICKER == true
                                ? false
                                : true
                            }
                            onChange={(e) => setcodTipoMuestra(e.target.value)}
                          >
                            <option disabled value="">
                              Seleccione una opción
                            </option>
                            {ListadoTipoMuestra.map((data, index) => (
                              <option key={index} value={data.ID}>
                                {data.NOMBRE_TIPO_MUESTRA}
                              </option>
                            ))}
                          </select> */}

                          <div className={styles.invalid_feedback}>
                            {errors.tipoMuestra?.message}
                          </div>
                        </div>

                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Obsevraciones predeterminada
                          </label>
                          <select
                            name="sltObservaIni"
                            id="sltObservaIni"
                            disabled={
                              InforSampleDetails.infoBitacora[0]
                                .ESTADO_STICKER == true
                                ? false
                                : true
                            }
                            onChange={(e) => {
                              OnchangeObservaCrearEdit(
                                e.target.value,
                                setShowobservaTextare
                              );
                            }}
                          >
                            <option disabled value="">
                              Seleccione una opción
                            </option>
                            {LstObservacionesPrede != null &&
                            LstObservacionesPrede != undefined
                              ? LstObservacionesPrede.length > 0
                                ? LstObservacionesPrede.map((data, index) => {
                                    if (data.Observacion_Bitacora) {
                                      return (
                                        <option
                                          key={index}
                                          value={data.Codigo_observacion}
                                        >
                                          {data.Descripcion_Observacion}
                                        </option>
                                      );
                                    }
                                  })
                                : ""
                              : ""}
                          </select>
                        </div>
                      </div>

                      {/*-------------------------------Fecha de recodigo muestra------------------------------------------- */}

                      <div className={styles.form_group}>
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Fecha de recogida de la muestra
                          </label>
                          <LocalizationProvider
                            orientation="landscape"
                            dateAdapter={AdapterDayjs}
                            adapterLocale="es"
                          >
                            <MobileDateTimePicker
                              disabled={
                                InforSampleDetails.infoBitacora[0]
                                  .ESTADO_STICKER == true
                                  ? false
                                  : true
                              }
                              value={fecha}
                              onChange={(value) => Setfecha(value)}
                              className="FechaHoraRecogida"
                            />
                          </LocalizationProvider>

                          {InforSampleDetails.infoBitacora[0].ESTADO_STICKER ==
                          true ? (
                            <button
                              type="button"
                              title="Seleccionar la fecha de hoy"
                              onClick={() => {
                                Setfecha(dayjs());
                              }}
                              className={styles.photo}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#ffffff"
                                className="icon icon-tabler icon-tabler-calendar-plus"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                ></path>
                                <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5"></path>
                                <path d="M16 3v4"></path>
                                <path d="M8 3v4"></path>
                                <path d="M4 11h16"></path>
                                <path d="M16 19h6"></path>
                                <path d="M19 16v6"></path>
                              </svg>
                            </button>
                          ) : (
                            ""
                          )}

                          <div className={styles.invalid_feedback}>
                            {errors.FechaHoraRecogida?.message}
                          </div>
                        </div>

                        {ShowobservaTextare ? (
                          <div className={styles.input_group}>
                            <label className={styles.group_title}>
                              Observaciones iniciales
                            </label>
                            <textarea
                              {...register("ObservaInici")}
                              name="ObservaInici"
                              id="ObservaInici"
                              cols="70"
                              rows="5"
                              maxLength={1500}
                              defaultValue={data.OBSERVACIONES_INICIALES}
                            ></textarea>
                            <div className={styles.invalid_feedback}>
                              {errors.ObservaInici?.message}
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className={styles.btn_container_send}>
                        {!formState.isSubmitting &&
                          InforSampleDetails.infoBitacora[0].ESTADO_STICKER && (
                            <button
                              onClick={(e) => {
                                isHabilteGroup == "true"
                                  ? setValue("GrupoSticker", group)
                                  : setValue("GrupoSticker", ValueGroup);
                                // setCheckinvalue(setValue);
                                setImagenFileUpdate(
                                  ValueImagesrc,
                                  ValueImagesrc2,
                                  setValue,
                                  data.CODIGO_PRIMERA_IMAGEN,
                                  data.CODIGO_SEGUNDA_IMAGEN
                                );
                                setValue("NumSticker", data.NUMERO_STICKER);
                                setValue("COD_BITACORA", data.CODIGO_BITACORA);
                                setValue("Sufijo", data.SUFIJO);
                                setValue(
                                  "FechaHoraRecogida",
                                  fecha != ""
                                    ? document.querySelector(
                                        ".FechaHoraRecogida input"
                                      ).value
                                    : ""
                                );
                                RegisterStickerObservaciones(
                                  setValue,
                                  codJefeLab,
                                  codSitioAnatomico,
                                  codTipoMuestra,
                                  e,
                                  ValueGroup
                                );
                              }}
                              className={styles.btn_send}
                            >
                              Guardar Cambios
                            </button>
                          )}

                        <Link
                          href={{
                            pathname: "/Sample/FullDetails/[id]",
                            query: { id: id },
                            hash: "Pruebas",
                          }}
                          className={styles.btn_cancel}
                        >
                          Cancelar
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              : ""}
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditStickerComponents;
