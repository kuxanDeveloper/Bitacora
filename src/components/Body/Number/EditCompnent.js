import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { onSubmitEditNumber } from "../../../pages/api/Number/Crud";
import ImageOptimize from "../../Tools/ImageOptimize";
import styles from "../../../styles/CreateNotes.module.scss";
import { setCheckEstadoCrud } from "../../Tools/functiones";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import { OnkeyDowNumber, OnPasteNumber } from "../../Tools/functiones";

function EditCompnent({ InfoNumber, idNumber }) {
  const validarEsquemaobservation = Yup.object().shape({
    ID: Yup.string().required("Recibir el código es obligatorio"),
    description: Yup.string().required(
      "El campo descripcion del número es obligatorio"
    ),
    ESTADO: Yup.string().required(
      "Es obligatorio seleccionar el estado del numero"
    ),
  });

  const [Valueinput, setValueinput] = useState("");
  const formOptions = { resolver: yupResolver(validarEsquemaobservation) };
  const { handleSubmit, formState, setValue } = useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    if (InfoNumber != null && InfoNumber != undefined) {
      setValueinput(InfoNumber.DESCRIPCION);
    }
  }, [InfoNumber]);

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
                pathname: "/Configuration/Number/Number",
                query: { page: "1" },
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Editar número</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitEditNumber)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  {InfoNumber != null && InfoNumber != undefined ? (
                    <div>
                      <div
                        className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                      >
                        <div className={styles.input_group}>
                          <label className={styles.group_title}>
                            Descripción
                          </label>
                          <input
                            name="DESCRIPCION"
                            maxLength="12"
                            className={styles.group_input}
                            onKeyPress={(e) => OnkeyDowNumber(e)}
                            onPaste={(e) =>
                              OnPasteNumber(e, null, setValueinput)
                            }
                            onChange={(e) => {
                              setValueinput(e.target.value);
                            }}
                            value={Valueinput}
                            // value={Valueinput}
                            autoComplete="off"
                          />
                          <div className={styles.invalid_feedback}>
                            {errors.DESCRIPCION?.message}
                          </div>
                        </div>

                        <div className={styles.input_group}>
                          <label className={styles.group_title}>Estado</label>
                          <input
                            id="Estado"
                            defaultChecked={InfoNumber.ESTADO}
                            type="checkbox"
                          />
                          <div className={styles.invalid_feedback}>
                            {errors.ESTADO?.message}
                          </div>
                        </div>
                      </div>

                      <div className={styles.btn_container_send}>
                        {!formState.isSubmitting && (
                          <button
                            onClick={() => {
                              setCheckEstadoCrud(setValue);
                              setValue("ID", idNumber);
                              setValue("description", Valueinput);
                            }}
                            className={styles.btn_send}
                          >
                            Editar número
                          </button>
                        )}
                        <Link
                          className={styles.btn_cancel}
                          href={{
                            pathname: "/Configuration/Number/IndexNumber",
                            query: { page: "1" },
                          }}
                        >
                          Cancelar
                        </Link>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditCompnent;
