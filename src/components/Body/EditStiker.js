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
import "dayjs/locale/en-gb";
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
    ValueImagesrc2,
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
    SitioAnatomico: Yup.string().required("Campo Sitio Anatómico obligatorio"),
    jefelaboratorio: Yup.string().required(
      "Campo Jefe De Laboratorio obligatorio"
    ),
    tipoMuestra: Yup.string().required("Campo Tipo de muestra obligatorio"),
    FechaHoraRecogida: Yup.string().required(
      "Campo fecha recogida de la muestra obligatorio"
    ),
  });

  const [codSitioAnatomico, setcodSitioAnatomico] = useState("");
  const [codJefeLab, setcodJefeLab] = useState("");
  const [codTipoMuestra, setcodTipoMuestra] = useState("");
  useEffect(() => {
    setisImagenExterna(true);

    if (
      InforSampleDetails.infoBitacora != null &&
      InforSampleDetails.infoBitacora != undefined
    ) {
      var grupoSticker = document.getElementById("GrupoSticker");

      if (isHabilteGroup == "true") {
        grupoSticker.setAttribute("disabled", "");
      } else {
        grupoSticker.disabled = false;
      }

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
      setcodJefeLab(InforSampleDetails.infoBitacora[0].ID_JEFE_LABORATORIO);
      setcodTipoMuestra(InforSampleDetails.infoBitacora[0].ID_TIPO_MUESTRA);
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
  // console.log(codJefeLab, "codjefe")
  
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
                          <select
                            defaultValue={group}
                            {...register("GrupoSticker")}
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
                          </select>

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

                      {/*-------------------------------Sitio Anatomico------------------------------------------- */}

                      <div className={styles.form_group}>
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Sitio anatómico
                          </label>
                          <select
                            {...register("SitioAnatomico")}
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
                          </select>

                          <div className={styles.invalid_feedback}>
                            {errors.SitioAnatomico?.message}
                          </div>
                        </div>
                      </div>

                      {/*-------------------------------Jefe  Laboratorio------------------------------------------- */}

                      <div className={styles.form_group}>
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Jefe de laboratorio
                          </label>

                          <Select
                            className="jefelaboratorio"
                            // defaultInputValue={codJefeLab}
                            value={options.filter(function(option) {
                              return option.value === codJefeLab;
                            })}
                            onChange={(e) => {
                              setcodJefeLab(e.value);
                            }}
                            
                            placeholder="Seleccione el tipo de jefe"
                            options={options}
                          ></Select>
                          {/* <select
                            {...register("jefelaboratorio")}
                            name="jefelaboratorio"
                            id="jefelaboratorio"
                            value={codJefeLab}
                            onChange={(e) => setcodJefeLab(e.target.value)}
                          >
                            <option disabled value="">
                              Seleccione una opción
                            </option>
                            {ListadoJefeLaboratorio.map((data, index) => (
                              <option key={index} value={data.ID}>
                                {data.DESCRIPCION}
                              </option>
                            ))}
                          </select> */}

                          <div className={styles.invalid_feedback}>
                            {errors.jefelaboratorio?.message}
                          </div>
                        </div>
                      </div>

                      {/*-------------------------------Tipo de muestra------------------------------------------- */}

                      <div className={styles.form_group}>
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Tipo de muestra
                          </label>
                          <select
                            {...register("tipoMuestra")}
                            name="tipoMuestra"
                            id="tipoMuestra"
                            value={codTipoMuestra}
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
                          </select>

                          <div className={styles.invalid_feedback}>
                            {errors.tipoMuestra?.message}
                          </div>
                        </div>
                      </div>

                      {/*-------------------------------Fecha de recodigo muestra------------------------------------------- */}

                      <div className={styles.form_group}>
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Fecha de recogida de la muestra
                          </label>
                          <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                            adapterLocale={"en-gb"}
                          >
                            <MobileDateTimePicker
                              orientation="landscape"
                              defaultValue={
                                data.FECHA_RECOGIDA_DATETIME != null &&
                                data.FECHA_RECOGIDA_DATETIME != null
                                  ? dayjs(data.FECHA_RECOGIDA_DATETIME)
                                  : dayjs()
                              }
                              className="FechaHoraRecogida"
                            />
                          </LocalizationProvider>

                          <div className={styles.invalid_feedback}>
                            {errors.FechaHoraRecogida?.message}
                          </div>
                        </div>
                      </div>

                      {/* <!-- form group --> */}
                      <div className={styles.form_group}>
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Obsevraciones predeterminada
                          </label>
                          <select
                            name="sltObservaIni"
                            id="sltObservaIni"
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
                        {!formState.isSubmitting && (
                          <button
                            onClick={() => {
                              isHabilteGroup == "true"
                                ? setValue("GrupoSticker", group)
                                : "";
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
                                document.querySelector(
                                  ".FechaHoraRecogida input"
                                ).value
                              );
                              setValue("jefelaboratorio", codJefeLab);
                              setValue("SitioAnatomico", codSitioAnatomico);
                              setValue("tipoMuestra", codTipoMuestra);
                              RegisterStickerObservaciones(setValue);
                            }}
                            className={styles.btn_send}
                          >
                            Guardar Cambios
                          </button>
                        )}

                        {/* <button
                  id="buttonSubmitUnico"
                  style={{ display: "none" }}
                ></button> */}
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
