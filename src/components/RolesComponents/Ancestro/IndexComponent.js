import React from "react";
import Link from "next/link";
import ImageOptimize from "../../Tools/ImageOptimize";
import CardStyles from "../../../styles/homeCard.module.scss";
function IndexComponentAncestr({ InfoAncestro }) {
  return (
    <>
      {InfoAncestro.listadoAncestros != null && InfoAncestro.listadoAncestros != undefined
        ? InfoAncestro.listadoAncestros.map((data, index) => (
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
                      alt: data.NOMBRE_ANCESTRO,
                      title: data.NOMBRE_ANCESTRO,
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
                      pathname: "/homeSecundario",
                      query: { id: data.Id_grupo, idAncest: data.COD_ANCESTRO },
                      hash: "Cactive",
                    }}
                    className={CardStyles.body_container}
                  >
                    <h3 className={CardStyles.card_name}>
                      {data.NOMBRE_ANCESTRO}
                      <i className={CardStyles.arrow_icon}></i>
                    </h3>

                    {/* <p className={CardStyles.follow}>
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
                        </p> */}
                  </Link>
                </div>
              </div>
            </section>
          ))
        : ""}
    </>
  );
}

export default IndexComponentAncestr;
