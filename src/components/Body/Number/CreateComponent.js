import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import styles from "../../../styles/CreateNotes.module.scss";
import stylesCrud from "../../../styles/StylesCRUDS.module.scss";
import ListNumberAdd from "./ListNumberAdd";
import ImageOptimize from "../../Tools/ImageOptimize";
import { onSubmitCreateNumber } from "../../../pages/api/Number/Crud";
import {
  OnkeyDowNumber,
  OnPasteNumber,
  AddtolistNumber,
} from "../../Tools/functiones";
function CreateComponent() {
  const [ListNumberAddObje, setListNumberAddObje] = useState([]);
  const [Valueinput, setValueinput] = useState("");
  const validarEsquemaNumero = Yup.object().shape({
    Description: Yup.string().notRequired(),
    Estado: Yup.string().notRequired(),
    ListNumber: Yup.array()
      .min(1, "Es obligatorio agregar por lo menos un número")
      .required("Es obligatorio agregar por lo menos un número"),
  });

  const formOptions = { resolver: yupResolver(validarEsquemaNumero) };
  const { handleSubmit, formState, setValue, clearErrors, setError } =
    useForm(formOptions);
  const { errors } = formState;

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
                pathname: "/Configuration/Number/IndexNumber",
                query: { page: "1" },
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear número</p>
          <br />
          <div className={styles.card}>
            <form onSubmit={handleSubmit(onSubmitCreateNumber)}>
              <div className={styles.stickers_container}>
                <div className={styles.card_sticker}>
                  {/* <!-- estado --> */}

                  <div
                    className={`${styles.form_group} ${stylesCrud.SinLinea}`}
                  >
                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Número</label>
                      <input
                        name="Description"
                        maxLength="12"
                        type="text"
                        onChange={(e) => {
                          setValueinput(e.target.value);
                          clearErrors("Description");
                        }}
                        onKeyPress={(e) => OnkeyDowNumber(e)}
                        onPaste={(e) => OnPasteNumber(e, null, setValueinput)}
                        className={styles.group_input}
                        value={Valueinput}
                        autoComplete="off"
                      />
                      <div className={styles.invalid_feedback}>
                        {errors.Description?.message}
                      </div>
                    </div>

                    <div className={styles.input_group}>
                      <label className={styles.group_title}>Estado</label>
                      <input id="Estado" type="checkbox" />
                      <div className={styles.invalid_feedback}>
                        {errors.Estado?.message}
                      </div>
                    </div>
                  </div>

                  <div className={styles.btn_container_send}>
                    <Link
                      className={styles.create_followUp}
                      href={""}
                      title="agregar número"
                      onClick={(e) => {
                        e.preventDefault();
                        AddtolistNumber(
                          Valueinput,
                          document.getElementById("Estado"),
                          ListNumberAddObje,
                          setListNumberAddObje,
                          setError,
                          setValueinput
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

                  <ListNumberAdd
                    ListNumberAddObje={ListNumberAddObje}
                    setListNumberAddObje={setListNumberAddObje}
                  ></ListNumberAdd>
                  <div className={styles.invalid_feedback}>
                    {errors.ListNumber?.message}
                  </div>

                  <div className={styles.btn_container_send}>
                    {!formState.isSubmitting && (
                      <button
                        onClick={() => {
                          setValue("ListNumber", ListNumberAddObje);
                        }}
                        className={styles.btn_send}
                      >
                        Guardar números
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
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default CreateComponent;
