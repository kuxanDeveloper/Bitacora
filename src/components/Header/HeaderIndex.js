import React from "react";
import Styles from "../../styles/Header.module.css";
import { userService } from "@/services/UserService";
import ImageOptimize from "../Tools/ImageOptimize";
import Link from "next/link";

function HeaderIndex() {
  return (
    <>
      <header className={Styles.header}>
        <div className={Styles.header_conent}>
          <span className={Styles.expand_nav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2f2f2f"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 6l16 0" />
              <path d="M4 12l16 0" />
              <path d="M4 18l16 0" />
            </svg>
          </span>

          <span
            title="Cerrar sesión"
            onClick={() => {
              userService.logout();
            }}
            className={Styles.close_session}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2f2f2f"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
              <line x1="10" y1="14" x2="20" y2="4" />
              <polyline points="15 4 20 4 20 9" />
            </svg>
          </span>

          <img
            src="https://www.bd.com/content/dam/bdcom-assets/en/en-us/images/graphic/icon/header-bd-logo.svg"
            alt=""
            className={Styles.header_logo}
          />
        </div>
        {/* anada la clase open para abrir el menu */}
        <div className={`${Styles.menu} `}> {/* ${Styles.open}   */}
          <section className={Styles.menu_container}>
            <nav className={Styles.navegation}>
              <ul className={Styles.nav_ul}>
                <li className={Styles.nav_li}>
                  <a href="" className={`${Styles.nav_link} ${Styles.active}`}>
                    Lik
                  </a>
                </li>

                <li className={Styles.nav_li}>
                  <a href="" className={`${Styles.nav_link} `}> {/* ${Styles.active} */}
                    Lik
                  </a>
                </li>

                <li className={Styles.nav_li}>
                  <a href="" className={`${Styles.nav_link} `}>
                    Lik
                  </a>
                </li>

                <li className={Styles.nav_li}>
                  <a href="" className={`${Styles.nav_link} `}>
                    Lik
                  </a>
                </li>

                <li className={Styles.nav_li}>
                  <a href="" className={`${Styles.nav_link} `}>
                    Lik
                  </a>
                </li>

                <li className={Styles.nav_li}>
                  <a href="" className={`${Styles.nav_link} `}>
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
