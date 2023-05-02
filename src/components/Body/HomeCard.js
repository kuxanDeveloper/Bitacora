import React from "react";
import CardStyles from "";

export default function HomeCard() {
  return (
    <>
      <section className={CardStyles.home_card}>
        <div className={CardStyles.card_content}>
          <figure className={CardStyles.card_figure}>
            <img
              src="https://plus.unsplash.com/premium_photo-1676325102583-0839e57d7a1f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              alt=""
              className={CardStyles.card_img}
            />
          </figure>

          <div className={CardStyles.card_body}>
            <a href="" className={CardStyles.body_container}>
              <h3 className={CardStyles.card_name}>
                Cultivos
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
                <img
                  className={CardStyles.follow_icon}
                  width="28"
                  height="28"
                  src="/public/img/Imagen_3.png"
                  alt=""
                />
                <span className={CardStyles.follow_conunter}>68</span>
                Seguimientos
              </p>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
