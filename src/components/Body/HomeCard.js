import React, { useEffect, useState } from "react";
import CardStyles from "../../styles/homeCard.module.css";
import { useRouter } from "next/router";
import ImageOptimize from "../Tools/ImageOptimize";

export default function HomeCard({ ListadoGrupoActivo, ListadoGrupoInactivo }) {
  const router = useRouter();
  const [HabilitarActive, setHabilitarActive] = useState(false);
  useEffect(() => {
    const onHashChangeStart = (url) => {
      let hash = url.split("#")[1];
      if (
        hash == "Cactive" ||
        hash == "" ||
        hash == null ||
        hash == undefined
      ) {
        setHabilitarActive(true);
      } else {
        setHabilitarActive(false);
      }
    };

    router.events.on("hashChangeStart", onHashChangeStart);

    return () => {
      router.events.off("hashChangeStart", onHashChangeStart);
    };
  }, [router.events]);

  return (
    <>
      {HabilitarActive ? (
        ListadoGrupoActivo!=undefined && ListadoGrupoActivo!=null?
        ListadoGrupoActivo.map((data, index) => (
          <section key={index} className={CardStyles.home_card}>
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
                <a href="" className={CardStyles.body_container}>
                  <h3 className={CardStyles.card_name}>
                    {data.NOMBRE_GRUPO}
                    <i className={CardStyles.arrow_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-right"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#ffffff"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    </i>
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
                    <span className={CardStyles.follow_conunter}>{data.SEGUIMIENTOS}</span>
                    Seguimientos
                  </p>
                </a>
              </div>
            </div>
          </section>
        )):"Sin grupo"
      ) : (
        ListadoGrupoInactivo!=undefined && ListadoGrupoInactivo!=null?
        ListadoGrupoInactivo.map((data, index) => (
          <section key={index} className={CardStyles.home_card}>
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
                <a href="" className={CardStyles.body_container}>
                  <h3 className={CardStyles.card_name}>
                    {data.NOMBRE_GRUPO}
                    <i className={CardStyles.arrow_icon}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-chevron-right"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#ffffff"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <polyline points="9 6 15 12 9 18" />
                      </svg>
                    </i>
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
                    <span className={CardStyles.follow_conunter}>{data.SEGUIMIENTOS}</span>
                    Seguimientos
                  </p>
                </a>
              </div>
            </div>
          </section>
        )):"Sin grupo"
      )}
    </>
  );
}
