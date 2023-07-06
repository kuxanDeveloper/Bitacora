import React from "react";
import Link from "next/link";
import ImageOptimize from "../../Tools/ImageOptimize";
import CardStyles from "../../../styles/homeCard.module.scss";
function IndexComponentAssis({
  ListadoGrupoActivo,
  ListadoGrupoInactivo,
  HabilitarActive,
}) {
  return (
    <>
      Rol de auxiliar
      {HabilitarActive
        ? ListadoGrupoActivo != undefined && ListadoGrupoActivo != null
          ? ListadoGrupoActivo.map((data, index) => (
              <section key={index} className={CardStyles.home_card}>
                {/* ACTIVE */}
                <div className={CardStyles.card_content}>
                  <figure className={CardStyles.card_figure}>
                    <ImageOptimize
                      Values={{
                        src:
                          data.URL_IMAGEN != null &&
                          data.URL_IMAGEN != "" &&
                          data.URL_IMAGEN != undefined
                            ? data.URL_IMAGEN
                            : "/img/premium_photo-1676325102583-0839e57d7a1f.avif",
                        alt: data.NOMBRE_GRUPO,
                        title: data.NOMBRE_GRUPO,
                        classValue: CardStyles.card_img,
                        width: 1920,
                        height: 109,
                        style: {},
                      }}
                    />
                  </figure>

                  <div className={CardStyles.card_body}>
                    <Link
                      href={{
                        pathname: "/[id]",
                        query: { id: data.Id_grupo },
                        hash: "Cactive#OverallSample",
                      }}
                      className={CardStyles.body_container}
                    >
                      <h3 className={CardStyles.card_name}>
                        {data.NOMBRE_GRUPO}
                        <i className={CardStyles.arrow_icon}></i>
                      </h3>

                      <p className={CardStyles.follow}>
                        <ImageOptimize
                          Values={{
                            src: "/img/Imagen_3.png",
                            alt: "warning grupo",
                            title: "Seguimiento",
                            classValue: CardStyles.follow_icon,
                            width: 28,
                            height: 28,
                            style: {},
                          }}
                        />
                        <span className={CardStyles.follow_conunter}>
                          {data.SEGUIMIENTOS}
                        </span>
                        Seguimientos
                      </p>
                    </Link>
                  </div>
                </div>
              </section>
            ))
          : "Sin grupo ó sin conexion al API"
        : ListadoGrupoInactivo != undefined && ListadoGrupoInactivo != null
        ? ListadoGrupoInactivo.map((da, index) => (
            <section key={index} className={CardStyles.home_card}>
              {/* IANCTVIE */}
              <div className={CardStyles.card_content}>
                <figure className={CardStyles.card_figure}>
                  <ImageOptimize
                    Values={{
                      src:
                        da.URL_IMAGEN != null &&
                        da.URL_IMAGEN != "" &&
                        da.URL_IMAGEN != undefined
                          ? da.URL_IMAGEN
                          : "/img/premium_photo-1676325102583-0839e57d7a1f.avif",
                      alt: da.NOMBRE_GRUPO,
                      title: da.NOMBRE_GRUPO,
                      classValue: CardStyles.card_img,
                      width: 1920,
                      height: 109,
                      style: {},
                    }}
                  />
                </figure>

                <div className={CardStyles.card_body}>
                  <Link
                    href={{
                      pathname: "/[id]",
                      query: { id: da.Id_grupo },
                      hash: "Cinactvie#OverallSample",
                    }}
                    className={CardStyles.body_container}
                  >
                    <h3 className={CardStyles.card_name}>
                      {da.NOMBRE_GRUPO}
                      <i className={CardStyles.arrow_icon}></i>
                    </h3>

                    <p className={CardStyles.follow}>
                      <ImageOptimize
                        Values={{
                          src: "/img/Imagen_3.png",
                          alt: "warning grupo",
                          title: "Seguimiento",
                          classValue: CardStyles.follow_icon,
                          width: 28,
                          height: 28,
                          style: {},
                        }}
                      />
                      <span className={CardStyles.follow_conunter}>
                        {da.SEGUIMIENTOS}
                      </span>
                      Seguimientos
                    </p>
                  </Link>
                </div>
              </div>
            </section>
          ))
        : "Sin grupo ó sin conexion al API"}
    </>
  );
}

export default IndexComponentAssis;
