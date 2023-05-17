import React from "react";
import headerStyles from "../../styles/Header.module.css";
import { userService } from "@/services/UserService";
import ImageOptimize from "../Tools/ImageOptimize";
import Link from "next/link";

function HeaderIndex() {
  return (
    <>
      <header classNameName={headerStyles.header}>
        <div classNameName={headerStyles.header_conent}>
          <span
            title="Cerrar sesión"
            onClick={() => {
              userService.logout();
            }}
            classNameName={headerStyles.close_session}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              classNameName="icon icon-tabler icon-tabler-external-link"
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
              <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
              <line x1="10" y1="14" x2="20" y2="4" />
              <polyline points="15 4 20 4 20 9" />
            </svg>
          </span>
          <Link href="/#Cactive">
            <ImageOptimize
              Values={{
                src: "/img/Inicio Logo BD 65 x 25.svg",
                alt: "Login BD Index",
                title: "Inicio",
                classNameValue: headerStyles.header_logo,
                width: 65,
                height: 25,
                style: {},
              }}
            />
          </Link>
        </div>

        {/* para abrir el menu coloque la clase open */}
        <div className={`${headerStyles.menu} ${headerStyles.open}`}>
          <section className={headerStyles.menu_container}>
            <nav className={headerStyles.navegation}>
              <ul className={headerStyles.nav_ul}>
                <li className={headerStyles.nav_li}>
                  {/* para señanlar el menu en el que se encuentra coloque la clase active */}
                  <a
                    href=""
                    className={`${headerStyles.nav_link} ${headerStyles.active}`}
                  >
                    Home
                  </a>
                </li>

                <li className={headerStyles.nav_li}>
                  <a
                    href=""
                    className={`${headerStyles.nav_link}`}
                  >
                    Seguridad
                  </a>
                </li>

                <li className={headerStyles.nav_li}>
                  <a
                    href=""
                    className={`${headerStyles.nav_link}`}
                  >
                    Parametrizacion
                  </a>
                </li>

                <li className={headerStyles.nav_li}>
                  <a
                    href=""
                    className={`${headerStyles.nav_link}`}
                  >
                    Link
                  </a>
                </li>

                <li className={headerStyles.nav_li}>
                  <a
                    href=""
                    className={`${headerStyles.nav_link}`}
                  >
                    Lik
                  </a>
                </li>

                <li className={headerStyles.nav_li}>
                  <a
                    href=""
                    className={`${headerStyles.nav_link}`}
                  >
                    Lik
                  </a>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </header>
    </>
  );
}

export default HeaderIndex;
