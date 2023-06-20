import React,{useEffect} from "react";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import styles from "../../../styles/CreateNotes.module.scss";

function ComponentGroupIndex(ListadoGrupo)
{
    
    return (
    <>
<section className={styles.create_note}>
        <div className={styles.sticker_container}>
          <div className={styles.back_btn_container}>
            <Link
              href={{
                pathname: "/Sample/FullDetails/[id]",
                hash: "Normal",
              }}
              className={styles.back_btn}
            >
              Volver{" "}
            </Link>
          </div>

          <p className={styles.title}>Crear grupo</p>
          <br />
          <div className={styles.card}>

          {ListadoGrupo.infoBitacora != null &&
            ListadoGrupo.infoBitacora != undefined
              ? ListadoGrupo.infoBitacora.map((data, index) => (
            <>
                              <p>data.Id_grupo</p>
                              <p>data.NOMBRE_GRUPO</p>
                              <p>data.ESTADO</p>
                              <p>data.USU_CREADOR</p>
                              <p>data.FECHA_CREADO</p>
                              <p><Link
                    title="Agregar nota"
                    className={styles.add_icon}
                    href={{
                      pathname: "/parameters/Groups/[id]",
                      query: { id: data.Id_grupo },
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-square-plus"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="#ffffff"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                      <line x1="9" y1="12" x2="15" y2="12" />
                      <line x1="12" y1="9" x2="12" y2="15" />
                    </svg>
                  </Link></p>
            </> ))
          : ""  
          }
          </div>
        </div>
      </section>
    </>    
    );

}

export default ComponentGroupIndex;