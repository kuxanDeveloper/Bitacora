import React from "react";
import styles from "../../styles/Pop_up.module.scss";
import styles2 from "../../styles/CreateNotes.module.scss";
import stylesCrud from "../../styles/StylesCRUDS.module.scss";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { guardFechasbitacora } from "../Tools/FechasBitacoras";
import Link from "next/link";
import { setFechaActual } from "../Tools/functiones";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";
import dayjs from "dayjs";

function Pop_up({
  onClose,
  COD_BITACORA,
  FECHA_HORA_INGRESO,
  FECHA_HORA_VERIFICACION,
  FECHA_INGRESO_BOTELLA,
  FECHA_HORA_SUENA_POSITIVO,
  FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO,
  FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA,
  FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL,
  FECHA_HORA_VALIDACION_ANTIBIOGRAMA,
  ESTADO_STICKER_bit,
}) {
  const validarEsquemaFecha = Yup.object().shape({
    COD_BITACORAv: Yup.string().required(),
    FECHA_HORA_INGRESO: Yup.string().notRequired(),
    FECHA_HORA_VERIFICACION: Yup.string().notRequired(),
    FECHA_INGRESO_BOTELLA: Yup.string().notRequired(),
    FECHA_HORA_SUENA_POSITIVO: Yup.string().notRequired(),
    FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO: Yup.string().notRequired(),
    FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA: Yup.string().notRequired(),
    FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL: Yup.string().notRequired(),
    FECHA_HORA_VALIDACION_ANTIBIOGRAMA: Yup.string().notRequired(),
  });

  const formOptionsFech = { resolver: yupResolver(validarEsquemaFecha) };
  const { register, handleSubmit, formState, setValue } =
    useForm(formOptionsFech);

  return (
    <>
      <div className={styles.img_upload}>
        <div className={styles.upload_container}>
          <span
            onClick={onClose}
            id="botonCierreModal"
            className={styles.close_btn}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2f2f2f"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12 2l.324 .001l.318 .004l.616 .017l.299 .013l.579 .034l.553 .046c4.785 .464 6.732 2.411 7.196 7.196l.046 .553l.034 .579c.005 .098 .01 .198 .013 .299l.017 .616l.005 .642l-.005 .642l-.017 .616l-.013 .299l-.034 .579l-.046 .553c-.464 4.785 -2.411 6.732 -7.196 7.196l-.553 .046l-.579 .034c-.098 .005 -.198 .01 -.299 .013l-.616 .017l-.642 .005l-.642 -.005l-.616 -.017l-.299 -.013l-.579 -.034l-.553 -.046c-4.785 -.464 -6.732 -2.411 -7.196 -7.196l-.046 -.553l-.034 -.579a28.058 28.058 0 0 1 -.013 -.299l-.017 -.616c-.003 -.21 -.005 -.424 -.005 -.642l.001 -.324l.004 -.318l.017 -.616l.013 -.299l.034 -.579l.046 -.553c.464 -4.785 2.411 -6.732 7.196 -7.196l.553 -.046l.579 -.034c.098 -.005 .198 -.01 .299 -.013l.616 -.017c.21 -.003 .424 -.005 .642 -.005zm-1.489 7.14a1 1 0 0 0 -1.218 1.567l1.292 1.293l-1.292 1.293l-.083 .094a1 1 0 0 0 1.497 1.32l1.293 -1.292l1.293 1.292l.094 .083a1 1 0 0 0 1.32 -1.497l-1.292 -1.293l1.292 -1.293l.083 -.094a1 1 0 0 0 -1.497 -1.32l-1.293 1.292l-1.293 -1.292l-.094 -.083z"
                fill="currentColor"
                strokeWidth="0"
              />
            </svg>
          </span>

          <section className={styles2.create_note}>
            

            <div className={styles2.sticker_container}>
              <div className={styles2.back_btn_container}></div>
              <p className={styles2.title}>Fechas Sticker</p>
              <br />
              <div className={styles2.card}>
                <form onSubmit={handleSubmit(guardFechasbitacora)}>
                  <div className={styles2.stickers_container}>
                    <div className={styles2.card_sticker}>
                      <div
                        className={`${styles2.form_group} ${stylesCrud.SinLinea}`}
                      >
                        <div className={styles2.input_group}>
                          <label className={styles2.group_title}>
                            Fecha ingreso laboratorio
                          </label>
                          <LocalizationProvider
                            orientation="landscape"
                            dateAdapter={AdapterDayjs}
                            adapterLocale={"en-gb"}
                          >
                            <MobileDateTimePicker
                              disabled={
                                ESTADO_STICKER_bit == true ? false : true
                              }
                              defaultValue={
                                FECHA_HORA_INGRESO != null &&
                                FECHA_HORA_INGRESO != ""
                                  ? dayjs(FECHA_HORA_INGRESO)
                                  : null
                              }
                              className="fech_hora_ingreso"
                            />
                          </LocalizationProvider>
                          {ESTADO_STICKER_bit == true ? (
                            <button
                              type="button"
                              title="Seleccionar la fecha de hoy"
                              onClick={() => {
                                setFechaActual("fech_hora_ingreso");
                              }}
                              className={styles2.photo}
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
                        </div>
                        <div className={styles2.input_group}>
                          <label className={styles2.group_title}>
                            Fecha verificación
                          </label>
                          <LocalizationProvider
                            orientation="landscape"
                            dateAdapter={AdapterDayjs}
                            adapterLocale={"en-gb"}
                          >
                            <MobileDateTimePicker
                              disabled={
                                ESTADO_STICKER_bit == true ? false : true
                              }
                              defaultValue={
                                FECHA_HORA_VERIFICACION != null &&
                                FECHA_HORA_VERIFICACION != ""
                                  ? dayjs(FECHA_HORA_VERIFICACION)
                                  : null
                              }
                              className="fech_hora_verificacion"
                            />
                          </LocalizationProvider>
                          {ESTADO_STICKER_bit == true ? (
                            <button
                              type="button"
                              title="Seleccionar la fecha de hoy"
                              onClick={() => {
                                setFechaActual("fech_hora_verificacion");
                              }}
                              className={styles2.photo}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                stroke="#ffffff"
                                class="icon icon-tabler icon-tabler-calendar-plus"
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
                        </div>
                      </div>

                      <div
                        className={`${styles2.form_group} ${stylesCrud.SinLinea}`}
                      >
                        <div className={styles2.input_group}>
                          <label className={styles2.group_title}>
                            Fecha ingreso botella
                          </label>
                          <LocalizationProvider
                            orientation="landscape"
                            dateAdapter={AdapterDayjs}
                            adapterLocale={"en-gb"}
                          >
                            <MobileDateTimePicker
                              disabled={
                                ESTADO_STICKER_bit == true ? false : true
                              }
                              defaultValue={
                                FECHA_INGRESO_BOTELLA != null &&
                                FECHA_INGRESO_BOTELLA != ""
                                  ? dayjs(FECHA_INGRESO_BOTELLA)
                                  : null
                              }
                              className="fech_ingreso_botella"
                            />
                          </LocalizationProvider>
                          {ESTADO_STICKER_bit == true ? (
                            <button
                              type="button"
                              title="Seleccionar la fecha de hoy"
                              onClick={() => {
                                setFechaActual("fech_ingreso_botella");
                              }}
                              className={styles2.photo}
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
                        </div>
                        <div className={styles2.input_group}>
                          <label className={styles2.group_title}>
                            Fecha suena positivo
                          </label>
                          <LocalizationProvider
                            orientation="landscape"
                            dateAdapter={AdapterDayjs}
                            adapterLocale={"en-gb"}
                          >
                            <MobileDateTimePicker
                              disabled={
                                ESTADO_STICKER_bit == true ? false : true
                              }
                              defaultValue={
                                FECHA_HORA_SUENA_POSITIVO != null &&
                                FECHA_HORA_SUENA_POSITIVO != ""
                                  ? dayjs(FECHA_HORA_SUENA_POSITIVO)
                                  : null
                              }
                              className="fech_hora_suena_positiv"
                            />
                          </LocalizationProvider>
                          {ESTADO_STICKER_bit == true ? (
                            <button
                              type="button"
                              title="Seleccionar la fecha de hoy"
                              onClick={() => {
                                setFechaActual("fech_hora_suena_positiv");
                              }}
                              className={styles2.photo}
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
                        </div>
                      </div>

                      <div
                        className={`${styles2.form_group} ${stylesCrud.SinLinea}`}
                      >
                        <div className={styles2.input_group}>
                          <label className={styles2.group_title}>
                            Fecha validación hemocultivo positivo
                          </label>
                          <LocalizationProvider
                            orientation="landscape"
                            dateAdapter={AdapterDayjs}
                            adapterLocale={"en-gb"}
                          >
                            <MobileDateTimePicker
                              disabled={
                                ESTADO_STICKER_bit == true ? false : true
                              }
                              defaultValue={
                                FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO !=
                                  null &&
                                FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO != ""
                                  ? dayjs(
                                      FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO
                                    )
                                  : null
                              }
                              className="fech_valid_hemo_positivo"
                            />
                          </LocalizationProvider>
                          {ESTADO_STICKER_bit == true ? (
                            <button
                              type="button"
                              title="Seleccionar la fecha de hoy"
                              onClick={() => {
                                setFechaActual("fech_valid_hemo_positivo");
                              }}
                              className={styles2.photo}
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
                        </div>
                        <div className={styles2.input_group}>
                          <label className={styles2.group_title}>
                            Validación indentificacion de botella
                          </label>
                          <LocalizationProvider
                            orientation="landscape"
                            dateAdapter={AdapterDayjs}
                            adapterLocale={"en-gb"}
                          >
                            <MobileDateTimePicker
                              disabled={
                                ESTADO_STICKER_bit == true ? false : true
                              }
                              defaultValue={
                                FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA !=
                                  null &&
                                FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA !=
                                  ""
                                  ? dayjs(
                                      FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA
                                    )
                                  : null
                              }
                              className="fech_valid_identf_botella"
                            />
                          </LocalizationProvider>
                          {ESTADO_STICKER_bit == true ? (
                            <button
                              type="button"
                              title="Seleccionar la fecha de hoy"
                              onClick={() => {
                                setFechaActual("fech_valid_identf_botella");
                              }}
                              className={styles2.photo}
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
                        </div>
                      </div>

                      <div
                        className={`${styles2.form_group} ${stylesCrud.SinLinea}`}
                      >
                        <div className={styles2.input_group}>
                          <label className={styles2.group_title}>
                            Validación indentificacion final
                          </label>
                          <LocalizationProvider
                            orientation="landscape"
                            dateAdapter={AdapterDayjs}
                            adapterLocale={"en-gb"}
                          >
                            <MobileDateTimePicker
                              disabled={
                                ESTADO_STICKER_bit == true ? false : true
                              }
                              defaultValue={
                                FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL !=
                                  null &&
                                FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL !=
                                  ""
                                  ? dayjs(
                                      FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL
                                    )
                                  : null
                              }
                              className="fech_valid_identf_final"
                            />
                          </LocalizationProvider>
                          {ESTADO_STICKER_bit == true ? (
                            <button
                              type="button"
                              title="Seleccionar la fecha de hoy"
                              onClick={() => {
                                setFechaActual("fech_valid_identf_final");
                              }}
                              className={styles2.photo}
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
                        </div>
                        <div className={styles2.input_group}>
                          <label className={styles2.group_title}>
                            Validación de antibiograma
                          </label>
                          <LocalizationProvider
                            orientation="landscape"
                            dateAdapter={AdapterDayjs}
                            adapterLocale={"en-gb"}
                          >
                            <MobileDateTimePicker
                              disabled={
                                ESTADO_STICKER_bit == true ? false : true
                              }
                              defaultValue={
                                FECHA_HORA_VALIDACION_ANTIBIOGRAMA != null &&
                                FECHA_HORA_VALIDACION_ANTIBIOGRAMA != ""
                                  ? dayjs(FECHA_HORA_VALIDACION_ANTIBIOGRAMA)
                                  : null
                              }
                              className="fech_valid_antibiograma"
                            />
                          </LocalizationProvider>
                          {ESTADO_STICKER_bit == true ? (
                            <button
                              type="button"
                              title="Seleccionar la fecha de hoy"
                              onClick={() => {
                                setFechaActual("fech_valid_antibiograma");
                              }}
                              className={styles2.photo}
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
                        </div>
                      </div>

                      <div className={styles2.btn_container_send}>
                        {!formState.isSubmitting &&
                          ESTADO_STICKER_bit == true && (
                            <button
                              onClick={() => {
                                setValue("COD_BITACORAv", COD_BITACORA);
                                setValue(
                                  "FECHA_HORA_INGRESO",
                                  document.querySelector(
                                    ".fech_hora_ingreso input"
                                  ).value
                                );
                                setValue(
                                  "FECHA_HORA_VERIFICACION",
                                  document.querySelector(
                                    ".fech_hora_verificacion input"
                                  ).value
                                );
                                setValue(
                                  "FECHA_INGRESO_BOTELLA",
                                  document.querySelector(
                                    ".fech_ingreso_botella input"
                                  ).value
                                );
                                setValue(
                                  "FECHA_HORA_SUENA_POSITIVO",
                                  document.querySelector(
                                    ".fech_hora_suena_positiv input"
                                  ).value
                                );
                                setValue(
                                  "FECHA_HORA_VALIDACION_HEMOCULTIVO_POSITIVO",
                                  document.querySelector(
                                    ".fech_valid_hemo_positivo input"
                                  ).value
                                );
                                setValue(
                                  "FECHA_HORA_VALIDACION_IDENTIFICACION_BOTELLA",
                                  document.querySelector(
                                    ".fech_valid_identf_botella input"
                                  ).value
                                );
                                setValue(
                                  "FECHA_HORA_VALIDACION_INDENTIFICACION_FINAL",
                                  document.querySelector(
                                    ".fech_valid_identf_final input"
                                  ).value
                                );
                                setValue(
                                  "FECHA_HORA_VALIDACION_ANTIBIOGRAMA",
                                  document.querySelector(
                                    ".fech_valid_antibiograma input"
                                  ).value
                                );
                              }}
                              className={styles2.btn_send}
                            >
                              Guardar Fechas
                            </button>
                          )}
                        <div className={styles2.btn_cancel} onClick={onClose}>
                          Cancelar
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Pop_up;
