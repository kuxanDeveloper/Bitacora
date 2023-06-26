import React,{useEffect} from "react";
import Link from "next/link";
import styles from "../../../styles/CreateNotes.module.scss";

function ComponentGroupIndex(InforSampleDetails)
{
  useEffect(() => {

    console.log(InforSampleDetails);
    debugger;
  });


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

            <Link
                      href={{
                        pathname: "/[id]",
                        hash: "Normal",
                      }}
                      className={styles.btn_cancel}
                    >
                      Crear Grupo
                    </Link>
          </div>

         

          <p className={styles.title}>Listado de Grupos</p>
          <br />
          <div className={styles.card}>

          {InforSampleDetails.InforSampleDetails != null &&
            InforSampleDetails.InforSampleDetails != undefined
              ? InforSampleDetails.InforSampleDetails.map((data, index) => (
            <>            
                              <p>Codigo Grupo</p>
                              <p>{data.Id_grupo}</p>
                              <p>Nombre Grupo</p>
                              <p>{data.NOMBRE_GRUPO}</p>
                              <p>Estado Grupo</p>
                              <p>{data.ESTADO == true ? "Activo" : "Inactivo"}</p>
                              <p>Usuario Creador</p>
                              <p>{data.Email}</p>
                              <p>Fecha Creacion</p>
                              <p>{data.FECHA_CREADO}</p>
                              <div><Link
                    title="Agregar nota"
                    className={styles.add_icon}
                    href={{
                      pathname: "/parameters/Groups/[id]",
                      query: { id: data.Id_grupo },
                    }}
                  >
                    Editar Grupo
                  </Link></div>
                  <hr></hr>
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