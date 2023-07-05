import React from "react";
import Styles from "../../../styles/Header.module.scss";
import Link from "next/link";
import { userService } from "../../../services/UserService";
function HRbuttonCloseSession() {
  return (
    <>
      <Link
        href={""}
        title="Cerrar sesión"
        onClick={(e) => {
          e.preventDefault();
          userService.logout();
        }}
      >
        <div className={`${Styles.close_session} ${Styles.active}`}>
          <span className={Styles.span}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-user-circle"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#000000"
              fill="none"
              strokelinecap="round"
              strokelinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
              <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
            </svg>

            <div className={Styles.submenu}>
              <ul className={Styles.sub_ul}>
                <li className={Styles.sub_li}>
                  <Link className={Styles.sub_link} rel="stylesheet" href="#">
                    Cambiar Contraseña
                  </Link>
                </li>
                <li className={Styles.sub_li}>
                  <Link className={Styles.sub_link} rel="stylesheet" href="#">
                    Cerrar sesion
                  </Link>
                </li>
              </ul>
            </div>
          </span>
        </div>
      </Link>
    </>
  );
}

export default HRbuttonCloseSession;
