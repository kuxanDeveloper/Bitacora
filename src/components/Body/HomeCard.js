import React from "react";
import CardStyles from "../../styles/homeCard.module.scss";
import ImageOptimize from "../Tools/ImageOptimize";
import Link from "next/link";
export default function HomeCard({
  ListadoGrupoActivo,
  ListadoGrupoInactivo,
  HabilitarActive,
}) {
  return (
    <>
      {HabilitarActive
        ? ListadoGrupoActivo != undefined && ListadoGrupoActivo != null
          ? ListadoGrupoActivo.map((data, index) => (
              <section key={index} className={CardStyles.home_card}>
                {/* ACTIVE */}
                <div className={CardStyles.card_content}>
                  <figure className={CardStyles.card_figure}>
                    <ImageOptimize
                      Values={{
                        src: "/img/premium_photo-1676325102583-0839e57d7a1f.avif",
                        alt: "imagen de grupo",
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
                        query: { id: data.Id_grupo, page:"1" },
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
                      src: "/img/premium_photo-1676325102583-0839e57d7a1f.avif",
                      alt: "imagen de grupo",
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
                      query: { id: da.Id_grupo, page:"1" },
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
