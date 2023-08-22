import React, { useEffect, useState, useId } from "react";
import styles from "../../styles/CreateSticker.module.scss";
import ImageOptimize from "../Tools/ImageOptimize";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  setImagenFile,
  OnchangeObservaCrearEdit,
  RegisterStickerObservaciones,
} from "../Tools/functiones";
import { onSubmitCreate } from "../Tools/CRUD";
import * as Yup from "yup";
import { useContextBitacora } from "../../context/BitacoraContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import "dayjs/locale/es";
import Select from "react-select";
import dayjs from "dayjs";
function CreateSticker({
  ListadoGrupoActivo,
  id,
  LstObservacionesPrede,
  ListadoGetFullSufijo,
  ListadoTipoMuestra,
  ListadoJefeLaboratorio,
  ListadoSitioAna,
  setvalueGrupochange,
}) {
  const {
    setShowModal,
    setishabiliteBtn,
    ValueImagesrc,
    ValueImagesrc2,
    setisImagenOne,
    setValueImagesrc,
    setValueImagesrc2,
    setValueImagesrcExterna,
    setValueImagesrcExterna2,
    setisImagenExterna,
    ResultScanner,
    setshowModalScanner,
    setResultScanner,
  } = useContextBitacora();
  const [ShowobservaTextare, setShowobservaTextare] = useState(false);
  const [ValueGroup, setValueGroup] = useState("");
  const [codSitioAnatomico, setcodSitioAnatomico] = useState("");
  const [codTipoMuestra, setcodTipoMuestra] = useState("");
  const [selectValue, SetSelectValue] = useState("");
  const [fecha, Setfecha] = useState("");
  const validationSchema = Yup.object().shape({
    NumSticker: Yup.string().required("Campo N° de sticker obligatorio"),
    GrupoSticker: Yup.string().required("Campo grupo obligatorio"),
    ObservaInici: Yup.string(),
    file: Yup.mixed().notRequired(),
    file2: Yup.mixed().notRequired(),
    Sufijo: Yup.number().notRequired(),
    SitioAnatomico: Yup.string().required("Debe seleccionar un sitio anatomico"),
    jefelaboratorio: Yup.string().notRequired(),
    tipoMuestra: Yup.string().required("Debe seleccionar un tipo de muestra"),
    FechaHoraRecogida: Yup.string().required(
      "Campo fecha recogida de la muestra obligatorio"
    ),
  });

  useEffect(() => {
    setValueImagesrc(null);
    setValueImagesrc2(null);
    setisImagenExterna(false);
    setValueImagesrcExterna(null);
    setValueImagesrcExterna2(null);
  }, []);


  useEffect(() => {
    if (ResultScanner != "" && ResultScanner != null) {
      const SplitScanner = ResultScanner.split("-");
      if (SplitScanner != null && SplitScanner != undefined) {
        if (SplitScanner.length > 1) {
          let SearchGroupSufij = ListadoGetFullSufijo.find(
            (data) => data.SUFIJO_GRUPO == SplitScanner[1]
          );
          if (SearchGroupSufij != undefined && SearchGroupSufij != null) {
            setValueGroup(SearchGroupSufij.Id_grupo);
            setValue("GrupoSticker", SearchGroupSufij.Id_grupo);
          }
          document.getElementById("NumSticker").value = SplitScanner[0];
          document.getElementById("Sufijo").value = SplitScanner[1];
          setValue("NumSticker", SplitScanner[0]);
          setValue("Sufijo", SplitScanner[1]);
        } else {
          document.getElementById("NumSticker").value = SplitScanner[0];
          setValue("NumSticker", SplitScanner[0]);
        }
      } else {
        setValue("NumSticker", ResultScanner);
        document.getElementById("NumSticker").value = ResultScanner;
      }
    }
    setResultScanner(null);
  }, [ResultScanner]);

  useEffect(() => {
    setValueGroup(id);
  }, []);

  //The class name can vary

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;
  const options = [];
  ListadoJefeLaboratorio.map((data) => {
    options.push({ value: data.ID, label: data.DESCRIPCION });
  });

  const optionsgrup = [];
  ListadoGrupoActivo.map((data) => {
    optionsgrup.push({ value: data.Id_grupo, label: data.NOMBRE_GRUPO });
  });

  const optionssitio = [];
  ListadoSitioAna.map((data) => {
    optionssitio.push({ value: data.ID, label: data.DESCRIPCION });
  });

  const optionsTipoMue = [];
  ListadoTipoMuestra.map((data) => {
    optionsTipoMue.push({ value: data.ID, label: data.NOMBRE_TIPO_MUESTRA });
  });

  return (
    <>
      <section className={styles.Create_sticker}>
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
                pathname: "/[id]",
                query: { id: ValueGroup, idAncestro: "1", page: "1" },
                hash: "Cactive#OverallSample",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Leer sticker</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreate)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- form group --> */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        N° de Sticker
                      </label>
                      <input
                        {...register("NumSticker")}
                        name="NumSticker"
                        maxLength="100"
                        type="number"
                        min="0"
                        id="NumSticker"
                        className={styles.group_input}
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.NumSticker?.message}
                      </div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>N° sufijo</label>
                      <input
                        {...register("Sufijo")}
                        name="Sufijo"
                        id="Sufijo"
                        maxLength="10"
                        type="number"
                        min="0"
                        className={styles.group_input}
                      />

                      <div className={styles.invalid_feedback}>
                        {errors.GrupoSticker?.message}
                      </div>
                    </div>
                    <div className={styles.input_group}>
                      <button
                        className={styles.btn_barcode}
                        onClick={(e) => {
                          e.preventDefault();
                          setshowModalScanner(true);
                        }}
                      >
                        leer codigo de barras
                      </button>
                    </div>
                  </div>

                  <p className={styles.sticker_title}>Imagenes de sticker</p>
                  {/* <!-- imagenes --> */}
                  <div className={styles.images_container}>
                    {ValueImagesrc != null ? (
                      <>
                        <ImageOptimize
                          Values={{
                            src: URL.createObjectURL(ValueImagesrc),
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

                    {ValueImagesrc2 != null ? (
                      <>
                        <ImageOptimize
                          Values={{
                            src: URL.createObjectURL(ValueImagesrc2),
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

                  {/* <!-- estado --> */}

                  {/*------------------------------- Grupo & Jefe de laboratorio ------------------------------------------- */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Grupo</label>
                      <Select
                        className="Grupo"
                        value={optionsgrup.filter(function (optiong) {
                          return (
                            (optiong.value ==
                            (ValueGroup == null || ValueGroup == undefined
                              ? ""
                              : ValueGroup))
                          );
                        })}
                        onChange={(e) => {
                          setValueGroup(e.value);
                          setvalueGrupochange(e.value);
                        }}
                        options={optionsgrup}
                        placeholder="Seleccione un grupo para el sticker"
                      ></Select>

                      {/* <select
                        {...register("GrupoSticker")}
                        name="GrupoSticker"
                        id="GrupoSticker"
                        value={ValueGroup}
                        onChange={(e) => {
                          setValueGroup(e.target.value);
                          setvalueGrupochange(e.target.value);
                        }}
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
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Jefe de laboratorio
                      </label>

                      <Select
                        instanceId={useId()}
                        className="jefelaboratorio"
                        defaultValue={selectValue}
                        onChange={(e) => {
                          SetSelectValue(e.value);
                        }}
                        options={options}
                        placeholder="Seleccione un jefe de laboratorio"
                      ></Select>

                      <div className={styles.invalid_feedback}>
                        {errors.jefelaboratorio?.message}
                      </div>
                    </div>
                  </div>

                  {/*-------------------------------Sitio Anatomico & Tipo de Muestra------------------------------------------- */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Sitio anatómico
                      </label>

                      <Select
                        className="SitioAnat"
                        onChange={(e) => {
                          setcodSitioAnatomico(e.value);
                        }}
                        options={optionssitio}
                        placeholder="Seleccione un sitio anatomico"
                      ></Select>

                      {/* <select
                        {...register("SitioAnatomico")}
                        name="SitioAnatomico"
                        id="SitioAnatomico"
                        defaultValue={""}
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
                        Tipo de muestra
                      </label>
                      <Select
                        className="TipoMue"                        
                        options={optionsTipoMue}
                        onChange={(e) => {
                          setcodTipoMuestra(e.value);
                        }}
                        placeholder="Seleccione un tipo de muestra"
                      ></Select>

                      {/* <select
                        {...register("tipoMuestra")}
                        name="tipoMuestra"
                        id="tipoMuestra"
                        defaultValue={""}
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
                  </div>

                  {/*-------------------------------Fecha de recodigo & Observaciones predeterminada------------------------------------------- */}

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
                          value={fecha}
                          className="FechaHoraRecogida"
                          onChange={(value) => Setfecha(value)}
                        />
                      </LocalizationProvider>

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

                      <div className={styles.invalid_feedback}>
                        {errors.FechaHoraRecogida?.message}
                      </div>
                    </div>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>
                        Observaciones predeterminada
                      </label>
                      <select
                        defaultValue={""}
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
                  </div>

                  {/* <!-- form group --> */}

                  {ShowobservaTextare ? (
                    <div className={styles.form_group}>
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
                        ></textarea>
                        {/* <div className={styles.invalid_feedback}>
                        {errors.ObservaInici?.message}
                      </div> */}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        onClick={(e) => {
                          RegisterStickerObservaciones(
                            setValue,
                            selectValue,
                            codSitioAnatomico,
                            codTipoMuestra,                            
                            e,
                            ValueGroup
                          );
                          setValue(
                            "FechaHoraRecogida",
                            fecha != ""
                              ? document.querySelector(
                                  ".FechaHoraRecogida input"
                                ).value
                              : ""
                          );
                          setvalue("GrupoSticker", ValueGroup);
                          // setCheckinvalue(setValue);
                          setImagenFile(
                            ValueImagesrc,
                            ValueImagesrc2,
                            setValue
                          );
                        }}
                        className={styles.btn_send}
                      >
                        Guardar Cambios
                      </button>
                    )}

                    <Link
                      href={{
                        pathname: "/[id]",
                        query: { id: ValueGroup, page: "1" },
                        hash: "Cactive#OverallSample",
                      }}
                      className={styles.btn_cancel}
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

export default CreateSticker;
