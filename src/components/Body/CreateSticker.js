import React, { useEffect, useState } from "react";
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
import "dayjs/locale/en-gb";

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
  const [ValueGroup, setValueGroup] = useState(false);
  const validationSchema = Yup.object().shape({
    NumSticker: Yup.string().required("Campo N° de sticker obligatorio"),
    GrupoSticker: Yup.string().required("Campo grupo obligatorio"),
    ObservaInici: Yup.string(),
    file: Yup.mixed().notRequired(),
    file2: Yup.mixed().notRequired(),
    Sufijo: Yup.number().notRequired(),
    SitioAnatomico: Yup.string().required("Campo Sitio Anatómico obligatorio"),
    jefelaboratorio: Yup.string().required("Campo Sitio Anatómico obligatorio"),
    tipoMuestra: Yup.string().required("Campo Tipo de muestra obligatorio"),
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

  return (
    <>
      <section className={styles.Create_sticker}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link 
            href={{
              pathname: "/[id]",
              query: { id: ValueGroup, idAncestro: "1", page:"1" },
              hash: "Cactive#OverallSample",
            }}
            className={styles.back_btn}>
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

                  {/*-------------------------------Grupo------------------------------------------- */}

                  <div className={styles.form_group}>
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Grupo</label>
                      <select
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
                      </select>

                      <div className={styles.invalid_feedback}>
                        {errors.GrupoSticker?.message}
                      </div>
                    </div>
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
                      <select
                        {...register("jefelaboratorio")}
                        name="jefelaboratorio"
                        id="jefelaboratorio"
                        defaultValue={""}
                      >
                        <option disabled value="">
                          Seleccione una opción
                        </option>
                        {ListadoJefeLaboratorio.map((data, index) => (
                          <option key={index} value={data.ID}>
                            {data.DESCRIPCION}
                          </option>
                        ))}
                      </select>

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
                        orientation="landscape"
                        dateAdapter={AdapterDayjs}
                        adapterLocale={"en-gb"}
                      >
                        <MobileDateTimePicker className="FechaHoraRecogida" />
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
                        ></textarea>
                        {/* <div className={styles.invalid_feedback}>
                        {errors.ObservaInici?.message}
                      </div> */}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        onClick={() => {
                          RegisterStickerObservaciones(setValue);
                          setValue(
                            "FechaHoraRecogida",
                            document.querySelector(".FechaHoraRecogida input")
                              .value
                          );
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

                    {/* <button
                      id="buttonSubmitUnico"
                      style={{ display: "none" }}
                    ></button> */}
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
